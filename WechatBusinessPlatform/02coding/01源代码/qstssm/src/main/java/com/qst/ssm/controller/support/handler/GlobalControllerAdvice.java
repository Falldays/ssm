package com.qst.ssm.controller.support.handler;

import com.qst.ssm.controller.support.editor.SqlDatePropertyEditor;
import com.qst.ssm.controller.support.editor.TimePropertyEditor;
import com.qst.ssm.controller.support.editor.TimestampPropertyEditor;
import com.qst.ssm.controller.support.editor.UtilDatePropertyEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@ControllerAdvice
public class GlobalControllerAdvice {

    /**
     * 注册全局属性编辑器
     * 说明:该方法在所有控制器方法执行前被调用,作用:将获取的请求参数值(文本)转换成相应的类型
     *
     * @param webDataBinder
     */
    @InitBinder
    public void dataBind(WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(Timestamp.class,
                new TimestampPropertyEditor());
        webDataBinder.registerCustomEditor(Date.class, new SqlDatePropertyEditor());
        webDataBinder.registerCustomEditor(Time.class, new TimePropertyEditor());
        webDataBinder.registerCustomEditor(java.util.Date.class,
                new UtilDatePropertyEditor());
    }


}
