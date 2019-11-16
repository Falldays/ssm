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
   admin_id             bigint not null auto_increment comment '����ԱID',
   admin_no             varchar(13) comment '����ԱNO',
   admin_name           varchar(30) comment '����Ա����',
   admin_pass           varchar(32) comment '����Ա����',
   admin_mobile         integer(11) comment '����Ա�绰',
   admin_sex            int comment '����Ա�Ա�',
   primary key (admin_id)
);

alter table j_admin comment '����Ա��';

/*==============================================================*/
/* Table: j_classification                                      */
/*==============================================================*/
create table j_classification
(
   cla_fid              bigint not null auto_increment comment '��Ʒ����ID',
   cla_no               varchar(13) comment '��Ʒ����NO',
   cla_name             varchar(30) comment '��Ʒ��������',
   primary key (cla_fid)
);

alter table j_classification comment '��Ʒ����һ����';

/*==============================================================*/
/* Table: j_collect                                             */
/*==============================================================*/
create table j_collect
(
   coll_id              bigint not null auto_increment comment '�ղر�ID',
   user_id              bigint comment '�û�ID',
   pd_id                int comment '��Ʒid',
   coll_date            date comment '�ղ�ʱ��',
   primary key (coll_id)
);

alter table j_collect comment '�ղر�';

/*==============================================================*/
/* Table: j_order                                               */
/*==============================================================*/
create table j_order
(
   order_id             bigint not null auto_increment comment '������ID',
   order_no             varchar(13) comment '������',
   user_id              int comment '�û�ID',
   pd_price             decimal comment '�����۸�',
   express_no           varchar(13) comment '��ݵ���',
   create_time          datetime comment '����ʱ��',
   primary key (order_id)
);

alter table j_order comment '������';

/*==============================================================*/
/* Table: j_ordexx                                              */
/*==============================================================*/
create table j_ordexx
(
   orderxx_id           bigint not null auto_increment comment '������ϸ��ϢId',
   order_id             bigint comment '������ID',
   pd_id                bigint comment '��ƷID',
   pd_number            int comment '��Ʒ����',
   order_status         int comment '����״̬',
   pd_price             decimal comment '��Ʒ�۸�',
   primary key (orderxx_id)
);

alter table j_ordexx comment '������ϸ��Ϣ��';

/*==============================================================*/
/* Table: j_shopping_cart                                       */
/*==============================================================*/
create table j_shopping_cart
(
   sc_id                bigint not null auto_increment comment '���ﳵID',
   user_id              bigint comment '�û�ID',
   pd_id                varchar(11) comment '��ƷID',
   sc_number            varchar(100) comment '��Ʒ����',
   sc_date              datetime comment '����ʱ��',
   primary key (sc_id)
);

alter table j_shopping_cart comment '���ﳵ��';

/*==============================================================*/
/* Table: j_three_classification                                */
/*==============================================================*/
create table j_three_classification
(
   pd_three_id          bigint not null auto_increment comment '��Ʒ����������ID',
   pd_three_no          varchar(13) comment '��Ʒ����������No',
   pd_three_name        varchar(30) comment '��Ʒ��������������',
   pd_two_id            bigint comment '��Ʒ���������ID',
   primary key (pd_three_id)
);

alter table j_three_classification comment '��Ʒ����������';

/*==============================================================*/
/* Table: j_two_classification                                  */
/*==============================================================*/
create table j_two_classification
(
   pd_two_id            bigint not null auto_increment comment '��Ʒ���������ID',
   pd_two_no            varchar(13) comment '��Ʒ�������NO',
   pd_two_name          varchar(30) comment '��Ʒ�����������',
   cla_fid              bigint comment '��Ʒ����ID',
   primary key (pd_two_id)
);

alter table j_two_classification comment '��Ʒ���������';

/*==============================================================*/
/* Table: j_user                                                */
/*==============================================================*/
create table j_user
(
   user_id              bigint not null auto_increment comment '�û�ID',
   user_name            varchar(30) comment '�û���',
   user_sex             int comment '�Ա�',
   user_tel             integer(11) comment '�ֻ�����',
   user_nc              varchar(33) comment '�û��ǳ�',
   user_date            date comment '��������',
   user_password        char(32) comment '�û�����',
   primary key (user_id)
);

alter table j_user comment '�û���Ϣ��';

/*==============================================================*/
/* Table: j_user_address                                        */
/*==============================================================*/
create table j_user_address
(
   add_id               bigint not null auto_increment comment '�û���ַID',
   user_id              bigint comment '�û�ID',
   add_name             varbinary(20) comment '�ջ���',
   add_telephone        varchar(11) comment '�ջ��˵绰',
   add_address          varchar(100) comment '��ϸ��ַ',
   primary key (add_id)
);

alter table j_user_address comment '�û���ַ��';

/*==============================================================*/
/* Table: product                                               */
/*==============================================================*/
create table product
(
   pd_id                bigint not null auto_increment comment '��Ʒid',
   pd_three_id          bigint comment '��Ʒ����������ID',
   pd_no                varchar(50) comment '��Ʒ���',
   pd_name              varchar(50) comment '��Ʒ����',
   pd_price             decimal comment '�۸�',
   pd_number            int comment '���',
   pd_cover             text comment '��Ʒ����ͼ',
   pd_type              varchar(50) comment '��Ʒ����',
   pd_ison              int comment '�Ƿ��ϼܣ�0/1��',
   pd_date              datetime comment '����ʱ��',
   primary key (pd_id)
);

alter table product comment '��Ʒ��';

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

