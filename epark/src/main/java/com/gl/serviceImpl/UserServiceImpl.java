package com.gl.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gl.dto.UserInParam;
import com.gl.mapper.TUserModelMapper;
import com.gl.model.TUserModel;
import com.gl.model.TUserModelExample;
import com.gl.service.UserService;
import com.gl.utils.ConstantDatas;

/**
 * 用户服务实现
 * 
 * @author weiguangming
 *
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private TUserModelMapper userModelMapper;

	@Override
	public Map<String, Object> findUser(UserInParam param) {

		Map<String, Object> rMap = new HashMap<String, Object>();

		TUserModelExample ex = new TUserModelExample();
		ex.createCriteria().andAccountEqualTo(param.getAccount().trim())
				.andStatusLessThan(ConstantDatas.TABLE_STATUS_USUAL);
		List<TUserModel> list = userModelMapper.selectByExample(ex);
		if (list != null && list.size() > 0) {
			boolean passFlag = false;
			for (TUserModel u : list) {
				if (param.getPassword().equals(u.getPassword())) {
					rMap.put("result", "success");
					rMap.put("data", u);
					passFlag = true;
					break;
				}
			}
			if (!passFlag) {
				rMap.put("result", "fail");
				rMap.put("info", "密码错误！");
			}
		} else {
			rMap.put("result", "fail");
			rMap.put("info", "帐号不存在！");
		}

		return rMap;
	}

	@Override
	public Map<String, Object> registerUser(UserInParam param) {
		Map<String, Object> rMap = new HashMap<String, Object>();
		// 检测用户名是否已存在
		TUserModelExample ex = new TUserModelExample();
		ex.createCriteria().andAccountEqualTo(param.getAccount().trim());
		List<TUserModel> list = userModelMapper.selectByExample(ex);
		if (list != null && list.size() > 0) {
			rMap.put("result", "fail");
			rMap.put("info", "用户名已存在！");
		} else {
			TUserModel user = new TUserModel();

			user.setAccount(param.getAccount());
			user.setPassword(param.getPassword());
			user.setRole(ConstantDatas.ROLE_CUSTOMER);
			user.setStatus(ConstantDatas.TABLE_STATUS_USUAL);
			user.setCreateTime(param.getCreateTime());
			user.setCreateUser(param.getCreateUser());
			user.setModifyTime(param.getModifyTime());
			user.setModifyUser(param.getModifyUser());

			int r = userModelMapper.insertSelective(user);
			if (r > 0) {
				rMap.put("result", "success");
				rMap.put("data", user);
			}
		}
		return rMap;
	}

}
