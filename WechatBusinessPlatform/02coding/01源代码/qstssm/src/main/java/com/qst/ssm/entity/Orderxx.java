package com.qst.ssm.entity;

/**
 * 订单详细信息表
 */
public class Orderxx {
    /**
     *订单详细信息Id
     */
    private Integer orderxxId;
    /**
     *订单表ID
     */
    private Integer orderId;
    /**
     *商品ID
     */
    private Integer pdId;
    /**
     *商品数量
     */
    private Integer pdNumber;
    /**
     *订单状态
     */
    private Integer orderStatus;
    /**
     *商品价格
     */
    private Integer pdPrice;

    public Orderxx(Integer orderxxId, Integer orderId, Integer pdId, Integer pdNumber, Integer orderStatus, Integer pdPrice) {
        this.orderxxId = orderxxId;
        this.orderId = orderId;
        this.pdId = pdId;
        this.pdNumber = pdNumber;
        this.orderStatus = orderStatus;
        this.pdPrice = pdPrice;
    }

    public Integer getOrderxxId() {
        return orderxxId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public Integer getPdId() {
        return pdId;
    }

    public Integer getPdNumber() {
        return pdNumber;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public Integer getPdPrice() {
        return pdPrice;
    }

    public void setOrderxxId(Integer orderxxId) {
        this.orderxxId = orderxxId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public void setPdId(Integer pdId) {
        this.pdId = pdId;
    }

    public void setPdNumber(Integer pdNumber) {
        this.pdNumber = pdNumber;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public void setPdPrice(Integer pdPrice) {
        this.pdPrice = pdPrice;
    }

    @Override
    public String toString() {
        return "Orderxx{" +
                "orderxxId=" + orderxxId +
                ", orderId=" + orderId +
                ", pdId=" + pdId +
                ", pdNumber=" + pdNumber +
                ", orderStatus=" + orderStatus +
                ", pdPrice=" + pdPrice +
                '}';
    }
}
