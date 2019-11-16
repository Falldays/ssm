package com.qst.ssm.controller.support.converter;

import org.springframework.core.convert.converter.Converter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 自定义数据类型转换器
 * 作用:将文本String转换成java.util.Date
 */
public class UtilDateConverter implements Converter<String, Date> {
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
            date = sdf.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(source);
        }
        return date;
    }
}
