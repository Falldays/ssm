package com.qst.ssm.entity;

public class Admin {
    //管理员ID
    private int adminId;
    //管理员NO
    private String adminNo;
    //管理员姓名
    private String adminName;
    //管理员密码
    private String password;
    //管理员电话
    private int mobile;
    //管理员性别
    private int sex;

    public Admin() {
    }

    public Admin(int adminId, String adminNo, String adminName, String password, int mobile, int sex) {
        this.adminId = adminId;
        this.adminNo = adminNo;
        this.adminName = adminName;
        this.password = password;
        this.mobile = mobile;
        this.sex = sex;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getAdminNo() {
        return adminNo;
    }

    public void setAdminNo(String adminNo) {
        this.adminNo = adminNo;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getMobile() {
        return mobile;
    }

    public void setMobile(int mobile) {
        this.mobile = mobile;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", adminNo='" + adminNo + '\'' +
                ", adminName='" + adminName + '\'' +
                ", password='" + password + '\'' +
                ", mobile=" + mobile +
                ", sex=" + sex +
                '}';
    }
}
