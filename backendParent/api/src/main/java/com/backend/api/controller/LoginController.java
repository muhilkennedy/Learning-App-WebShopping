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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.admin.messages.CustomerPOJOHelper;
import com.backend.api.admin.messages.EmployeePOJOHelper;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.JWTResponse;
import com.backend.api.messages.Response;
import com.backend.api.messages.UserPOJOHelper;
import com.backend.api.service.LoginService;
import com.backend.commons.service.EmailService;
import com.backend.commons.service.OtpService;
import com.backend.commons.service.TokenStorage;
import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.JWTUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.interfaces.User;
import com.backend.core.service.BaseService;
import com.backend.core.util.ConfigUtil;
import com.backend.core.util.RSAUtil;
import com.backend.persistence.entity.CustomerInfo;

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
	private ConfigUtil configUtil;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private OtpService otpService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private TokenStorage tokenService;
	
	@RequestMapping(value = "/employeeAuthentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<JWTResponse> employeeLogin(HttpServletRequest request, @RequestBody UserPOJOHelper userObj) {
		GenericResponse<JWTResponse> response = new GenericResponse<JWTResponse>();
		try {
			EmployeeInfo empObj = userObj.getEmployeeInfo();
			empObj.setPassword(RSAUtil.decrypt(empObj.fetchPassword(), baseService.getTenantInfo().fetchPrivateKey()));
			User empInfo = loginService.loginUser(empObj);
			if (empInfo != null) {
				EmployeeInfo eInfo = (EmployeeInfo) empInfo;
				if(eInfo.isActive()) {
					JWTResponse token = new JWTResponse();
					token.setToken(JWTUtil.generateToken(empObj.getEmailId(), CommonUtil.Key_employeeUser, userObj.isRememberMe()));
					token.setExpiry(JWTUtil.getExpirationDateFromToken(token.getToken()).getTime());
					response.setData(token);
					response.setDataList(Arrays.asList(empInfo));
					response.setStatus(Response.Status.OK);
				}
				else {
					response.setErrorMessages(Arrays.asList("Account is Deactivated.. Please contact Admin!"));
					response.setStatus(Response.Status.FORBIDDEN);
				}
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
	
	@RequestMapping(value = "/secure/employeeLogout", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> employeeLogout(HttpServletRequest request) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			loginService.logoutUser();
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("employeePasswordUpdate : " + ex);
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
				if(!configUtil.isProdMode()) {
					logger.info("OTP - " + otp);
				}
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
			if(loginService.updateEmployeePassword(empObj.getEmailId(),empObj.fetchPassword())) {
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
	
	/**************************
	 * CUSTOMER IMPLEMENTATIONS
	 * ************************/
	
	@RequestMapping(value = "/customerAuthentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<JWTResponse> customerLogin(HttpServletRequest request, @RequestBody UserPOJOHelper userObj) {
		GenericResponse<JWTResponse> response = new GenericResponse<JWTResponse>();
		try {
			CustomerInfo cusObj = userObj.getCustomerInfo();
			if(!configUtil.isProdMode() && cusObj.fetchPassword().length() < 25) {
				cusObj.setPassword(cusObj.fetchPassword());
			}
			else {
				cusObj.setPassword(RSAUtil.decrypt(cusObj.fetchPassword(), baseService.getTenantInfo().fetchPrivateKey()));
			}
			User cusInfo = loginService.loginUser(cusObj);
			if (cusInfo != null) {
				CustomerInfo cInfo = (CustomerInfo) cusInfo;
				if(cInfo.isActive()) {
					JWTResponse token = new JWTResponse();
					token.setToken(JWTUtil.generateToken(cInfo.getEmailId(), CommonUtil.Key_clientUser, userObj.isRememberMe()));
					token.setExpiry(JWTUtil.getExpirationDateFromToken(token.getToken()).getTime());
					response.setData(token);
					response.setDataList(Arrays.asList(cInfo));
					response.setStatus(Response.Status.OK);
				}
				else {
					response.setErrorMessages(Arrays.asList("Account is Deactivated.. Please contact Admin!"));
					response.setStatus(Response.Status.FORBIDDEN);
				}
			} else {
				response.setErrorMessages(Arrays.asList("Invalid User Credentials"));
				response.setStatus(Response.Status.FORBIDDEN);
			}
		} catch (Exception ex) {
			logger.error("customerLogin : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/customerForgotPassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> customerForgotPassword(HttpServletRequest request, @RequestBody CustomerPOJOHelper cusObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if (cusObj.getCustomerInfo() != null && loginService.checkIfCustomerExists(cusObj.getCustomerInfo().getEmailId())) {
				String otp = otpService.generateOtp(cusObj.getCustomerInfo().getEmailId() + CommonUtil.Key_clientOTP);
				if(!configUtil.isProdMode()) {
					logger.info("OTP - " + otp);
				}
				emailService.sendOtpEmail(cusObj.getCustomerInfo().getEmailId(), otp);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("User does not exists"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("customerForgotPassword : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/customerOtpVerification", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> customerOtpVerification(HttpServletRequest request, @RequestBody CustomerPOJOHelper custObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if(!StringUtils.isEmpty(custObj.getCustomerInfo().getEmailId()) && !StringUtils.isEmpty(custObj.getOtp())) {
				if(custObj.getOtp().equals(otpService.getOtp(custObj.getCustomerInfo().getEmailId() + CommonUtil.Key_clientOTP))) {
					response.setStatus(Response.Status.OK);
				}
				else {
					response.setErrorMessages(Arrays.asList("User Otp Verification Failed"));
					response.setStatus(Response.Status.FORBIDDEN);
				}
			}
			else {
				response.setErrorMessages(Arrays.asList("Required Information is Missing"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("customerOtpVerification : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/customerPasswordUpdate", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> customerPasswordUpdate(HttpServletRequest request, @RequestBody CustomerPOJOHelper custObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if(loginService.updateCustomerPassword(custObj.getCustomerInfo().getEmailId(), RSAUtil.decrypt(custObj.getCustomerInfo().fetchPassword(), baseService.getTenantInfo().fetchPrivateKey()))) {
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("Password Update Failed"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("customerPasswordUpdate : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/sendRegisterEmailOtp", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> sendRegisterEmailOtp(HttpServletRequest request,  @RequestBody CustomerPOJOHelper cusObj) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			if (cusObj.getCustomerInfo() != null) {
				String otp = otpService.generateOtp(cusObj.getCustomerInfo().getEmailId() + CommonUtil.Key_clientOTP);
				if(!configUtil.isProdMode()) {
					logger.info("OTP - " + otp);
				}
				emailService.sendOtpEmail(cusObj.getCustomerInfo().getEmailId(), otp);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("User Object is NULL"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("sendRegisterEmailOtp : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/registerCustomer", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<CustomerInfo> registerCustomer(HttpServletRequest request,
			@RequestBody CustomerPOJOHelper cusObj) {
		GenericResponse<CustomerInfo> response = new GenericResponse<CustomerInfo>();
		try {
			String otp = otpService.getOtp(cusObj.getCustomerInfo().getEmailId() + CommonUtil.Key_clientOTP);
			if (loginService.checkIfCustomerExists(cusObj.getCustomerInfo().getEmailId())) {
				response.setErrorMessages(Arrays.asList("Email Id Exists"));
				response.setStatus(Response.Status.ERROR);
			} else if (cusObj.getOtp() != null && !otp.equals(cusObj.getOtp())) {
				response.setErrorMessages(Arrays.asList("Invalid/Expired OTP...Please Refresh to continue !"));
				response.setStatus(Response.Status.ERROR);
			} else {
				loginService.createUser(cusObj.getCustomerInfo());
				response.setStatus(Response.Status.OK);
			}
		} catch (Exception ex) {
			logger.error("registerCustomer : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/googleCustomerKeyAuth", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> googleCustomerKeyAuth(HttpServletRequest request,
										@RequestParam(value = "key", required = true) String key) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			if(tokenService.getUserToken(key) != null) {
				CustomerInfo customer = loginService.getCustomerByEmail(JWTUtil.getUserEmailFromToken(tokenService.getUserToken(key)));
				if(customer != null) {
					response.setData(tokenService.getUserToken(key));
					response.setDataList(Arrays.asList(customer));
					response.setStatus(Response.Status.OK);
				}
				else {
					response.setErrorMessages(Arrays.asList("Auth Error"));
					response.setStatus(Response.Status.NO_CONTENT);
				}
			}
		} catch (Exception ex) {
			logger.error("googleCustomerKeyAuth : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
}
