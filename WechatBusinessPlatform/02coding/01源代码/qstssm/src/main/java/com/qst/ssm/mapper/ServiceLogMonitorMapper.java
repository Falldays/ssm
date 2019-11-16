package com.qst.ssm.mapper;

import org.apache.ibatis.annotations.Param;

/**
 * 业务监控信息Mapper接口
 */
public interface ServiceLogMonitorMapper {
    /**
     * 添加Service方法调用日志
     *
     * @param methodName 调用方法名称
     * @param className  类名
     * @param argsData   方法参数,字符串格式数组
     * @return
     */
    int insertCallLog(@Param("method_name") String methodName, @Param("class_name") String className, @Param("args_data") String argsData);

    /**
     * 添加Service方法异常日志
     *
     * @param methodName   调用方法名称
     * @param className    类名
     * @param argsData     方法参数,字符串格式数组
     * @param expClassType 异常class类型
     * @param message      异常消息
     * @return
     */
    int insertErrorLog(@Param("method_name") String methodName, @Param("class_name") String className, @Param("args_data") String argsData, @Param("exp_class_type") String expClassType, @Param("message") String message);

    /**
     * 查询表是否存在
     *
     * @param databaseName 数据实例名称
     * @param tableName    表名
     * @return 1:存在;0:不存在
     */
    int getTableStatus(@Param("databaseName") String databaseName, @Param("tableName") String tableName);

    /***
     * 新建异常日志表
     * @return
     */
    int createExceptionLogTable();

    /**新建业务调用日志表
     * @return
     */
    int createServiceCallLogTable();
}
