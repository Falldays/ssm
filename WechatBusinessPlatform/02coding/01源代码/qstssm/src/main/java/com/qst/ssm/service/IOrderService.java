package com.qst.ssm.service;

import com.qst.ssm.entity.Order;

import java.util.List;

//订单表
public interface IOrderService {
//查询订单信息
    List<Order> queryOrder();
//根据订单ID删除订单
    int deleteOrder(int orderId);
    //修改订单
    int updateOrder(Order order);

}
