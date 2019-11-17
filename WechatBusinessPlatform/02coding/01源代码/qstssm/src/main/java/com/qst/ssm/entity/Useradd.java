package com.qst.ssm.entity;

public class Useradd {
    private Integer useraddId;          //用户地址ID
    private Integer userId;              //用户ID
    private  String addName;             //收货人
    private  String addTelephone;        //收货人电话
    private  String addAddress;          //详细地址

    public Useradd() {
    }

    public Useradd(Integer useraddId, Integer userId, String addName, String addTelephone, String addAddress) {
        this.useraddId = useraddId;
        this.userId = userId;
        this.addName = addName;
        this.addTelephone = addTelephone;
        this.addAddress = addAddress;
    }

    public Integer getUseraddId() {
        return useraddId;
    }

    public void setUseraddId(Integer useraddId) {
        this.useraddId = useraddId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAddName() {
        return addName;
    }

    public void setAddName(String addName) {
        this.addName = addName;
    }

    public String getAddTelephone() {
        return addTelephone;
    }

    public void setAddTelephone(String addTelephone) {
        this.addTelephone = addTelephone;
    }

    public String getAddAddress() {
        return addAddress;
    }

    public void setAddAddress(String addAddress) {
        this.addAddress = addAddress;
    }

    @Override
    public String toString() {
        return "Useradd{" +
                "useraddId=" + useraddId +
                ", userId=" + userId +
                ", addName='" + addName + '\'' +
                ", addTelephone='" + addTelephone + '\'' +
                ", addAddress='" + addAddress + '\'' +
                '}';
    }
}
