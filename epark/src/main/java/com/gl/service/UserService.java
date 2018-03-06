package com.gl.service;

import java.util.Map;

import com.gl.dto.UserInParam;

/**
 * 用户服务接口
 * 
 * @author weiguangming
 *
 */
public interface UserService {

	/**
	 * 查询用户
	 * 
	 * @param param
	 * @return
	 */
	Map<String, Object> findUser(UserInParam param);

	/**
	 * 注册用户
	 * 
	 * @param param
	 * @return
	 */
	Map<String, Object> registerUser(UserInParam param);
}
