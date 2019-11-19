package com.qst.ssm.test;

import com.qst.ssm.dao.IClassificationDao;
import com.qst.ssm.entity.Classification;
import com.qst.ssm.entity.Emp;
import com.qst.ssm.entity.Three;
import com.qst.ssm.entity.Two;
import com.qst.ssm.service.IClassificationService;
import com.qst.ssm.service.IEmpService;
import org.junit.Test;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 商品分类测试类
 * author：lbs
 */
public class TestClassificationServiceImpl {

    /**
     * 测试
     * 查询一级分类的分类信息
     */
    @Test
    public void testQueryClassification() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IClassificationService classificationService = (IClassificationService)context.getBean("classificationService");
        List<Classification> classifications = classificationService.queryClassification();
        if (classifications != null) {
            for (Classification classification : classifications) {
                System.out.println(classification);
            }
        }
        context.close();
    }

    /**
     * 测试
     * 根据一级分类ID查询所有二级分类信息
     */
    @Test
    public void testQueryClassificationByTwo() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IClassificationService classificationService = (IClassificationService)context.getBean("classificationService");
        Integer integer = 2;
        List<Two> twos = classificationService.queryClassificationByTwo(integer);
        if (twos != null) {
            for (Two two : twos) {
                System.out.println(two);
            }
        }
        context.close();
    }

    /**
     * 测试
     * 根据二级分类ID查询所有三级分类信息
     */
    @Test
    public void testQueryClassificationByThree() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IClassificationService classificationService = (IClassificationService)context.getBean("classificationService");
        Integer integer = 2;
        List<Three> threes = classificationService.queryClassificationByThree(integer);
        if (threes != null) {
            for (Three three : threes) {
                System.out.println(three);
            }
        }
        context.close();
    }

    /**
     * 测试
     * 查询所有分类的分类信息
     */
    @Test
    public void testGetClassification() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IClassificationService classificationService = (IClassificationService)context.getBean("classificationService");
        List<Map> maps = classificationService.getClassification();
        if (maps != null) {
            for (Map map : maps) {
                System.out.print("oneId"+map.get("oneId")+"\t"+"twoId="+map.get("twoId")+"\t"+"threeId="+map.get("threeId"));
                System.out.print("\t"+"oneName"+map.get("oneName")+"\t"+"twoName="+map.get("twoName")+"\t"+"threeName="+map.get("threeName"));
                System.out.println("\t"+"number="+map.get("number"));
            }
        }
        context.close();
    }

    /**
     * 测试
     * 根据根据分类级别信息进行分类查询测试
     */
    @Test
    public void testGetClassificationByType() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IClassificationService classificationService = (IClassificationService)context.getBean("classificationService");
        Map<String,Object> map01 = new HashMap<String,Object>();
        map01.put("oneId",1);
//        map01.put("twoId",1);
//        map01.put("threeId",1);
        List<Map> maps = classificationService.getClassificationByType(map01);
        if (maps != null) {
            for (Map map : maps) {
                System.out.print("oneId"+map.get("oneId")+"\t"+"twoId="+map.get("twoId")+"\t"+"threeId="+map.get("threeId"));
                System.out.print("\t"+"oneName"+map.get("oneName")+"\t"+"twoName="+map.get("twoName")+"\t"+"threeName="+map.get("threeName"));
                System.out.println("\t"+"number="+map.get("number"));
            }
        }
        context.close();
    }

}
