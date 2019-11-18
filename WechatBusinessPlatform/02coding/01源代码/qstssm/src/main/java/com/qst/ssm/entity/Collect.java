package com.qst.ssm.entity;

import java.util.Date;

/**
 * 收藏夹实体类
 * user:fanlimin
 */
public class Collect {

    private int collId;              //收藏表ID
    private int userId;              //用户ID
    private int pdId;                //商品id
    private Date collDate;           //收藏时间

    public Collect() {
    }

    public Collect(int collId, int userId, int pdId, Date collDate) {
        this.collId = collId;
        this.userId = userId;
        this.pdId = pdId;
        this.collDate = collDate;
    }

    public int getCollId() {
        return collId;
    }

    public void setCollId(int collId) {
        this.collId = collId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPdId() {
        return pdId;
    }

    public void setPdId(int pdId) {
        this.pdId = pdId;
    }

    public Date getCollDate() {
        return collDate;
    }

    public void setCollDate(Date collDate) {
        this.collDate = collDate;
    }

    @Override
    public String toString() {
        return "Collect{" +
                "collId=" + collId +
                ", userId=" + userId +
                ", pdId=" + pdId +
                ", collDate=" + collDate +
                '}';
    }
}
