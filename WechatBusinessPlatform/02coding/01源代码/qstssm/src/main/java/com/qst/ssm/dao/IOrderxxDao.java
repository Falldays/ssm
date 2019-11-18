package com.qst.ssm.dao;

import com.qst.ssm.entity.Orderxx;


//订单详细信息表
public interface IOrderxxDao {
    //根据订单状态查询订单详细信息
    Orderxx queryOrderxx(int orderStatus);
}
