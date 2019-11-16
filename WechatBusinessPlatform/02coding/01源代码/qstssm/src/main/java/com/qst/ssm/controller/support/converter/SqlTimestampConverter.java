package com.qst.ssm.controller.support.converter;

import org.springframework.core.convert.converter.Converter;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * 数据类型转换器
 * 作用:将文本String转换成java.sql.Timestamp
 */
public class SqlTimestampConverter implements Converter<String, Timestamp> {
    private String timeFormat = "yyyy-MM-dd HH:mm:ss";

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }

    @Override
    public Timestamp convert(String source) {
        SimpleDateFormat sdf = new SimpleDateFormat(this.timeFormat);
        Timestamp timestamp = null;
        try {
            timestamp = new Timestamp(sdf.parse(source).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(source);
        }
        return timestamp;
    }
}
