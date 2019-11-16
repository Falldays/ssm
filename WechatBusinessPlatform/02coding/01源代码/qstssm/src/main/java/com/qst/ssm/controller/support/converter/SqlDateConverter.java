package com.qst.ssm.controller.support.converter;

import org.springframework.core.convert.converter.Converter;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * 数据类型转换器
 * 作用:将文本String转换成java.sql.Date
 */
public class SqlDateConverter implements Converter<String, Date> {
    private String dateFormat = "yyyy-MM-dd";

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    @Override
    public Date convert(String source) {
        SimpleDateFormat sdf = new SimpleDateFormat(this.dateFormat);
        Date date = null;
        try {
            date = new Date(sdf.parse(source).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(source);
        }
        return date;
    }
}
