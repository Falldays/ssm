package com.qst.ssm.dao;

import com.qst.ssm.entity.Product;

import java.util.List;

public interface IProductDao {
    /**
     *查询商品类全部信息
     * @return list
     */
    List<Product> queryPro();
    /**
     * 根据商品ID查询信息
     * @param pdId
     * @return
     */
    Product getPro(int pdId);
    /**
     * 添加商品
     * @param  product
     * @return
     */
    int insertPro(Product product);

    /**
     * 根据商品ID删除商品
     * @param
     * @return
     */
    int deletePro(int pdId);


}
