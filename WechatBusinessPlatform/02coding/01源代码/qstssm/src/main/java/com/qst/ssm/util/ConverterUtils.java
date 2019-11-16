package com.qst.ssm.util;

import cn.hutool.core.util.StrUtil;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 类型转换 将字符串或文本转成整数、小数、布尔型、日期和时间 暂时不支持array、list、set、map、json格式
 */
public final class ConverterUtils {
    private static boolean isMatch(String regex, String orginal) {
        if (orginal == null || orginal.trim().equals("")) {
            return false;
        }
        Pattern pattern = Pattern.compile(regex);
        Matcher isNum = pattern.matcher(orginal);
        return isNum.matches();
    }

    /**
     * 是否为整数
     *
     * @param orginal
     * @return
     */
    public static boolean isPositiveInteger(String orginal) {
        return isMatch("^\\+{0,1}[1-9]\\d*", orginal);
    }

    public static boolean isNegativeInteger(String orginal) {
        return isMatch("^-[1-9]\\d*", orginal);
    }

    public static boolean isWholeNumber(String orginal) {
        return isMatch("[+-]{0,1}0", orginal) || isPositiveInteger(orginal)
                || isNegativeInteger(orginal);
    }

    public static boolean isPositiveDecimal(String orginal) {
        return isMatch("\\+{0,1}[0]\\.[1-9]*|\\+{0,1}[1-9]\\d*\\.\\d*", orginal);
    }

    public static boolean isNegativeDecimal(String orginal) {
        return isMatch("^-[0]\\.[1-9]*|^-[1-9]\\d*\\.\\d*", orginal);
    }

    public static boolean isDecimal(String orginal) {
        return isMatch("[-+]{0,1}\\d+\\.\\d*|[-+]{0,1}\\d*\\.\\d+", orginal);
    }

    public static boolean isRealNumber(String orginal) {
        return isWholeNumber(orginal) || isDecimal(orginal);
    }

    /**
     * 是否为日期 格式为yyyy-MM-dd
     *
     * @param orginal
     * @return
     * @throws ParseException
     */
    public static boolean isDate(String orginal) throws ParseException {
        Pattern p = Pattern.compile("\\d{4}+[-]\\d{1,2}+[-]\\d{1,2}+");
        Matcher m = p.matcher(orginal);
        if (!m.matches()) {
            return false;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (orginal.equals(sdf.format(sdf.parse(orginal)))) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 是否为日期 格式为yyyy-MM-dd
     *
     * @param orginal
     * @return
     * @throws ParseException
     */
    public static boolean isTimestamp(String orginal) throws ParseException {
        Pattern p = Pattern
                .compile("\\d{4}+[-]\\d{1,2}+[-]\\d{1,2}+ (([0-1][0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9]");
        Matcher m = p.matcher(orginal);
        if (!m.matches()) {
            return false;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (orginal.equals(sdf.format(sdf.parse(orginal)))) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 将字符串或文本转成特定的数据类型
     *
     * @param text
     * @return
     */
    public static Object convertToObject(String text) {
        if (StrUtil.isEmpty(text)) {
            return null;
        }
        if (isWholeNumber(text)) {
            return Long.valueOf(text);
        }
        if (isDecimal(text)) {
            return Double.valueOf(text);
        }
        try {
            if (isDate(text)) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                return sdf.parse(text);
            }
        } catch (Exception e) {
            return text;
        }
        try {
            if (isTimestamp(text)) {
                SimpleDateFormat sdf = new SimpleDateFormat(
                        "yyyy-MM-dd HH:mm:ss");
                return new Timestamp(sdf.parse(text).getTime());
            }
        } catch (Exception e) {
            return text;
        }
        if ("true".equalsIgnoreCase(text) || "false".equalsIgnoreCase(text)) {
            return Boolean.valueOf(text.toLowerCase());
        }
        return text;
    }
}
