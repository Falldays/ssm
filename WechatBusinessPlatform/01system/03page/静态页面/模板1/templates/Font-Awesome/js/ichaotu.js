/*jshint sub:true, regexdash:true, laxbreak: true, expr: true*/
window['ichaotu'] = (function(){
  var win = window,
      queryShimCdn = "http://cdnjs.cloudflare.com/ajax/libs/sizzle/1.4.4/sizzle.min.js",
      queryEngines = function(){ return win["Sizzle"] || win["qwery"]; },
      doc = document, docEl = doc.documentElement,
      scriptFns=[], load=[], sLoaded,
      runtil = /Until$/, rmultiselector = /,/,
      rparentsprev = /^(?:parents|prevUntil|prevAll)/,
      rtagname = /<([\w:]+)/,
      rclass = /[\n\t\r]/g,
      rtagSelector = /^[\w-]+$/,
      ridSelector = /^#[\w-]+$/,
      rclassSelector = /^\.[\w-]+$/,
      rspace = /\s+/,
      rdigit = /\d/,
      rnotwhite = /\S/,
      rReturn = /\r\n/g,
      rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
      rCRLF = /\r?\n/g,
      rselectTextarea = /^(?:select|textarea)/i,
      rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
      strim = String.prototype.trim, trim,
      trimLeft = /^\s+/,
      trimRight = /\s+$/,
      contains, sortOrder,
      guaranteedUnique = { children: true, contents: true, next: true, prev: true },
      toString = Object.prototype.toString,
      class2type = {},
      hasDup = false, baseHasDup = true,
      wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""] },
      breaker = {},
      ArrayProto = Array.prototype, ObjProto = Object.prototype,
      hasOwn = ObjProto.hasOwnProperty,
      slice = ArrayProto.slice,
      push = ArrayProto.push,
      indexOf = ArrayProto.indexOf,
      nativeForEach = ArrayProto.forEach,
      nativeFilter = ArrayProto.filter,
      nativeIndexOf = ArrayProto.indexOf,
      expando = 'jq-' + (+new Date()),
      fosterNode = doc.createElement('p');

  if (rnotwhite.test("\xA0")){
    trimLeft = /^[\s\xA0]+/;
    trimRight = /[\s\xA0]+$/;
  }

  /**
   * @constructor
   * @param {Object|Element|string|Array.<string>} sel
   * @param {Object=} ctx
   */
  function J(sel, ctx){
    var ret;
    for(var i = 0, l = ctors.length; i < l; i++)
      if (ctors[i].apply(this, arguments)) return this;

    if (!sel) return this;
    if (isF(sel)){
      if (sLoaded) sel();
      else scriptFns.push(sel);
      return this;
    } else if (isA(sel)) return this['make'](sel);
    if (sel.nodeType || isWin(sel)) return this['make']([sel]);
    if (sel == "body" && !ctx && doc.body) {
      this['context'] = sel['context'];
      this[0] = doc.body;
      this.length = 1;
      this['selector'] = sel;
      return this;
    }
    if (sel['selector'] !== undefined) {
      this['context'] = sel['context'];
      this['selector'] = sel['selector'];
      return this['make'](sel);
    }
    sel = isS(sel) && sel.charAt(0) === "<"
      ? (ret = rsingleTag.exec(sel))
        ? [doc.createElement(ret[1])]
        : htmlFrag(sel).childNodes
      : $$((this['selector'] = sel), ctx);

    this['make'](sel);
    if (isPlainObj(ctx)) this['attr'](ctx);
    return this;
  }

  var ctors=[], plugins={}, jquid=1, _cache={_id:0}, _display = {}, p;
  function $(sel, ctx){
    return new J(sel, ctx);
  }

  p = J.prototype = $.prototype = $['fn'] = {
    constructor: $,
    'selector': "",
    'length': 0,
    dm: function(args, tbl, cb){
      var value = args[0], parent, frag, first, l, i;
      if (value){
        if (this[0]) {
          if (!(frag = value.nodeType === 3 && value)){
            parent = value && value.parentNode;
            frag = parent && parent.nodeType === 11 && parent.childNodes.length === this.length
              ? parent
              : htmlFrag(value);
            first = frag.firstChild;
            if (frag.childNodes.length === 1) frag = first;
            if (!first) return this;
          }
          for (i=0, l=this.length; i<l; i++)
			cb.call(this[i],(i == 0 ? frag : frag.cloneNode(true)));
        }
      }
      return this;
    },
    /**
     * @param {Object} els
     * @param {string=} name
     * @param {string=} selector
     * */
    ps: function(els, name, selector){
      var ret = this.constructor();
      if (isA(els)) push.apply(ret, els);
      else merge(ret, els);
      ret.prevObject = this;
      ret.context = this.context;
      if (name === "find")
        ret.selector = this['selector'] + (this['selector'] ? " " : "") + selector;
      else if (name)
        ret.selector = this['selector'] + "." + name + "(" + selector + ")";
      return ret;
    }
  };

  p['make'] = function(els){
    make(this, els);
    return this;
  };
  p['toArray'] = function() {
    return slice.call(this, 0);
  };
  p['get'] = function(num){
    return isDefined(num)
      ? (num < 0 ? this[this.length + num] : this[num])
      : this['toArray']();
  };
  p['add'] = function(sel, ctx){
    var set = typeof sel == "string"
      ? $(sel, ctx)
      : makeArray(sel && sel.nodeType ? [sel] : sel),
      all = merge(this.get(), set);
    return this.ps(detached(set[0]) || detached(all[0]) ? all : unique(all));
  };
  function detached(el) {
    return !el || !el.parentNode || el.parentNode.nodeType == 11;
  }
  p['each'] = function(fn){
      if (!isF(fn)) return this;
      for(var i = 0, l = this.length; i < l; i++)
        fn.call(this[i], i, this[i]);
      return this;
  };
  p['attr'] = function(name, val){
    var el = this[0];
    return (isS(name) && val === undefined)
          ? attr(el, name)
      : this['each'](function(idx){
        var nt = this.nodeType;
        if (nt !== 3 && nt !== 8 && nt !== 2){
          if (isO(name)) for(var k in name)
            if (val === null)
              this.removeAttribute(name);
            else
              this.setAttribute(k, name[k]);
          else this.setAttribute(name, isF(val) ? val.call(this, idx, this.getAttribute(name)) : val);
      }
    });
  };
  p['removeAttr'] = function(name){
    return this['each'](function(){
      if (this.nodeType == 1) this.removeAttribute(name);
    });
  };
  p['data'] = function(name, setVal){
    return  (setVal === undefined)
            ? data(this[0], name)
            : this['each'](function(){
        data(this, name, setVal);
      });
  };
  p['append'] = function(){
    return this.dm(arguments, true, function(el){
      if (this.nodeType === 1)
        this.appendChild(el);
    });
  };
  p['prepend'] = function(){
    return this.dm(arguments, true, function(el){
      if (this.nodeType === 1)
        this.insertBefore(el, this.firstChild);
    });
  };
  p['before'] = function(){
    if (this[0] && this[0].parentNode) {
      return this.dm(arguments, false, function(el){
        this.parentNode.insertBefore(el, this);
      });
    }
    return this;
  };
  p['after'] = function(){
    if (this[0] && this[0].parentNode){
      return this.dm(arguments, false, function(el){
        this.parentNode.insertBefore(el, this.nextSibling);
      });
    }
    return this;
  };
  p['replaceWith'] = function(val){
    var self = this, isFunc = isF(val);
    return this['each'](function(i) {
        var next = this.nextSibling,
            parent = this.parentNode,
            value = isFunc ? val.call(this, i, this) : val;
        if (parent && parent.nodeType != 11) {
            parent.removeChild(this);
            (next ? $(next).before(value) : $(parent).append(value));
        } else { // detached
            self[i] = $(value).clone()[0];
        }
      });
  };
  p['hide'] = function(){
    return this['each'](function(){
      if (this.style.display == "none") return;
      cache(this, "display", this.style.display);
      this.style.display = "none";
    });
  };
  p['show'] = function(){
    return this['each'](function(){
      this.style.display = cache(this, "display") || display(this.tagName);
    });
  };
  p['toggle'] = function(){
    return this['each'](function(){
      var el = $(this);
      $['Expr']['hidden'](this) ? el.show() : el.hide();
    });
  };
  p['eq'] = function(i){
    return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
  };
  p['first'] = function(){
    return this['eq'](0);
  };
  p['last'] = function(){
    return this['eq'](-1);
  };
  p['slice'] = function(){
    return this.ps(slice.apply(this, arguments),
      "slice", slice.call(arguments).join(","));
  };
  p['map'] = function(cb) {
    return this.ps(map(this, function(el, i) {
      return cb.call(el, i, el);
    }));
  };
  p['find'] = function(sel){
    var self = this, i, l;
    if (!isS(sel)){
      return $(sel).filter(function(){
        for(i = 0, l = self.length; i < l; i++)
          if (contains(self[i], this)) return true;
      });
    }
    var ret = this.ps("", "find", sel), len, n, r;
    for(i=0, l=this.length; i<l; i++){
      len = ret.length;
      merge(ret, $(sel, this[i]));
      if (i === 0){
        for(n = len; n < ret.length; n++)
          for(r = 0; r < len; r++)
            if (ret[r] === ret[n]){
              ret.splice(n--, 1);
              break;
            }
      }
    }
    return ret;
  };
  p['not'] = function(sel){
    return this.ps(winnow(this, sel, false), "not", sel);
  };
  p['filter'] = function(sel){
    return this.ps(winnow(this, sel, true), "filter", sel);
  };
  p['indexOf'] = function(val){
    return _indexOf(this, val);
  };
  p['is'] = function(sel){
    return this.length > 0 && $(this[0]).filter(sel).length > 0;
  };
  p['remove'] = function(){
    for(var i = 0, el; isDefined(el = this[i]); i++) {
      if (el.parentNode) el.parentNode.removeChild(el);
    }
    return this;
  };
  p['closest'] = function(sel, ctx) {
    var ret=[], i, l, cur;
    for (i=0, l=this.length; i<l; i++){
      cur = this[i];
      while (cur){
        if (filter(sel, [cur]).length>0){
          ret.push(cur);
          break;
        }else{
          cur = cur.parentNode;
          if (!cur || !cur.ownerDocument || cur === ctx|| cur.nodeType === 11)
            break;
        }
      }
    }
    ret = ret.length > 1 ? unique(ret) : ret;
    return this.ps(ret, "closest", sel);
  };
  p['val'] = function(setVal){
    if (!isDefined(setVal)) return (this[0] && this[0].value) || "";
    return this['each'](function(){
      this.value = setVal;
    });
  };
  p['html'] = function(setHtml){
    if (!isDefined(setHtml)) return (this[0] && this[0].innerHTML) || "";
    return this['each'](function(){
      this.innerHTML = setHtml;
    });
  };
  p['text'] = function(val){
    var el = this[0], nt;
    return isDefined(val)
      ? this['empty']()['append']((el && el.ownerDocument || doc).createTextNode(val))
      : (el && (nt = el.nodeType)
        ? ((nt === 1 || nt === 9)
          ? (isS(el.textContent) ? el.textContent : el.innerText.replace(rReturn, ''))
          : (nt === 3 || nt === 4) ? el.nodeValue : null)
        : null);
  };
  p['empty'] = function(){
    var i, el;
    for(i = 0; isDefined(el = this[i]); i++)
      while (el.firstChild)
        el.removeChild(el.firstChild);
    return this;
  };
  p['addClass'] = function(val){
    var cls, i, l, el, setClass, c, cl;
    if (isF(val))
      return this['each'](function(j){
        $(this)['addClass'](val.call(this, j, this.className));
      });
    if (val && isS(val)){
      cls = val.split(rspace);
      for(i = 0, l = this.length; i < l; i++){
        el = this[i];
        if (el && el.nodeType === 1){
          if (!el.className && cls.length === 1)
            el.className = val;
          else {
            setClass = " " + el.className + " ";
            for(c = 0, cl = cls.length; c < cl; c++){
              if (!~setClass.indexOf(" " + cls[c] + " "))
                setClass += cls[c] + " ";
            }
            el.className = trim(setClass);
          }
        }
      }
    }
    return this;
  };
  p['removeClass'] = function(val){
    var clss, i, l, el, cls, c, cl;
    if (isF(val)) return this['each'](function(j){
      $(this)['removeClass'](val.call(this, j, this.className));
    });
    if ((val && isS(val)) || val === undefined){
      clss = (val || "").split(rspace);
      for(i = 0, l = this.length; i < l; i++){
        el = this[i];
        if (el.nodeType === 1 && el.className){
          if (val){
            cls = (" " + el.className + " ").replace(rclass, " ");
            for(c = 0, cl = clss.length; c < cl; c++)
              cls = cls.replace(" " + clss[c] + " ", " ");
            el.className = trim(cls);
          }
          else el.className = "";
        }
      }
    }
    return this;
  };
  p['hasClass'] = function(sel){
    return hasClass(this, sel);
  };
  p['fadeIn'] = function(){
    this['each'](function(){
      $(this)['show']();
    });
  };
  p['fadeOut'] = function(){
    this['each'](function(){
      $(this)['hide']();
    });
  };
  p['serializeArray'] = function() {
    return this['map'](function(){
      return this.elements ? makeArray(this.elements) : this;
    }).filter(function(){
      return this.name && !this.disabled &&
        (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
    }).map(function(i, el){
      var val = $(this)['val']();
      return val == null || isA(val)
        ? map(val, function(val){
          return { name: el.name, value: val.replace(rCRLF, "\r\n") };
                  })
        : { name: el.name, value: val.replace(rCRLF, "\r\n") };
    }).get();
  };
  p['wrap'] = function(wrapper) {
    return this['each'](function() {
      var wrapperClone = $($(wrapper)[0].cloneNode(false));
      $(this).before(wrapperClone);
      wrapperClone.append($(this));
    });
  };
  p['prop'] = function(name, setVal) {
    if (isDefined(setVal))
      return this.each(function() { this[name] = setVal; });
    return this[0] && this[0][name];
  };
  p['clone'] = function() {
    return $(this.map(function() { return this.cloneNode(true); }));
  };
  p['toggleClass'] = function(className, val) {
    return this['each'](function() {
      var el = $(this);
      (isDefined(val) ? val : !el.hasClass(className))
        ? el.addClass(className) : el.removeClass(className);
    });
  };

  $['Expr'] = {
    'hidden': function(el){
      return ($["css"] && $["css"](el,"display") || el.style.display) === "none";
    },
    'visible': function(el) {
      return !$['Expr']['hidden'](el);
    }
  };

  function winnow(els, sel, keep){
    sel = sel || 0;
    if (isF(sel))
      return grep(els, function(el, i){
        return !!sel.call(el, i, el) === keep;
      });
    else if (sel.nodeType)
      return grep(els, function(el){
        return (el === sel) === keep;
      });
    else if (isS(sel)) {
      var expr = sel.charAt(0) == ":" && $['Expr'][sel.substring(1)];
      return grep(els, function(el) {
        var parentNode = el.parentNode,
            orphan = !parentNode,
            result;
        if (orphan) {
          parentNode = fosterNode;
          parentNode.appendChild(el);
        }
        result = expr
          ? expr(el)
          : el.parentNode && _indexOf($$(sel, el.parentNode), el) >= 0;
        orphan && parentNode.removeChild(el);
        return result;
      });
    }
    return grep(els, function(el) {
      return (_indexOf(sel, el) >= 0) === keep;
    });
  }
  function cache(el, name, val)
  {
    var id = el[expando];
    if (!isDefined(val))
      return id && _cache[id] && (name ? _cache[id][name] : _cache[id]);

    if (!id) id = el[expando] = jquid++;
    return (_cache[id] || (_cache[id]={}))[name] = val;
  }
  function display(tag) {
    if (!_display[tag]) {
      var el = $("<" + tag + ">")['appendTo'](doc.body),
        d = ($['css'] && $['css'](el[0], "display")) || el[0].style.display;
      el.remove();
      _display[tag] = d;
    }
    return _display[tag];
  }
  function make(arr, els){
    arr.length = (els && els.length || 0);
    if (arr.length === 0) return arr;
    for(var i = 0, l = els.length; i < l; i++)
      arr[i] = els[i];
    return arr;
  }
  function hasClass(els, cls){
    cls = " " + cls + " ";
    for(var i = 0, l = els.length; i < l; i++)
      if (eqClass(els[i], cls))
        return true;
    return false;
  } $['hasClass'] = hasClass;
  function eqClass(el, cls){
    return el.nodeType === 1 && (" " + el.className + " ").replace(rclass, " ").indexOf(cls) > -1;
  }
  function walk(fn, ctx, ret){
    ctx = ctx || doc;
    ret = ret || [];
    if (ctx.nodeType == 1)
      if (fn(ctx)) ret.push(ctx);
    var els = ctx.childNodes;
    for(var i = 0, l = els.length; i < l; i++){
      var subEl = els[i];
      if (subEl.nodeType == 1)
        walk(fn, subEl, ret);
    }
    return ret;
  } $['walk'] = walk;

  /**
   * @param {string} html
   * @param {Object=} ctx
   * @param {Object=} qry
   * */
  function $$(sel, ctx, qry){
    if (sel && isS(sel)){
      if (ctx instanceof $) ctx = ctx[0];
      ctx = ctx || doc;
      qry = qry || $['query'];
      var el, rest = sel.substring(1);
      return ridSelector.test(sel) && ctx === doc
        ? ((el = doc.getElementById(rest)) ? [el] : [])
        : makeArray(
          rclassSelector.test(sel) && ctx.getElementsByClassName
            ? ctx.getElementsByClassName(rest)
            : rtagSelector.test(sel)
              ? ctx.getElementsByTagName(sel)
              : qry(sel, ctx));
    }
    return sel.nodeType == 1 || sel.nodeType == 9 ? [sel] : [];
  } $['$$'] = $$;

  $['setQuery'] = function(qry){
    $['query'] = function(sel, ctx){
      return $$(sel, ctx, (qry || function(sel, ctx){ return ctx.querySelectorAll(sel); }));
    };
  };

  var useQuery = queryEngines();
  $['setQuery'](useQuery || function(sel, ctx){
    return (ctx = ctx || doc).querySelectorAll ? makeArray(ctx.querySelectorAll(sel)) : [];
  });

  function loadScript(url, cb, async,name){
    var h = doc.head || doc.getElementsByTagName('head')[0] || docEl,
      s = doc.createElement('script'), rs;
	if(name){s.id = name;}
    if (async) s.async = "async";
      s.onreadystatechange = function () {
        if (!(rs = s.readyState) || rs == "loaded" || rs == "complete"){
          s.onload = s.onreadystatechange = null;
          if (h && s.parentNode)
              h.removeChild(s);
          s = undefined;
          if (cb) cb();
        }
      };
    s.onload = cb;
    s.src = url;
    h.insertBefore(s, h.firstChild);
  } $['loadScript'] = loadScript;

  /** @param {...string} var_args */
  function warn(var_args){ win.console && win.console.warn(arguments); }

  $['each'] = function(o, cb, args){
    var k, i = 0, l = o.length, isObj = l === undefined || isF(o);
    if (args){
      if (isObj) {
        for(k in o)
          if (cb.apply(o[k], args) === false) break;
      } else
        for(; i < l;)
          if (cb.apply(o[i++], args) === false) break;
    } else {
      if (isObj) {
        for(k in o)
          if (cb.call(o[k], k, o[k]) === false) break;
      }
      else
        for(; i < l;)
          if (cb.call(o[i], i, o[i++]) === false) break;
    }
    return o;
  };
  function _each(o, fn, ctx){
    if (o == null) return;
    if (nativeForEach && o.forEach === nativeForEach)
      o.forEach(fn, ctx);
    else if (o.length === +o.length){
      for(var i = 0, l = o.length; i < l; i++)
        if (i in o && fn.call(ctx, o[i], i, o) === breaker) return;
    } else {
      for(var key in o)
        if (hasOwn.call(o, key))
          if (fn.call(ctx, o[key], key, o) === breaker) return;
    }
  } $['_each'] = _each;
  function attr(el, name) {
    if (!el || !el.getAttribute || !name) return; // text nodes or comment nodes don't have attributes
    var ret = el.hasAttribute && el.hasAttribute(name) ? el.getAttribute(name) : el[name];
    return (ret === null ? undefined : ret); // el.getAttribute inconsistently return null for non-defined attributes
  }
  function filter(sel, els) {
    return isDefined(sel) ? $(els).filter(sel) : $(els);
  } $['filter'] = filter;
  function _indexOf(arr, val){
    if (arr == null) return -1;
    var i, l;
    if (nativeIndexOf && arr.indexOf === nativeIndexOf) return arr.indexOf(val);
    for(i = 0, l = arr.length; i < l; i++) if (arr[i] === val) return i;
    return -1;
  } $['_indexOf'] = _indexOf;
  $['_defaults'] = function(obj){
    _each(slice.call(arguments, 1), function(o){
      for(var k in o)
        if (obj[k] == null) obj[k] = o[k];
    });
    return obj;
  };
  function _filter(o, fn, ctx){
    var ret = [];
    if (o == null) return ret;
    if (nativeFilter && o.filter === nativeFilter) return o.filter(fn, ctx);
    _each(o, function(val, i, arr){
      if (fn.call(ctx, val, i, arr)) ret[ret.length] = val;
    });
    return ret;
  } $['_filter'] = _filter;
  $['proxy'] = function(fn, ctx){
    if (typeof ctx == "string"){
      var tmp = fn[ctx];
      ctx = fn;
      fn = tmp;
    }
    if (isF(fn)){
      var args = slice.call(arguments, 2),
        proxy = function(){
          return fn.apply(ctx, args.concat(slice.call(arguments))); };
      proxy.guid = fn.guid = fn.guid || proxy.guid || jquid++;
      return proxy;
    }
  };
  function dir(el, prop, until){
    var matched = [], cur = el[prop];
    while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !$(cur).is(until))){
      if (cur.nodeType === 1) matched.push(cur);
      cur = cur[prop];
    }
    return matched;
  } $['dir'] = dir;
  function nth(cur, res, dir){
    res = res || 1;
    var num = 0;
    for(; cur; cur = cur[dir])
      if (cur.nodeType === 1 && ++num === res) break;
    return cur;
  } $['nth'] = nth;
  function sibling(n, el){
    var r = [];
    for(; n; n = n.nextSibling) if (n.nodeType === 1 && n !== el) r.push(n);
    return r;
  } $['sibling'] = sibling;

  function grep(els, cb, inv){
    var ret = [], retVal;
    inv = !!inv;
    for(var i=0, l=els.length; i<l; i++){
      retVal = !!cb(els[i], i);
      if (inv !== retVal)
        ret.push(els[i]);
    }
    return ret;
  } $['grep'] = grep;
  /**
   * @param {Object} els
   * @param {function} cb
   * @param {Object=} arg
   * */
  function map(els, cb, arg){
    var value, key, ret = [], i = 0, length = els.length,
      isArray = els instanceof $
        || typeof length == "number"
        && ((length > 0 && els[0] && els[length - 1]) || length === 0 || isA(els));
    if (isArray){
      for(; i < length; i++){
        value = cb(els[i], i, arg);
        if (value != null)
          ret[ret.length] = value;
      }
    } else {
      for(key in els){
        value = cb(els[key], key, arg);
        if (value != null)
          ret[ret.length] = value;
      }
    }
    return ret.concat.apply([], ret);
  } $['map'] = map;
  function data(el, name, setVal){
    if (!el) return {};
    var res = cache(el, name, setVal);
    return res || attrs(el)['data-' + name];
  } $['data'] = data;
  function attrs(el){
    var o = {};
    if (el.nodeType == 1)
      for(var i = 0, elAttrs = el.attributes, len = elAttrs.length; i < len; i++)
        o[elAttrs.item(i).nodeName] = elAttrs.item(i).nodeValue;
    return o;
  } $['attrs'] = attrs;
  function eqSI(str1, str2){
    return !str1 || !str2 ? str1 == str2 : str1.toLowerCase() === str2.toLowerCase();
  } $['eqSI'] = eqSI;
 trim = strim
  ? function(text){ return text == null ? "" : strim.call(text); }
  : function(text){ return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, ""); };
  $['trim'] = trim;
  $['indexOf'] = $['inArray'] = function(el, arr){
    if (!arr) return -1;
    if (indexOf) return indexOf.call(arr, el);
    for(var i = 0, length = arr.length; i < length; i++)
      if (arr[i] === el)
        return i;
    return -1;
  };
  _each("Boolean Number String Function Array Date RegExp Object".split(" "), function(name){
    class2type["[object " + name + "]"] = name.toLowerCase();
    return this;
  });

  function typeOf(o){ return o == null ? String(o) : class2type[toString.call(o)] || "object"; } $['type'] = typeOf;
  function isDefined(o){ return o !== void 0; }
  function isS(o){ return typeof o == "string"; }
  function isO(o){ return typeof o == "object"; }
  function isF(o){ return typeof o == "function" || typeOf(o) === "function"; } $['isFunction'] = isF;
  function isA(o){ return typeOf(o) === "array"; } $['isArray'] = Array.isArray || isA;
  function isAL(o){ return !isS(o) && typeof o.length == 'number'; }
  function isWin(o){ return o && typeof o == "object" && "setInterval" in o; } $['isWindow'] = isWin;
  function isNan(obj){ return obj == null || !rdigit.test(obj) || isNaN(obj); } $['isNaN'] = isNan;
  function isPlainObj(o){
    if (!o || typeOf(o) !== "object" || o.nodeType || isWin(o)) return false;
    try{
      if (o.constructor && !hasOwn.call(o, "constructor") && !hasOwn.call(o.constructor.prototype, "isPrototypeOf"))
        return false;
    }catch(e){
      return false;
    }
    var key;
    for(key in o){}
    return key === undefined || hasOwn.call(o, key);
  }
  function merge(a1, a2){
    var i = a1.length, j = 0;
    if (typeof a2.length == "number")
      for(var l = a2.length; j < l; j++)
        a1[i++] = a2[j];
    else
      while (a2[j] !== undefined)
        a1[i++] = a2[j++];
    a1.length = i;
    return a1;
  } $['merge'] = merge;
  function extend(){
    var opt, name, src, copy, copyIsArr, clone, args = arguments,
      dst = args[0] || {}, i = 1, aLen = args.length, deep = false;
    if (typeof dst == "boolean"){ deep = dst; dst = args[1] || {}; i = 2; }
    if (typeof dst != "object" && !isF(dst)) dst = {};
    if (aLen === i){ dst = this; --i; }
    for(; i < aLen; i++){
      if ((opt = args[i]) != null){
        for(name in opt){
          src = dst[name];
          copy = opt[name];
          if (dst === copy) continue;
          if (deep && copy && (isPlainObj(copy) || (copyIsArr = isA(copy)))){
            if (copyIsArr){
              copyIsArr = false;
              clone = src && isA(src) ? src : [];
            } else
              clone = src && isPlainObj(src) ? src : {};
            dst[name] = extend(deep, clone, copy);
          } else if (copy !== undefined)
            dst[name] = copy;
        }
      }
    }
    return dst;
  } $['extend'] = $['fn']['extend'] = extend;
  function makeArray(arr, res){
    var ret = res || [];
    if (arr != null){
      var type = typeOf(arr);
      if (arr.length == null || type == "string" || type == "function" || type === "regexp" || isWin(arr))
        push.call(ret, arr);
      else
        merge(ret, arr);
    }
    return ret;
  } $['makeArray'] = makeArray;
  /**
   * @param {string} html
   * @param {Object=} ctx
   * @param {Object=} frag
   * */
  function htmlFrag(html, ctx, frag){
    ctx = ((ctx || doc) || ctx.ownerDocument || ctx[0] && ctx[0].ownerDocument || doc);
    frag = frag || ctx.createDocumentFragment();
    if (isAL(html))
      return clean(html, ctx, frag) && frag;
    var div = fragDiv(html);
    while (div.firstChild)
      frag.appendChild(div.firstChild);
    return frag;
  } $['htmlFrag'] = htmlFrag;
  /**
   * @param {string} html
   * @param {Object=} ctx
   * */
  function fragDiv(html, ctx){
    var div = (ctx||doc).createElement('div'),
      tag = (rtagname.exec(html) || ["", ""])[1].toLowerCase(),
      wrap = wrapMap[tag] || wrapMap._default,
      depth = wrap[0];
    div.innerHTML = wrap[1] + html + wrap[2];
    while (depth--)
      div = div.lastChild;
    return div;
  }
  function clean(els, ctx, frag){
    var ret=[],i,el;
    for (i=0; (el=els[i])!=null; i++){
      if (isS(el))
        el = fragDiv(el, ctx);
      if (el.nodeType)
        ret.push(el);
      else
        ret = merge(ret, el);
    }
    if (frag)
      for (i=0; i<ret.length; i++)
        if (ret[i].nodeType)
          frag.appendChild(ret[i]);
    return ret;
  }
  var sibChk = function(a, b, ret){
    if (a === b) return ret;
    var cur = a.nextSibling;
    while (cur){
      if (cur === b) return -1;
      cur = cur.nextSibling;
    }
    return 1;
  };
  contains = $['contains'] = docEl.contains
    ? function(a, b){
      return a !== b && (a.contains ? a.contains(b) : true); }
    : function(){ return false; };
  sortOrder = docEl.compareDocumentPosition
    ? (contains = function(a, b){ return !!(a.compareDocumentPosition(b) & 16); }) //assigning contains
      && function(a, b){
      if (a === b){ hasDup = true; return 0; }
      if (!a.compareDocumentPosition || !b.compareDocumentPosition)
        return a.compareDocumentPosition ? -1 : 1;
      return a.compareDocumentPosition(b) & 4 ? -1 : 1;
      }
    : function(a, b){
      if (a === b){ hasDup = true; return 0; }
      else if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
      var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
      if (aup === bup) return sibChk(a, b);
      else if (!aup) return -1;
      else if (!bup) return 1;
      while (cur){ ap.unshift(cur); cur = cur.parentNode; }
      cur = bup;
      while (cur){ bp.unshift(cur); cur = cur.parentNode; }
      al = ap.length;
      bl = bp.length;
      for(var i = 0; i < al && i < bl; i++)
        if (ap[i] !== bp[i]) return sibChk(ap[i], bp[i]);
      return i === al ? sibChk(a, bp[i], -1) : sibChk(ap[i], b, 1);
     };
  function unique(els){
    if (sortOrder){
      hasDup = baseHasDup;
      els.sort(sortOrder);
      if (hasDup)
        for(var i = 1; i < els.length; i++)
          if (els[i] === els[i - 1]) els.splice(i--, 1);
    }
    return els;
  } $['unique'] = unique;
  _each({
    'parent': function(el){ var parent = el.parentNode; return parent && parent.nodeType !== 11 ? parent : null; },
    'parents': function(el){ return dir(el, "parentNode"); },
    'parentsUntil': function(el, i, until){ return dir(el, "parentNode", until); },
    'next': function(el){ return nth(el, 2, "nextSibling"); },
    'prev': function(el){ return nth(el, 2, "previousSibling"); },
    'nextAll': function(el){ return dir(el, "nextSibling"); },
    'prevAll': function(el){ return dir(el, "previousSibling"); },
    'nextUntil': function(el, i, until){ return dir(el, "nextSibling", until); },
    'prevUntil': function(el, i, until){ return dir(el, "previousSibling", until); },
    'siblings': function(el){ return sibling(el['parentNode']['firstChild'], el); },
    'children': function(el){ return sibling(el['firstChild']); },
    'contents': function(el){
      return el['nodeName'] === "iframe" ? el['contentDocument'] || el['contentWindow']['document '] : makeArray(el['childNodes']);
    }
  }, function(fn, name){
    $['fn'][name] = function(until, sel){
      var ret = map(this, fn, until), args = slice.call(arguments);
      if (!runtil.test(name)) sel = until;
      if (isS(sel)) ret = makeArray(filter(sel, ret));

      ret = this.length > 1 && !guaranteedUnique[name] ? unique(ret) : ret;
      if ((this.length > 1 || rmultiselector.test(sel)) && rparentsprev.test(name)) ret = ret.reverse();
      return this.ps(ret, name, args.join(","));
    };
  });
  _each({
    'appendTo': "append",
    'prependTo': "prepend",
    'insertBefore': "before",
    'insertAfter': "after"
  }, function(orig, name) {
    $['fn'][name] = function(sel){
      var ret = [], to = $(sel), i, els, l,
        p = this.length === 1 && this[0].parentNode;
      if (p && p.nodeType === 11 && p.childNodes.length === 1 && to.length === 1) {
        to[orig](this[0]);
        return this;
      }else{
        for(i=0, l=to.length; i<l; i++){
          els = (i > 0 ? this.clone(true) : this).get();
          $(to[i])[orig](els);
          ret = ret.concat(els);
        }
        return this.ps(ret, name, to['selector']);
      }
    };
  });

  function boxmodel(){
    if (!doc.body) return null; //in HEAD
    var d = doc.createElement('div');
    doc.body.appendChild(d);
    d.style.width = '20px';
    d.style.padding = '10px';
    var w = d.offsetWidth;
    doc.body.removeChild(d);
    return w == 40;
  }

  (function(){
    var div = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    var a = div.getElementsByTagName("a")[0];
    $['support'] = {
      boxModel: null,
      opacity: /^0.55$/.test(a.style.opacity),
      cssFloat: !!a.style.cssFloat
    };

    var rwebkit = /(webkit)[ \/]([\w.]+)/,
      ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
      rmsie = /(msie) ([\w.]+)/,
      rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
      ua = navigator.userAgent.toLowerCase(),
      match = rwebkit.exec(ua)
         || ropera.exec( ua )
         || rmsie.exec( ua )
         || ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) || [],
      b;
    b = $['browser'] = { version: match[2] || "0" };
    b[match[1] || ""] = true;
  })();
  $['scriptsLoaded'] = function(cb) {
    if (isF(cb)) scriptFns.push(cb);
  };
  function loadAsync(url, cb){
    load.push({url:url,cb:cb});
  } $['loadAsync'] = loadAsync;

  if (!useQuery && !doc.querySelectorAll)
    loadAsync(queryShimCdn, function(){
      $['setQuery'](queryEngines());
    });

  function fireSL(){
    _each(scriptFns, function(cb){
      cb();
    });
    sLoaded = true;
  }

  $['init'] = false;
  $['onload'] = function(){
    if (!$['init'])
    try {
      $['support']['boxModel'] = boxmodel();
      var cbs = 0;
      _each(load, function(o){
        cbs++;
        loadScript(o.url, function(){
          try { if (o.cb) o.cb(); } catch(e){}
          if (!--cbs)fireSL();
        });
      });
      $['init'] = true;
      if (!cbs)fireSL();
    } catch(e){
      warn(e);
    }
  };
  if (doc['body'] && !$['init'])
    setTimeout($['onload'],1); //let plugins loadAsync

  $['hook'] = function(fn){
    ctors.push(fn);
  };
  $['plug'] = function(meta, fn){
    var name = isS(meta) ? meta : meta['name'];
    fn = isF(meta) ? meta : fn;
    if (!isF(fn)) throw "Plugin fn required";
    if (name && fn) plugins[name] = fn;
    fn($);
  };

  return $;
})();

