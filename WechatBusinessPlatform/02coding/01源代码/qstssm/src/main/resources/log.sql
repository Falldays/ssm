/**业务方法异常日志表*/
drop table if exists t_exception_log;
create table t_exception_log
(
  exp_log_id     bigint primary key Auto_increment comment '异常日志ID',
  method_name    varchar(100) comment '业务方法名',
  class_name     varchar(500) comment '业务类名',
  call_time      timestamp comment '调用时间',
  args_data      varchar(4000) comment '参数JSON数据',
  exp_class_type varchar(200) comment '异常class类型',
  message        varchar(4000) comment '异常日志消息'
);
alter table t_exception_log
  comment '业务方法异常日志表';

/**业务方法调用日志表*/
drop table if exists t_service_call_log;
create table t_service_call_log
(
  call_log_id bigint primary key Auto_increment comment '方法调用日志ID',
  method_name varchar(100) comment '方法名',
  class_name  varchar(500) comment '类名',
  call_time   timestamp comment '调用时间',
  args_data   varchar(4000) comment '参数JSlON数据'
);
alter table t_service_call_log
  comment '业务方法调用日志表';