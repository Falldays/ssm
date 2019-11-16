package com.qst.ssm.controller.support.editor;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 自定义属性编辑器
 * 作用:将文本转换成java.sql.Timestamp
 */
public class TimestampPropertyEditor extends PropertyEditorSupport {
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date date = sdf.parse(text);
            //设置编辑后的值
            setValue(new Timestamp(date.getTime()));
        } catch (Exception e) {
            e.printStackTrace();
            //throw new RuntimeException(e);
            setValue(null);
        }
    }
}
