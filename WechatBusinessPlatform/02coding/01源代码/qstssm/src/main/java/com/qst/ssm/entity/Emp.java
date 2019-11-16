package com.qst.ssm.entity;

import org.apache.ibatis.type.Alias;

import java.util.Date;

/**
 * 员工实体类
 */
@Alias("emp")
public class Emp {
    /**
     * 员工ID
     */
    private Integer empId;
    /**
     * 员工编号
     */
    private String empNo;
    /**
     * 员工性名
     */
    private String empName;
    /**
     * 手机号码
     */
    private String mobile;
    /**
     * 性别
     */
    private Integer sex;
    /**
     * 出生日期
     */
    private Date birthday;
    /**
     * 薪水
     */
    private Integer salary;
    /**
     * 部门ID
     */
    private Integer depId;
    /**
     * 籍贯
     */
    private String homeplace;
    /**
     * 员工所属部门
     */
    private  Dep dep;

    public Emp() {
    }

    public Emp(Integer empId, String empNo, String empName, String mobile, Integer sex, Date birthday, Integer salary, Integer depId, String homeplace) {
        this.empId = empId;
        this.empNo = empNo;
        this.empName = empName;
        this.mobile = mobile;
        this.sex = sex;
        this.birthday = birthday;
        this.salary = salary;
        this.depId = depId;
        this.homeplace = homeplace;
    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getEmpNo() {
        return empNo;
    }

    public void setEmpNo(String empNo) {
        this.empNo = empNo;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public Integer getDepId() {
        return depId;
    }

    public void setDepId(Integer depId) {
        this.depId = depId;
    }

    public String getHomeplace() {
        return homeplace;
    }


    public void setHomeplace(String homeplace) {
        this.homeplace = homeplace;
    }

    public Dep getDep() {
        return dep;
    }

    public void setDep(Dep dep) {
        this.dep = dep;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "empId=" + empId +
                ", empNo='" + empNo + '\'' +
                ", empName='" + empName + '\'' +
                ", mobile='" + mobile + '\'' +
                ", sex=" + sex +
                ", birthday=" + birthday +
                ", salary=" + salary +
                ", depId=" + depId +
                ", homeplace='" + homeplace + '\'' +
                '}';
    }
}
