package com.qst.ssm.entity;

import org.apache.ibatis.type.Alias;

@Alias("dep")
public class Dep {
    /**
     * 部门ID
     */
    private Integer depId;
    /**
     * 部门编号
     */
    private String depNo;
    /**
     * 部门名称
     */
    private String depName;

    public Dep() {
    }

    public Dep(Integer depId, String depNo, String depName) {
        this.depId = depId;
        this.depNo = depNo;
        this.depName = depName;
    }

    public Integer getDepId() {
        return depId;
    }

    public void setDepId(Integer depId) {
        this.depId = depId;
    }

    public String getDepNo() {
        return depNo;
    }

    public void setDepNo(String depNo) {
        this.depNo = depNo;
    }

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }

    @Override
    public String toString() {
        return "Dep{" +
                "depId=" + depId +
                ", depNo='" + depNo + '\'' +
                ", depName='" + depName + '\'' +
                '}';
    }
}
