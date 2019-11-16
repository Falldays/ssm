package com.qst.ssm.util;

import java.util.Random;

/**
 * 获取随机数字
 *
 * @author qst
 */
public final class RandomCodeUtils {

    private RandomCodeUtils() {
        super();
    }

    /**
     * Random code libraries from data and character
     */
    private final static String CODES = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private final static char MCODE[] = {'1', '2', '3', '4', '5', '6', '7',
            '8', '9', '0'};

    /**
     * Random code count
     */
    private final static int CODES_COUNT = CODES.length();

    /**
     * 根据参数长度返回非重复字符串
     *
     * @param codeLength 字符串长度
     * @return 非重复的字符
     */
    public final static String bulidNoRepeatCodes(int codeLength) {
        if (codeLength > CODES_COUNT || codeLength < 1) {
            throw new IllegalArgumentException(
                    "Random code length can not less than 1 or greater than "
                            + CODES_COUNT);
        }
        StringBuffer codesBuf = new StringBuffer();
        char code;
        Random random = new Random();
        while (codesBuf.length() < codeLength) {
            code = CODES.toCharArray()[random.nextInt(CODES_COUNT)];
            if (-1 == codesBuf.toString().indexOf(code)) {
                codesBuf.append(code);
            } else {
                continue;
            }
        }
        return codesBuf.toString();
    }

    /**
     * 获取重复字符的数组
     *
     * @param codeLength 字符串长度
     * @return 重复字符的数组
     */
    public final static String bulidRepeatCodes(int codeLength) {
        StringBuffer codesBuf = new StringBuffer();
        char code;
        Random random = new Random();
        for (int index = 0; index < codeLength; index++) {
            code = CODES.toCharArray()[random.nextInt(CODES_COUNT)];
            codesBuf.append(code);
        }
        return codesBuf.toString();
    }

    /**
     * 根据字符组和字符串长度生成非重复字符的字符串
     *
     * @param codes      字符组
     * @param codeLength 字符串长度
     * @return 非重复字符的字符串
     */
    public final static String bulidNoRepeatCodes(char codes[], int codeLength) {
        int cout = codes.length;
        if (codeLength > cout || codeLength < 1) {
            throw new IllegalArgumentException(
                    "Random code length can not less than 1 or greater than"
                            + cout);
        }
        StringBuffer codesBuf = new StringBuffer();
        char code;
        Random random = new Random();
        while (codesBuf.length() < codeLength) {
            code = codes[random.nextInt(cout)];
            if (codesBuf.toString().indexOf(code) == -1) {
                codesBuf.append(code);
            } else {
                continue;
            }
        }
        return codesBuf.toString();
    }

    /**
     * 根据字符组和字符串长度生成重复字符的字符串
     *
     * @param codes      字符组
     * @param codeLength 字符串长度
     * @return
     */
    public final static String bulidRepeatCodes(char codes[], int codeLength) {
        int cout = codes.length;
        StringBuffer codesBuf = new StringBuffer();
        char code;
        Random random = new Random();
        for (int index = 0; index < codeLength; index++) {
            code = codes[random.nextInt(cout)];
            codesBuf.append(code);
        }
        return codesBuf.toString();
    }

    public final static String bulidNoRepeatReverseCodes(char codes[],
                                                         int codeLength) {
        if (codeLength < 1) {
            throw new IllegalArgumentException(
                    "Random code length can not less than 1");
        }
        char difCodes[] = getDifCodes(codes);
        int length = difCodes.length;
        if (length < codeLength) {
            throw new IllegalArgumentException(
                    "The differ random code libraries length can not less than "
                            + codeLength);
        }
        StringBuffer codesBuf = new StringBuffer();
        char code;
        Random random = new Random();
        String codesStr = new String(codes);
        while (codesBuf.length() < codeLength) {
            code = difCodes[random.nextInt(length)];
            if (-1 == codesBuf.toString().indexOf(code)
                    && -1 == codesStr.indexOf(code)) {
                codesBuf.append(code);
            } else {
                continue;
            }

        }
        return codesBuf.toString();
    }

    public final static String bulidRepeatReverseCodes(char codes[],
                                                       int codeLength) {
        if (codeLength < 1) {
            throw new IllegalArgumentException(
                    "Random code length can not less than 1");
        }
        char difCodes[] = getDifCodes(codes);
        int length = difCodes.length;
        StringBuffer codesBuf = new StringBuffer();
        char code;
        Random random = new Random();
        String codesStr = new String(codes);
        for (int index = 0; index < codeLength; ) {
            code = difCodes[random.nextInt(length)];
            if (-1 == codesStr.indexOf(code)) {
                codesBuf.append(code);
                index++;
            } else {
                continue;
            }
        }
        return codesBuf.toString();
    }

    private final static char[] getDifCodes(char codes[]) {
        StringBuffer difCodesBuf = new StringBuffer();
        String codesStr = new String(codes);
        for (int index = 0; index < CODES_COUNT; index++) {
            if (-1 == codesStr.indexOf(CODES.charAt(index))) {
                difCodesBuf.append(CODES.charAt(index));
            }
        }
        return difCodesBuf.toString().toCharArray();
    }

    public static String getCheckCode() {
        return bulidRepeatCodes(MCODE, 6);
    }

    public static String getDataCode(int count) {
        return bulidRepeatCodes(MCODE, count);
    }
}
