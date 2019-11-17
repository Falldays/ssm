package com.qst.ssm.entity;

import java.util.Date;

public class Shop {
    private Integer shopId;          //购物车ID
    private Integer userId;              //用户ID
    private  String pdId;                //商品ID
    private  String scNumber;            //商品数量
    private Date scDate;              //加入时间

    public Shop() {
    }

    public Shop(Integer shopId, Integer userId, String pdId, String scNumber, Date scDate) {
        this.shopId = shopId;
        this.userId = userId;
        this.pdId = pdId;
        this.scNumber = scNumber;
        this.scDate = scDate;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getPdId() {
        return pdId;
    }

    public void setPdId(String pdId) {
        this.pdId = pdId;
    }

    public String getScNumber() {
        return scNumber;
    }

    public void setScNumber(String scNumber) {
        this.scNumber = scNumber;
    }

    public Date getScDate() {
        return scDate;
    }

    public void setScDate(Date scDate) {
        this.scDate = scDate;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "shopId=" + shopId +
                ", userId=" + userId +
                ", pdId='" + pdId + '\'' +
                ", scNumber='" + scNumber + '\'' +
                ", scDate=" + scDate +
                '}';
    }
}
