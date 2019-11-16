package com.qst.ssm.test;

import com.qst.ssm.entity.Dep;
import com.qst.ssm.service.IDepService;
import org.junit.Test;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 测试Spring配置信息
 */
public class TestSpringConfig {
    /**
     * 测试Service方法监控信息
     */
    @Test
    public void testServiceMethodMonitorLog() {
        AbstractXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        IDepService depService = (IDepService) context.getBean("depService");
        Dep dep = new Dep(null, "A003", "总经理办公司");
        depService.insertDep(dep);
        context.close();
    }

}
