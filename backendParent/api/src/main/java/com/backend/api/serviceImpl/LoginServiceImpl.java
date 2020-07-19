package com.backend.api.serviceImpl;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.service.LoginService;
import com.backend.commons.exceptions.InvalidUserException;
import com.backend.commons.util.CommonUtil;
import com.backend.core.interfaces.User;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.service.EmployeeService;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

	private static Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
	
	@Autowired
	private BaseService baseService;

	@Autowired
	private EmployeeService empService;

	@Override
	public User loginUser(User user) {
		if (user instanceof EmployeeInfo) {
			EmployeeInfo empInfo = (EmployeeInfo) user;
			EmployeeInfo actualUser = empService.findEmployeeByEmail(empInfo.getEmailId());
			if (actualUser != null && BCrypt.checkpw(empInfo.fetchPassword(), actualUser.fetchPassword())) {
				actualUser.setLastLogin(new Date());
				return actualUser;
			}
		}
		return null;
	}

	@Override
	public void updateUserPassword(User user) throws InvalidUserException {
		if (user instanceof EmployeeInfo) {
			EmployeeInfo empInfo = (EmployeeInfo) user;
			EmployeeInfo actualUser = empService.findEmployeeByEmail(empInfo.getEmailId());
			if (actualUser != null) {
				String encrptedPassword = BCrypt.hashpw(empInfo.fetchPassword(), BCrypt.gensalt(CommonUtil.saltRounds));
				actualUser.setPassword(encrptedPassword);
				empService.save(actualUser);
			} else {
				logger.error("Invalid User Data - " + empInfo.getEmailId());
				throw new InvalidUserException("Invalid User Data");
			}
		}
	}

	@Override
	public boolean createUser(User user) {
		try {
			if (user instanceof EmployeeInfo) {
				EmployeeInfo empInfo = (EmployeeInfo) user;
				empInfo.setTenant(baseService.getTenantInfo());
				String encrptedPassword = BCrypt.hashpw(empInfo.fetchPassword(), BCrypt.gensalt(CommonUtil.saltRounds));
				empInfo.setPassword(encrptedPassword);
				empService.save(empInfo);
				return true;
			}

		} catch (Exception ex) {
			logger.error("Error Creating user - Exception :", ex.getMessage());
			ex.printStackTrace();
		}
		return false;
	}

}
