package com.qst.ssm.controller.support.converter;

import org.springframework.core.convert.converter.Converter;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * 数据类型转换器
 * 作用:将文本String转换成java.sql.Time
 */
public class SqlTimeConverter implements Converter<String, Time> {
    private String timeFormat = "yyyy-MM-dd HH:mm:ss";

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }

    @Override
    public Time convert(String source) {
        SimpleDateFormat sdf = new SimpleDateFormat(this.timeFormat);
        Time time = null;
        try {
            time = new Time(sdf.parse(source).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(source);
        }
        return time;
    }
}
