package com.qst.ssm.service.impl;

import com.qst.ssm.dao.IOrderxxDao;
import com.qst.ssm.entity.Orderxx;
import com.qst.ssm.service.IOrderxxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;




@Repository("orderxxService")
public class OrderxxServiceImpl implements IOrderxxService {

    @Autowired
    @Qualifier("orderxxDao")
    private IOrderxxDao orderxxDao;

    @Override
    @Transactional(propagation = Propagation.NEVER)
    public Orderxx queryOrderxx(int orderStatus) {
        return orderxxDao.queryOrderxx(orderStatus);
    }
}
