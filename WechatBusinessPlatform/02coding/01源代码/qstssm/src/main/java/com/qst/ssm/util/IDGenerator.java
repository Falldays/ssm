package com.qst.ssm.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class IDGenerator {
	/**
	 * UUID
	 * 
	 * @return
	 */
	public static synchronized String newID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 生成订单ID 格式:yy(2位)+年中的天(3位)+当天毫秒数(7位)+随机4为数字
	 * 
	 * @return 订单Id
	 */
	public static synchronized String newOrderID() {
		DateFormat df = new SimpleDateFormat("yyDDD");
		Date date = new Date();
		long time = date.getTime();
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(time);
		strBuf.reverse();
		String p = strBuf.substring(0, 7);
		String suffix = new StringBuffer(p).reverse().toString();
		try {
			Thread.sleep(10l);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return df.format(date) + suffix + RandomCodeUtils.getDataCode(4);
	}

	public static synchronized String newProductID() {
		DateFormat df = new SimpleDateFormat("yyDDD");
		Date date = new Date();
		long time = date.getTime();
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(time);
		strBuf.reverse();
		String p = strBuf.substring(0, 7);
		String suffix = new StringBuffer(p).reverse().toString();
		try {
			Thread.sleep(20l);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return df.format(date) + suffix;
	}

	/**
	 * 获取系统唯一序号(36位,字母大写)
	 * 
	 * @return
	 */
	public final static String getGUID() {
		return UUID.randomUUID().toString().toUpperCase();
	}
}
