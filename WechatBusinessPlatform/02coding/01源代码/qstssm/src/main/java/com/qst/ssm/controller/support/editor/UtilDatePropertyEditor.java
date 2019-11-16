package com.qst.ssm.controller.support.editor;

import java.beans.PropertyEditorSupport;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 自定义属性编辑器
 * 作用:将文本转换成java.util.Date
 */
public class UtilDatePropertyEditor extends PropertyEditorSupport {
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        System.out.println(text);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = sdf.parse(text);
            //设置编辑后的值
            setValue(date);
        } catch (Exception e) {
            e.printStackTrace();
            //throw new RuntimeException(e);
            setValue(null);
        }
    }
}
