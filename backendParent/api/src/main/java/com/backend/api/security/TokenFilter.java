package com.backend.api.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.backend.commons.util.JWTUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.core.util.ConfigUtil;
import com.backend.persistence.service.EmployeeService;

@Component
@Order(2)
public class TokenFilter implements Filter {

	private static Logger logger = LoggerFactory.getLogger(TokenFilter.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ConfigUtil configUtil;
	
	@Autowired
	private EmployeeService empService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		logger.info("doFilter :: JWT Token Filter");
		if (configUtil.isProdMode()) {
			String token = req.getHeader(HttpHeaders.AUTHORIZATION);
			if (token != null && !StringUtils.isEmpty(JWTUtil.extractToken(token))) {
				try {
					String jwtToken = JWTUtil.extractToken(token);
					if (JWTUtil.validateToken(jwtToken)) {
						String email = JWTUtil.getUserEmailFromToken(jwtToken);
						if (JWTUtil.isEmployeeUser(jwtToken)) {
							EmployeeInfo empInfo = empService.findEmployeeByEmail(email);
							empInfo.setEmployeePermissions(empService.getEmployeePermissionsForTenant(empInfo));
							if (empInfo != null) {
								baseService.setUserInfo(empInfo);
								logger.info("Tenant - " + baseService.getTenantInfo().getTenantID());
								logger.info("User - " + (baseService.getUserInfo() instanceof EmployeeInfo
										? "Employee Email : " + ((EmployeeInfo) baseService.getUserInfo()).getEmailId()
										: "Client Email : " + ((EmployeeInfo) baseService.getUserInfo()).getEmailId()));
							} else {
								((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
										"Invalid User Request.... token might have been tampered");
								return;
							}
						} else {
							// load client user data
						}
						chain.doFilter(request, response);
					} else {
						((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
								"Token Validation failed");
						return;
					}
				} catch (Exception e) {
					logger.error("doFilter :: Exception - " + e.getMessage());
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
							"Error in handling the request - " + e.getMessage());
					return;
				}
			} else {
				((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
						"Authorization Header is Missing");
				return;
			}
		} else {
			// running in dev mode
			// consider token if provided or load default admin user any way for further access.
			String token = req.getHeader(HttpHeaders.AUTHORIZATION);
			if (token != null && !StringUtils.isEmpty(JWTUtil.extractToken(token))) {
				try {
					String jwtToken = JWTUtil.extractToken(token);
					if (JWTUtil.validateToken(jwtToken)) {
						String email = JWTUtil.getUserEmailFromToken(jwtToken);
						if (JWTUtil.isEmployeeUser(jwtToken)) {
							EmployeeInfo empInfo = empService.findEmployeeByEmail(email);
							empInfo.setEmployeePermissions(empService.getEmployeePermissionsForTenant(empInfo));
							if (empInfo != null) {
								baseService.setUserInfo(empInfo);
								logger.info("Tenant - " + baseService.getTenantInfo().getTenantID());
								logger.info("User - " + (baseService.getUserInfo() instanceof EmployeeInfo
										? "Employee Email : " + ((EmployeeInfo) baseService.getUserInfo()).getEmailId()
										: "Client Email : " + ((EmployeeInfo) baseService.getUserInfo()).getEmailId()));
							} else {
								((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
										"Invalid User Request.... token might have been tampered");
								return;
							}
						} else {
							// load client user data
						}
					} else {
						((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
								"Token Validation failed");
						return;
					}
				} catch (Exception e) {
					logger.error("doFilter :: Exception - " + e.getMessage());
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
							"Error in handling the request - " + e.getMessage());
					return;
				}
			} else {
				// load default user
				EmployeeInfo empInfo = empService.findEmployeeById(1);
				empInfo.setEmployeePermissions(empService.getEmployeePermissionsForTenant(empInfo));
				if (empInfo != null) {
					baseService.setUserInfo(empInfo);
					logger.info("Tenant - " + baseService.getTenantInfo().getTenantID());
					logger.info("User - " + (baseService.getUserInfo() instanceof EmployeeInfo
							? "Employee Email : " + ((EmployeeInfo) baseService.getUserInfo()).getEmailId()
							: "Client Email : " + ((EmployeeInfo) baseService.getUserInfo()).getEmailId()));
				} else {
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
							"Invalid User Request.... token might have been tampered");
					return;
				}
			}
			chain.doFilter(request, response);
		}
	}

}
