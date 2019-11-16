package com.qst.ssm.util;

import cn.hutool.core.util.StrUtil;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * 分页算法工具
 * 
 */
public class PageUtils implements Serializable {
	private static final long serialVersionUID = 7848895200933137866L;
	private static final int MOD = 2;
	/** 每一页显示的记录条数 */
	private int numPerPage = 10;
	/** 当前页号 */
	private int curPage = 1;
	/** 下一页 */
	private int lastPage;
	/** 上一页 */
	private int prePage;
	/** 每一页第一条记录序号 */
	private int firstResult;
	/** 每一页最后一条记录序号 */
	private int lastResult;
	/** 总记录数 */
	private int totalNum;
	/** 总页数 */
	private int totalPage = 1;
	private int displayCount = 10;
	/** 页面可以点击页号列表 */
	private List<Integer> displayList;
	/** 分页查询的条件 **/
	private Map<String, Object> conditions;

	public int getFirstResult() {
		if (this.curPage < 1) {
			this.curPage = 1;
		} else if (this.curPage > this.getTotalPage()) {
			this.curPage = totalPage;
		}
		this.firstResult = (this.curPage - 1) * this.numPerPage + 1;
		return firstResult;
	}

	/**
	 * MySQL分页查询每页第一条记录索引
	 * 
	 * @return
	 */
	public int getFirstRow() {
		return getFirstResult() - 1;
	}

	public int getLastResult() {
		this.lastResult = this.curPage * this.numPerPage;
		this.lastResult = this.lastResult > this.totalNum ? this.totalNum
				: this.lastResult;
		return lastResult;
	}

	public int getCurPage() {
		return curPage;
	}

	public int getLastPage() {
		this.lastPage = this.curPage >= this.totalPage ? this.totalPage
				: this.curPage + 1;
		return lastPage;
	}

	public int getPrePage() {
		this.prePage = this.curPage <= 2 ? 1 : this.curPage - 1;
		return prePage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage > 0 ? curPage : 1;
	}

	public int getNumPerPage() {
		return numPerPage;
	}

	public void setNumPerPage(int numPerPage) {
		this.numPerPage = numPerPage;
	}

	public void setTotalNum(int totalNum) {

		this.totalNum = totalNum;
		this.totalPage = (this.totalNum / this.numPerPage)
				+ (0 == this.totalNum % this.numPerPage ? 0 : 1);
	}

	public int getTotalNum() {
		return totalNum;
	}

	public int getTotalPage() {
		return totalPage;
	}

	/**
	 * 
	 * @return List
	 */
	public List<Integer> getDisplayList() {
		int n = (int) displayCount / MOD;
		int m = this.curPage;
		displayList = new ArrayList<Integer>();
		if (totalPage > displayCount) {
			if (m <= n) {
				for (int index = 1; index <= displayCount; index++) {
					displayList.add(Integer.valueOf(index));
				}

			} else {
				int start = m - n + 1;
				int end;
				if (start + displayCount > totalPage) {
					start = totalPage - displayCount + 1;
					end = totalPage;
				} else {
					start = m - n + 1;
					end = m - n + displayCount;
				}
				for (int index = start; index <= end; index++) {
					displayList.add(Integer.valueOf(index));
				}
			}

		} else {
			for (int index = 1; index <= totalPage; index++) {
				displayList.add(Integer.valueOf(index));
			}
		}

		return displayList;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public Map<String, Object> getConditions() {
		return conditions;
	}

	/**
	 * 设置分页面参数 1.page:当前分页号,easyUI框架自动设置 2.rows:每页显示的记录数,easyUI框架自动设置
	 * 3.其它参数为用户自己设置的查询条件
	 * 
	 * @param paramMap
	 * @param filterEmpty 是否过滤空的参数值
	 *            ,过滤后该
	 */
	public void setParamMap(Map<String, String> paramMap, boolean filterEmpty) {
		if (null != paramMap && !paramMap.isEmpty()) {
			// 分页当前页
			if (paramMap.containsKey("page")) {
				this.curPage = Integer.parseInt(paramMap.get("page"));
				paramMap.remove("page");
			}
			// 当前每页显示的记录条数
			if (paramMap.containsKey("rows")) {
				this.numPerPage = Integer.parseInt(paramMap.get("rows"));
				paramMap.remove("rows");
			}
			// 过滤空的值
			if (!paramMap.isEmpty()) {
				conditions = new HashMap<String, Object>();
				Set<Entry<String, String>> entrySet = paramMap.entrySet();
				for (Entry<String, String> entry : entrySet) {
					String key = entry.getKey().toString();
					String value = entry.getValue().toString();
					if (StrUtil.isEmpty(value)) {
						if (!filterEmpty) {
							conditions.put(key, null);
						}
						continue;
					}
					conditions.put(key, ConverterUtils.convertToObject(value));
				}
			}
		}
	}

}
