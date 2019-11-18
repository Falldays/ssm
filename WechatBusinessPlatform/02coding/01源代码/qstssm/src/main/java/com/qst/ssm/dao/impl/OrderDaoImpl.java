package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IOrderDao;
import com.qst.ssm.entity.Order;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository("orderDao")
public class OrderDaoImpl implements IOrderDao {


    

    @Override
    public List<Order> queryOrder() {
        return null;
    }

    @Override
    public int deleteOrder(int ordeId) {
        return 0;
    }

    @Override
    public int updateOrder(Order order) {
        return 0;
    }
}
