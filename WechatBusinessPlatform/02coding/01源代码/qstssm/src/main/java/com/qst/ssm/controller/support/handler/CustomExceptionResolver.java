package com.qst.ssm.controller.support.handler;

import cn.hutool.core.util.StrUtil;
import com.qst.ssm.controller.support.interceptor.LoginCheckHandlerInterceptor;
import com.qst.ssm.util.JSONData;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerExceptionResolverComposite;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/***
 * Spring 全局异常处理器
 */
public class CustomExceptionResolver extends HandlerExceptionResolverComposite {
    private final static Logger logger = LogManager.getLogger(LoginCheckHandlerInterceptor.class);

    /**
     * 错误页面
     */
    private String errorPage;
    /**
     * AJAX异步请求URL集合
     * 注意:不能包含webapp根目录路径
     * 例如:http://127.0.0.1:8080/ssm/dep/add
     * 正确配置:/dep/add
     * 错误配置:/ssm/dep/add、dep/add
     */
    private List<String> ajaxAsynchURLs;

    public CustomExceptionResolver() {
        logger.info("CustomExceptionResolver is loaded");
    }

    public String getErrorPage() {
        return errorPage;
    }

    public void setErrorPage(String errorPage) {
        this.errorPage = errorPage;
    }

    public List<String> getAjaxAsynchURLs() {
        return ajaxAsynchURLs;
    }

    public void setAjaxAsynchURLs(List<String> ajaxAsynchURLs) {
        this.ajaxAsynchURLs = ajaxAsynchURLs;
    }

    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {
        //未配置AJAX请求路径
        if (ajaxAsynchURLs == null || ajaxAsynchURLs.isEmpty()) {
            return getErrorModelAndView(ex);
        }
        String requestURL = request.getRequestURI();
        String contextPath = request.getContextPath();
        if (!"/".equals(contextPath)) {
            //除去根目录路径
            requestURL = requestURL.replace(contextPath, StrUtil.EMPTY);
        }
        if (ajaxAsynchURLs.contains(requestURL)) {
            response.setContentType("application/json;charset=UTF-8");
            JSONData json = new JSONData();
            String msg = ex.getMessage();
            msg = msg != null ? msg : ex.getClass().getName();
            json.setStatus(100500);
            json.setMessage(msg);
            try {
                response.getWriter().print(json.toJSONString());
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        } else {
            return getErrorModelAndView(ex);
        }
    }

    /**
     * 获取错误页面及异常信息
     *
     * @param ex
     * @return
     */
    private ModelAndView getErrorModelAndView(Exception ex) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName(this.errorPage);//设置错误页面名称
        //绑定数据
        mv.addObject("type", ex.getClass().getName());
        String message = ex.getMessage();
        message = message == null ? "无" : message;
        mv.addObject("message", message);
        return mv;
    }


}
