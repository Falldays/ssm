package com.qst.ssm.mapper;

import com.qst.ssm.entity.Order;

import java.util.List;
//订单表
public interface OrderMapper {

    //查询订单信息
    List<Order> queryOrder();
    //根据订单ID删除订单
    int deleteOrder(int ordeId);
    //修改订单
    int updateOrder(Order order);
}