ichaotu['plug']("docready", function ($) {
  var win = window,
      doc = document,
      DOMContentLoaded,
      readyBound,
      readyList = [],
      isReady = false,
      readyWait = 1;

  $['hook'](function (sel, ctx) {
      if (typeof sel == "function") {
          this['ready'](sel);
          return true;
      }
  });

  function doScrollCheck() {
    if (isReady) return;
    try {
      doc.documentElement.doScroll("left");
    } catch (e) {
      setTimeout(doScrollCheck, 1);
      return;
    }
    ready();
  }

  function ready(wait) {
    if (wait === true) readyWait--;
    if (!readyWait || (wait !== true && !isReady)) {
      if (!doc.body) return setTimeout(ready, 1);
      isReady = true;
      if (wait !== true && --readyWait > 0) return;
      if (readyList) {
        var fn, i = 0, ready = readyList;
        readyList = null;
        while ((fn = ready[i++])) fn.call(doc, $);
        if ($['fn']['trigger']) $(doc)['trigger']("ready")['unbind']("ready");
      }
    }
  } $['ready'] = ready;

  DOMContentLoaded = doc.addEventListener
  ? function () {
    doc.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
    ready(); }
  : function () {
    if (doc.readyState === "complete") {
      doc.detachEvent("onreadystatechange", DOMContentLoaded);
      ready();
    }
  };

  $['bindReady'] = function() {
    if (readyBound) return;
    readyBound = true;
    if (doc.readyState === "complete") return setTimeout(ready, 1);

    if (doc.addEventListener) {
      doc.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
      win.addEventListener("load", ready, false);
    } else if (doc.attachEvent) {
      doc.attachEvent("onreadystatechange", DOMContentLoaded);
      win.attachEvent("onload", ready);
      var toplevel = false;
      try { toplevel = window.frameElement == null; } catch (e) { }
      if (doc.documentElement.doScroll && toplevel) doScrollCheck();
    }
  };

  $['fn']['ready'] = function (fn) {
    $['bindReady']();
       if (isReady) fn.call(doc, $);
       else if (readyList) readyList.push(fn);
       return this;
   };

  if (!$['init']) $(document)['ready']($['onload']);
});

