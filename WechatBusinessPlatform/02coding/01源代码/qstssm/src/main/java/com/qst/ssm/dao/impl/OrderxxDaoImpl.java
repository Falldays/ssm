package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IOrderxxDao;
import com.qst.ssm.entity.Orderxx;
import com.qst.ssm.mapper.OrderxxMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;


@Repository("orderxxDao")
public class OrderxxDaoImpl implements IOrderxxDao {
    @Autowired
    @Qualifier("orderxxMapper")
    private OrderxxMapper orderxxMapper;

    @Override
    public Orderxx queryOrderxx(int orderStatus) {
        return orderxxMapper.queryOrderxx(orderStatus);
    }
}
