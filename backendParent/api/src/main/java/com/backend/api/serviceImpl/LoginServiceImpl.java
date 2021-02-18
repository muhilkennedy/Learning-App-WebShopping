package com.backend.api.serviceImpl;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.service.LoginService;
import com.backend.commons.exceptions.InvalidUserException;
import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.EmployeeAddress;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.interfaces.User;
import com.backend.core.service.BaseService;
import com.backend.core.serviceImpl.CacheService;
import com.backend.core.util.ConfigUtil;
import com.backend.core.util.DashboardStatusUtil;
import com.backend.core.util.RSAUtil;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.EmployeeService;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

	private static Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ConfigUtil configUtil;

	@Autowired
	private EmployeeService empService;
	
	@Autowired
	private CustomerInfoService customerService;

	@Override
	public User loginUser(User user) {
		if (user instanceof EmployeeInfo) {
			EmployeeInfo empInfo = (EmployeeInfo) user;
			EmployeeInfo actualUser = empService.findEmployeeByEmail(empInfo.getEmailId());
			if (actualUser != null && BCrypt.checkpw(empInfo.fetchPassword(), actualUser.fetchPassword())) {
				actualUser.setLastLogin(CommonUtil.convertToUTC(new Date().getTime()));
				CacheService.setLoggedInSatus(actualUser.getEmployeeId(), new Date());
				actualUser.setLoggedIn(true);
				return actualUser;
			}
		}
		else {
			CustomerInfo cusInfo = (CustomerInfo) user;
			CustomerInfo actualUser = customerService.getCustomerByEmail(cusInfo.getEmailId());
			if(actualUser != null && BCrypt.checkpw(cusInfo.fetchPassword(), actualUser.fetchPassword())){
				actualUser.setLastLogin(CommonUtil.convertToUTC(new Date().getTime()));
				return actualUser;
			}
		}
		return null;
	}
	
	@Override
	public void logoutUser() {
		User user = baseService.getUserInfo();
		if (user instanceof EmployeeInfo) {
			EmployeeInfo empInfo = (EmployeeInfo) user;
			empInfo = empService.findEmployeeByEmail(empInfo.getEmailId());
			empInfo.setLoggedIn(false);
			empInfo.setLastLogin(new Date().getTime());
			empService.save(empInfo);
		}
		else {
			CustomerInfo cusInfo = (CustomerInfo) user;
			cusInfo.setLastLogin(CommonUtil.convertToUTC(new Date().getTime()));
			customerService.save(cusInfo);
		}
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

	/**
	 * @return - generated password incase of successfull creation else null.
	 */
	@Override
	public String createUser(User user) throws Exception{
		String generatedPassword = null;
		try {
			if (user instanceof EmployeeInfo) {
				EmployeeInfo empInfo = (EmployeeInfo) user;
				empInfo.setTenant(baseService.getTenantInfo());
				//Autogenerate password if not present.
				if(StringUtils.isEmpty(empInfo.fetchPassword()))
				{
					generatedPassword = CommonUtil.generateRandomPassword();
					empInfo.setPassword(generatedPassword.trim());
					if (!configUtil.isProdMode()) {
						System.out.println(" Generated Password for Employee - " + empInfo.getEmailId() + " is = "
								+ generatedPassword.trim());
					}
				}
				String encrptedPassword = BCrypt.hashpw(empInfo.fetchPassword(), BCrypt.gensalt(CommonUtil.saltRounds));
				empInfo.setPassword(encrptedPassword);
				//considering only one address at the time of creation.
				EmployeeAddress address = empInfo.getEmployeeAddress().get(0);
				address.setTenant(baseService.getTenantInfo());
				address.setEmployee(empInfo);
				empService.save(empInfo);
				return generatedPassword;
			}
			else {
				CustomerInfo cusInfo = (CustomerInfo) user;
				cusInfo.setTenant(baseService.getTenantInfo());
				cusInfo.setPassword(RSAUtil.decrypt(cusInfo.fetchPassword(), baseService.getTenantInfo().fetchPrivateKey()));
				String encrptedPassword = BCrypt.hashpw(cusInfo.fetchPassword(), BCrypt.gensalt(CommonUtil.saltRounds));
				cusInfo.setPassword(encrptedPassword);
				cusInfo.setActive(true);
				cusInfo.setLoginMode(CommonUtil.Key_internalUser);
				customerService.save(cusInfo);
				DashboardStatusUtil.incrementCustomerCount(baseService.getTenantInfo());
			}

		} catch (Exception ex) {
			logger.error("Error Creating user - Exception :", ex.getMessage());
			throw new Exception("Error Creating user : " + ex.getMessage());
		}
		return generatedPassword;
	}
	
	@Override
	public boolean checkIfUserExists(String email) {
		if(empService.findEmployeeByEmailOrId(email) != null) {
			return true;
		}
		return false;
	}
	
	@Override
	public boolean checkIfCustomerExists(String email) {
		if(customerService.getCustomerByEmail(email) != null) {
			return true;
		}
		return false;
	}
	
	@Override
	public boolean updateEmployeePassword(String email, String newPassword) {
		EmployeeInfo empInfo = empService.findEmployeeByEmailOrId(email);
		if(empInfo != null) {
			String encrptedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(CommonUtil.saltRounds));
			empInfo.setPassword(encrptedPassword);
			empService.save(empInfo);
			return true;
		}
		return false;
	}
	
	@Override
	public boolean updateEmployeePasswordWithCheck(String newPassword, String oldPassword) {
		EmployeeInfo empInfo = empService
				.findEmployeeByEmailOrId(((EmployeeInfo) baseService.getUserInfo()).getEmailId());
		if (empInfo != null && BCrypt.checkpw(oldPassword, empInfo.fetchPassword())) {
			String encrptedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(CommonUtil.saltRounds));
			empInfo.setPassword(encrptedPassword);
			empService.save(empInfo);
			return true;
		}
		return false;
	}
	
	@Override
	public void toggleUserStatus(boolean status) {
		User user = baseService.getUserInfo();
		if(user != null && user instanceof EmployeeInfo) {
			EmployeeInfo info = (EmployeeInfo) baseService.getUserInfo();
			info.setActive(status);
			empService.save(info);
		}
	}
	
	@Override
	public CustomerInfo getCustomerByEmail(String email) {
		return customerService.getCustomerByEmail(email);
	}
	
	@Override
	public boolean updateCustomerPassword(String email, String newPassword) {
		CustomerInfo custInfo = customerService.getCustomerByEmail(email);
		if(custInfo != null) {
			String encrptedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(CommonUtil.saltRounds));
			custInfo.setPassword(encrptedPassword);
			customerService.save(custInfo);
			return true;
		}
		return false;
	}

}
