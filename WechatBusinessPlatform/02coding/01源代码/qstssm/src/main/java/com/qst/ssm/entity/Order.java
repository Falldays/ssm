package com.qst.ssm.entity;

import java.util.Date;

public class Order {

    private int ordeId;             //订单表ID
    private String orderNo;             //订单号
    private int userId;              //用户ID
    private int pdPrice;             //订单价格
    private String expressNo;           //快递单号
    private Date createTime;          //创建时间

    public Order() {
    }

    public Order(int ordeId, String orderNo, int userId, int pdPrice, String expressNo, Date createTime) {
        this.ordeId = ordeId;
        this.orderNo = orderNo;
        this.userId = userId;
        this.pdPrice = pdPrice;
        this.expressNo = expressNo;
        this.createTime = createTime;
    }

    public int getOrdeId() {
        return ordeId;
    }

    public void setOrdeId(int ordeId) {
        this.ordeId = ordeId;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPdPrice() {
        return pdPrice;
    }

    public void setPdPrice(int pdPrice) {
        this.pdPrice = pdPrice;
    }

    public String getExpressNo() {
        return expressNo;
    }

    public void setExpressNo(String expressNo) {
        this.expressNo = expressNo;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Order{" +
                "ordeId=" + ordeId +
                ", orderNo='" + orderNo + '\'' +
                ", userId=" + userId +
                ", pdPrice=" + pdPrice +
                ", expressNo='" + expressNo + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