ichaotu['plug']("events", function($){
  var doc = document, handlers = {}, _jquid = 1;
  function jquid(el){
    return el._jquid || (el._jquid = _jquid++);
  }
  function bind(o, type, fn){
    if (o.addEventListener)
      o.addEventListener(type, fn, false);
    else {
      o['e' + type + fn] = fn;
      o[type + fn] = function(){
        o['e' + type + fn](window.event);
      };
      o.attachEvent('on' + type, o[type + fn]);
    }
  } $['bind'] = bind;
  function unbind(o, type, fn){
    if (o.removeEventListener)
      o.removeEventListener(type, fn, false);
    else {
      o.detachEvent('on' + type, o[type + fn]);
      o[type + fn] = null;
    }
  } $['unbind'] = unbind;
  function parseEvt(evt){
    var parts = ('' + evt).split('.');
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
  }
  function matcherFor(ns){
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
  }
  function findHdls(el, evt, fn, sel){
    evt = parseEvt(evt);
    if (evt.ns) var m = matcherFor(evt.ns);
    return $['_filter'](handlers[jquid(el)] || [], function(hdl){
      return hdl
        && (!evt.e  || hdl.e == evt.e)
        && (!evt.ns || m.test(hdl.ns))
        && (!fn     || hdl.fn == fn)
        && (!sel    || hdl.sel == sel);
    });
  }
  function addEvt(el, evts, fn, sel, delegate){
    var id = jquid(el), set = (handlers[id] || (handlers[id] = []));
    $['_each'](evts.split(/\s/), function(evt){
      var handler = $['extend'](parseEvt(evt), {fn: fn, sel: sel, del: delegate, i: set.length});
      set.push(handler);
      bind(el, handler.e, delegate || fn);
    });
    el = null;
  }
  function remEvt(el, evts, fn, sel){
    var id = jquid(el);
    $['_each']((evts || '').split(/\s/), function(evt){
      $['_each'](findHdls(el, evt, fn, sel), function(hdl){
        delete handlers[id][hdl.i];
        unbind(el, hdl.e, hdl.del || hdl.fn);
      });
    });
  }
  var evtMethods = ['preventDefault', 'stopImmediatePropagation', 'stopPropagation'];
  function createProxy(evt){
    var proxy = $['extend']({originalEvent: evt}, evt);
    $['_each'](evtMethods, function(key){
      if(evt[key]){
        proxy[key] = function(){
          return evt[key].apply(evt, arguments);
        };
      }
    });
    return proxy;
  }
  var p = $['fn'];
  $['_each'](("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error").split(" "),
    function(name){
      p[name] = function(fn, data){
        return arguments.length > 0 ? this['bind'](name, fn, data) : this['trigger'](name);
      };
    }
  );
  p['bind'] = function(type, cb){
    return this['each'](function(){
      addEvt(this, type, cb);
    });
  };
  p['unbind'] = function(type, cb){
    return this['each'](function(){
       remEvt(this, type, cb);
    });
  };
  p['one'] = function(evt, cb){
    return this['each'](function(){
      var self = this;
      addEvt(this, evt, function wrapper(){
        cb.apply(self, arguments);
        remEvt(self, evt, arguments.callee);
      });
    });
  };
  p['delegate'] = function(sel, evt, cb){
    return this['each'](function(i, el){
      addEvt(el, evt, cb, sel, function(e){
        var target = e.target||e.srcElement, nodes = $['$$'](sel, el);
        while (target && $['_indexOf'](nodes, target) < 0)
          target = target.parentNode;
        if (target && !(target === el) && !(target === document)){
          cb.call(target, $['extend'](createProxy(e||window.event), {
            currentTarget: target, liveFired: el
          }));
        }
      });
    });
  };
  p['undelegate'] = function(sel, evt, cb){
    return this['each'](function(){
       remEvt(this, evt, cb, sel);
    });
  };
  p['live'] = function(evt, cb){
    $(doc.body)['delegate'](this['selector'], evt, cb);
    return this;
  };
  p['die'] = function(evt, cb){
    $(doc.body)['undelegate'](this['selector'], evt, cb);
    return this;
  };

  p['on'] = function(evt, sel, cb){
    return typeof sel === 'function' ? this.bind(evt, sel) : this.delegate(sel, evt, cb);
  };

  p['off'] = function(evt, sel, cb){
    return typeof sel === 'string' ? this.undelegate(sel, evt, cb) : this.unbind(evt, cb);
  };
    p['trigger'] = function (evt) {
        return this['each'](function () {
            if ((evt == "click" || evt == "blur" || evt == "focus") && this[evt])
                return this[evt]();
            if (doc.createEvent) {
                var e = doc.createEvent('Events');
                this.dispatchEvent(e, e.initEvent(evt, true, true));
            } else if (this.fireEvent)
                try {
                    if (evt !== "ready") {
                        this.fireEvent("on" + evt);
                    }
                } catch (e) { }
        });
    };
  if (!$['init']) $(window)['bind']("load",$['onload']);
});
ichaotu['plug']("css", function ($) {
  var doc = document,
      docEl = doc.documentElement,
      ralpha = /alpha\([^)]*\)/i,
      ropacity = /opacity=([^)]*)/,
      rdashAlpha = /-([a-z])/ig,
      rupper = /([A-Z])/g,
      rnumpx = /^-?\d+(?:px)?$/i,
      rnum = /^-?\d/,
      rroot = /^(?:body|html)$/i,
      cssShow = { position: "absolute", visibility: "hidden", display: "block" },
      cssWidth = [ "Left", "Right" ],
      cssHeight = [ "Top", "Bottom" ],
      curCSS,
      getComputedStyle,
      currentStyle,
      fcamelCase = function (all, l) { return l.toUpperCase(); };

  $['cssHooks'] = {
    'opacity': {
      'get': function (el, comp) {
        if (!comp) return el.style.opacity;
        var ret = curCSS(el, "opacity", "opacity");
        return ret === "" ? "1" : ret;
      }
    }
  };

  $['_each'](["height", "width"], function(k) {
    $['cssHooks'][k] = {
      get: function(el, comp, extra) {
        var val;
        if (comp) {
          if (el.offsetWidth !== 0)
            return getWH(el, k, extra);

          swap(el, cssShow, function() {
            val = getWH( el, k, extra );
          });
          return val;
        }
      },
      set: function(el, val) {
        if (rnumpx.test(val)) {
          val = parseFloat( val );

          if (val >= 0)
            return val + "px";
        } else
          return val;
      }
    };
  });

  function getWH(el, name, extra) {
    var val = name === "width" ? el.offsetWidth : el.offsetHeight,
      which = name === "width" ? cssWidth : cssHeight;
    if (val > 0) {
      if (extra !== "border") {
        $['each']( which, function() {
          if ( !extra )
            val -= parseFloat(css(el, "padding" + this) ) || 0;
          if ( extra === "margin" )
            val += parseFloat(css(el, extra + this) ) || 0;
          else
            val -= parseFloat(css(el, "border" + this + "Width") ) || 0;
        });
      }
      return val + "px";
    }
    return "";
  }

  if (!$['support']['opacity']) {
    $['support']['opacity'] = {
          get: function (el, computed) {
              return ropacity.test((computed && el.currentStyle ? el.currentStyle.filter : el.style.filter) || "")
                  ? (parseFloat(RegExp.$1) / 100) + ""
                  : computed ? "1" : "";
          },
          set: function (el, value) {
              var s = el.style;
              s.zoom = 1;
              var opacity = $['isNaN'](value) ? "" : "alpha(opacity=" + value * 100 + ")", filter = s.filter || "";
              s.filter = ralpha.test(filter) ?
        filter.replace(ralpha, opacity) :
        s.filter + ' ' + opacity;
          }
      };
  }

  if (doc.defaultView && doc.defaultView.getComputedStyle) {
    getComputedStyle = function (el, newName, name) {
      var ret, defaultView, computedStyle;
      name = name.replace(rupper, "-$1").toLowerCase();
      if (!(defaultView = el.ownerDocument.defaultView)) return undefined;
      if ((computedStyle = defaultView.getComputedStyle(el, null))) {
        ret = computedStyle.getPropertyValue(name);
        if (ret === "" && !$['contains'](el.ownerDocument.documentElement, el))
          ret = $['style'](el, name);
      }
      return ret;
    };
  }

  if (doc.documentElement.currentStyle) {
      currentStyle = function (el, name) {
          var left,
          ret = el.currentStyle && el.currentStyle[name],
          rsLeft = el.runtimeStyle && el.runtimeStyle[name],
          style = el.style;
          if (!rnumpx.test(ret) && rnum.test(ret)) {
              left = style.left;
              if (rsLeft) el.runtimeStyle.left = el.currentStyle.left;
              style.left = name === "fontSize" ? "1em" : (ret || 0);
              ret = style.pixelLeft + "px";
              style.left = left;
              if (rsLeft) el.runtimeStyle.left = rsLeft;
          }
          return ret === "" ? "auto" : ret;
      };
  }
  curCSS = getComputedStyle || currentStyle;

  $['fn']['css'] = function (name, value) {
      if (arguments.length === 2 && value === undefined) return this;

      return access(this, name, value, true, function (el, name, value) {
          return value !== undefined ? style(el, name, value) : css(el, name);
      });
  };
  $['cssNumber'] = { "zIndex": true, "fontWeight": true, "opacity": true, "zoom": true, "lineHeight": true };
  $['cssProps'] = { "float": $['support']['cssFloat'] ? "cssFloat" : "styleFloat" };
  function style(el, name, value, extra) {
      if (!el || el.nodeType === 3 || el.nodeType === 8 || !el.style) return;
      var ret, origName = camelCase(name), style = el.style, hooks = $['cssHooks'][origName];
      name = $['cssProps'][origName] || origName;
      if (value !== undefined) {
          if (typeof value === "number" && isNaN(value) || value == null) return;
          if (typeof value === "number" && !$['cssNumber'][origName]) value += "px";
          if (!hooks || !("set" in hooks) || (value = hooks.set(el, value)) !== undefined) {
              try {
                  style[name] = value;
              } catch (e) { }
          }
      } else {
          if (hooks && "get" in hooks && (ret = hooks.get(el, false, extra)) !== undefined)
              return ret;
          return style[name];
      }
  } $['style'] = style;

  function css(el, name, extra) {
      var ret, origName = camelCase(name), hooks = $['cssHooks'][origName];
      name = $['cssProps'][origName] || origName;
      if (hooks && "get" in hooks && (ret = hooks.get(el, true, extra)) !== undefined) return ret;
      else if (curCSS) return curCSS(el, name, origName);
  }$['css'] = css;

  function swap(el, opt, cb) {
      var old = {},k;
      for (var k in opt) {
          old[k] = el.style[k];
          el.style[k] = opt[k];
      }
      cb.call(el);
      for (k in opt) el.style[k] = old[k];
  }$['swap'] = swap;

  function camelCase(s) { return s.replace(rdashAlpha, fcamelCase); } $['camelCase'] = camelCase;

  function access(els, key, value, exec, fn, pass) {
      var l = els.length;
      if (typeof key === "object") {
          for (var k in key) {
              access(els, k, key[k], exec, fn, value);
          }
          return els;
      }
      if (value !== undefined) {
          exec = !pass && exec && $['isFunction'](value);
          for (var i = 0; i < l; i++)
              fn(els[i], key, exec ? value.call(els[i], i, fn(els[i], key)) : value, pass);
          return els;
      }
      return l ? fn(els[0], key) : undefined;
  }

  var init, noMarginBodyOff, subBorderForOverflow, suppFixedPos, noAddBorder, noAddBorderForTables,
      initialize = function() {
        if (init) return;
        var body = doc.body, c = doc.createElement("div"), iDiv, cDiv , table, td, bodyMarginTop = parseFloat(css(body, "marginTop")) || 0,
          html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
        $['extend'](c.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" });
        c.innerHTML = html;
        body.insertBefore(c, body.firstChild);
        iDiv = c.firstChild;
        cDiv = iDiv.firstChild;
        td = iDiv.nextSibling.firstChild.firstChild;
        noAddBorder = (cDiv .offsetTop !== 5);
        noAddBorderForTables = (td.offsetTop === 5);
        cDiv .style.position = "fixed";
        cDiv .style.top = "20px";
        suppFixedPos = (cDiv .offsetTop === 20 || cDiv .offsetTop === 15);
        cDiv .style.position = cDiv .style.top = "";
        iDiv.style.overflow = "hidden";
        iDiv.style.position = "relative";
        subBorderForOverflow = (cDiv .offsetTop === -5);
        noMarginBodyOff = (body.offsetTop !== bodyMarginTop);
        body.removeChild(c);
        init = true;
      },
      bodyOffset = function(body){
        var top = body.offsetTop, left = body.offsetLeft;
        initialize();
        if (noMarginBodyOff){
          top  += parseFloat( css(body, "marginTop") ) || 0;
          left += parseFloat( css(body, "marginLeft") ) || 0;
        }
        return { top: top, left: left };
      };

  $['fn']['offset'] = function(){
    var el = this[0], box;
    if (!el || !el.ownerDocument) return null;
    if (el === el.ownerDocument.body) return bodyOffset(el);
    try {
      box = el.getBoundingClientRect();
    } catch(e) {}
    if (!box || !$['contains'](docEl, el))
      return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
    var body = doc.body,
      win = getWin(doc),
      clientTop  = docEl.clientTop  || body.clientTop  || 0,
      clientLeft = docEl.clientLeft || body.clientLeft || 0,
      scrollTop  = win['pageYOffset'] || $['support']['boxModel'] && docEl.scrollTop  || body.scrollTop,
      scrollLeft = win['pageXOffset'] || $['support']['boxModel'] && docEl.scrollLeft || body.scrollLeft,
      top  = box.top + scrollTop - clientTop,
      left = box.left + scrollLeft - clientLeft;
    return { top: top, left: left };
  };

  $['fn']['position'] = function() {
    if (!this[0]) return null;
    var el = this[0],
    offPar = this['offsetParent'](),
    off = this['offset'](),
    parOff = rroot.test(offPar[0].nodeName) ? { top: 0, left: 0 } : offPar['offset']();
    off.top -= parseFloat(css(el, "marginTop")) || 0;
    off.left -= parseFloat(css(el, "marginLeft")) || 0;
    parOff.top += parseFloat(css(offPar[0], "borderTopWidth")) || 0;
    parOff.left += parseFloat(css(offPar[0], "borderLeftWidth")) || 0;
    return { top: off.top - parOff.top, left: off.left - parOff.left };
  };

  $['fn']['offsetParent'] = function(){
    return this['map'](function(){
      var op = this.offsetParent || doc.body;
      while (op && (!rroot.test(op.nodeName) && css(op,"position") === "static"))
        op = op.offsetParent;
      return op;
    });
  };

  $['_each'](["Height", "Width"], function (name, i) {
      var type = name.toLowerCase();
      $['fn']["inner" + name] = function () {
          var el = this[0];
          return el && el.style ? parseFloat(css(el, type, "padding")) : null;
      };
      $['fn']["outer" + name] = function (margin) {
          var el = this[0];
          return el && el.style ? parseFloat(css(el, type, margin ? "margin" : "border")) : null;
      };
      $['fn'][type] = function (size) {
          var el = this[0];
          if (!el) return size == null ? null : this;
          if ($['isFunction'](size))
              return this['each'](function (i) {
                  var self = $(this);
                  self[type](size.call(this, i, self[type]()));
              });
          if ($['isWindow'](el)) {
              var docElProp = el.document.documentElement["client" + name], body = el.document.body;
              return el.document.compatMode === "CSS1Compat" && docElProp || body && body["client" + name] || docElProp;
          } else if (el.nodeType === 9) {
              return Math.max(
            el.documentElement["client" + name],
            el.body["scroll" + name], el.documentElement["scroll" + name],
            el.body["offset" + name], el.documentElement["offset" + name]);
          } else if (size === undefined) {
              var orig = css(el, type),
                  ret = parseFloat(orig);
              return $['isNaN'](ret) ? orig : ret;
          }
          else return this['css'](type, typeof size === "string" ? size : size + "px");
      };
  });

  function getWin(el) { return $['isWindow'](el) ? el : el.nodeType === 9 ? el.defaultView || el.parentWindow : false; }

  $['_each'](["Left", "Top"], function (name, i) {
      var method = "scroll" + name;
      $['fn'][method] = function (val) {
          var el, win;
          if (val === undefined) {
              el = this[0];
              if (!el) return null;
              win = getWin(el);
              return win ? ("pageXOffset" in win)
                  ? win[i ? "pageYOffset" : "pageXOffset"]
                  : $['support']['boxModel'] && win.document.documentElement[method] || win.document.body[method] : el[method];
          }
          return this['each'](function() {
              win = getWin(this);
              if (win)
                  win['scrollTo'](!i ? val : $(win)['scrollLeft'](), i ? val : $(win)['scrollTop']());
              else
                  this[method] = val;
          });
      };
  });

});
ichaotu['plug']("ajax", function ($) {
  var xhrs = [
           function () { return new XMLHttpRequest(); },
           function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
           function () { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
           function () { return new ActiveXObject("MSXML2.XMLHTTP"); }
      ],
      _xhrf = null;

  function _xhr() {
    if (_xhrf != null) return _xhrf();
    for (var i = 0, l = xhrs.length; i < l; i++) {
      try {
        var f = xhrs[i], req = f();
        if (req != null) {
          _xhrf = f;
          return req;
        }
      } catch (e){}
    }
    return function () { };
  } $['xhr'] = _xhr;

  function _xhrResp(xhr, dataType) {
    dataType = (dataType || xhr.getResponseHeader("Content-Type").split(";")[0]).toLowerCase();
    if (dataType.indexOf("json") >= 0){
      var j = false;
      if(window.JSON){
        j = window.JSON['parse'](xhr.responseText);
      }else{
        j = eval(xhr.responseText);
      }
      return j;
    }
    if (dataType.indexOf("script") >= 0)
      return eval(xhr.responseText);
    if (dataType.indexOf("xml") >= 0)
      return xhr.responseXML;
    return xhr.responseText;
  } $['_xhrResp'] = _xhrResp;

 /* $['formData'] = function formData(o) {
    var kvps = [], regEx = /%20/g;
    for (var k in o) kvps.push(encodeURIComponent(k).replace(regEx, "+") + "=" + encodeURIComponent(o[k].toString()).replace(regEx, "+"));
    return kvps.join('&');
  };*/
  $['formData'] = function(obj, strKey) {
	 var s = [],
	 regEx = /%20/g;;
	 for (var key in obj) {
		if(strKey) var key1 = strKey + '[' + key + ']';
			else var key1 = key;
		if(typeof obj[key] == "object" || typeof obj[key] == "array"){
			s = s.concat($.formData(obj[key], key1));
		} else {
			s.push(encodeURIComponent(key1) +'='+ encodeURIComponent(obj[key]).replace(regEx, "+"));
		}
	 }				
	return strKey?s:s.join('&');
  }
  $['each']("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i,o){
    $['fn'][o] = function(f){
      return this['bind'](o, f);
    };
  });

  function ajax(url, o) {
      var xhr = _xhr(), timer, n = 0;
      if (typeof url === "object") o = url;
      else o['url'] = url;
      o = $['_defaults'](o, { 'userAgent': "XMLHttpRequest", 'lang': "en", 'type': "GET", 'data': null, 'contentType': "application/x-www-form-urlencoded", 'dataType': null, 'processData': true, 'headers': {"X-Requested-With": "XMLHttpRequest" }, 'cache': true });
      if (o.timeout) timer = setTimeout(function () { xhr.abort(); if (o.timeoutFn) o.timeoutFn(o.url); }, o.timeout);
      var cbCtx = $(o['context'] || document), evtCtx = cbCtx;
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4){
              if (timer) clearTimeout(timer);
              if (xhr.status < 300){
                  var res, decode = true, dt = o.dataType || "";
                  try{
                      res = _xhrResp(xhr, dt, o);
                  }catch(e){
                      decode = false;
                      if (o.error)
                      o.error(xhr, xhr.status, xhr.statusText);
                  evtCtx['trigger'](cbCtx, "ajaxError", [xhr, xhr.statusText, o]);
                  }
                  if (o['success'] && decode && (dt.indexOf('json')>=0 || !!res))
                      o['success'](res);
                  evtCtx['trigger'](cbCtx,"ajaxSuccess", [xhr, res, o]);

              }
              else {
                  if (o.error)
                      o.error(xhr, xhr.status, xhr.statusText);
                  evtCtx['trigger'](cbCtx, "ajaxError", [xhr, xhr.statusText, o]);
              }
              if (o['complete'])
                  o['complete'](xhr, xhr.statusText);
              evtCtx['trigger'](cbCtx, "ajaxComplete", [xhr, o]);
          }
          else if (o['progress']) o['progress'](++n);
      };
      var url = o['url'], data = null;
      var cache = o['cache']==true;
      var isPost = o['type'] == "POST" || o['type'] == "PUT";
      if( o['data'] && o['processData'] && typeof o['data'] == 'object' )
          data = $['formData'](o['data']);

      if (!isPost && data) {
          url += (url.indexOf("?") === -1 ? "?" : "&") + data;
          data = null;
          if(!cache)
            url=url+"&_="+(new Date().getTime());
      }else(!isPost && !cache)
          url=url+(url.indexOf("?") === -1 ? "?" : "&")+"_="+(new Date().getTime());
      cache=null;
      xhr.open(o['type'], url);

      try {
          for (var i in o.headers)
              xhr.setRequestHeader(i, o.headers[i]);
      } catch(_) { //console.log(_) 
	  }

      if (isPost) {
          if(o['contentType'].indexOf('json')>=0)
              data = o['data'];
          xhr.setRequestHeader("Content-Type", o['contentType']);
      }

      xhr.send(data);
  } $['ajax'] = ajax;

  $['getJSON'] = function (url, data, success) {

	 if(data && data.callback){
		 var jsonCallback = data.callback;
		  data.callback = null;
	 }else{
		 var jsonCallback = 'jsonCallback';
	}
	
	 if ($['isFunction'](data)) {
		success = data;
		data = {};
	 }
	var scriptQuery = $.config.get("scriptQuery");
	if(scriptQuery.i){
		data.i = scriptQuery.i;
	}
	if(typeof data == 'object'){
		data = $['formData'](data);
	}
	 // 生成函数名称
	 var name;
	 // 回调名称 
	 // 拼装url
	 url = url + (url.indexOf("?") === -1 ? "?" : "&") +(data?data:'')+'&'+jsonCallback+'='+'jsonp_'+new Date().getTime()+'_'+Math.ceil(Math.random(6)*100000),
	 // 匹配回调
	jsonRegexp = new RegExp(jsonCallback+'=(\\w+)'),
	// 获取函数名
	match = jsonRegexp.exec(url);

	if(match && match[1]) {
		name = match[1];
	} else {
	// 如果未定义函数名的话随机成一个函数名
	// 随机生成的函数名通过时间戳拼16位随机数的方式，重名的概率基本为0
	// 如:jsonp_1355750852040_8260732076596469
	name = "jsonp_" + new Date().getTime()+'_'+Math.ceil(Math.random(6)*100000);
	// 把callback中的?替换成函数名
	url = url.replace(jsonCallback+"=?", jsonCallback+"="+name);
	// 处理?被encode的情况
		url = url.replace(jsonCallback+"=%3F", jsonCallback+"="+name);
	}
		//声明全局函数传递变量，并销毁
	window[name] = function(json){
	success(json);
		window[name] = undefined;
	};
	//载入json数据,并删除节点
	$.loadScript(url, function(){
		var jsonDom = document.getElementById(name);
		jsonDom && jsonDom.parentNode.removeChild(jsonDom);
		},false,name);
  };
  $['get'] = function (url, data, success, dataType) {
    if ($['isFunction'](data)) {
      dataType = success;
      success = data;
      data = null;
    }
    ajax({'url': url, 'type': "GET", 'data': data, 'success': success, 'dataType': dataType || "text/plain"});
  };

  $['post'] = function (url, data, success, dataType) {
    if ($['isFunction'](data)) {
      dataType = success;
      success = data;
      data = null;
    }
    ajax({'url': url, 'type': "POST", 'data': data, 'success': success, 'dataType': dataType || "text/plain"});
  };

  $['getScript'] = function (url, success) {
    return $['get'](url, undefined, success, "script");
  };

  if (!window.JSON)
    $['loadAsync']("http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js");
});

//语言包
ichaotu['plug']("lang", function ($){
	var data = {
		'info_tujoin':"超级图片",
		'info_owner' :"所有者信息:",
		'info_nickname':"昵称:",
		'info_realname':"姓名：",
		'info_email':"邮箱：",
		'info_mobile':"手机：",
		'info_sitename':"发布网站：",
		'info_author':"发布者：",
		'info_link':"发布地址：",
		'info_camera':"相机：",
		'info_focus':"焦距：",
		'info_aperture':"光圈：",
		'info_shutter':"快门：",
		'info_iso':"ISO：",
		'info_ctime':"拍摄日期：",
		'info_desc':"全球领先的隐形水印专利技术",
		'info_addtagmsg':"点击图片任意位置添加信息,按ESC或右键取消",
		'info_tag_text_head':"嵌入文本信息",
		'info_tag_title':"标题",
		'info_tag_desc':"描述",
		'info_tag_pic_head':"支持图片格式：jpg、bmp、png、gif",
		'info_tag_pic_url':"图片地址",
		'info_tag_link_head':"可输入任何链接地址,例如：http://www.sina.com.cn/",
		'info_tag_link_url':"任意地址",
		'info_tag_personage_head':"支持新浪、QQ微博",
		'info_tag_personage_url':"个人主页地址",
		'info_tag_map_head':"请输入要添加的具体地址名称：",
		'info_tag_map_title':"具体地址",
		'info_tag_music_title':"请输入歌曲/专辑/艺人名",
		'info_tag_video_title':"请输入视频关键字",
		'info_tag_shopping_head':"请输入商家/商品等关键字：",
		'info_tag_shopping_title':"例如：NEKE",
		'info_edit':"编辑",
		'info_del':"删除",
		'info_tag_text':"文本",
		'info_tag_music':"音乐",
		'info_tag_video':"视频",
		'info_tag_map':"地图",
		'info_tag_pic':"图片",
		'info_tag_link':"链接",
		'info_tag_copyright':"版权",
		'info_tag_personage':"人物",
		'info_tag_shopping':"商品",
		'info_tag_save':"保存",
		'info_tag_cancle':"取消",
		'info_tag_music_head':' ',
		'info_tag_video_head':' '
	};
	$['lang'] = function(key){
		return data[key]?data[key]:'';
	}
});


