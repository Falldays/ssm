/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/11/16 20:38:35                          */
/*==============================================================*/


drop table if exists j_admin;

drop table if exists j_classification;

drop table if exists j_collect;

drop table if exists j_order;

drop table if exists j_ordexx;

drop table if exists j_shopping_cart;

drop table if exists j_three_classification;

drop table if exists j_two_classification;

drop table if exists j_user;

drop table if exists j_user_address;

drop table if exists product;

/*==============================================================*/
/* Table: j_admin                                               */
/*==============================================================*/
create table j_admin
(
   admin_id             bigint not null auto_increment comment '管理员ID',
   admin_no             varchar(13) comment '管理员NO',
   admin_name           varchar(30) comment '管理员姓名',
   admin_pass           varchar(32) comment '管理员密码',
   admin_mobile         integer(11) comment '管理员电话',
   admin_sex            int comment '管理员性别',
   primary key (admin_id)
);

alter table j_admin comment '管理员表';

/*==============================================================*/
/* Table: j_classification                                      */
/*==============================================================*/
create table j_classification
(
   cla_fid              bigint not null auto_increment comment '商品分类ID',
   cla_no               varchar(13) comment '商品分类NO',
   cla_name             varchar(30) comment '商品分类名字',
   primary key (cla_fid)
);

alter table j_classification comment '商品分类一级表';

/*==============================================================*/
/* Table: j_collect                                             */
/*==============================================================*/
create table j_collect
(
   coll_id              bigint not null auto_increment comment '收藏表ID',
   user_id              bigint comment '用户ID',
   pd_id                int comment '商品id',
   coll_date            date comment '收藏时间',
   primary key (coll_id)
);

alter table j_collect comment '收藏表';

/*==============================================================*/
/* Table: j_order                                               */
/*==============================================================*/
create table j_order
(
   order_id             bigint not null auto_increment comment '订单表ID',
   order_no             varchar(13) comment '订单号',
   user_id              int comment '用户ID',
   pd_price             decimal comment '订单价格',
   express_no           varchar(13) comment '快递单号',
   create_time          datetime comment '创建时间',
   primary key (order_id)
);

alter table j_order comment '订单表';

/*==============================================================*/
/* Table: j_ordexx                                              */
/*==============================================================*/
create table j_ordexx
(
   orderxx_id           bigint not null auto_increment comment '订单详细信息Id',
   order_id             bigint comment '订单表ID',
   pd_id                bigint comment '商品ID',
   pd_number            int comment '商品数量',
   order_status         int comment '订单状态',
   pd_price             decimal comment '商品价格',
   primary key (orderxx_id)
);

alter table j_ordexx comment '订单详细信息表';

/*==============================================================*/
/* Table: j_shopping_cart                                       */
/*==============================================================*/
create table j_shopping_cart
(
   sc_id                bigint not null auto_increment comment '购物车ID',
   user_id              bigint comment '用户ID',
   pd_id                varchar(11) comment '商品ID',
   sc_number            varchar(100) comment '商品数量',
   sc_date              datetime comment '加入时间',
   primary key (sc_id)
);

alter table j_shopping_cart comment '购物车表';

/*==============================================================*/
/* Table: j_three_classification                                */
/*==============================================================*/
create table j_three_classification
(
   pd_three_id          bigint not null auto_increment comment '商品分类三级表ID',
   pd_three_no          varchar(13) comment '商品分类三级表No',
   pd_three_name        varchar(30) comment '商品分类三级表名字',
   pd_two_id            bigint comment '商品分类二级表ID',
   primary key (pd_three_id)
);

alter table j_three_classification comment '商品分类三级表';

/*==============================================================*/
/* Table: j_two_classification                                  */
/*==============================================================*/
create table j_two_classification
(
   pd_two_id            bigint not null auto_increment comment '商品分类二级表ID',
   pd_two_no            varchar(13) comment '商品分类二级NO',
   pd_two_name          varchar(30) comment '商品分类二级名字',
   cla_fid              bigint comment '商品分类ID',
   primary key (pd_two_id)
);

alter table j_two_classification comment '商品分类二级表';

/*==============================================================*/
/* Table: j_user                                                */
/*==============================================================*/
create table j_user
(
   user_id              bigint not null auto_increment comment '用户ID',
   user_name            varchar(30) comment '用户名',
   user_sex             int comment '性别',
   user_tel             integer(11) comment '手机号码',
   user_nc              varchar(33) comment '用户昵称',
   user_date            date comment '出生日期',
   user_password        char(32) comment '用户密码',
   primary key (user_id)
);

alter table j_user comment '用户信息表';

/*==============================================================*/
/* Table: j_user_address                                        */
/*==============================================================*/
create table j_user_address
(
   add_id               bigint not null auto_increment comment '用户地址ID',
   user_id              bigint comment '用户ID',
   add_name             varbinary(20) comment '收货人',
   add_telephone        varchar(11) comment '收货人电话',
   add_address          varchar(100) comment '详细地址',
   primary key (add_id)
);

alter table j_user_address comment '用户地址表';

/*==============================================================*/
/* Table: product                                               */
/*==============================================================*/
create table product
(
   pd_id                bigint not null auto_increment comment '商品id',
   pd_three_id          bigint comment '商品分类三级表ID',
   pd_no                varchar(50) comment '商品编号',
   pd_name              varchar(50) comment '商品名称',
   pd_price             decimal comment '价格',
   pd_number            int comment '库存',
   pd_cover             text comment '商品封面图',
   pd_type              varchar(50) comment '商品类型',
   pd_ison              int comment '是否上架（0/1）',
   pd_date              datetime comment '创建时间',
   primary key (pd_id)
);

alter table product comment '商品表';

alter table j_collect add constraint FK_Reference_6 foreign key (user_id)
      references j_user (user_id) on delete restrict on update restrict;

alter table j_order add constraint FK_Reference_5 foreign key (user_id)
      references j_user (user_id) on delete restrict on update restrict;

alter table j_ordexx add constraint FK_Reference_9 foreign key (order_id)
      references j_order (order_id) on delete restrict on update restrict;

alter table j_shopping_cart add constraint FK_Reference_4 foreign key (user_id)
      references j_user (user_id) on delete restrict on update restrict;

alter table j_three_classification add constraint FK_Reference_11 foreign key (pd_two_id)
      references j_two_classification (pd_two_id) on delete restrict on update restrict;

alter table j_two_classification add constraint FK_Reference_10 foreign key (cla_fid)
      references j_classification (cla_fid) on delete restrict on update restrict;

alter table j_user_address add constraint FK_Reference_3 foreign key (user_id)
      references j_user (user_id) on delete restrict on update restrict;

alter table product add constraint FK_Reference_8 foreign key (pd_three_id)
      references j_three_classification (pd_three_id) on delete restrict on update restrict;

