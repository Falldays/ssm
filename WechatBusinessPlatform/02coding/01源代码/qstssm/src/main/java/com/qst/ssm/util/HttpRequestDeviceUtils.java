package com.qst.ssm.util;

import cn.hutool.core.util.StrUtil;

import javax.servlet.http.HttpServletRequest;

/**
 * 判断手机访问还是电脑访问
 */
public final class HttpRequestDeviceUtils {

    /**
     * Wap网关Via头信息中特有的描述信息
     */
    private static String mobileGateWayHeaders[] = new String[]{"ZXWAP",
            "chinamobile.com", "monternet.com", "infoX",
            "XMS 724Solutions HTG", "wap.lizongbo.com", "Bytemobile",};
    /**
     * 电脑上的IE或Firefox浏览器等的User-Agent关键词
     */
    private static String[] pcHeaders = new String[]{"Windows 98",
            "Windows ME", "Windows 2000", "Windows XP", "Windows NT", "Ubuntu"};
    /**
     * 手机浏览器的User-Agent里的关键词
     */
    private static String[] mobileUserAgents = new String[]{"Nokia",
            "SAMSUNG", "MIDP-2", "CLDC1.1", "SymbianOS", "MAUI",
            "UNTRUSTED/1.0", "Windows CE", "iPhone", "iPad", "Android",
            "BlackBerry", "UCWEB", "ucweb", "BREW", "J2ME", "YULONG", "YuLong",
            "COOLPAD", "TIANYU", "TY-", "K-Touch", "HaIEr", "DOPOD", "Lenovo",
            "LENOVO", "HUAQIN", "AIGO-", "CTC/1.0", "CTC/2.0", "CMCC",
            "DAXIAN", "MOT-", "SonyEricsson", "GIONEE", "HTC", "ZTE", "HUAWEI",
            "webOS", "GoBrowser", "IEMobile", "WAP2.0"};

    private HttpRequestDeviceUtils() {
        super();
    }

    /**
     * 根据当前请求的特征,判断该请求是否来自手机终端,主要检测特殊的头信息,以及user-Agent这个header
     *
     * @param request
     * @return 是否移动设备
     */
    public final static boolean isMobileDevice(HttpServletRequest request) {
        boolean pcFlag = false;
        boolean mobileFlag = false;
        String via = request.getHeader("Via");
        String userAgent = request.getHeader("user-agent");
        int len = mobileGateWayHeaders.length;
        for (int i = 0; !StrUtil.isEmpty(via) && i < len; i++) {
            if (via.contains(mobileGateWayHeaders[i])) {
                mobileFlag = true;
                break;
            }
        }
        len = mobileUserAgents.length;
        for (int i = 0; !mobileFlag && !StrUtil.isEmpty(userAgent)
                && i < len; i++) {
            if (userAgent.contains(mobileUserAgents[i])) {
                mobileFlag = true;
                break;
            }
        }
        len = pcHeaders.length;
        for (int i = 0; !StrUtil.isEmpty(userAgent) && i < len; i++) {
            if (userAgent.contains(pcHeaders[i])) {
                pcFlag = true;
                break;
            }
        }
        return mobileFlag == true && pcFlag == false;
    }

    /**
     * 获取手机类型
     *
     * @param request
     * @return 返回手机类型
     */
    public final static String getMobileModel(HttpServletRequest request) {
        String model = "未知手机型号";
        String userAgent = request.getHeader("user-agent");
        int len = mobileUserAgents.length;
        for (int i = 0; !StrUtil.isEmpty(userAgent) && i < len; i++) {
            if (userAgent.contains(mobileUserAgents[i])) {
                model = mobileUserAgents[i];
                break;
            }
        }
        return model;
    }

    /***
     * 获取PC端浏览器类型
     *
     * @param request
     * @return 返回浏览器类型
     */
    public final static String getPCBrowseModel(HttpServletRequest request) {
        String userAgent = request.getHeader("user-agent").toLowerCase();
        if (userAgent.indexOf("msIE 7") > 0) {
            return "IE7";
        } else if (userAgent.indexOf("msIE 8") > 0) {
            return "IE8";
        } else if (userAgent.indexOf("msIE 9") > 0) {
            return "IE9";
        } else if (userAgent.indexOf("msIE 10") > 0) {
            return "IE10";
        } else if (userAgent.indexOf("msIE") > 0) {
            return "IE";
        } else if (userAgent.indexOf("opera") > 0) {
            return "Opera";
        } else if (userAgent.indexOf("safari") > 0
                && -1 == userAgent.indexOf("chrome")) {
            return "Safari";
        } else if (userAgent.indexOf("firefox") > 0) {
            return "Firefox";
        } else if (userAgent.indexOf("qqbrowser") > 0) {
            return "QQBrowser";
        } else if (userAgent.indexOf("chrome") > 0) {
            return "Chrome";
        } else if (userAgent.indexOf("webkit") > 0) {
            return "webkit";
        } else if (userAgent.indexOf("gecko") > 0
                && userAgent.indexOf("rv:11") > 0) {
            return "IE11";
        } else {
            return "未知浏览器";
        }
    }
}
