package com.qst.ssm.service;

import com.qst.ssm.entity.Orderxx;


//订单详细信息表
public interface IOrderxxService {

    //根据订单状态查询订单信息
    Orderxx queryOrderxx(int orderStatus);
}
