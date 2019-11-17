package com.qst.ssm.entity;

import java.util.Date;

public class Product {
    private Integer pdId;       //商品id
    private  Integer pdthreeId;     //商品分类三级表ID
    private String pdNo;        //商品编号
    private  String pdName;     //商品名称
    private Integer pdPrice;        //价格
    private  Integer pdNumber;      //库存
    private String pdCover;         //商品封面图
    private String pdType;              //商品类型
    private  Integer pdIson;              //是否上架（0/1）
    private Date pdDate;              //创建时间

    public Product() {
    }

    public Product(Integer pdId, Integer pdthreeId, String pdNo, String pdName, Integer pdPrice, Integer pdNumber, String pdCover, String pdType, Integer pdIson, Date pdDate) {
        this.pdId = pdId;
        this.pdthreeId = pdthreeId;
        this.pdNo = pdNo;
        this.pdName = pdName;
        this.pdPrice = pdPrice;
        this.pdNumber = pdNumber;
        this.pdCover = pdCover;
        this.pdType = pdType;
        this.pdIson = pdIson;
        this.pdDate = pdDate;
    }

    public Integer getPdId() {
        return pdId;
    }

    public void setPdId(Integer pdId) {
        this.pdId = pdId;
    }

    public Integer getPdthreeId() {
        return pdthreeId;
    }

    public void setPdthreeId(Integer pdthreeId) {
        this.pdthreeId = pdthreeId;
    }

    public String getPdNo() {
        return pdNo;
    }

    public void setPdNo(String pdNo) {
        this.pdNo = pdNo;
    }

    public String getPdName() {
        return pdName;
    }

    public void setPdName(String pdName) {
        this.pdName = pdName;
    }

    public Integer getPdPrice() {
        return pdPrice;
    }

    public void setPdPrice(Integer pdPrice) {
        this.pdPrice = pdPrice;
    }

    public Integer getPdNumber() {
        return pdNumber;
    }

    public void setPdNumber(Integer pdNumber) {
        this.pdNumber = pdNumber;
    }

    public String getPdCover() {
        return pdCover;
    }

    public void setPdCover(String pdCover) {
        this.pdCover = pdCover;
    }

    public String getPdType() {
        return pdType;
    }

    public void setPdType(String pdType) {
        this.pdType = pdType;
    }

    public Integer getPdIson() {
        return pdIson;
    }

    public void setPdIson(Integer pdIson) {
        this.pdIson = pdIson;
    }

    public Date getPdDate() {
        return pdDate;
    }

    public void setPdDate(Date pdDate) {
        this.pdDate = pdDate;
    }

    @Override
    public String toString() {
        return "Product{" +
                "pdId=" + pdId +
                ", pdthreeId=" + pdthreeId +
                ", pdNo='" + pdNo + '\'' +
                ", pdName='" + pdName + '\'' +
                ", pdPrice=" + pdPrice +
                ", pdNumber=" + pdNumber +
                ", pdCover='" + pdCover + '\'' +
                ", pdType='" + pdType + '\'' +
                ", pdIson=" + pdIson +
                ", pdDate=" + pdDate +
                '}';
    }
}
