package com.qst.ssm.controller;


import com.qst.ssm.entity.Dep;
import com.qst.ssm.service.IDepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 部门控制器
 */
@Controller
@RequestMapping("dep")
public class DepController {
    @Autowired
    @Qualifier("depService")
    private IDepService depService;

    /**
     * 添加部门
     *
     * @param dep
     * @return
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public String addDep(Dep dep) {
        int rows = depService.insertDep(dep);
        return "redirect:/dep/add_dep_result.jsp?rows="+rows;
    }

    /**
     * AJAX加载部门数据
     *
     * @return
     */
    @RequestMapping(value="load_data",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public  List<Dep> loadDepData(){
        List<Dep> depList=depService.queryDep();
        //返回部门数据
        return depList;
    }

}
