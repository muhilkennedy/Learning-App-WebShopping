package com.backend.api.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.admin.messages.EmployeePOJOHelper;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.JWTResponse;
import com.backend.api.messages.Response;
import com.backend.api.service.LoginService;
import com.backend.commons.service.EmailService;
import com.backend.commons.service.OtpService;
import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.JWTUtil;
import com.backend.commons.util.RSAUtil;
import com.backend.core.interfaces.User;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("login")
public class LoginController {
	
	private static Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private OtpService otpService;
	
	@Autowired
	private EmailService emailService;
	
	@RequestMapping(value = "/employeeAuthentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<JWTResponse> employeeLogin(HttpServletRequest request, @RequestBody EmployeeInfo empObj) {
		GenericResponse<JWTResponse> response = new GenericResponse<JWTResponse>();
		try {
			empObj.setPassword(RSAUtil.decrypt(empObj.fetchPassword(), baseService.getTenantInfo().fetchPrivateKey()));
			User empInfo = loginService.loginUser(empObj);
			if (empInfo != null) {
				JWTResponse token = new JWTResponse();
				token.setToken(JWTUtil.generateToken(empObj.getEmailId(), CommonUtil.Key_employeeUser));
				token.setExpiry(JWTUtil.getExpirationDateFromToken(token.getToken()).getTime());
				response.setData(token);
				response.setDataList(Arrays.asList(empInfo));
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Invalid User Credentials"));
				response.setStatus(Response.Status.FORBIDDEN);
			}
		} catch (Exception ex) {
			logger.error("employeeLogin : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/employeeForgotPassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> employeeForgotPassword(HttpServletRequest request, @RequestBody EmployeePOJOHelper empObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if (loginService.checkIfUserExists(empObj.getEmailId())) {
				String otp = otpService.generateOtp(empObj.getEmailId() + CommonUtil.Key_employeeOTP);
				emailService.sendOtpEmail(empObj.getEmailId(), otp);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("User does not exists"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("employeeForgotPassword : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/employeeOtpVerification", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> employeeOtpVerification(HttpServletRequest request, @RequestBody EmployeePOJOHelper empObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if(!StringUtils.isEmpty(empObj.getEmailId()) && !StringUtils.isEmpty(empObj.getOtp())) {
				if(empObj.getOtp().equals(otpService.getOtp(empObj.getEmailId() + CommonUtil.Key_employeeOTP))) {
					response.setStatus(Response.Status.OK);
				}
				else {
					response.setErrorMessages(Arrays.asList("User Verification Failed"));
					response.setStatus(Response.Status.FORBIDDEN);
				}
			}
			else {
				response.setErrorMessages(Arrays.asList("Required Information is Missing"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("employeeOtpVerification : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/employeePasswordUpdate", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> employeePasswordUpdate(HttpServletRequest request, @RequestBody EmployeeInfo empObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if(loginService.updateEmployeePassword(empObj.getEmailId(), empObj.fetchPassword())) {
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("Password Update Failed"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("employeePasswordUpdate : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}


}
