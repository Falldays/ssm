package com.qst.ssm.service.aspect;

import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSON;
import com.qst.ssm.mapper.ServiceLogMonitorMapper;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 * 切面类
 * 监控业务层方法
 */
@Aspect
@Component
public class SSMServiceAspect {
    @Autowired
    @Qualifier("serviceLogMonitorMapper")
    private ServiceLogMonitorMapper serviceLogMonitorMapper;

    /**
     * 配置切点
     * 说明:该方法没有其他作用,仅仅是用它来标明一下切入点表达式
     */
    @Pointcut("execution(* com.qst.ssm.service..*ServiceImpl.*(..))")
    public void recordLog(){}
    /**
     * 当业务层方法调用前,向数据库表中添加方法调用日志(包含方法名、参数、类名、调用时间)
     *
     * @param jp
     */
    @Before("recordLog()")
    public void beforeLog(JoinPoint jp) {
        //参数
        Object[] args = jp.getArgs();
        String argsData = ArrayUtil.isEmpty(args) ? "[]" : JSON.toJSONString(args);
        //方法名
        String methodName = jp.getSignature().getName();
        System.out.println(methodName);
        //类型
        String className = jp.getTarget().getClass().getName();
        //添加业务层方法调用日志信息
        serviceLogMonitorMapper.insertCallLog(methodName, className, argsData);
    }


    /**
     * 异常通知类执行代码,当业务层方法发生异常后,执行该代码
     *
     * @param jp
     * @param e
     */
    @AfterThrowing(value="recordLog()", throwing = "e")
    public void afterThrowing(JoinPoint jp, Throwable e) {
        //参数
        Object[] args = jp.getArgs();
        String argsData = ArrayUtil.isEmpty(args) ? "[]" : JSON.toJSONString(args);
        //方法名
        String methodName = jp.getSignature().getName();
        //类型
        String className = jp.getTarget().getClass().getName();
        //异常类型
        String expClassType = e.getClass().getName();
        //异常消息
        String message = e.getMessage();
        message = StrUtil.isEmpty(message) ? "无" : message;
        //添加异常信息
        serviceLogMonitorMapper.insertErrorLog(methodName, className, argsData, expClassType, message);
    }

}
