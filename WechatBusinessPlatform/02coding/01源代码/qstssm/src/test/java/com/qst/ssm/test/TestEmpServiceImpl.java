package com.qst.ssm.test;

import com.qst.ssm.entity.Emp;
import com.qst.ssm.service.IEmpService;
import org.junit.Test;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

public class TestEmpServiceImpl {
    @Test
    public void testInsertEmp() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IEmpService empService = (IEmpService) context.getBean("empService");
        Emp emp = new Emp();
        emp.setSalary(20000);
        try {
            emp.setBirthday(new SimpleDateFormat("yyyy-MM-dd").parse("1999-01-01"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        emp.setMobile("15765610998");
        emp.setSex(1);
        emp.setEmpNo("D1901");
        emp.setDepId(2);
        emp.setEmpName("李峰");
        emp.setHomeplace("无锡");
        empService.insertEmp(emp);
        context.close();
    }

    @Test
    public void testQueryEmp() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IEmpService empService = (IEmpService) context.getBean("empService");
        List<Emp> emps = empService.queryEmp();
        if (emps != null) {
            for (Emp emp : emps) {
                System.out.println(emp);
            }
        }
        context.close();
    }

    @Test
    public void testGetEmp() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IEmpService empService = (IEmpService) context.getBean("empService");
        Emp emp = empService.getEmp(25);
        System.out.println(emp);
        context.close();
    }

    @Test
    public void testDeleteEmp() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IEmpService empService = (IEmpService) context.getBean("empService");
        int rows=empService.deleteEmp(25);
        System.out.println("rows="+rows);

    }
}
