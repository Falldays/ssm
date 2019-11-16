package com.qst.ssm.controller.support.interceptor;

import cn.hutool.core.util.StrUtil;
import com.qst.ssm.util.JSONData;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 登录检查拦截器
 */
public class LoginCheckHandlerInterceptor
        implements HandlerInterceptor {
    private final static Logger logger = LogManager.getLogger(LoginCheckHandlerInterceptor.class);

    public LoginCheckHandlerInterceptor() {
        logger.info("LoginCheckHandlerInterceptor is loaded");
    }

    /***
     * 登录页面相对URL
     */
    private String loginPageURL;
    /**
     * AJAX异步请求URL集合
     * 注意:不能包含webapp根目录路径
     * 例如:http://127.0.0.1:8080/ssm/dep/add
     * 正确配置:/dep/add
     * 错误配置:/ssm/dep/add、dep/add
     */
    private List<String>  ajaxAsynchURLs;

    public String getLoginPageURL() {
        return loginPageURL;
    }

    public void setLoginPageURL(String loginPageURL) {
        this.loginPageURL = loginPageURL;
    }

    public List<String>  getAjaxAsynchURLs() {
        return ajaxAsynchURLs;
    }

    public void setAjaxAsynchURLs(List<String>  ajaxAsynchURLs) {
        this.ajaxAsynchURLs = ajaxAsynchURLs;
    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String requestURL = request.getRequestURI();
        String contextPath = request.getContextPath();
        if (!"/".equals(contextPath)) {
            //除去根目录路径
            requestURL = requestURL.replace(contextPath, StrUtil.EMPTY);
        }
        logger.debug("LoginCheckHandlerInterceptor:" + requestURL);
        //从会话中获取用户
        Object user = request.getSession().getAttribute("user");
        //当user为null,说明当前用户未登录,同时还需要判断当前请求是否为AJAX异步请求
        if (user == null) {
            if (ajaxAsynchURLs == null || ajaxAsynchURLs.isEmpty()) {
                response.sendRedirect(loginPageURL);
                return false;
            }
            //异步请求
            if (ajaxAsynchURLs.contains(requestURL)) {
                response.setContentType("text/javascript; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store");
                response.setDateHeader("Expires", 0L);
                String message = new JSONData(100602, "登录已超时").toJSONString();
                response.getWriter().print(message);
                return false;
            }
            //重定向登录页面
            response.sendRedirect(loginPageURL);
            return false;
        }
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }


}
