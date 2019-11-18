package com.qst.ssm.controller;

import com.qst.ssm.entity.Admin;
import com.qst.ssm.service.IAdminService;
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
 * 处理管理员业务控制器
 */
@Controller
@RequestMapping("admin")
public class AdminController {
    @Autowired
    @Qualifier("adminService")
    private IAdminService adminService;

    /***
     * 查询所有员工
     * @return
     */
    @RequestMapping("query")
    public String queryAdmin(HttpServletRequest request, Model model) {
        List<Admin> adminList = adminService.queryAdmin();
        //request.setAttribute("adminList",adminList);
        model.addAttribute("adminList", adminList);
        return "/admin/query_admin.jsp";
    }

    /**
     * 根据管理员ID删除管理员
     *
     * @param adminId
     * @return
     */
    @RequestMapping("delete")
    public String deleteAdmin(@RequestParam("admin_id") int adminId) {
        int rows = adminService.deleteAdmin(adminId);
        //重定向到删除结果的页面
        return "redirect:/admin/delete_admin_result.jsp?rows=" + rows;
    }

    /**
     * 查看详细信息
     *
     * @return
     */
    @RequestMapping("info")
    public String showInfo(@RequestParam("admin_id") int adminId, Model model) {
        Admin emp = adminService.getAdmin(adminId);
        model.addAttribute("emp", emp);
        return "/admin/info.jsp";
    }

    /**
     * 添加管理员
     *
     * @param admin
     * @return
     */
    @RequestMapping("add")
    public String addAdmin(Admin admin) {
        int rows = adminService.insertAdmin(admin);
        return "redirect:/admin/info?rows=" + rows;
    }

    /**
     * 加载管理员数据
     * http://localhost:8080/emp/load_one?emp_id=4
     *
     * @param adminId
     * @return
     */
    @RequestMapping(value = "load_one", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Map<String, Object> loadAdminData(@RequestParam("admin_id") int adminId) {
        Admin admin = adminService.getAdmin(adminId);
        List<Admin> admins = adminService.queryAdmin();
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("admin", admin);
        return dataMap;
    }

    /**
     * 修改管理员
     *
     * @param admin
     * @return
     */
    @RequestMapping("update")
    public String updateAdmin(Admin admin) {
        int rows =adminService.updateAdmin(admin);
        return "redirect:/admin/update_admin_result.jsp?rows="+rows;
    }
}
