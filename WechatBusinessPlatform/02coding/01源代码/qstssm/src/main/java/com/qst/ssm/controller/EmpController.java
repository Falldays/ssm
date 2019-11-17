package com.qst.ssm.controller;

import com.qst.ssm.entity.Dep;
import com.qst.ssm.entity.Emp;
import com.qst.ssm.service.IDepService;
import com.qst.ssm.service.IEmpService;
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
 * 处理员工业务请求控制器
 */
@Controller
@RequestMapping("emp")
public class EmpController {
    @Autowired
    @Qualifier("empService")
    private IEmpService empService;
    @Autowired
    @Qualifier("depService")
    private IDepService depService;

    /***
     * 查询所有员工
     * @return
     */
    @RequestMapping("query")
    public String queryEmp(HttpServletRequest request, Model model) {
        List<Emp> empList = empService.queryEmp();
        //request.setAttribute("empList",empList);
        model.addAttribute("empList", empList);
        return "/emp/query_emp.jsp";
    }

    /**
     * 根据员工ID删除员工
     *
     * @param empId
     * @return
     */
    @RequestMapping("delete")
    public String deleteEmp(@RequestParam("emp_id") int empId) {
        int rows = empService.deleteEmp(empId);
        //重定向到删除结果的页面
        return "redirect:/emp/delete_emp_result.jsp?rows=" + rows;
    }

    /**
     * 查看详细信息
     *
     * @return
     */
    @RequestMapping("info")
    public String showInfo(@RequestParam("emp_id") int empId, Model model) {
        Emp emp = empService.getEmp(empId);
        model.addAttribute("emp", emp);
        return "/emp/info.jsp";
    }

    /**
     * 添加员工
     *
     * @param emp
     * @return
     */
    @RequestMapping("add")
    public String addEmp(Emp emp) {
        int rows = empService.insertEmp(emp);
        return "redirect:/emp/info?rows=" + rows;
    }

    /**
     * 加载员工数据
     * http://localhost:8080/emp/load_one?emp_id=4
     *
     * @param empId
     * @return
     */
    @RequestMapping(value = "load_one", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Map<String, Object> loadEmpData(@RequestParam("emp_id") int empId) {
        Emp emp = empService.getEmp(empId);
        List<Dep> deps = depService.queryDep();
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("emp", emp);
        dataMap.put("deps", deps);
        return dataMap;
    }

    /**
     * 修改员工
     *
     * @param emp
     * @return
     */
    @RequestMapping("update")
    public String updateEmp(Emp emp) {
        int rows = empService.updateEmp(emp);
        return "redirect:/emp/update_emp_result.jsp?rows="+rows;
    }

    ;
}
