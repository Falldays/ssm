package com.qst.ssm.controller;

import com.qst.ssm.entity.User;
import com.qst.ssm.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 处理用户业务控制器
 */
@Controller
@RequestMapping("user")
public class UserController {
    @Autowired
    @Qualifier("userService")
    private IUserService userService;

    /***
     * 查询所有用户
     * @return
     */
    @RequestMapping("query")
    public String queryUser(HttpServletRequest request, Model model) {
        List<User> userList = userService.queryUser();
        //request.setAttribute("userList",userList);
        model.addAttribute("userList", userList);
        return "/user/query_user.jsp";
    }

    /**
     * 根据用户ID删除用户
     *
     * @param userId
     * @return
     */
    @RequestMapping("delete")
    public String deleteUser(@RequestParam("user_id") int userId) {
        int rows = userService.deleteUser(userId);
        //重定向到删除结果的页面
        return "redirect:/user/delete_user_result.jsp?rows=" + rows;
    }

    /**
     * 查看详细信息
     *
     * @return
     */
    @RequestMapping("info")
    public String showInfo(@RequestParam("user_id") int userId, Model model) {
        User user = userService.getUser(userId);
        model.addAttribute("user", user);
        return "/user/info.jsp";
    }

    /**
     * 添加用户
     *
     * @param user
     * @return
     */
    @RequestMapping("add")
    public String addUser(User user) {
        int rows = userService.insertUser(user);
        return "redirect:/user/info?rows=" + rows;
    }

    /**
     * 加载用户数据
     * http://localhost:8080/user/load_one?user_id=4
     *
     * @param userId
     * @return
     */
    @RequestMapping(value = "load_one", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Map<String, Object> loadUserData(@RequestParam("user_id") int userId) {
        User user = userService.getUser(userId);
        List<User> users = userService.queryUser();
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("user", user);
        return dataMap;
    }

    /**
     * 修改用户
     *
     * @param user
     * @return
     */
    @RequestMapping("update")
    public String updateUser(User user) {
        int rows =userService.updateUser(user);
        return "redirect:/user/update_user_result.jsp?rows="+rows;
    }

}
