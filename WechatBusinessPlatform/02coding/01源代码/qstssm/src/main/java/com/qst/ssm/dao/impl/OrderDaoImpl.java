package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IOrderDao;
import com.qst.ssm.entity.Order;
import com.qst.ssm.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository("orderDao")
public class OrderDaoImpl implements IOrderDao {

    @Autowired
    @Qualifier("orderMapper")
    private OrderMapper orderMapper;

    @Override
    public List<Order> queryOrder() {
        return orderMapper.queryOrder();
    }

    @Override
    public int deleteOrder(int orderId) {
        return orderMapper.deleteOrder(orderId);
    }

    @Override
    public int updateOrder(Order order) {
        return orderMapper.updateOrder(order);
    }
}
