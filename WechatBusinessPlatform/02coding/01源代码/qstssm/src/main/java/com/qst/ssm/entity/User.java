package com.qst.ssm.entity;

import java.util.Date;

/**
 * 用户信息表
 */
public class User {
    /**
     * 用户Id
     */
    private Integer userId;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 性别
     */
    private Integer sex;
    /**
     * 手机号码
     */
    private String tel;
    /**
     * 用户昵称
     */
    private String userNc;
    /**
     * 出生日期
     */
    private Date brithday;
    /**
     * 密码
     */
    private String password;

    /**
     * 用户构造方法
     * @param userId
     * @param userName
     * @param sex
     * @param tel
     * @param userNc
     * @param brithday
     * @param password
     */
    public User(Integer userId, String userName, Integer sex, String tel, String userNc, Date brithday, String password) {
        this.userId = userId;
        this.userName = userName;
        this.sex = sex;
        this.tel = tel;
        this.userNc = userNc;
        this.brithday = brithday;
        this.password = password;
    }

    /**
     * Userget和set方法
     */
    public Integer getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public Integer getSex() {
        return sex;
    }

    public String getTel() {
        return tel;
    }

    public String getUserNc() {
        return userNc;
    }

    public Date getBrithday() {
        return brithday;
    }

    public String getPassword() {
        return password;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public void setUserNc(String userNc) {
        this.userNc = userNc;
    }

    public void setBrithday(Date brithday) {
        this.brithday = brithday;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    /**
     * toString方法
     */
    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", sex=" + sex +
                ", tel='" + tel + '\'' +
                ", userNc='" + userNc + '\'' +
                ", brithday=" + brithday +
                ", password='" + password + '\'' +
                '}';
    }
}
