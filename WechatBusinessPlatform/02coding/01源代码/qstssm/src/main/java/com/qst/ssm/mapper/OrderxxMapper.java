package com.qst.ssm.mapper;

import com.qst.ssm.entity.Orderxx;
import org.apache.ibatis.annotations.Param;



//订单详细信息表
public interface OrderxxMapper {

    //根据订单状态查询订单信息
    Orderxx queryOrderxx(@Param("order_status") int orderStatus);
}
