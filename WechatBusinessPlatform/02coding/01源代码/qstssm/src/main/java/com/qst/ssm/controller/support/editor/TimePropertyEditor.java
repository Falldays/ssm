package com.qst.ssm.controller.support.editor;

import java.beans.PropertyEditorSupport;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 自定义属性编辑器
 * 作用:将文本转换成java.sql.Time
 */
public class TimePropertyEditor extends PropertyEditorSupport {
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date date = sdf.parse(text);
            //设置编辑后的值
            setValue(new Time(date.getTime()));
        } catch (Exception e) {
            e.printStackTrace();
            setValue(null);
        }
    }
}
