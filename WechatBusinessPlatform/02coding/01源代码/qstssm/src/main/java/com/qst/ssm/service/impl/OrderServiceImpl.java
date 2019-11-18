package com.qst.ssm.service.impl;

import com.qst.ssm.dao.IOrderDao;
import com.qst.ssm.entity.Order;
import com.qst.ssm.mapper.OrderMapper;
import com.qst.ssm.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("orderService")
public class OrderServiceImpl implements IOrderService {

    @Autowired
    @Qualifier("orderDao")
    private IOrderDao orderDao;

    @Override
    public List<Order> queryOrder() {
        return orderDao.queryOrder();
    }

    @Override
    public int deleteOrder(int ordeId) {
        return orderDao.deleteOrder(ordeId);
    }

    @Override
    public int updateOrder(Order order) {
        return orderDao.updateOrder(order);
    }
}
