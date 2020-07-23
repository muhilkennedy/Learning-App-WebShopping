package com.backend.api.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.JWTResponse;
import com.backend.api.messages.Response;
import com.backend.api.service.LoginService;
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

}
