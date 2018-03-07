#
# Mysql  
# 
# database name : epark
# account       : root
# password      : 123456
#



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
