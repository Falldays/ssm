package com.qst.ssm.controller.support.editor;

import java.beans.PropertyEditorSupport;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 属性编辑器
 * 作用:将文本转换成java.sql.Date
 */
public class SqlDatePropertyEditor extends PropertyEditorSupport {
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        System.out.println(text);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = sdf.parse(text);
            //设置编辑后的值
            setValue(new java.sql.Date(date.getTime()));
        } catch (Exception e) {
            e.printStackTrace();
            setValue(null);
        }
    }
}
