package com.qst.ssm.entity;

public class Two {

    private Integer pd_twoId;            //商品分类二级表ID
    private  String pd_twoNo;            //商品分类二级NO
    private  String pd_twoName;          //商品分类二级名字
    private Integer claFid;              //商品分类ID

    public Two() {
    }

    public Two(Integer pd_twoId, String pd_twoNo, String pd_twoName, Integer claFid) {
        this.pd_twoId = pd_twoId;
        this.pd_twoNo = pd_twoNo;
        this.pd_twoName = pd_twoName;
        this.claFid = claFid;
    }

    public Integer getPd_twoId() {
        return pd_twoId;
    }

    public void setPd_twoId(Integer pd_twoId) {
        this.pd_twoId = pd_twoId;
    }

    public String getPd_twoNo() {
        return pd_twoNo;
    }

    public void setPd_twoNo(String pd_twoNo) {
        this.pd_twoNo = pd_twoNo;
    }

    public String getPd_twoName() {
        return pd_twoName;
    }

    public void setPd_twoName(String pd_twoName) {
        this.pd_twoName = pd_twoName;
    }

    public Integer getClaFid() {
        return claFid;
    }

    public void setClaFid(Integer claFid) {
        this.claFid = claFid;
    }

    @Override
    public String toString() {
        return "Two{" +
                "pd_twoId=" + pd_twoId +
                ", pd_twoNo='" + pd_twoNo + '\'' +
                ", pd_twoName='" + pd_twoName + '\'' +
                ", claFid=" + claFid +
                '}';
    }
}
