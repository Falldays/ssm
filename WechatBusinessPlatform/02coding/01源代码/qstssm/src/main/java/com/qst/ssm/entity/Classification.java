package com.qst.ssm.entity;

public class Classification {

    private int claFid;              //商品分类ID
    private String claNo;               //商品分类NO
    private String claName;             //商品分类名字

    public Classification() {
    }

    public Classification(int claFid, String claNo, String claName) {
        this.claFid = claFid;
        this.claNo = claNo;
        this.claName = claName;
    }

    public int getClaFid() {
        return claFid;
    }

    public void setClaFid(int claFid) {
        this.claFid = claFid;
    }

    public String getClaNo() {
        return claNo;
    }

    public void setClaNo(String claNo) {
        this.claNo = claNo;
    }

    public String getClaName() {
        return claName;
    }

    public void setClaName(String claName) {
        this.claName = claName;
    }

    @Override
    public String toString() {
        return "Classification{" +
                "claFid=" + claFid +
                ", claNo='" + claNo + '\'' +
                ", claName='" + claName + '\'' +
                '}';
    }
}
