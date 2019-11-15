$.fn.getPageStrnew = function(p, r, c, f) {
    p = parseInt(p);
    r = parseInt(r);
    c = parseInt(c);
    f = typeof f == 'undefined' || f == '' ? 'turnPage' : f;
    var t = Math.ceil(c / r), s, e;
    if (p < 3) {
        s = 1;
        e = t < 5 ? t : 5;
    } else {
        s = p - 2 < 1 ? 1 : p - 2;
        if (p + 2 > t) {
            e = t;
            s = t - 4 < 1 ? 1 : t - 4;
        } else {
            e = p + 2;
        }
    }
    var r = '<ul class="pagination" style="margin: 0px;">' +
                    '<li' + (p == 1 ? ' class="disabled"' : '') + '><a' + (p == 1 ? '' : ' onclick="' + f + '(' + 1 + ')"') + '>首页</a></li>';
		    for (var i = s; i <= e; i++) {
		    	r += '<li' + (p == i ? ' class="active"' : '') + '><a' + (p == i ? '' : ' onclick="' + f + '(' + i + ')"') + '>' + i + '</a></li>';
		    }
    r += 			'<li' + (p == t ? ' class="disabled"' : '') + '><a' + (p == t ? '' : ' onclick="' + f + '(' + t + ')"') + '>末页</a></li>' +
                '</ul>'+
            '</span>';

    $(this).append(r);
    $('.pagination li a').click(function() {
        console.log(r)
//		var node = $(this);
		$('.pagination li ').each(function() {
			$(this).removeClass('active');
		});
		$(this).parent().addClass('active');
		$('pagination a').css({color: "#FFE8C8"});
        $('pagination a').hover(function() {
        	$(this).css({color: "#FFE8C8"});
        }, function() {
        	$(this).css({color: "#FFE8C8"});
        });
	});
};