package com.qst.ssm;

import com.alibaba.druid.pool.DruidDataSource;
import com.qst.ssm.mapper.ServiceLogMonitorMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/***
 * Spring上下文件监听器
 * Spring容器加载bean完成后进行初始化,用于数据库初始化、获取配置文件等初始化
 * 这里用于创建异常日志表和业务调用日志表
 */
@Component
public class SpringApplicationContextListener implements ApplicationListener<ContextRefreshedEvent> {
    private final static Logger LOGGER = LogManager.getLogger();

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            try {
                ApplicationContext context = event.getApplicationContext();
                DruidDataSource dataSource = (DruidDataSource) context.getBean("dataSource");
                //数据库名称
                String databaseName = dataSource.getConnection().getCatalog();
                ServiceLogMonitorMapper serviceLogMonitorMapper = (ServiceLogMonitorMapper) context.getBean("serviceLogMonitorMapper");
                String tableName = "t_exception_log";
                if (0 == serviceLogMonitorMapper.getTableStatus(databaseName, tableName)) {
                    //创建异常日志表
                    serviceLogMonitorMapper.createExceptionLogTable();
                }
                tableName="t_service_call_log";
                if (0 == serviceLogMonitorMapper.getTableStatus(databaseName, tableName)) {
                    //创建业务调用日志表
                    serviceLogMonitorMapper.createServiceCallLogTable();
                }
                LOGGER.debug("initialized success");
            } catch (Exception e) {
                LOGGER.error("initialized failed ");
                throw new RuntimeException(e);
            }
        }
    }
}
