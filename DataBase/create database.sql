#
# Mysql  
# 
# database name : epark
# account       : root
# password      : 123456
#


##  用户表
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'userid',
  `account` varchar(30) NOT NULL COMMENT '帐户名',
  `password` varchar(20) NOT NULL COMMENT '帐户密码',
  `role` int(2) DEFAULT NULL COMMENT '角色',
  `status` int(2) DEFAULT NULL COMMENT '状态:0正常 9删除',
  `create_time` varchar(14) DEFAULT NULL COMMENT '创建时间 yyyyMMddhhmmss',
  `create_user` bigint(20) DEFAULT NULL COMMENT '创建者id',
  `modify_time` varchar(14) DEFAULT NULL COMMENT '修改时间 yyyyMMddhhmmss',
  `modify_user` bigint(20) DEFAULT NULL COMMENT '修改者id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8


## 地址表
CREATE TABLE `t_static_area` (
  `id` bigint(20) NOT NULL COMMENT '主键ID',
  `parent_id` bigint(20) NOT NULL COMMENT '父ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `short_name` varchar(50) DEFAULT NULL COMMENT '简称',
  `longitude` float(11,6) DEFAULT NULL COMMENT '经度',
  `latitude` float(11,6) DEFAULT NULL COMMENT '纬度',
  `level` tinyint(2) DEFAULT NULL COMMENT '等级',
  `sort` smallint(3) DEFAULT NULL COMMENT '排序',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `index_staticarea_parentid` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='区域表'