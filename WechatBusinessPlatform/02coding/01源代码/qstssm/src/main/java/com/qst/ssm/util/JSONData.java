package com.qst.ssm.util;

import java.util.HashMap;
import java.util.Map;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.ValueFilter;

/**
 * JSON数据结构
 */
public class JSONData {
	/**
	 * 等于0:正常 大于0:业务性错误 小于0:程序运行异常
	 */
	private int status = 0;
	/**
	 * 错误信息:status小于0 或大于0时存在
	 */
	private String message;
	/**
	 * 
	 * 请求成功时,返回请求相关的数据信息,仅当status=0时存在
	 */
	private Object data;

	private Map<String, Object> map = new HashMap<String, Object>();

	/**
	 * 序列号插件
	 */
	private SerializerFeature[] sfs;

	public JSONData() {
		super();
	}

	public JSONData(Object data) {
		super();
		this.data = data;
	}

	public JSONData(String key, Object data) {
		super();
		this.data = data;
	}

	public JSONData(int status, String message) {
		super();
		this.status = status;
		this.message = message;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	/**
	 * 处理JSON数据的空值
	 * 
	 * @return 值过滤器
	 */
	public ValueFilter getValuef() {
		ValueFilter valuef = new ValueFilter() {
			public Object process(Object obj, String s, Object v) {
				if (null == v) {
					if (v instanceof String)
						return "";
					else if (v instanceof Number) {
						return 0;
					} else {
						return "";
					}
				}
				return v;
			}
		};
		return valuef;
	}

	public JSONData put(String key, Object value) {
		data = null == data ? map : data;
		map.put(key, value);
		return this;
	}

	/**
	 * 获取JSON格式数据
	 * 
	 * 
	 * @return
	 */
	public String toJSONString() {
		this.init();
		JSONObject json = new JSONObject();
		json.put("status", this.status);
		if (status == 0) {
			this.data = this.data == null ? new Object[] {} : this.data;
			json.put("data", this.data);
		} else {
			json.put("message", this.message);
		}
		return JSON.toJSONString(json, getValuef(), this.sfs);
	}

	public String toJSONString(String dataFormat) {
		this.init();
		JSONObject json = new JSONObject();
		json.put("status", this.status);
		if (status == 0) {
			this.data = this.data == null ? new Object[] {} : this.data;
			json.put("data", this.data);
		} else {
			json.put("message", this.message);
		}
		return JSON.toJSONStringWithDateFormat(json, dataFormat, this.sfs);
	}

	/**
	 * 初始化序列号插件
	 */
	private void init() {
		sfs = new SerializerFeature[4];
		sfs[0] = SerializerFeature.WriteNullStringAsEmpty;
		sfs[1] = SerializerFeature.WriteMapNullValue;
		sfs[2] = SerializerFeature.WriteNullBooleanAsFalse;
		sfs[3] = SerializerFeature.WriteNullNumberAsZero;
	}

}
