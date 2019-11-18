package com.qst.ssm.controller;

import com.qst.ssm.entity.Order;
import com.qst.ssm.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//处理订单业务请求控制器
@Controller
@RequestMapping("order")
public class OrderController {

    @Autowired
    @Qualifier("orderService")
    private IOrderService orderService;

    //查询订单
    @RequestMapping("query")
    public String queryOrder(HttpServletRequest request, Model model){
        List<Order> orderList=orderService.queryOrder();
        model.addAttribute("orderList",orderList);
        return "#";
    }

    //删除订单
    @RequestMapping("delete")
    public String deleteOrder(@RequestParam("order_id") int orderId){
        int row=orderService.deleteOrder(orderId);
        return "redirect:#"+row;
    }

    //修改订单
    @RequestMapping("update")
    public String updateOrder(Order order){
        int row=orderService.updateOrder(order);
        return "redirect:#"+row;
    }
}