ichaotu['plug']("util",function($){
	$['clearSlct'] = function(){
		try{
			"getSelection" in window?window.getSelection().removeAllRanges():document.selection.empty();
		}catch(e){

		}
	}
	$['getmouse'] =function (e){
		if(!e){
			e = window.event;
		}
		var Cursor = {};
		if(!e)return Cursor;
		if(!$.browser.ie){
			Cursor.x = e.pageX;
			Cursor.y = e.pageY;
		}else if(e.clientX || e.clientY){
			Cursor.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			Cursor.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return Cursor;
	}
	$['parseJSON'] = function(str){
		if(!str) return {};
		 if(window.JSON){
			j = window.JSON['parse'](str);
		  }else{
			j = eval('('+str+')');
		  }
		  return j;
	}
	$['isHeadered'] = function(str_url) {
		var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
		var re = new RegExp(strRegex);
		return re.test(str_url);
	}
	$['subBtyesString'] = function (str,length, end) {
			var tStr = "";  //返回的字符串
			var pEnd = 0;   //截取字符串的结束位置
			var totalLength = 0;   //
			var charCode;
			for (var i = 0; i < str.length; i++) {
				charCode = str.charCodeAt(i);
				if (charCode < 0x007f) {
					totalLength++;
				}
				else {  //当为非字母时， 按第个字符占两个字节宽度计算
					totalLength += 2;
				}

				if (totalLength <= length) {
					pEnd = i + 1;
				}
			}

			if (pEnd < str.length) {  //有截取
				tStr = str.substr(0, pEnd);
				if(end)
				tStr += "...";
			}
			else {  //没有截取
				tStr = str;
			}
			return tStr;
	}
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	$['base64Encode'] = function(input) {  
			var output = "";  
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
			var i = 0;  
			input = _utf8_encode(input);  
			while (i < input.length) {  
				chr1 = input.charCodeAt(i++);  
				chr2 = input.charCodeAt(i++);  
				chr3 = input.charCodeAt(i++);  
				enc1 = chr1 >> 2;  
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
				enc4 = chr3 & 63;  
				if (isNaN(chr2)) {  
					enc3 = enc4 = 64;  
				} else if (isNaN(chr3)) {  
					enc4 = 64;  
				}  
				output = output +  
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
			}  
			return output;  
		};
	   
		// public method for decoding  
	$['base64Decode'] = function (input) {  
			var output = "";  
			var chr1, chr2, chr3;  
			var enc1, enc2, enc3, enc4;  
			var i = 0;  
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
			while (i < input.length) {  
				enc1 = _keyStr.indexOf(input.charAt(i++));  
				enc2 = _keyStr.indexOf(input.charAt(i++));  
				enc3 = _keyStr.indexOf(input.charAt(i++));  
				enc4 = _keyStr.indexOf(input.charAt(i++));  
				chr1 = (enc1 << 2) | (enc2 >> 4);  
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
				chr3 = ((enc3 & 3) << 6) | enc4;  
				output = output + String.fromCharCode(chr1);  
				if (enc3 != 64) {  
					output = output + String.fromCharCode(chr2);  
				}  
				if (enc4 != 64) {  
					output = output + String.fromCharCode(chr3);  
				}  
			}  
			output = _utf8_decode(output);  
			return output;  
		};
	   
		// private method for UTF-8 encoding  
		function _utf8_encode (string) {  
			string = string.replace(/\r\n/g,"\n");  
			var utftext = "";  
			for (var n = 0; n < string.length; n++) {  
				var c = string.charCodeAt(n);  
				if (c < 128) {  
					utftext += String.fromCharCode(c);  
				} else if((c > 127) && (c < 2048)) {  
					utftext += String.fromCharCode((c >> 6) | 192);  
					utftext += String.fromCharCode((c & 63) | 128);  
				} else {  
					utftext += String.fromCharCode((c >> 12) | 224);  
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
					utftext += String.fromCharCode((c & 63) | 128);  
				}  
	   
			}  
			return utftext;  
		};
	   
		// private method for UTF-8 decoding  
		function _utf8_decode (utftext) {  
			var string = "";  
			var i = 0;  
			var c = c1 = c2 = 0;  
			while ( i < utftext.length ) {  
				c = utftext.charCodeAt(i);  
				if (c < 128) {  
					string += String.fromCharCode(c);  
					i++;  
				} else if((c > 191) && (c < 224)) {  
					c2 = utftext.charCodeAt(i+1);  
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
					i += 2;  
				} else {  
					c2 = utftext.charCodeAt(i+1);  
					c3 = utftext.charCodeAt(i+2);  
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
					i += 3;  
				}  
			}  
			return string;  
		};

	 $['resizeImage'] = function(maxWidth,maxHeight,objImg){
		var img = new Image();
		img.src = objImg.src;
		var hRatio;
		var wRatio;
		var Ratio = 1;
		var w = img.width;
		var h = img.height;
		wRatio = maxWidth / w;
		hRatio = maxHeight / h;
		if (maxWidth ==0 && maxHeight==0){
			Ratio = 1;
		}else if (maxWidth==0){//
		if (hRatio<1) Ratio = hRatio;
		}else if (maxHeight==0){
			if (wRatio<1) Ratio = wRatio;
		}else if (wRatio<1 || hRatio<1){
				Ratio = (wRatio<=hRatio?wRatio:hRatio);
		}
		if (Ratio<1){
			w = w * Ratio;
			h = h * Ratio;
		}
		objImg.height = h;
		objImg.width = w;
	}

	$['resizeAd'] = function(maxWidth,maxHeight,objImg){
		var pid = $(objImg).closest(".iChouTu-adverpush-details").parent().attr("pid");
		if(!isNaN(parseInt(pid))){
			var imgel = $('img[ichaotuPid="'+pid+'"]');
			var width = imgel.width();
		}
		//if(width<maxWidth){
		maxWidth = width;
		//}
		var img = new Image();
		img.src = objImg.src;
		var hRatio;
		var wRatio;
		var Ratio = 1;
		var w = img.width;
		var h = img.height;
		wRatio = maxWidth / w;
		hRatio = maxHeight / h;
		if (maxWidth ==0 && maxHeight==0){
			Ratio = 1;
		}else if (maxWidth==0){//
		if (hRatio<1) Ratio = hRatio;
		}else if (maxHeight==0){
			if (wRatio<1) Ratio = wRatio;
		}else if (wRatio<1 || hRatio<1){
				Ratio = (wRatio<=hRatio?wRatio:hRatio);
		}
		if (Ratio<1){
			w = w * Ratio;
			h = h * Ratio;
		}
		objImg.height = h;
		objImg.width = w;

		if(width>100){

			var title = $(objImg).closest(".iChouTu-adverpush-details").find(".iChouTu-details-head").text();

			if(title){
				title = $.subBtyesString(title, Math.ceil((width - objImg.width - 70)/10), true);
				$(objImg).closest(".iChouTu-adverpush-details").find(".iChouTu-details-head").text(title);
			}
			//$.subBtyesString($(objImg).closest(".ader-push-con").find(".ader-push-right>p").text(),(width - objImg.width - 20)/2);
			//var desc = $.subBtyesString($(objImg).closest(".ader-push-con").find(".ader-push-right>p").text(),(width - objImg.width - 60)/10);
			//if(desc){
			//	$(objImg).closest(".ader-push-con").find(".ader-push-right>p").text(desc);
			//}
		}
	}
	$['getHost'] = function(url) {
			var host = "null";
			if(typeof url == "undefined"
							|| null == url)
					url = window.location.href;
			var regex = /.*\:\/\/([^\/]*).*/;
			var match = url.match(regex);
			if(typeof match != "undefined"
							&& null != match)
					host = match[1];
			return host;
	}

});
ichaotu['plug']('domresize', function($){
	var p = $['fn'];
	var elems = $([]);
	p['domresize'] = function(fn){
		var elems = [],
		elem = $(this),
		timeout_id;
		elem.data('str_data', {
			w: elem.width(),
			h: elem.height(),
			cb:fn
		  });
		elems.push(elem);
		if(elems.length==1){
			loopy();
		}
		function loopy() {
			timeout_id = setTimeout(function() {
			for(var i in elems){
				var elem = elems[i],
				  width = elem.width(),
				  height = elem.height(),
				  data = elem.data('str_data');
				if (width !== data.w || height !== data.h) {
					elem.data('str_data',{w: width,h: height,cb:data.cb});
					data.cb();
				}
			  }
		  loopy();
		  }, 500);
	  }
	}
	var elems_images = $([]);
	p['imgchange'] = function(fn){
		var elems_images = [],
		elems_image = $(this),
		timeout_id;
		elems_image.data('str_data', {
			w: elems_image.width(),
			h: elems_image.height(),
			left:elems_image.offset().left,
			top:elems_image.offset().top,
			src:elems_image[0].src,
			status:elems_image.is(":hidden")?1:0,
			cb:fn
		  });
		elems_images.push(elems_image);

		if(elems_images.length==1){
			//console.log("start");
			loopy();
		}
		function restore(elem, callback){
			elem.data('str_data', {
				w: elem.width(),
				h: elem.height(),
				left:elem.offset().left,
				top:elem.offset().top,
				src:elem[0].src,
				status:elem.is(":hidden")?1:0,
				cb:callback
			});
		}
		function loopy() {
			timeout_id = setTimeout(function() {
			//console.log(elems_images);
			for(var i in elems_images){
				var elem = elems_images[i],
				  width = elem.width(),
				  height = elem.height(),
				  left=elem.offset().left,
				  top=elem.offset().top,
				  src=elem[0].src,
				  status=elem.is(":hidden")?1:0,
				  data = elem.data('str_data');
			    if(src!=data.src){
					data.cb(elem, "change");
					restore(elem, data.cb);
				}else if(status!=data.status){
					data.cb(elem, status);//0显示1隐藏
					restore(elem, data.cb);
				}else if (width!== data.w || height !== data.h||left!=data.left||top!=data.top){
					data.cb(elem, "move");
					restore(elem, data.cb);
				}
		
			  }
		  loopy();
		  }, 2000);
	  }

	}
});


//标记拖动
ichaotu['plug']("drag", function($){
	var p = $['fn'];
	p['drag'] = function(option){
		if(!option)var option= {};
		$.clearSlct();
		var Cursor = {
			x: 0,
			y: 0
		},_this=$(this);
		//refresh(e);
		var objori = {
			left:parseInt(_this.css("left")),
			top: parseInt(_this.css("top"))
		};
		var objnow = {};
	
		var objoffset = false;
		document.onmouseup = function(e){
			document.onmousemove = null;
			document.onmouseup = null;
			
			if(option.lock){
			
				if((option.maxx &&  objnow.x>option.maxx) || (option.maxy &&  objnow.y>option.maxy)||(option.minx &&  objnow.x<option.minx)||(option.miny &&  objnow.y<option.miny)){
				
					if(option.remove)_this.remove(obj);
					return ;

				}
			}

			option.onstop && option.onstop(Cursor);
		};
		option.onstart && option.onstart(Cursor);
		document.onmousemove =  function(e){
			refresh(e);
			if(objoffset == false){
				objoffset=	{
						x:Cursor.x - objori.left,
						y:Cursor.y - objori.top
				};
			}
			objnow = {
					x:Cursor.x-objoffset.x,
					y:Cursor.y-objoffset.y
			};

			option.onmove && option.onmove(Cursor);

			if(option.lock){
		
				if((option.maxx &&  objnow.x>option.maxx) || (option.maxy &&  objnow.y>option.maxy)||(option.minx &&  objnow.x<option.minx)||(option.miny &&  objnow.y<option.miny)){
					return ;
				}
			}
			if(!option.banx){
				var left = objnow.x+'px';
				_this.css({left:left}); ;
			}
			if(!option.bany){
				var top = objnow.y+'px';
				_this.css({top:top}); ;
			}
		};
		function refresh(e){
			if(!e){
				e = window.event;
			}
			set(e);
		};
		function set(e){
			if(!$.browser.msie){
				Cursor.x = e.pageX;
				Cursor.y = e.pageY;
			}else if(e.clientX || e.clientY){
				Cursor.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				Cursor.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
		}
	}
});


ichaotu['plug']("template", function ($) {

	//取得标记内容查看模板
	$['getTagInfoTpl'] = function(option){
			var closebutton = '<a style="cursor:pointer;" class="TJclose"></a>',//关闭按钮

			content = option.content?option.content:{},//标记内容
			status  = option.status, //标记状态
			type    = option.type, 
			
			descfild =    '<div class="TJinput_textarea"><textarea '+defaultinfo("info_tag_desc")+
						 ' name="desc">'+(content.desc?content.desc:$.lang("info_tag_desc"))+'</textarea></div>',
			html = '';
		switch(type){
			case 'text':
				html = '<h5>'+content.title+'</h5>'+
					    '<div class="TJtext">'+content.desc+'</div>';
			break;
			case 'pic':
				html ='<h5>'+content.desc+'</h5>'+
					   '<div class="TJtext"><img src="'+content.url+'" onload="ichaotu.resizeImage(180,180,this)" width="180px" height="180px"></div>';	
				break;
			case 'video':
				html =  
						'<div style="border:0;" class="TJclearfix TJm_cont TJmt_10">'+
					    '<div style="width:155px;" class="TJm_name TJleft">'+content.title+'</div>'+
					    //'<p class="TJm_icon_v TJleft"><a style="cursor:pointer;" title="试听" onclick="Tjcore.tags.videoplay(this, '+aid+','+index+',\''+content.url+'\')"></a></p>'+
					    '<iframe width="100%" style="height: 221px;" scrolling="no" frameborder="0" src="http://statics.ichaotu.com/widget/template/videoplay.html?u='+encodeURIComponent(content.url)+'"></iframe>'+
					    '</div>';
				
				break;
			case 'map':
				html = '<h5>'+content.title+'</h5>'+
					   '<div class="TJtext"><img src="'+content.url+'"></div>';
					 
				break;
			case 'music':
				html =
					    '<div style="border:0;z-index:950;width:300px;" class="TJclearfix TJm_cont TJmt_10">'+
					    '<div style="width:155px;" class="TJm_name TJleft">'+decodeURIComponent(content.title)+'</div>'+
					    //'<p class="TJm_icon TJleft"><a aurl="'+encodeURIComponent(content.url)+'" style="cursor:pointer;" title="试听" onclick="Tjcore.tags.musicplay(this, '+aid+','+index+',\''+decodeURIComponent(content.title)+'\')"></a></p>'+
					    '<iframe width="100%" height="36px" scrolling="no" frameborder="0" src="source/plugin/ichaotu/template/musicplay.html?u='+encodeURIComponent(content.url)+'"></iframe>'+
					    '</div>';
					break;
			case 'link':
				html = 	
					    '<div class="TJtext TJmt_10"><a style="cursor:pointer;" target="_blank" href="http://api.tujoin.com/discuz/redirect/?type=link&url='+encodeURIComponent(content.url)+'" target="_blank">'+(content.desc?content.desc:content.url)+'</a></div>';
				break;
			case 'personage':
			html = 
					'<h5><a  style="cursor:pointer;" id="Tj_content_personage_name" target="_blank" href="http://api.tujoin.com/discuz/redirect/?type=personage&url='+encodeURIComponent(content.url)+'"></a></h5>'+
					'<div class="TJtext TJuser_pic TJclearfix"><img width="60" height="60" src="" id="Tj_content_personage_face">'+content.desc+'</div>';
				break;
			case 'shopping':
				/*html= '<div class="xc_sy_p"><a target="_blank" href="'+content.url+'" class="shopurl"><b>'+content.title+'</b></a></div>'+
						'<div class="s_gw_ct">'+
    					'<div class="s_gw_ct_l ad_left">'+(content.img?'<img src="'+content.img+'">':'')+'</div>'+
						'<div class="s_gw_ct_r ad_right">'+
        				'<div><span class="ad_span1">￥</span><span class="ad_span2">'+content.price+'</span></div>'+
						(content.sale?'<div class="mt_5"><span class="ad_span3">￥</span><span class="ad_span4">'+content.sale+'</span><span class="ag_d_span3">感恩回馈价</span></div>':'')+
						'<ul class="TJclearfix tad_type mt_5">'+
							(content.desc?content.desc:'')+
						'</ul>'+
					'<div><a href="'+content.url+'" target="_blank" class="shopurl s_sp_gm">购买</a></div>'+
					'</div>';*/

			html= '<div class="mg-body-upside-left-down" style="left:300px">'+
            	  '<div class="mg-box01">'+
                  '<div class="mg-box01-empty"></div>'+
					'<div class="mg-box01-conte clearfix">'+
                		'<div class="mg-box01-left"><a class="shopurl" target="_blank">'+(content.img?'<img src="'+content.img+'" onload="ichaotu.resizeImage(100,100,this)">':'')+'</a></div>'+
                        '<div class="mg-box01-right">'+
                            '<h4 title="'+content.title+'"><a class="shopurl" target="_blank">'+$.subBtyesString(content.title,20)+'</a></h4>'+
                            '<p>'+$.subBtyesString(content.desc,34)+'</p>'+
                            '<div class="mg-money">'+(content.price?'新品价：<span>'+content.price+'</span>元':'')+'<a class="mg-rg-icon shopurl" target="_blank" href=""></a></div>'+
                        '</div>'+
                    '</div>'+
           		 '</div>'+
				 '</div>';

			/*
			html= '<div class="mg-body-upside-left-down">'+
            	  '<div class="mg-box01">'+
                  '<div class="mg-box01-left"><a class="shopurl" target="_blank">'+(content.img?'<img src="'+content.img+'">':'')+'</a></div>'+
                  '<div class="mg-box01-right">'+
                  '<h4 title="'+content.title+'"><a class="shopurl" target="_blank">'+$.subBtyesString(content.title,14)+'</a></h4>'+
                  '<p>'+content.desc+'</p>'+
                  '<div class="mg-money">新品价：<span>'+content.price+'</span>元</div>'+
                  '</div>'+
                  '<div style="clear:both;"></div>'+
				  '</div>'+
				  '</div>';*/
			return html;
			break;
		}
		html = '<a style="cursor:pointer;" class="TJclose"></a>'+html;
		html = '<div class="TJcont_info" style="position: absolute;left:28px;top:25px">'+html+'</div>';
		return html;
	}

	//取得修改标记模板
	$['getTagEditTpl'] = function(option){
		var savebutton = '<div class="TJbtn TJt_r"><a style="cursor:pointer;" class="TJconserve_m" >'+$.lang("info_tag_save")+'</a><a style="cursor:pointer;" class="TJcancel_m" >'+$.lang("info_tag_cancle")+'</a></div>',
			closebutton = '<a style="cursor:pointer;" class="TJclose"></a>',//关闭按钮

			content = option.content?option.content:{},//标记内容
			status  = option.status, //标记状态
			type    = option.type, 
			
			descfild =    '<div class="TJinput_textarea"><textarea '+defaultinfo("info_tag_desc")+
						 ' name="desc">'+(content.desc?content.desc:$.lang("info_tag_desc"))+'</textarea></div>',
			html = '';

			switch(type){
				case 'text':
						html = '<h5>'+$.lang("info_tag_text_head")+'</h5>'+
						'<div class="TJinput_text"><input type="text" '+defaultinfo("info_tag_title")+' value="'+(content.title?content.title:$.lang("info_tag_title"))+'" name="title"></div>'+
						descfild+
						savebutton;
				break;
				case 'link':
					html = '<h5>'+$.lang("info_tag_link_head")+'<br /><span class="TJc_999">'+$.lang("info_tag_text_head2")+'</span></h5>'+
						   '<div class="TJinput_text"><input name="url" type="text" '+defaultinfo("info_tag_link_url")+' value="'+(content.url?content.url:$.lang("info_tag_link_url"))+'" /></div>'+
						   descfild+
						   savebutton;
				break;
				case 'music':
					html = '<h5>'+$.lang("info_tag_music_head")+'</h5>'+
					    '<div class="TJinput_text TJclearfix">'+
					    '<input class="TJleft" style="width:180px;" name="title" type="text" '+defaultinfo("info_tag_music_title")+' value="'+$.lang("info_tag_music_title")+'"/><a class="TJbtn_m TJleft" style="cursor:pointer;"></a></div>'+
						'  <div class="tjresult">'+
						' </div>';
				break;
				case 'map':
					html =	'<h5>'+$.lang("info_tag_map_head")+'</h5>'+
				    '<div class="TJinput_text TJbor_b TJclearfix"><input class="TJleft" style="width:180px;"  '+defaultinfo("info_tag_map_title")+' name="title" type="text" value="'+$.lang("info_tag_map_title")+'"/><a class="TJbtn_m TJleft" style="cursor:pointer;"></a></div>'+
					'<div style ="heigth:260px" id="result">'+		
					'</div>';
				break;
				case 'video':
					html = '<h5>'+$.lang("info_tag_video_head")+'</h5>'+
					    '<div class="TJinput_text TJclearfix"><input class="TJleft" style="width:180px;" name="title" '+defaultinfo("info_tag_video_title")+' type="text" value="'+$.lang("info_tag_video_title")+'" /><a class="TJbtn_m TJleft" style="cursor:pointer;"></a></div>'+
						'  <div class="tjresult">'+
						' </div>';
				break;
				case 'pic':
					html = '<h5>'+$.lang("info_tag_pic_head")+'</h5>'+
					    '<div class="TJinput_text"><input name="url" type="text" '+defaultinfo("info_tag_pic_url")+' value="'+(content.url?content.url:$.lang("info_tag_pic_url"))+'" /></div>'+
					    descfild+
					    savebutton;
				break;
				case 'personage':
					html = '<h5>'+$.lang("info_tag_personage_head")+'</h5>'+
					    '<div class="TJinput_text"><input name="url" type="text" '+defaultinfo("info_tag_personage_url")+' value="'+(content.url?content.url:$.lang("info_tag_personage_url"))+'"/></div>'+
					    descfild+
					    savebutton;
				break;
				case 'shopping':
					html = '<div class="T_n_flaot-buycar01" style="padding-bottom:0px;">'+
							'<div class="clearfix buycarpd-top">'+
							'<span class="fs_14 footcolor01 font-wg pull-left">添加广告链接</span>'+
							'</div>'+
							'<div class="ader-select clearfix">'+
                    		'<select class="pull-left" name="counttype" style="width:136px; font-size:12px; margin-left:15px; margin-right:5px;">'+
                            '<option selected="selected" value="0">全部</option>'+
                            '<option value="1">计费类型：CPC点击</option>'+
                            '<option value="2">计费类型：CPM浏览</option>'+
                            '<option value="3">计费类型：CPS成交</option>'+
							'</select>'+
							'<select class="pull-left"  name="linkcount" style="width:136px; font-size:12px; margin-right:12px;">'+
                            '<option selected="selected" value="0">最高单价</option>'+
                            '<option value="1">最新投放</option>'+
                            '<option value="2">最高预算</option>'+
                            '<option value="3">最高分成</option>'+
							'</select>'+
							'<div class="input-search pull-left"><input type="text" style="width:108px;"><span class="search-icon"></span></div>'+
							'</div>'+
							'<div class="bs-docs-separator01"></div>'+
                  
							'<div class="zui_news_1" id="jsLoadLinkInfo">loading...'+

                       /*
                        <div class="zui_news">
                                <div class="clearfix zui_news_01 buycarpd">
                                    <div class="pull-left">
                                        <ul class="menu-ul">
                                            <li class="li_icon" style="*margin-left:0px;">
                                                <i class="icon-shopping-cart icon-block"></i>
                                                <a href="http://www.meilishuo.com/share/item/2866874657?trc=wlc_rec_1" data-id="1382" class="js_link" target="_blank">斑马印花短袖T恤情侣装</a>
                                            </li>
                                        </ul>
                                        <div class="fs_12 mgleft12">
                                            有效点击&nbsp;
                                            <span class="footcolor01">0</span>次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span class="fontcolor17">0.500</span> 元/点击&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;剩余分成 
                                                <span class="fontcolor17">1</span>%
                                        </div>
                                    </div>
                                    <div class="pull-right mgtop08">
                                        <a onclick="" href="javascript:;" class="btn btn-success">添加</a>
                                    </div>
                                </div>
                                <div class="bs-docs-separator01"></div>
                        </div>*/
                         
                         /*       
                        <div class="clearfix button-page buycarpd">
                             <div class="pagination" style="margin:10px 0;" id="js_page"><ul><li><span class="current">1</span></li><li><a style="cursor:pointer;" class="pageNum">2</a></li><li><a style="cursor:pointer;" class="pageNum">3</a></li><li><a>...</a></li><li><a style="cursor:pointer;" class="pageNum">69</a></li><li><a style="cursor:pointer;" class="pageNum next">下一页</a></li></ul></div>
                        </div>*/
						'</div>'+
						'</div>';
				break;
				case 'money':
					html = "";
				break;
			}
			html = '<a style="cursor:pointer;" class="TJclose"></a>'+html;
			html = '<div id="'+option.id+'" style="position: absolute;" class="TJcont_info TJcont_info2_left">'+html+'</div>';
			return html;
		
	}
	//默认提示信息显示
	function defaultinfo(info){
		return ' onfocus="if (this.value==\''+$.lang(info)+'\'){this.value=\'\';}" onblur="if (this.value==\'\'){this.value=\''+$.lang(info)+'\';}"';
	}
	//标记模板
	var templates = {
		'tag':'<div id="{id}" class="ichaotu_tag" style="position: absolute; z-index: {zindex};left:{left}px;top:{top}px" data-type="{type}" data-status="{status}">'+
			  '<div class="TJicon_b"><a class="TJico_{type}_i" style="cursor:pointer;" title="'+$.lang('info_tag_text')+'"></a></div></div>',
		'toolbar':'',
		'money':'<div id="{id}" style="position: absolute; z-index: {zindex};left:{left}px;top:{top}px" class="money-content">'+
            '<div class="money-con">'+
            '<div class="money-con-title">'+
                '<a  style="vertical-align: initial" class="money-withdraw" href="{withdraw}" target="_blank">提现</a>&nbsp;&nbsp;&nbsp;<span>ID&nbsp;&nbsp;{uid}&nbsp;&nbsp;推广收入：￥{money}</span>'+
                '<div style="margin-top:3px;" class="bs-docs-separator01"></div>'+
                '<div class="money-tis">自动替换已关闭的广告，选择允许的广告类型：</div>'+
                '<div id="js_select_put_type" class="clearfix left type-style js_checkbox_div mt_5">'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="1" data-name="社区论坛" checked="checked">社区论坛</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="2" data-name="交友" checked="checked">交友</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="3" data-name="摄影" checked="checked">摄影</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="4" data-name="美食" checked="checked">美食</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style="width:64px; font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="5" data-name="旅游度假" checked="checked">旅游度假</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">影视音乐</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">游戏动漫</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style="font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">购物分享</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">时尚</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style="font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">家居生活</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style="font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">新闻资讯</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style=" font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="6" data-name="影视音乐" checked="checked">财经</label>'+
                                    '</div>'+
                                    '<div class="left tf_check js_checkbox">'+
                                        '<label style="font-size:12px;" class="checkbox T_web_type">'+
                                            '<input type="checkbox" class="js_value" value="7" data-name="游戏动漫" checked="checked">其他</label>'+
                                    '</div>'+
                            '</div>'+
						'</div>'+
					'</div>'+
			'<div class="jt-icon"><img src="http://statics.ichaotu.com/widget/2.0/images/jt-icon.png"></div>'+        
			'</div>'
	};
	//标记，toolbar等模板
	$['tpl'] = function(name,option){
		var html = templates[name]?templates[name]:'';
		return html.replace(/\{(\w+)\}/g, function(arg1, arg2){
			return option[arg2]?option[arg2]:"";
        });
	}
});
ichaotu['plug']("config", function($){
	var config = {

	};
	$['config'] = {};
	$['config']['get'] = function(key){
		if(key)return config[key]?config[key]:'';
		else return config;
	}
	$['config']['set'] = function(key, value){
		if(typeof(key) == 'object'){
			config = $.extend(config, key);
		}else if(value){
			config[key] = value;
		}else{
			config[key] = null;
		}
	}
});
//标记
ichaotu['plug']("tag", function ($) {
	var p = $['fn'];
	p['toolbar'] = function(){
		//this['each'](function(){
			var pid = $(this).attr("ichaotuPid"),
			toolbarid = "ichaotu_toolbar_"+pid,
			toolbar = $("#"+toolbarid);
			var parentoffset = $(this).parent().offset(),
			imgoffset = $(this).position();
			toobaroffset = {
				left:imgoffset.left+$(this).width()-60,
				top:imgoffset.top+60
			};
			if(toolbar.length>0 || !pid){
				toolbar.css({"left":toobaroffset.left+'px',"top":toobaroffset.top+'px'});
				return toolbar;
			}else{
	
	
				var html = '<div class="TJcont_icon ichaotu_toolbar" id="'+toolbarid+'" style="display:none;left:'+toobaroffset.left+'px;top:'+toobaroffset.top+'px">'+
					'<div class="TJbox_po"></div>'+
					'<ul class="TJbox_menu TJleft">'+
					'<li><a title="'+$.lang('info_tag_money')+'" class="TJico_money" style="cursor:pointer;" ><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_shopping')+'" class="TJico_shopping" style="cursor:pointer;" ><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_text')+'" class="TJico_text" style="cursor:pointer;"><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_link')+'" class="TJico_link" style="cursor:pointer;"><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_music')+'" class="TJico_music" style="cursor:pointer;"><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_personage')+'" class="TJico_personage" style="cursor:pointer;"> <span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_video')+'" class="TJico_video"  style="cursor:pointer;"><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_pic')+'" class="TJico_pic" style="cursor:pointer;"><span></span></a></li>'+
					'<li><a title="'+$.lang('info_tag_map')+'" class="TJico_map" style="cursor:pointer;"><span></span></a></li>'+
					'</ul>'+
					'</div>';
				$(this).parent().append(html);
				toolbar = $("#"+toolbarid);
				var _this = this;
				toolbar.find("a").click(function(){
					var type = $(this).attr("class").replace("TJico_", '');
					if(type=='money'){
						var moneyid = toolbarid.replace("ichaotu_toolbar", "ichaotu_money");
						if($("#"+moneyid).length>0){
							_this.hidemoney();
						}else{
							_this.showmoney(this);
						}
						return;
					}
					var tag = $(_this).addTag({
						left:toolbar.position().left+$(this).position().left,
						top:toolbar.position().top+$(this).position().top,
						status:'add',
						type:type,
						notEvent:true
				
					});
					toolbar.hide();
					tag.drag({onstop:function(){
						toolbar.show();
						tag.showTagContent();
						tag.tagEvent();
					},
					lock:true,
					maxx:$(_this).position().left+$(_this).width()-30,
					minx:$(_this).position().left,
					maxy:$(_this).position().top+$(_this).height()-30,
					miny:$(_this).position().top
					});
				});
				return toolbar;
			}
		//});
	}
	p['showmoney'] = function(eventobj){
	
		var money = $.config.get("money");
		var uid = $.config.get("uid");
		var toolbar = $(eventobj).closest(".ichaotu_toolbar");
		var pid = toolbar.attr("id").replace("ichaotu_toolbar_","");
		var api = $.config.get("api");
		var scriptQuery = $.config.get("scriptQuery");
		if(!money){
			var params = {
				usign:scriptQuery.cuid
			};
			$.getJSON(api.money,params,function(res){
				//console.log(res);
				if(res.success){
					$(".money-con-title>span").text("ID    "+res.data.uid+"推广收入：￥"+res.data.money);
					$.config.set("uid", res.data.uid);
					$.config.set("money", res.data.money);
				}
							
			});
			money = 0;
			uid = 0;
		}

		//查看收益
		var opt = {
				id:toolbar.attr("id").replace("ichaotu_toolbar", "ichaotu_money"),
				left:toolbar.position().left+$(eventobj).position().left-290,
				top:toolbar.position().top+$(eventobj).position().top,
				money:money,
				uid:uid,
				withdraw:api.withdraw
			};
		var zindex = 0 ;
		$("div[id^='ichaotu_tag_"+pid+"']").each(function(){
			if($(this).css("z-index")>zindex){
				zindex = $(this).css("z-index");
			}
		});
		zindex++;
		opt.zindex = zindex;

		var tpl = $.tpl('money', opt);
		$(toolbar).parent().append(tpl);
	
	}
	p['hidemoney'] = function(){
		var pid = $(this).attr("ichaotuPid");
		$("#ichaotu_money_"+pid).remove();
	}
	//添加标记
	p['addTag'] = function(option){
		if(!option.tagid){
			var tagid =  0-$(this).nextAll().length-1;
		}else{
			var tagid = option.tagid;
		}
		if(option.x){
			option.left = $(this).position().left+$(this).width()*option.x/100;
		}
		if(option.y){
			option.top = $(this).position().top+$(this).height()*option.y/100;
		}

		var pid = $(this).attr('ichaotuPid'),
			opt = {
				id:'ichaotu_tag_'+pid+'_'+tagid,
				zindex:500,
				status:option.status
			};
		if($('#'+opt.id).length>0){
			$('#'+opt.id).css({"left":option.left+'px',"top":option.top+'px'});
			return;
		};
		if(option){
			opt = $.extend(opt,option);
		}
		var tpl = $.tpl('tag', opt);
		$(this).parent().append(tpl); 
	    var tag =  $("#"+opt.id);
		if(!option.notEvent){
			tag.tagEvent();
		}
		return tag;
	}
	p['tagEvent'] = function(){
		var tag = $(this);
			//显示隐藏内容框绑定
			tag.bind("mouseover", function(){
			var _this = $(this);
			_this.data("over",true);
			_this.showTagContent();
			}).bind("mouseleave", function(){
			var _this = $(this);
			_this.data("over",false);
				setTimeout(function(){	
					if(!_this.data("over") && _this.data("status") == 'view' && _this.data("type")!='music' && _this.data("type")!='video'){
						_this.hideTagContent();
					}
				},1000);
		});
		//拖动事件绑定
		tag.find(".TJicon_b>a").bind("mousedown", function(){
			var temp = tag.attr("id").replace("ichaotu_tag_", "").split("_");
			var cpid = temp[0];
			var imgel = $('img[ichaotuPid="'+cpid+'"]');
			if(imgel.attr("editable")){
				tag.drag({
					onstop:function(){
						if(tag.data("status") != 'add'){
							tag.saveTag();
						}
					},
					lock:true,
					maxx:imgel.position().left+imgel.width()-30,
					minx:imgel.position().left,
					maxy:imgel.position().top+imgel.height()-30,
					miny:imgel.position().top
				});
			}
		});
	
	}
	//删除标记
	p['delTag'] = function(tagid){
		var api = $.config.get("api");
			var _this = $(this);
			var ids = _this.attr("id").replace("ichaotu_tag_", '').split("_");
			pid   = ids[0];
			var imgel = $('img[ichaotuPid="'+pid+'"]');
			//修改标记接口
			var params = {
				tagid:tagid
			};
			$.getJSON(api.del,params,function(res){
				if(res.success){
					var wmid = imgel.data('wmid');
					var wminfo = $.config.get(wmid);
					if(wminfo['tags']){
						wminfo['tags'][tagid] = null;
					}
					$.config.set(wmid, wminfo);
					_this.remove();
				}else{
					alert(res.message);
				}
			});
	}
	//保存标记
	p['saveTag'] = function(params){
		var tag = $(this);
		ids = tag.attr("id").replace("ichaotu_tag_", '').split("_"),
		tagid = ids[1],
		pid   = ids[0];
		var imgel = $('img[ichaotuPid="'+pid+'"]');

		//计算坐标
		var x =  (tag.offset().left - imgel.offset().left)/imgel.width()*100;
		var y =  (tag.offset().top - imgel.offset().top)/imgel.height()*100;
		

		var option = {
			'x':x,
			'y':y
		};
	
		var scriptQuery = $.config.get("scriptQuery");
		var usign = scriptQuery.cuid;
		option.usign = usign;

		if(params){
			params = $.extend(option, params);
		}else{
			params = option;
		}
		if(tag.data('status') == 'add'){
			var api = $.config.get("api");
			params.type = tag.data('type');
			params.wmid = imgel.data('wmid');
			if(!params.wmid){
				//alert("miss wmid");
				//return ;
				params.url = imgel[0].src;
				params.aid = imgel.attr("aid");
			}
			//添加标记接口
		
			$.getJSON(api.add, params, function(res){
				if(res.success){
					tag.remove();
					var option = params;
					option.status = 'view';
					tag = imgel.addTag(res.data);
					wmid = res.data.wmid;
					tagid =  res.data.tagid;
					imgel.data("wmid", wmid);
					var wminfo = $.config.get(wmid)||{};
					if(!wminfo['tags'])wminfo['tags']={};
					if(params.type=='shopping'){
						wminfo['tags'][tagid] = res.data;
					}else{
						wminfo['tags'][tagid] = params;
					}
					$.config.set(wmid, wminfo);
					//tag.hideTagContent();
				}else{
					alert(res.message);
				}
			});
		}else{
			var api = $.config.get("api");
			params.tagid = tagid;
			//修改标记接口
			$.getJSON(api.update,params,function(res){
				if(res.success){
					tag.data("status", "view");
					tag.hideTagContent();
					//本地存储
					var wmid = imgel.data('wmid');
					var wminfo = $.config.get(wmid);
					wminfo['tags'][tagid] = $.extend(wminfo['tags'][tagid], params);
					$.config.set(wmid, wminfo);

				}else{
					alert(res.message);
				}
			});
		}
	
	}
	//显示标记内容
	p['showTagContent'] = function(){
		var tag=$(this),
			type=tag.data('type'),
			status=tag.data('status'),
			ids = tag.attr("id").replace("ichaotu_tag_", '').split("_"),
			tagid = ids[1],
			pid   = ids[0];
			var tagcontent = tag.find(".TJcont_info,.mg-body-upside-left-down");
			if(tagcontent.length>0){
				tagcontent.show();
				return;
			}
			var imgEl =  $('img[ichaotuPid="'+pid+'"]');
			var wmid  = imgEl.data("wmid");
			var wminfo = $.config.get(wmid);
			if(wmid && tagid && wminfo && wminfo['tags'] && wminfo['tags'][tagid]){
				var opt = wminfo['tags'][tagid];
			}else{
				var opt = {}
			}
			opt.status = status;
			
		if(status=='add' || status=='edit'){
			//编辑模式
			tag.addClass("TJicon_bg");
				//if(status == 'add'){
			opt.type = type;
					//var tagcontenthtml = $.getTagEditTpl(opt);
				//}
			var tagcontenthtml = $.getTagEditTpl(opt);
			tag.append(tagcontenthtml);
			if(type=='shopping'){
				tag.find(".TJcont_info").css("width",'430px');
					function searchShopping(page){
						if(!page) page = 1;
						var api = $.config.get("api");
						var params = {
							keyword:tag.find("input").val(),
							counttype:tag.find("select[name='counttype']").val(),
							linkcount:tag.find("select[name='linkcount']").val(),
							page:page
						}
						$.getJSON(api.search.shopping, params, function(res){
					
							var html = '';
							var rows = res.data.rows;
							for(var i in rows){
								html += '<div class="TJcon_zui_news">'+
                                '<div class="clearfix TJcon_zui_news_01 TJcon_buycarpd">'+
                                    '<div class="pull-left">'+
                                        '<ul class="TJcon_menu-ul">'+
                                            '<li class="TJcon_li_icon" style="margin-left:0px;">'+
                                                '<i class="icon-shopping-cart icon-block"></i>'+
                                                '<a href="'+rows[i].link_url+'" class="js_link" target="_blank">'+rows[i].link_name+'</a>'+
                                            '</li>'+
                                        '</ul>'+
                                        '<div class="fs_12 mgleft12"> 有效点击&nbsp;'+
                                           ' <span class="footcolor01">'+rows[i].click_num+'</span>次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
                                            '<span class="fontcolor17">'+rows[i].link_click_price+'</span> 元/'+getCountType(rows[i].count_type)+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;剩余分成 '+
                                               (rows[i].link_budget?' <span class="fontcolor17">'+((rows[i].link_budget-rows[i].link_cost)/rows[i].link_budget*100).toFixed(2)+'</span>%':'无限')+
                                       ' </div>'+
                                   ' </div>'+
                                   ' <div class="pull-right mgtop08">'+
                                     '   <a style="cursor:pointer;"  data-linkid="'+rows[i].link_id+'" class="tj-button-style">添加</a>'+
                                   ' </div>'+
                               ' </div>'+
                               ' <hr class="bs-docs-separator01">'+
								' </div>';
							
							}
							html += pagerView(res.data.total, page);
							function pagerView(dataCount, currentPage){

								if(currentPage>1)var prepage = currentPage-1;
								else var prepage = 1;
								var __musicListPager = '<div class="clearfix button-page buycarpd">'+
									'<div class="pagination" style="margin:10px 0;"><ul><li><a style="cursor:pointer;" class="pageNum prev">上一页</a></li>';
								var __totalPage = dataCount/5;
								__totalPage = __totalPage > parseInt(__totalPage) ? parseInt(__totalPage) + 1 : parseInt(__totalPage);
								var __forLength = currentPage > 10 ? (currentPage > 1000 ? 2 : 3) : 4;
								var __forStep = 2;
								var __forStart = (__totalPage > 4 && currentPage > __forStep) ? (currentPage < __totalPage - __forLength ? currentPage - __forStep : __totalPage - __forLength) : 1;
								var __forEnd = __forStart + __forLength < __totalPage + 1 ? __forStart + __forLength + 1 : __totalPage + 1;
								for ( var i = __forStart; i < __forEnd; i++ ) {
									if ( currentPage == i ) {
										__musicListPager += '<li><span class="current">'+i+'</span></li>';
									} else {
										__musicListPager += '<li><a style="cursor:pointer;" class="pageNum">'+i+'</a></li>';
									}
								}
								if(__totalPage>currentPage)var nextpage = currentPage+1;
								else var nextpage = __totalPage;
								__musicListPager += '<li><a style="cursor:pointer;" class="pageNum next">下一页</a></li></ul></div></div>';
								return __musicListPager;
							}

							tag.find(".zui_news_1").html(html);

							tag.find(".pageNum").click(function(){
								
								if($(this).hasClass("next")){ 
									page++;
								}else if($(this).hasClass("prev")){ 
									page--;
									if(page<0)page=0;
								}else{
									page = parseInt($(this).text());
								}
								searchShopping(page);
							});
							tag.find(".tj-button-style").click(function(){
								var linkid = $(this).data("linkid");
								var save = {
									link_id:linkid
								};
								tag.saveTag(save);
							});
						});
					}
				function getCountType(counttype){
					if(counttype==1)return '点击';
					else if(counttype==2)return '浏览';
					else if(counttype==3)return '成交';
				}
				searchShopping();
				tag.find("select,input").bind("change",function(){
					searchShopping();
				});
			}
			if(type=='video'||type=='music'||type=='map'){
				tag.find(".TJcont_info").addClass("TJcont_info2");
				tag.find("a.TJbtn_m").click(function(){
					search(type);
					//console.log(type);

					function pagerView(dataCount, currentPage){

						if(currentPage>1)var prepage = currentPage-1;
						else var prepage = 1;
						var __musicListPager = '<div class="TJpag_m">'+
        					'<a style="cursor:pointer;" class="TJpag_l_m"></a>';
						var __totalPage = dataCount/5;
						__totalPage = __totalPage > parseInt(__totalPage) ? parseInt(__totalPage) + 1 : parseInt(__totalPage);
						var __forLength = currentPage > 10 ? (currentPage > 1000 ? 2 : 3) : 4;
						var __forStep = 2;
						var __forStart = (__totalPage > 4 && currentPage > __forStep) ? (currentPage < __totalPage - __forLength ? currentPage - __forStep : __totalPage - __forLength) : 1;
						var __forEnd = __forStart + __forLength < __totalPage + 1 ? __forStart + __forLength + 1 : __totalPage + 1;
						for ( var i = __forStart; i < __forEnd; i++ ) {
							if ( currentPage == i ) {
								__musicListPager += '<b>'+i+'</b>';
							} else {
								__musicListPager += '<a class="ichaotu_page" style="cursor:pointer;">'+i+'</a>';
							}
						}
						if(__totalPage>currentPage)var nextpage = currentPage+1;
						else var nextpage = __totalPage;
						__musicListPager += '<a style="cursor:pointer;" class="TJpag_r_m"></a></div>';
						return __musicListPager;
					}
					function search(type, page){
						switch(type){
							case 'music':
								if(!page) page = 1;
								var api = $.config.get("api");
								var params = {
									'key' : tag.find("input").val(),
									'page':page
								};
								$.getJSON(api.search.xiami,params,function(res){
									var html = '';
									var videos = res.data.rows;
									var total = res.data.total;			
									for(var i in videos){
										html += '<div class="TJclearfix TJm_cont">'+
												'<li class="TJm_name TJleft">'+videos[i].title+'</li>'+
												//'<li class="TJm_icon_v TJleft"><a href="#" title="试听"></a></li>'+
												'<li class="TJm_add TJleft"><a data-id="'+videos[i].id+'" data-url="'+videos[i].url+'" style="cursor:pointer;" title="添加"></a></li>'+
												'</div>';
									}
									if (total == 0 ) {
											html = '<div>没有找到关于 <font color="red">'+ params.key +'</font> 的音乐。</div>' ;
									}else{
										html += pagerView(total, page);
									}
									tag.find(".tjresult").html(html);
									tag.find(".TJm_add>a").click(function(){
									
									})
									tag.find(".ichaotu_page").click(function(){
										var page = $(this).text();
										search("video", page);
									});
									tag.find(".TJpag_l_m").click(function(){
										var page = parseInt(tag.find(".TJpag_m b").text())-1;
										search(type, page);
									});
									tag.find(".TJpag_r_m").click(function(){
										var page = parseInt(tag.find(".TJpag_m b").text())+1;
										search(type, page);
									});
									tag.find(".TJm_add a").click(function(){
										var tagContent = {
											content:{
												'title':$(this).parent().prevAll(".TJm_name").text(),
												'id':$(this).data("id"),
												'url':$(this).data("url")
											}
										};
										tag.saveTag(tagContent);
									});
								});
								break;			
							case 'video':
								if(!page) page = 1;
								var params = {
									'keyword' : tag.find("input").val(),
									'callback':'callback',
									'count':5,
									'page':page
								};
								var api = $.config.get("api");
								tag.find(".tjresult").html("<div>loading....</div>");
								$.getJSON(api.search.youku,params,function(res){
									var html = '';
									var videos = res.videos;
									var total = res.total;			
									for(var i in videos){
										html += '<div class="TJclearfix TJm_cont">'+
												'<li class="TJm_name TJleft">'+videos[i].title+'</li>'+
												//'<li class="TJm_icon_v TJleft"><a href="#" title="试听"></a></li>'+
												'<li class="TJm_add TJleft"><a data-id="'+videos[i].id+'" data-url="'+videos[i].link+'" style="cursor:pointer;" title="添加"></a></li>'+
												'</div>';
									}
									if (total == 0 ) {
											html = '<div>没有找到关于 <font color="red">'+ params.keyword +'</font> 的视频。</div>' ;
									}else{
										html += pagerView(total, page);
									}
									tag.find(".tjresult").html(html);
									tag.find(".TJm_add>a").click(function(){
										var tagContent = {
											content:{
												'title':$(this).parent().prevAll(".TJm_name").text(),
												'id':$(this).data("id"),
												'url':$(this).data("url")
											}
										};
										tag.saveTag(tagContent);
									})
									tag.find(".ichaotu_page").click(function(){
										var page = $(this).text();
										search("video", page);
									});
									tag.find(".TJpag_l_m").click(function(){
										var page = parseInt(tag.find(".TJpag_m b").text())-1;
										search(type, page);
									});
									tag.find(".TJpag_r_m").click(function(){
										var page = parseInt(tag.find(".TJpag_m b").text())+1;
										search(type, page);
									});
								});
								break;
							case 'map':
								var params = {
									'callback':'callback'
								};
								$.getJSON('http://api.map.baidu.com/api?key=&v=1.5&ak=51611dc5ca5819bb985f6cc0c93c6cc3',params,function(){
									
									var html = '<div style="width:222px;height:222px;border:#ccc solid 1px;" id="dituContent"></div>'+
										'<div class="TJt_r TJmt_10"> <a style="cursor:pointer;" class="TJconserve">保存</a></div>';
									tag.find("#result").html(html);
									tag.find(".TJconserve").click(function(){
										var data = {
											content:{
												url:getImage(),
												title:address
											}
										};
										tag.saveTag(data);
									});
									var marker = null;
									var address = tag.find("input").val();
									//创建和初始化地图函数：
									function initMap(){
										createMap();//创建地图
										setMapEvent();//设置地图事件
										addMapControl();//向地图添加控件
										bindMarker();
									} 
									function localSearch(){
										if (!map) return;
										//var urlParams = parseParamsFromUrl();
										////var queryParamName = "q";
										//////if (urlParams[queryParamName]) {
											////address = urlParams[queryParamName];
											//customSearchControl.execute(urlParams[queryParamName]);
										//}else{
										////	return;
										//}
										var local = new BMap.LocalSearch(map, {
										 onSearchComplete: function(results){  
											   if (local.getStatus() == BMAP_STATUS_SUCCESS){
												 // 判断状态是否正确  
												 var point = results.getPoi(0).point;
												 map.centerAndZoom(point, 14);
												 marker = new BMap.Marker(point);
												 marker.enableDragging();
												 map.addOverlay(marker);
											   }  
											 }  
										});
									
										local.search(address);
										var localresult = local.getResults();
									}
									//地图标注绑定事件
									function bindMarker(){
										map.addEventListener('click', function(e){
											//更新&&添加marker
											marker && marker.remove();
											var lat = e.point.lat,
											lng = e.point.lng;
											marker = new BMap.Marker(new BMap.Point(lng, lat));
											marker.enableDragging();
											map.addOverlay(marker);
										})
									}
									//创建地图函数：
									function createMap(){
										var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
										window.map = map;//将map变量存储在全局
										map.centerAndZoom(point,13);//设定地图的中心点和坐标并将地图显示在地图容器中
									
										try{
											//动态获取当前城市
											getCurrentCity(function(result){
												var lat = result.center.lat,
													lng = result.center.lng,
													name = result.name,
													level = result.level;
												var point = new BMap.Point(lng, lat);
												map.centerAndZoom(point, level);
													//添加版权
													//_this.addCopyright();
												});
										}catch(e){
											//如果没有定位到城市的话...
											var point = new BMap.Point(116.403837,39.838744);//定义一个中心点坐标
											map.centerAndZoom(point, 12);
											
										}
									
										localSearch();
									}
									//获取当前城市
									function getCurrentCity(cb){
										var myCity = new BMap.LocalCity();
										myCity.get(function(result){
											cb(result);
										})
									}
									//地图事件设置函数：
									function setMapEvent(){
										map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
										map.enableScrollWheelZoom();//启用地图滚轮放大缩小
										map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
										map.enableKeyboard();//启用键盘上下左右键移动地图
									}
									
									//地图控件添加函数：
									function addMapControl(){
										//向地图中添加缩放控件
									var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});
									map.addControl(ctrl_nav);
									 }
									function parseParamsFromUrl() {
											var params = {};
											var parts = window.location.search.substr(1).split('\x26');
											for ( var i = 0; i < parts.length; i++) {
												var keyValuePair = parts[i].split('=');
												var key = decodeURIComponent(keyValuePair[0]);
												params[key] = keyValuePair[1] ? decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')): keyValuePair[1];
											}
											return params;
									}
									//获取静态图片
									function getImage(){
											if(marker){
												//获取marker的最终位置
												var markerPoint = marker.getPosition();
											}
											var hasMarker = markerPoint && markerPoint.lng;
											var centerObj = hasMarker ? markerPoint : map.getCenter();
											var center = centerObj.lng + ',' + centerObj.lat;
											var zoom = map.getZoom();
											var url = ['http://api.map.baidu.com/staticimage',
												'?center=' + encodeURIComponent(center),
												'&zoom=' + encodeURIComponent(zoom),
												'&width=180',
												'&height=150',
												hasMarker && '&markers=' + encodeURIComponent(center),
												hasMarker && '&markerStyles=' + encodeURIComponent('l,,red')].join('');
											return url;
									}
				
									initMap();//创建和初始化地图
								});
								break;
						}
					}	
				});
			}
		}else{
			//查看模式
			var tagcontenthtml = $.getTagInfoTpl(opt);
			tag.append(tagcontenthtml);
			if(type=='video'||type=='music'){
				tag.find(".TJcont_info").addClass("TJcont_p").css({width:'260px'});
			}
			if(type=='shopping'){
				tag.find(".TJcont_info").addClass("TJcont_p").addClass("TJcont_ad");
			}
			//附加编辑按钮
			if(imgEl.attr("editable")==1){  
				var html = '<div class="TJt_r"><a style="cursor:pointer;" title="'+$.lang('info_edit')+'" class="TJedit" ></a><a style="cursor:pointer;" title="'+$.lang('info_del')+'" class="TJdelete"></a></div>';
				tagcontent = tag.find(".TJcont_info,.mg-body-upside-left-down");
				tagcontent.append(html);
				tagcontent.find(".TJdelete").click(function(){
					$(this).closest(".ichaotu_tag").delTag(tagid);
				});
				tagcontent.find(".TJedit").click(function(){
					var _this = $(this).closest(".ichaotu_tag");
						_this.hideTagContent();
						_this.data("status", "edit");
						//console.log(_this.data("status"));
						_this.showTagContent();
				});
			}
			//else{
				if(type=='shopping'){
					var title=$("title").text();
					var content = wminfo['tags'][tagid].content;
					
				
					var src = imgEl[0].src;
				
					host = $.getHost(src);
				
					if(host && (host.indexOf("ichaotu.com")!==-1 || host.indexOf("tujoin.com")!==-1)){
						var spIndex = src.lastIndexOf('?sp');
						var spSplitIndex = src.lastIndexOf('_');
						if(-1 != spIndex && spSplitIndex > spIndex) { // 找到标识，提取推广信息
							//var spId = parseInt(src.substr(spIndex + 3, spSplitIndex), 10);
							var spreadId = parseInt(src.substr(spSplitIndex + 1), 10);
						}else{
							var spreadId = 0;
						}
					}else{
						var spreadId = content.spread_id;
					}
				
					
			
					var scriptQuery = $.config.get("scriptQuery");
					var query = 'to='+$.base64Encode(content.url)+"&"+
						'from='+$.base64Encode(wminfo.uid+'_'+content.ad_uid+'_'+content.link_id)+"&"+
						'wmid='+ wmid+"&"+
						'sid='+spreadId+"&"+
						'wm_uid='+wminfo.uid+"&"+
						'link_type='+content.link_type+"&"+
						'count_type='+content.count_type+"&"+
						'title='+encodeURIComponent(title)+"&"+
						'agent='+'ichaotu'+'&'+
						'i='+scriptQuery.i;

					//浏览处理
					var api = $.config.get("api");
					
					var now = new Date().getTime();
					var interval = Math.ceil((now-$.config.get("initTime"))/1000);
					var Cursor = $.getmouse();
					query = query+"&interval="+interval+"&cursorx="+Cursor.x+"&cursory="+Cursor.y;		
				
					$.getJSON(api.browse+"?"+query,function(res){
						//console.log(res);
					});
					//点击处理
					//var query = $.formData(params);
					var clickurl = api.click+'?'+query;
				
				
					tag.find(".shopurl").attr("href", clickurl);
				
				//}
			
			}
		}
		//确定保存
		tag.find(".TJconserve_m").click(function(event){ 
			var url = tag.find("input[name='url']").val()=='任意地址'?'':tag.find("input[name='url']").val();
			if(!$.isHeadered(url))url = 'http://'+url;
			var taginput ={
				content:{
					'title':tag.find("input[name='title']").val()=='标题'?'':tag.find("input[name='title']").val(),
					'desc':tag.find("textarea[name='desc']").val()=='描述'?'':tag.find("textarea[name='desc']").val(),
					'url':url
				}
			};
			$(this).closest(".ichaotu_tag").saveTag(taginput);
		});
		//
		//关闭取消
		tag.find(".TJclose,.TJcancel_m").click(function(){
			var tag = $(this).closest(".ichaotu_tag");
			if(tag.data("status") == 'add'){
				tag.remove();
			}else{
				tag.hideTagContent();
				tag.data("status", "view");
			}
			return false;
		});
		//设置zindex为最高级
		var zindex = 0 ;
		$("div[id^='ichaotu_tag_"+pid+"']").each(function(){
			if($(this).css("z-index")>zindex){
				zindex = $(this).css("z-index");
			}
		});
		zindex++;
		tag.css("z-index", zindex);
	}
	//隐藏标记内容
	p['hideTagContent'] = function(){
		var tag=$(this),
			type=tag.data('type'),
			status=tag.data('status');
		//if(status=='add' || status=='edit'){
			tag.removeClass("TJicon_bg");
		//}
		tag.find(".TJcont_info,.mg-body-upside-left-down").remove();
	}
	p['editable'] = function(){
		$(this).attr("editable", 1);
		if($(this)[0].complete) {
	
			$(this).toolbar().show();
		} else {
			$(this).bind('load', function() {
				$(this).toolbar().show();
			});
		}
	}
	//p['editbutton'] = function(){
	//$(this).attr("editable", 1);
	//}
	p['tag'] = function(tagid){
		//创建tag
		var pid = $(this).attr("ichaotuPid");
		var tagboxid = "ichaotu_tag_"+pid+"_"+tagid;
		return $("#"+tagboxid);
	};

	p['tagsInit'] = function(edit){
		
		this['each'](function(){
			if(this.complete) {
				showTag(this);
				if($(this).attr("editable") == 1){
					$(this).toolbar().show();
				}
			} else {
				$(this).bind('load', function() {
					showTag(this);
					if($(this).attr("editable") == 1){
						$(this).toolbar().show();
					}
				});
			}
		});
		function showTag(obj){
				var _this =  $(obj),
				wmid =_this.data("wmid"),
				pid  = _this.attr('ichaotuPid');
				if(wmid){
					var wminfo = $.config.get(wmid);
				
					for(var tagid in wminfo['tags']){
						var option = $.extend(wminfo['tags'][tagid],{status:'view'});
						var tag = _this.addTag(option);
					}
					if(wminfo['copyright'] && $.config.get("showcopyright")){
						showCopyright(_this, wminfo);
					}
				}
		}
		function showCopyright(obj, wminfo){
			var imgoffset = obj.position(),
			copyrightoffset = {
				left:imgoffset.left+obj.width()-30,
				top:imgoffset.top+30
			};
			
			var html = '<div class="TJcont" style="left:'+copyrightoffset.left+'px;top:'+copyrightoffset.top+'px">'+
			'<a style="cursor:pointer;" class="TJicon"></a>'+
			'</div>';
			var copyright = wminfo['copyright'];
			if(obj.parent().children(".TJcont").length==0){
				obj.parent().append(html);
				obj.parent().children(".TJcont").bind("mouseover", function(){
					$(this).data("hide", 0);
					if(copyright && $(this).children(".TJinfo").length==0){
						var html = showCopyrightBox(copyright);
						var _this = this;
						$(_this).append(html);
						obj.parent().children(".TJcont").children(".TJinfo").bind("mouseleave", function(){
							hideCopyrightBox($(this).closest(".TJcont"));
						});
						obj.parent().children(".TJcont").children(".TJinfo").bind("mouseover", function(){
							$(_this).data("hide", 0);
						});
					}else{
						$(this).children(".TJinfo").show();
					}
				});
				obj.parent().children(".TJcont").bind("mouseleave", function(){
					hideCopyrightBox($(this));
				});
			}else{
				//调整位置
				obj.parent().children(".TJcont").css({"left":copyrightoffset.left+'px',"top":copyrightoffset.top+'px'});
			}
			function hideCopyrightBox(o){
				o.data("hide", 1);
				setTimeout(function(){
					if(o.data("hide"))
					o.find(".TJinfo").hide();
				},500);
			}
			function showCopyrightBox(copyright){
				return '<div class="TJinfo" style="right:25px;top:25px">'+
				'<img width="19" height="20" src="http://tstatics.tujoin.com/widget/2.0/images/TJc_g_lv.png" class="TJicon_a">'+
				'<div>所有信息</div>'+
				'<div class="TJclearfix TJp10 TJbor_b">'+
					'<div class="TJleft"><img width="34" height="34" src="'+copyright.avatar+'"></div>'+
					'<div class="TJleft TJuser">'+
						(copyright.uname?'<p>所有者：<span>'+copyright.uname+'</span></p>':'')+
						(copyright.sitename?'<p title="'+copyright.sitename+'">发布网站：'+copyright.sitename+'</p>':'')+
						(copyright.link?'<p>发布网址：<a href="'+copyright.link+'" target="_blank">'+$.subBtyesString(copyright.link, 15)+'</a></p>':'')+
					'</div>'+
				'</div>'+
				/*
				'<div class="xc_bt">'+
					'<p>标题：<span>致青春</span></p>'+
					'<p style=" overflow:hidden;"><span style=" float:left;"><a href="#">发布网站</a></span><span class="hbj_exif">EXIF<a href="#"><img class="xc_exif_bt" src="images/xc_sc_exif.png"></a><!--<a href="#"><img src="images/xc_sc_exif1.png" class="xc_exif_bt"/></a>--></span></p>'+
				'</div>'+
				'<div class="TJp10 TJbor_b TJoverflow">'+
					'<div class="xc_exif">EXIF信息</div>'+
					'<p class="TJclearfix"><span class="TJtext_l">相机：</span><span class="TJtext_r">Apple ipad touch</span></p>'+
					'<p class="TJclearfix"><span class="TJtext_l">焦距：</span><span class="TJtext_r">77mm</span></p>'+
					'<p class="TJclearfix"><span class="TJtext_l">光圈：</span><span class="TJtext_r">2.4000000000000004</span></p>'+
					'<p class="TJclearfix"><span class="TJtext_l">快门：</span><span class="TJtext_r">1/30</span></p>'+
					'<p class="TJclearfix"><span class="TJtext_l">光圈：</span><span class="TJtext_r">f/16.0</span></p>'+
					'<p class="TJclearfix"><span class="TJtext_l">ISO：</span><span class="TJtext_r">400</span></p>'+
					'<p class="TJclearfix"><span class="TJtext_l">拍摄日期：</span><span class="TJtext_r">2013-06-23<br>15:55:06</span></p>'+
				'</div>'+
				*/
				'<div class="TJp10 TJt_r">Powered&nbsp;by&nbsp;<span><a href="http://www.ichaotu.com" target="_blank">超级图片</a></span></div>'+
				'</div>';
			
			}
			/*
			
			*/
		}
	};

	$['pushadposition'] = function(){
		$(".iChouTu-adverpush-title").each(function(){
			var pid = $(this).parent().attr("pid");
			var imgel = $("img[ichaotuPid='"+pid+"']");
			var imgoffset = imgel.offset();
			if(imgoffset.left<100 || imgoffset.top<100){
				$(this).remove();
			}else{
				var offset = {
					left:imgoffset.left,
					top:imgoffset.top+imgel.height()-30
				};
				$(this).css({"left":offset.left+'px','top':offset.top+'px'});
			}
		});

		$(".ichaotu_yi").each(function(){
			var pid = $(this).attr("pid");
			var imgel = $("img[ichaotuPid='"+pid+"']");
			var imgoffset = imgel.offset();
			if(imgoffset.left<100 || imgoffset.top<100){
				$(this).remove();
			}else{
				var offset = {
					left:imgoffset.left-8,
					top:imgoffset.top+imgel.height()-60
				};
				$(this).css({"left":offset.left+'px','top':offset.top+'px'});
			}
		});

		
	}

	p['pushrad'] = function(){
		var pushad = $.config.get("pushad");
		if(!pushad || pushad.length ==0){
			return ;
		}
		//$cimgel.data("pushed",$num+1);
		$num =  Math.ceil(Math.random()*pushad.length);
		var data = pushad[$num];

		if($num>(pushad.length-1))$num=0;
		$(this).data("pushed",$num+1);
		$(this).pushad(data);

	}

	p['pushad'] = function(data){
		if(!data || !data.link_content)return ;
		var link_content = $.parseJSON(data.link_content);

		if(this[0].complete){
			showAd(data,link_content,this);
		}else{
			//var _this = this;
			$(this).bind('load', function() {
				showAd(data,link_content,this);
			});
		}
		function showAd(data,content,obj){
		
			var site_fiter = $.config.get("site_fiter");
			var $cimgel = $(obj);
				if(site_fiter){
					if(site_fiter.width){
						if($cimgel.width()<site_fiter.width)return;
					}
						
					if(site_fiter.height){
						if($cimgel.height()<site_fiter.height)return;
					}
					
					if(site_fiter.top){
						if($cimgel.offset.top<site_fiter.top)return;
					}
					if(site_fiter.left){
						if($cimgel.offset.left<site_fiter.left)return;
					}
					
					if(site_fiter.picFormat){
						var aa=$cimgel.attr("src").toLowerCase().split('.');
						var ext = aa[aa.length-1]
					
						if($.inArray(ext, site_fiter.picFormat.split(","))!==-1)return;
					}
					
					if(site_fiter.packs){
						var packs = site_fiter.packs.split(",");
						var flag = false;
						for(var i in packs){
							if($cimgel.closest("#"+packs[i]).length>0)flag = true;
						}
						if(flag) return;
					}
					//{"width":"300","height":200,"top":"120","left":"100","picFormat":"jpg,png,gif,bmp","packs":"111,222,333"}
				}

			if($(obj).width()<300 || $(obj).is(":hidden") ){
				return;
			}
			var ichaotu_push_id = 'ichaotu_push_'+$(obj).attr("ichaotuPid");
			var push_ad_dom = $("#"+ichaotu_push_id);
			//todo 
			//if(push_ad_dom.length>0)return;
		
			if(push_ad_dom.data("close") == "1"){
				return;
			}else{
				push_ad_dom.remove();
			}
			var  parentDom = $("#ichaotu_parent");
			if($("#ichaotu_parent").length==0){
				$("body").append('<div id="ichaotu_parent"></div>');
				parentDom = $("#ichaotu_parent");
			}
			//$(obj).parent().find(".ader-push-con,.ader-push-title").remove();
			var html = '';
			var parentoffset = $(obj).parent().offset(),
				imgoffset = $(obj).offset();
				if(imgoffset.left<100 || imgoffset.top <100 || imgoffset.left >1000) return ;

				var wmid  = $(obj).data("wmid");
				var wminfo = $.config.get(wmid);
			    var scriptQuery = $.config.get("scriptQuery");


				var query = 'to='+$.base64Encode(data.link_url)+"&"+
						'from='+$.base64Encode('0'+'_'+data.uid+'_'+data.link_id)+"&"+
						'wmid='+ wmid+"&"+
						'sid=0&'+
						'wm_uid='+wminfo.uid+"&"+
						'link_type='+data.link_type+"&"+
						'count_type='+data.count_type+"&"+
						'title='+encodeURIComponent($("title").text())+"&"+
						'agent='+'ichaotu'+'&'+
						'count_from=1&'+
						'i='+scriptQuery.i;
				

				//浏览处理
				var api = $.config.get("api");
				var clickurl = api.click+'?'+query;
				//$(obj).data("pushad_browse_url", api.browse+'?'+query);

				var left = imgoffset.left;
				var top = imgoffset.top+$(obj).height()-30;
				if(left<100||top<100)return ;
				/*var html = '<div class="ader-push-title" browse="'+api.browse+'?'+query+'" pid="'+$(obj).attr("ichaotuPid")+'" style="display:; position: absolute; left: '+left+'px; top:'+top+'px; z-index: 80;width:'+$(obj).width()+'px;">'+
							'<div class="ader-push-empty"></div>'+
							'<div class="ader-push-text"><a href="'+clickurl+'" target="_blank">'+$.subBtyesString(data.link_name,50)+'</a>'+
				//<a class="close-icon" style="cursor:pointer;">×</a>'+
							'</div>'+
							'</div>';
				*/
			
				if($(obj).width()>460 && typeof siteAdspaceId !="undefined"){
					top = top - 30;
					left = left-8;
					html = '<div id="'+ichaotu_push_id+'" class="ichaotu_yi" pid="'+$(obj).attr("ichaotuPid")+'" browse="'+api.browse+'?'+query+'" style=" position: absolute;  left: '+left+'px; top:'+top+'px; z-index: 80;width:'+$(obj).width()+'px;">'+
					'<a class="TJclose"></a>'+
					'<iframe width="100%" style="height: 60px;" scrolling="no" frameborder="0" src="http://api.ichaotu.com/UnionSpace/yi/?space_id='+siteAdspaceId+'"></iframe>'+
					'</div>';
					parentDom.append(html);
					$("#"+ichaotu_push_id+" .TJclose").bind("click",function(){
						
						$("#"+ichaotu_push_id).empty();
						$("#"+ichaotu_push_id).data("close", 1);
					
					});
					//

					return ;
				}else if($(obj).width()>360){
					var subStr = Math.ceil($(obj).width()/8);
				}else{
					var subStr = 40;
				}
				var html = '<div style=" position: absolute; z-index: 10; left: '+left+'px; top:'+top+'px; z-index: 80;width:'+$(obj).width()+'px;" class="iChouTu-adverpush-title"  browse="'+api.browse+'?'+query+'">'+
					'<div class="iChouTu-adverpush-title-empty"></div>'+
					'<div class="iChouTu-adverpush-title-con">'+
					'<div class="iChouTu-title-abox-box"><a link="'+clickurl+'" href="javascript:void(0)" class="iChouTu-title-abox" target="_blank">'+(data.link_name?$.subBtyesString(data.link_name,subStr,true):'')+'</a></div>'+
						'<div class="iChouTu-adver-sale">'+
							'<div class="iChouTu-adver-sale-img"><img src="http://tstatics.tujoin.com/widget/2.0/images01/'+(content.sale?'zhe-z.png':'rm-z.png')+'"></div>'+
							'<div style="clear:both"></div>'+
						'</div>'+
					'</div>'+
				'</div>';
				top = top-58;
				/*
				var detail = '<div class="ader-push-con" style="display: none; position: absolute; left: '+left+'px; top:'+top+'px; z-index: 80;width:'+$(obj).width()+'px;">'+
							'<div class="ader-push-con-empty"></div>'+
							'<div class="ader-push-conte clearfix">'+
								  '<div class="ader-push-left"><a href="'+clickurl+'" target="_blank">'+
								  //'<img src="'+content.img.replace("w=100&h=100","w=100&h=100")+'" width="100" height="100" />'
								'<img src="'+content.img.replace("w=100&h=100&", "")+'" onload="ichaotu.resizeAd(0,100,this)" />'+
								 '</a></div>'+
								  '<div class="ader-push-right">'+
								  '<h4><a href="'+clickurl+'" target="_blank">'+$.subBtyesString(data.link_name,50)+'</a></h4>'+
									   '<p>'+$.subBtyesString(content.desc,50)+'</p>'+
									   '<div class="ader-push-mg-money">'+((content.sale||content.price)?'新品价：<span>'+(content.sale?content.sale:content.price)+'</span>元':'')+'<a href="'+clickurl+'" target="_blank" class="ader-push-icon"></a><a class="close-icon" style="cursor:pointer;">×</a></div>'+
								  '</div>'+
							 '</div>'+
						'</div>';
				*/

		
				var detail = '<div style="display: none; position: absolute; z-index: 10; left: '+left+'px; top:'+top+'px; z-index: 80;width:'+$(obj).width()+'px;cursor:pointer;" class="iChouTu-adverpush-details">'+
					'<div class="iChouTu-adverpush-details-empty"></div>'+
					'<div class="iChouTu-adverpush-details-con">'+
						'<a href="'+clickurl+'" target="_blank" class="iChouTu-details-link"></a>'+
						'<div href="'+clickurl+'" target="_blank" class="iChouTu-details-abox">'+
						(content.price||content.sale?
							'<div class="iChouTu-details-abox-content">'+
								'<div class="iChouTu-details-abox-picture"><img height="90" width="90" src="'+(content.img?content.img.replace("w=100&h=100&", ""):'')+'" onload="ichaotu.resizeAd(0,90,this)" /></div>'+
								'<div class="iChouTu-details-abox-content-left">'+
									'<div class="iChouTu-details-head">'+$.subBtyesString(data.link_name,50,true)+'</div>'+
									'<div class="iChouTu-details-original">'+(content.price?'原价：'+content.price+'元':'')+'</div>'+
									'<div class="iChouTu-details-promotion">'+(content.sale?'促销价：<b>'+content.sale+'</b>元':'')+'</div>'+
								'</div>'+
							'</div>'+
							'<div class="iChouTu-details-abox-content-right iChouTu-absolute-right">'+
									'<div class="iChouTu-adver-details-sale"><img src="http://tstatics.tujoin.com/widget/2.0/images01/zhe-q-b.png"></div>'+
									'<div class="iChouTu-adver-details-close"></div>'+
							'</div>'
						:'<div class="iChouTu-details-abox-content">'+
								'<div class="iChouTu-details-abox-picture"><img height="90" src="'+content.img.replace("w=100&h=100&", "")+'" onload="ichaotu.resizeAd(0,90,this)" /></div>'+
								'<div class="iChouTu-details-abox-content-left">'+
								'</div>'+
							'</div>'+
							'<div class="iChouTu-details-abox-content-right">'+
									'<div class="iChouTu-adver-details-sale"><img src="http://tstatics.tujoin.com/widget/2.0/images01/zhe-q-b.png"></div>'+
									'<div class="iChouTu-adver-details-close"></div>'+
							'</div>')
							+
							'<div style="clear:both"></div>'+
						'</div>'+
					'</div>'+
				'</div>';
				//$("#ichaotu_parent").append(detail);
		
				html = '<div id="'+ichaotu_push_id+'" pid="'+$(obj).attr("ichaotuPid")+'" browse="'+api.browse+'?'+query+'">'+html+detail+'</div>';
			
				parentDom.append(html);
				
				//小于360的图片不显示详细
				if($(obj).width()<360){
					return;
				}

				//.bind("mouseover", function(){
					//showDetail($(this).find(".ader-push-title"));
				//});
				/*
				if(!$(obj).data("bind")){
					$(obj).parent().bind("mouseover", function(){
						showDetail($(this).find(".ader-push-title"));
					});
					$(obj).bind("mouseover", function(){
						showDetail($(this).parent().find(".ader-push-title"));
					});
					$(obj).bind("mouseleave", function(){
						hideDetail($(this).parent().find(".ader-push-con"));
					});
					$(obj).data("bind",1);
				}*/
				if(!$(obj).data("bind")){
					$(obj).bind("mouseover", function(){
						var ichaotu_push_id = 'ichaotu_push_'+$(this).attr("ichaotuPid");
						if($("#"+ichaotu_push_id).length>0){
							showDetail($("#"+ichaotu_push_id));
						}
					});
					$(obj).bind("mouseleave", function(){
						var ichaotu_push_id = 'ichaotu_push_'+$(this).attr("ichaotuPid");
						if($("#"+ichaotu_push_id).length>0){
							hideDetail($("#"+ichaotu_push_id));
						}
					});
					$(obj).data("bind",1);
				}

				$("#"+ichaotu_push_id).bind("mouseleave", function(){
					hideDetail($(this));
				});
				$("#"+ichaotu_push_id).bind("mouseover", function(event){
					showDetail($(this), event);
				});
				$("#"+ichaotu_push_id).bind("mouseleave", function(){
					hideDetail($(this));
				});

				/*
				$("#"+ichaotu_push_id).find(".ader-push-con").bind("mouseleave", function(){
					hideDetail($(this));
				});*/

				$("#"+ichaotu_push_id).find(".iChouTu-adver-details-close,.iChouTu-adver-title-close").bind("click",function(e){
					e.stopPropagation();
					$(this).closest(".iChouTu-adverpush-details,.iChouTu-adverpush-title").parent().data("close", 1).empty();
					return false;
				});
				$("#"+ichaotu_push_id).find(".iChouTu-title-abox").bind("click", function(event){
					var now = new Date().getTime();
					var interval = Math.ceil((now-$.config.get("initTime"))/1000);
					//console.log(interval);
					//return ;
					var Cursor = $.getmouse(event);
					var clickurl = $(this).attr("link")+"&interval="+interval+"&cursorx="+Cursor.x+"&cursory="+Cursor.y;
				//	console.log(clickurl);
					$(this).attr("href",clickurl).click();
				});
				$("#"+ichaotu_push_id).find(".iChouTu-details-abox").bind("click", function(event){

					var now = new Date().getTime();
					var interval = Math.ceil((now-$.config.get("initTime"))/1000);
					var Cursor = $.getmouse(event);
					var clickurl = $(this).attr("href")+"&interval="+interval+"&cursorx="+Cursor.x+"&cursory="+Cursor.y;
					//console.log(clickurl);
					$("#"+ichaotu_push_id).find(".iChouTu-details-link").attr("href",clickurl).click();
				});

				//var browse = 1;
				function showDetail(that, event){
					if(that.length==0)return;
		
					that.data("hide",0);
					if(that.data("browse")!="1"){
						that.data("browse",1);
						try{

							var now = new Date().getTime();
							var interval = Math.ceil((now-$.config.get("initTime"))/1000);
							var Cursor = $.getmouse(event);
							var browseapi = that.attr("browse")+"&interval="+interval+"&cursorx="+Cursor.x+"&cursory="+Cursor.y;			
							//console.log(Cursor);Cursor
							$.getJSON(browseapi,function(){
									
							});
							
						}catch(e){}
					}
					
					var pid = that.attr("pid");
				
					var imgel = $("img[ichaotuPid='"+pid+"']");
					var top = imgel.offset().top + imgel.height()-90;
					//console.log(imgel.offset().top);
					if(top<100)return ;
					that.find(".iChouTu-adverpush-title").hide();
					that.find(".iChouTu-adverpush-details").css({"top":top+'px'}).show();
					//that.parent().find(".ader-push-con").data("hide", 0).show().css({"top":top+'px'});

				}
				function hideDetail(that){
					that.data("hide", 1);
					setTimeout(function(){
						if(that.data("hide")=="1"){
							that.data("browse", 0);
							that.find(".iChouTu-adverpush-title").show();
							that.find(".iChouTu-adverpush-details").hide();
						}
					},1000);
				}
		}
	
	};
});
// 单链处理脚本
ichaotu['plug']("link", function($) {
	$['linkInit'] = function(){
		/* 获取推广链接 */
		var identifyTag = 'http://www.ichaotu.com/?sp';
		var identifyTag2 = "http://twww.tujoin.com/?sp"
		var $as = $('a[href^="' + identifyTag + '"],a[href^="' + identifyTag2 + '"]');
		var spreadIds = [];
		for (var i = 0; i < $as.length; i++) {
			var $a = $($as[i]);
			var url = $a.attr('href');
			var spIndex = url.lastIndexOf('?sp');
			var spreadId = parseInt(url.substr(spIndex + 3), 10);
			if(isNaN(spreadId)) continue ;
			if($.inArray(spreadId, spreadIds) === -1) {
				spreadIds.push(spreadId);
			}
		}
		if(spreadIds.length < 1) {
			return ;
		}
		/* 获取广告信息 */		
		var api = $.config.get("api");
		
		$.getJSON(api.link+"/?sids="+ spreadIds.join(','), function(data){
			if(!data || !data.status) {
				return ;
			}
			for (var i in data.data) {
					var adLink = data.data[i];
					if(!adLink.link_id || !adLink.link_url) continue ;
					if('1' != adLink.link_status) continue ;
					var $a = $('a[href="' + identifyTag + adLink.spread_id + '"]');
					/* 生成统计地址 */
					adLink.link_url = adLink.link_url.replace(' ', '');
					if(-1 == adLink.link_url.indexOf('http')) {
						adLink.link_url = 'http://' + adLink.link_url;
					}
					var title = encodeURIComponent($("title").text());

					var scriptQuery = $.config.get("scriptQuery");
				
					var query = 'to='+$.base64Encode(adLink.link_url)+"&"+
							'from='+$.base64Encode(adLink.promoter_uid + '_' + adLink.uid + '_' + adLink.link_id)+"&"+
							//'wmid='+ wmid+"&"+
							'sid='+adLink.spread_id+"&"+
							//'wm_uid='+wminfo.uid+"&"+
							'link_type='+adLink.link_type+"&"+
							'count_type='+adLink.count_type+"&"+
							'title='+encodeURIComponent(title)+"&"+
							'agent='+'ichaotu'+'&'+
							'i='+scriptQuery.i;

					//浏览处理
					var api = $.config.get("api");
					var url = api.click+'?'+query;
					$a.data("query", query);
					$a.data("adLink", adLink);
					$a.attr('link', url);
					$a.bind("click",function(event){
						event.stopPropagation();
						var link = $(this).attr("link");
						var now = new Date().getTime();
						var interval = Math.ceil((now-$.config.get("initTime"))/1000);
						var Cursor = $.getmouse(event);
						link = link+"&interval="+interval+"&cursorx="+Cursor.x+"&cursory="+Cursor.y;
						location.href = query;
					});
					$a.bind("mouseover",function (event) {
						$('.ichaotu_link').data("hide",0);
						var query = $(this).data("query");
						var now = new Date().getTime();
							var interval = Math.ceil((now-$.config.get("initTime"))/1000);
							var Cursor = $.getmouse(event);
							query = query+"&interval="+interval+"&cursorx="+Cursor.x+"&cursory="+Cursor.y;		
						$.getJSON(api.browse+"?"+query,function(res){

						});
						event = event || window.event;
						showLink($(this), event);

					});
					$a.bind("mouseleave",function (event) {
						$('.ichaotu_link').data("hide",1);
						setTimeout(function(){
								if($('.ichaotu_link').data("hide"))
								$('.ichaotu_link').remove();
						},500);
					});
				}
		//console.log(res);
	});
	function showLink($a, event) {
		/* 初始化展示环境 */
		//jIQuery('.TJicon_info').remove();
		/* 输出广告内容 */
		var adLink = $a.data("adLink");
		var url =  api.click+"?"+$a.data("query");
		$(".ichaotu_link").remove();

		if(adLink.link_content.img) { // 有缩略图
			if(adLink.link_content.price || adLink.link_content.desc) {
				var tag = '<div class="xc_sy_p"><b><span class="ellipsis_shiyong"><a href="' + url + '" target="_blank">' + (adLink.link_name ? adLink.link_name : '') + '</a></span></b></div>'
					+ '<div class="">'
					+ '<div class="s_gw_ct_l ad_left">'
					+ '<a href="' + url + '" target="_blank"><img class="noImageUrl" src="' + adLink.link_content.img + '" /></a></div>'
					+ '<div class="s_gw_ct_r ad_right">'
					+ ((adLink.link_content.price && parseInt(adLink.link_content.price, 10) > 0) ? '<p><span class="fs_14">￥</span><span class="fs_14">' + adLink.link_content.price + '</span></p>' : '')
					+ ((adLink.link_content.sale && parseInt(adLink.link_content.sale, 10) > 0) ? '<p class="mt_5"><span class="fs_14">￥</span><span class="fs_14" id="TJshop_sale">' + adLink.link_content.sale + '</span><span class="ag_d_span3">促销</span></p><ul id="TJshop_desc" class="TJclearfix ad_type TJshop_desc">' : '<ul id="TJshop_desc" class="TJclearfix ad_type TJshop_desc TJshop_desc_no">')
					+ '<li class="ad_type_li">' + (adLink.link_content.desc ? adLink.link_content.desc : '') + '</li>'
					+ '</ul>'
					+ ((adLink.link_content.price && parseInt(adLink.link_content.price, 10) > 0) ? '<p><a class="s_sp_gm" href="' + url + '" target="_blank">购买</a></p>' : '')
					+ '</div>'
					+ '</div>';
				tag = '<div class="TJcont_p TJicon_info ichaotu_link" style="position:absolute;left:0px;top:0px;">'
				+ '<a class="TJclose"></a>'
				+ tag
				+ '</div>';
				$('body').append(tag);
				$('.TJcont_p').addClass('TJcont_ad');
			} else { // 价格和描述不存在时，显示为图片
				var tag = '<h5 id="shoppingInfoTitle">' + adLink.link_name + '</h5>'
					+ '<div class="TJtext"><a href="' + url + '" target="_blank" title="点击购买">'
					+ '<img class="noImageUrl" width="180px" src="'
					+ adLink.link_content.img + '"></a></div>';
				tag = '<div class="TJcont_p TJicon_info ichaotu_link" style="position:absolute;left:0px;top:0px;">'
				+ '<a class="TJclose"></a>'
				+ tag
				+ '</div>';
				$('body').append(tag);
				var img = new Image(); 
				img.src = jIQuery('.noImageUrl').attr("src"); 
				var imgWidth = img.width;
				var imgHight = img.hight;
				if(imgWidth > 360 || imgHight > 300) {
					$('.noImageUrl').attr("width", 360);
					$('.TJcont_p').css("width", 360);
					$('#shoppingInfoTitle').css("width", 340);
				} else if(imgWidth > 0 && imgHight > 0) {
					$('.TJcont_p').css("width", imgWidth);
					$('.TJcont_p').css("hight", imgHight);
					$('.noImageUrl').attr("width", imgWidth);
					$('.noImageUrl').attr("hight", imgHight);
					$('#shoppingInfoTitle').css("width", imgWidth - 20);
				}
			}
		} else { // 无缩略图时，显示为单链
			var tag = '<div class="TJtext TJmt_10">'
				+ '<a style="cursor:pointer;" href="'
				+ url
				+ '" target="_blank">'
				+ (adLink.link_name ? adLink.link_name : url)
				+ '</a></div>';
			tag = '<div class="TJcont_p TJicon_info ichaotu_link" style="position:absolute;left:0px;top:0px;">'
				+ '<a class="TJclose"></a>'
				+ tag
				+ '</div>';
			$('body').append(tag);
		}
		/* 定位显示框 */
		var x = event.pageX ? event.pageX : event.clientX + document.body.scrollLeft - document.body.clientLeft;
		var y = event.pageY ? event.pageY : event.clientY + document.body.scrollTop - document.body.clientTop;
		var $showInfo = $('.ichaotu_link');
		var showInfoHeight = $showInfo.height();
		var showInfoWidth = $showInfo.width();
		var showInfoTop = y;
		var showInfoLeft = x;
		$showInfo.css('top', showInfoTop +'px');
		$showInfo.css('left', showInfoLeft + 'px');
		var offset = $showInfo.offset();
		//offset.left -= document.body.scrollLeft + document.body.clientLeft;
		//offset.top -= document.body.scrollTop + document.body.clientTop;
		offset.left -= $(document).scrollLeft();
		offset.top -= $(document).scrollTop();
		var $window = $(window);
		var windowHeight = $window.height();
		var windowWidth = $window.width();
		var offsetX = offset.left + showInfoWidth - windowWidth;
		if(offsetX > 0) {
			showInfoLeft -= showInfoWidth;
		}
		var offsetY = offset.top + showInfoHeight - windowHeight;

		if(offsetY > 0) {
			showInfoTop -= offsetY + 16;
		}
		$showInfo.css('top', showInfoTop +'px');
		$showInfo.css('left', showInfoLeft + 'px');
		/* 绑定事件 */
		$('.ichaotu_link').bind("mouseleave",function () {
			$('.ichaotu_link').data("hide",1);
			setTimeout(function(){
				if($('.ichaotu_link').data("hide"))
				$('.ichaotu_link').remove();
			},500);
		});
		$('.ichaotu_link').bind("mouseover",function () {
			$('.ichaotu_link').data("hide",0);
		});
		$('.ichaotu_link').find('.TJclose').unbind('click.TJicon').bind('click.TJicon', function () {
			$('.ichaotu_link').remove();
		});
		//$('.TJicon_info').find('.noImageUrl').bind('error', function () {
			//$(this).attr('src', jIQuery.fn.tujoinSign.defaults.noImageUrl);
		//});
		//if(jIQuery.fn.tujoinSign.defaults.bTraceStatistic) { // 执行商品统计
			//jIQuery.ajax({
			//	url : url.replace('/t/c', '/t/v'),
				//dataType : 'jsonp',
			//	jsonp : 'jsonCallback',
			//	success : function(data, textStatus) {}
			//});
		//}
		}
	}
});
//初始化操作
ichaotu['plug']("page", function($) {
	$['page'] = {};
	var pages = {};
	$['initBox'] = function(){

		$("#ichaotu_parent").remove();
		$("body").append('<div id="ichaotu_parent"></div>');
	
	}
	$['ichaotuinit'] = function(){
		function getScriptSrc(){
			for(var i in $("script")){
				var src = $("script")[i].src;
				if(src && src.indexOf("ichaotu.js")!=-1){
					return src;
				}
			}
			return '';
		}
		function getScriptParamArray() { // get script file param array
			var url = getScriptSrc();
			
			var theRequest = new Object();
			var index = url.indexOf('?');
			if(index != -1) {
				var str = url.substr(index + 1);
				strs = str.split("&");
				for(var i = 0; i < strs.length; i++) {
					var sTemp = strs[i].split("=");
					theRequest[sTemp[0]]=(sTemp[1]);
				}
			}
			return theRequest;
		}
		var tujoinSignParamArray = getScriptParamArray();
			var api = {
				'edit':1,
				'api':{
					'add':'http://admin.ichaotu.com/discuz/add',//添加标记
					'del':'http://admin.ichaotu.com/discuz/del',//删除标记
					'update':'http://admin.ichaotu.com/discuz/update',//更新标记
					'get': 'http://admin.ichaotu.com/discuz/get',//获取标记
					'pull': 'http://admin.ichaotu.com/push/get',//广告推送接口
					'browse':'http://210.14.147.219:8888/t/v',//浏览统计接口
					'click':'http://210.14.147.219:8888/t/c',//点击接口
					'money':'http://admin.ichaotu.com/discuz/money',//获取账号信息
					'withdraw':'http://service.ichaotu.com/base/passport/login',//提现接口
					'link':'http://api.ichaotu.com/util/getinfobyspreadids/',
					'search':{
						'youku':"https://openapi.youku.com/v2/searches/video/by_keyword.json?client_id=f08d5179f0cc1aea",
						'xiami':'http://admin.ichaotu.com/discuz/xiami',
						'shopping':'http://admin.ichaotu.com/discuz/shopping'
					}
				},
				'piwik':'stat.ichaotu.com',
				'fiter':'',
				'initTime':new Date().getTime(),
				'showcopyright':1,
				'site_fiter':{"width":"300","height":200,"top":"120","left":"100","picFormat":"","packs":""}
			};
			$.config.set(api);
		

		$.config.set("scriptQuery", tujoinSignParamArray);
		if(!window['ichaotuInit']){
			$.initBox();
			
			$.linkInit();
			$.piwik(tujoinSignParamArray);
			//页面图标重置
			$("body").domresize(function() {
				//重置标记图标
				var wmpids = $.config.get('wmpids');
				for(var i in wmpids){
					$("img[ichaotuPid='"+wmpids[i]+"']").tagsInit();
				}
				//console.log("position");
				//重置推送广告
				$.pushadposition();
			});
			if(tujoinSignParamArray['settingcallback']){
				var callback = tujoinSignParamArray['settingcallback'];
				if(window[callback]){
					window[callback]();
				}
			}
			if(tujoinSignParamArray['callback']){
				var callback = tujoinSignParamArray['callback'];
				if(window[callback]){
					window[callback]();
				}
			}

			$.pageInit('body', 5000);

			var pushAdsh = setInterval(function(){		
					ichaotu.pushstart();
			}, 30000);
			window['ichaotuInit'] = 1;
			return ;
		}
		window['ichaotuInit'] = 1;
	}
	
	//var pushAdsh = null;
	$['pushstart'] = function(){
		var pushad = $.config.get("pushad");
		var $k = 0;
		var $h = 0;
		if(pushad){
			
			for(var i in pids){
				if($h>=30)return ;
				var pid = pids[i];
				var $cimgel = null;
				$("img").each(function(j,n){
					if($(this).attr("ichaotuPid") == pid)
					$cimgel = $(this);
				});
				if(!$cimgel)continue;
				//site_fiter
				/*
				var site_fiter = $.config.get("site_fiter");
				console.log(1);
				if(site_fiter){
					
					if(site_fiter.width){
					
						if($cimgel.width()<site_fiter.width)continue;
					}
					if(site_fiter.height){
					
						if($cimgel.height()<site_fiter.height)continue;
					}
						
					if(site_fiter.top){
						
						if($cimgel.offset.top<site_fiter.top)continue;
					}
					if(site_fiter.left){
						
						if($cimgel.offset.left<site_fiter.left)continue;
					}
				
					if(site_fiter.picFormat){
					
						var aa=$cimgel.attr("src").toLowerCase().split('.');
						var ext = aa[aa.length-1]
					
						if($.inArray(ext, site_fiter.picFormat.split(","))!==-1)continue;
						
					}
						console.log(2);
					if(site_fiter.packs){
						var packs = site_fiter.packs.split(",");
						var flag = false;
						for(var i in packs){
							if($cimgel.closest("#"+packs[i]))flag = true;
						}
						if(flag) continue;
					}
					//{"width":"300","height":200,"top":"120","left":"100","picFormat":"jpg,png,gif,bmp","packs":"111,222,333"}
				}*/
			
				if($cimgel.data("bindrese")!=1){
					$cimgel.imgchange(function(obj, type){
					
						switch(type){
							case '1':
								var pid = $(obj).attr("ichaotuPid");
								//标记移除
								$(obj).nextAll(".ichaotu_toolbar,.ichaotu_tag,.TJcont").remove();
								//推送广告移除
								$("#ichaotu_push_"+pid).remove();
								break;
							case '0':
								
							break;
							case 'move':
								//console.log('move');
								break;
							case 'change':
								//console.log("change");
								var pid = $(obj).attr("ichaotuPid");
								//标记移除
								$(obj).nextAll(".ichaotu_toolbar,.ichaotu_tag,.TJcont").remove();
								//推送广告移除
								$("#ichaotu_push_"+pid).remove();
								//清除pid //清除水印id
								$(obj).removeAttr("ichaotuPid").data("wmid",0).removeAttr("editable");
								//从pids数组中移除
								
								var temp = [];
								for(var i in pids){
									if(pids[i] != pid){
										temp.push(pid);
									}
								}
								pids = temp;
								break;		
						}

					});
					$cimgel.data("bindrese", 1);
				}

				//$cimgel = $("img[ichaotuPid='"+pid+"']");
				var hide = $cimgel.parent().find(".ader-push-con").css("display")=="block"?0:1;
				//console.log($cimgel.parent().find(".ader-push-con"));
				
				if(!$cimgel.attr("editable") && hide ){
					if($cimgel.data("pushed")){
						$num = parseInt($cimgel.data("pushed"));
					}else{
						$num = $k;
					}
					if($num>(pushad.length-1))$num=0;
					var data = 	pushad[$num];
					if(data){
						$cimgel.pushad(data);
						$cimgel.data("pushed",$num+1);
						$k++;
						$h++;
					}  
				}
			}
		}
		//$.config.set("pushad",pushad);
	}

	// 第三方统计处理脚本
	
	$['piwik'] = function(tujoinSignParamArray){
			/* 64进制转10进制 */
		function  s42dec(sixty_four) {
			if(!sixty_four) return 0;
			var base_map = {  
				'0' : 0,  
				'1' : 1,  
				'2' : 2,  
				'3' : 3,  
				'4' : 4,  
				'5' : 5,  
				'6' : 6,  
				'7' : 7,  
				'8' : 8,  
				'9' : 9,  
				':' : 10,  
				';' : 11,  
				'a' : 12,  
				'b' : 13,  
				'c' : 14,  
				'd' : 15,  
				'e' : 16,  
				'f' : 17,  
				'g' : 18,  
				'h' : 19,  
				'i' : 20,  
				'j' : 21,  
				'k' : 22,  
				'l' : 23,  
				'm' : 24,  
				'n' : 25,  
				'o' : 26,  
				'p' : 27,  
				'q' : 28,  
				'r' : 29,  
				's' : 30,  
				't' : 31,  
				'u' : 32,  
				'v' : 33,  
				'w' : 34,  
				'x' : 35,  
				'y' : 36,  
				'z' : 37,  
				'A' : 38,  
				'B' : 39,  
				'C' : 40,  
				'D' : 41,  
				'E' : 42,  
				'F' : 43,  
				'G' : 44,  
				'H' : 45,  
				'I' : 46,  
				'J' : 47,  
				'K' : 48,  
				'L' : 49,  
				'M' : 50,  
				'N' : 51,  
				'O' : 52,  
				'P' : 53,  
				'Q' : 54,  
				'R' : 55,  
				'S' : 56,  
				'T' : 57,  
				'U' : 58,  
				'V' : 59,  
				'W' : 60,  
				'X' : 61,  
				'Y' : 62,  
				'Z' : 63
			};  
			var result = 0;  
			var len = sixty_four.length;  
			for (var n = 0; n < len; n++) {  
				result *= 64;  
				result += base_map[sixty_four.charAt(n)];  
			}
			return result;  
		}
			/* 获取统计代码 */
		function getPiwikTagScript(siteId, statistDomain) {
			//return '<!-- Statist by ichaotu -->'
				//+ '<script type="text/javascript">'
				/*var u=(("https:" == document.location.protocol) ? "https" : "http") + "://" + statistDomain + "/";
				$.loadScript(u+"piwik.js", function(){
					var _paq = _paq || [];
					_paq.push(["trackPageView"]);
					_paq.push(["enableLinkTracking"]);
					_paq.push(["setTrackerUrl", u+"piwik.php"]);
					_paq.push(["setSiteId",  siteId ]);
				}, true);
				*/
				//<!-- Piwik Image Tracker-->
				$("body").append('<img src="http://'+statistDomain+'/piwik.php?idsite='+siteId+'&rec=1" style="border:0" alt="" />');
					
				//<!-- End Piwik -->
				/*
			
				(function() {
					
					_paq.push(["setTrackerUrl", u+"piwik.php"]);
					_paq.push(["setSiteId",  siteId ]);
					var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
					g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
				
				})();*/
			//	+ '</script>'
				//+ '<!-- End Statist Code -->';
		}
		/* 提取用户uid和网站site_id */
		function getIdentityInfo(identity) {
			var identityInfo = {
				'uid' : 0,
				'siteId' : 0
			};
			if(!identity) return identityInfo;
			var indexIdentity = identity.indexOf('_');
			if(indexIdentity > 0 && indexIdentity + 1 < identity.length) {
				identityInfo.uid = s42dec(identity.substring(0, indexIdentity));
				if(isNaN(identityInfo.uid)) {
					identityInfo.uid = 0;
				}
				identityInfo.siteId = s42dec(identity.substring(indexIdentity + 1));
				if(isNaN(identityInfo.siteId)) {
					identityInfo.siteId = 0;
				}
			}
			return identityInfo;
		}
		var identityInfo = getIdentityInfo(tujoinSignParamArray['i']);
	
		getPiwikTagScript(identityInfo.siteId, $.config.get("piwik"));
	

	}
	var maxpid = 1;
	var pids = [];

	//页面初始化，取得页面所有图片地址（selector） timeout为定时更新
	$['pageInit'] = function(selector, timeout){
	
		if(!selector)selector = document.body;
		var urls = [];
		$(selector).find("img[ichaotuPid]").each(function(){
			var ipid = parseInt($(this).attr("ichaotuPid"));
			if(ipid>maxpid)maxpid=ipid+1;
		});
		//选择图片
		function selectImg(param){
			urls = [];
			$(selector).find("img").each(function(){
				var imgel = $(this);
				
				if(this.src){
					var aa=this.src.toLowerCase().split('.');	
					if(aa[aa.length-1]=='gif'){
						return ;
					}
				}
		
				if(imgel.width()<200 || imgel.height()<200 || imgel.attr("ict_noshow")=="1" || ($.inArray(imgel[0], $($.config.get("fiter"))) !== -1)){
	
				}else{
					var ipid = parseInt(imgel.attr("ichaotuPid"));
					
					if(!ipid){
						imgel.attr("ichaotuPid", maxpid);
						
						ipid = maxpid;
						maxpid++;
					}
			
					if($.inArray(ipid, pids) !== -1){
					}else{
			
						var ulr = {
							'src':encodeURIComponent(imgel[0].src),
							'pid':ipid
						}
						if(imgel.attr('aid')){
							ulr.aid = imgel.attr('aid');
						}
						pids.push(ipid);
						urls.push(ulr);
						$.config.set(imgel[0].src, ipid);
						if(param == 3){
							//console.log(param);
							imgel.pushrad();
						}

					}
				}
			});
			return urls;
		}
		//取得推送广告
		function getPushAd(){
			var pushad = 	$.config.get("pushad");
			if(!pushad){
				var $s = 1;
				function doSelect(){
					if($s<3){
						setTimeout(function(){
							urls = selectImg(3);
							//console.log(urls.length);
							getWmids(urls);
							doSelect();
							$s++;
						}, 1000);
					}
				}
				doSelect();
				var pullParam={
					title:encodeURIComponent($("title").text()),
					fromUrl:encodeURIComponent(location.href)
				};
				var api = $.config.get("api");
				$.getJSON(api.pull,pullParam,function(res){
					pushad = res.data;
					if(!pushad)pushad = [];
					$.config.set("pushad",pushad);
					$.pushstart();
				});
			}
		}
		urls = selectImg();
		
		getWmids(urls);
		getPushAd();

		//取得水印信息
		function getWmids(urls){
			if(urls.length>0){
				var api = $.config.get("api");
				scriptQuery = $.config.get("scriptQuery");
				var $i = 0;
				var paramurl = [];
				is_timeout = true;
				while(1){
					paramurl = urls.slice($i*10, ($i+1)*10);

					if(paramurl.length==0){
						break;
					}
					var params ={
						'url' : paramurl,
						'usign':scriptQuery.cuid
					};
					if(scriptQuery.detect){
						params.detect = 1;
					}
				
					$.getJSON(api.get+'?siteurl='+scriptQuery.siteurl
					,params,function(res){
						
						if(res.success){
							var wmpids = $.config.get('wmpids');
						
							if(!wmpids) wmpids= [];
							for(var i in res.data){
								//把有水印的pid暂存
								wmpids.push(i);
								var $cimgel = null;
								$("img").each(function(j,n){
									if($(this).attr("ichaotuPid") == i)
									$cimgel = $(this);
									//console.log(i);
								});
								if(!$cimgel)continue;
								if(res.data && res.data[i] && res.data[i].wmid){
									$cimgel.data("wmid", res.data[i].wmid);
								}
								$.config.set(res.data[i].wmid, res.data[i]);
								//console.log($cimgel);

								$cimgel.tagsInit();
							}
							$.config.set('wmpids', wmpids);
							//$.pushstart();
							
						}
						if(timeout && is_timeout){
							is_timeout = false;
							setTimeout(function(){
								$.pageInit(selector, timeout);
							},timeout);
						}
					});
					$i++;
				}
			
			}else{
				if(timeout){
					setTimeout(function(){
						$.pageInit(selector, timeout);
					},timeout);
				}
			}
		}
	}

});
ichaotu.ichaotuinit();