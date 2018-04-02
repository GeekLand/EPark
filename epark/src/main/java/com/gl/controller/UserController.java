package com.gl.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gl.dto.ResultResponseDto;
import com.gl.dto.UserInParam;
import com.gl.service.UserService;

/**
 * 用户信息处理类
 * 
 * @author weiguangming
 *
 */ 
@RestController
@RequestMapping("epark/user")
public class UserController {

	private static Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	/**
	 * 查询用户
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/find")
	public ResultResponseDto<Map<String, Object>> find(UserInParam param) {
		ResultResponseDto<Map<String, Object>> result = new ResultResponseDto<Map<String, Object>>();
		Map<String, Object> rMap = new HashMap<String, Object>();
		try {
			rMap = userService.findUser(param);
			result.setData(rMap);
			result.setCode(ResultResponseDto.CODE_SUCCESS);
			LOGGER.trace("login successs.");
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			result.setCode(ResultResponseDto.CODE_ERROR);
		}
		return result;
	}

	/**
	 * 注册用户
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/register")
	public ResultResponseDto<Map<String, Object>> registerUser(UserInParam param) {
		ResultResponseDto<Map<String, Object>> result = new ResultResponseDto<Map<String, Object>>();
		Map<String, Object> rMap = new HashMap<String, Object>();
		try {
			rMap = userService.registerUser(param);
			result.setData(rMap);
			result.setCode(ResultResponseDto.CODE_SUCCESS);
			LOGGER.trace("register successs.");
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			result.setCode(ResultResponseDto.CODE_ERROR);
		}
		return result;
	}
}
