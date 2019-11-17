package com.qst.ssm.entity;

public class Three {

    private Integer pd_threeId;          //商品分类三级表ID
    private  String pd_threeNo;          //商品分类三级表No
    private  String pd_threeName;        //商品分类三级表名字
    private Integer pd_twoId;            //商品分类二级表ID

    public Three() {
    }

    public Three(Integer pd_threeId, String pd_threeNo, String pd_threeName, Integer pd_twoId) {
        this.pd_threeId = pd_threeId;
        this.pd_threeNo = pd_threeNo;
        this.pd_threeName = pd_threeName;
        this.pd_twoId = pd_twoId;
    }

    public Integer getPd_threeId() {
        return pd_threeId;
    }

    public void setPd_threeId(Integer pd_threeId) {
        this.pd_threeId = pd_threeId;
    }

    public String getPd_threeNo() {
        return pd_threeNo;
    }

    public void setPd_threeNo(String pd_threeNo) {
        this.pd_threeNo = pd_threeNo;
    }

    public String getPd_threeName() {
        return pd_threeName;
    }

    public void setPd_threeName(String pd_threeName) {
        this.pd_threeName = pd_threeName;
    }

    public Integer getPd_twoId() {
        return pd_twoId;
    }

    public void setPd_twoId(Integer pd_twoId) {
        this.pd_twoId = pd_twoId;
    }

    @Override
    public String toString() {
        return "Three{" +
                "pd_threeId=" + pd_threeId +
                ", pd_threeNo='" + pd_threeNo + '\'' +
                ", pd_threeName='" + pd_threeName + '\'' +
                ", pd_twoId=" + pd_twoId +
                '}';
    }
}
