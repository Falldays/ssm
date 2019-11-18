package com.qst.ssm.controller;

import com.qst.ssm.entity.Orderxx;
import com.qst.ssm.service.IOrderxxService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("orderxx")
public class OrderxxController {

    @Autowired
    @Qualifier("orderxxService")
    private IOrderxxService orderxxService;


    @RequestMapping("info")
    public String queryOrderxx(@RequestParam("order_status") int orderStatus, Model model){
      Orderxx orderxx=orderxxService.queryOrderxx(orderStatus);
      model.addAttribute("orderxx",orderxx);
        return "#";


    }
}
