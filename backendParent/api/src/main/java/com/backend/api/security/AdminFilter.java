package com.backend.api.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.EmployeePermissionsMap;
import com.backend.core.service.BaseService;
import com.backend.core.util.ConfigUtil;

@Component
@Order(3)
public class AdminFilter implements Filter {

	private static Logger logger = LoggerFactory.getLogger(AdminFilter.class);

	@Autowired
	private ConfigUtil configUtil;
	
	@Autowired
	private BaseService baseService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		logger.info("doFilter :: Admin Filter");
		if (configUtil.isProdMode()) {
			if(baseService.getUserInfo()!=null) {
				if (baseService.getUserInfo() instanceof EmployeeInfo) {
					EmployeeInfo emp = (EmployeeInfo) baseService.getUserInfo();
					List<EmployeePermissionsMap> permissions = emp.getEmployeePermissions();
					if (permissions.isEmpty()) {
						((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
								"you do not have permission to proceed further!... please contact support");
						return;
					} else {
						// later deep permission checks can be implemented
						chain.doFilter(request, response);
					}
				}
				else {
					//its a client user restrict access.
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
							"You are not authorized to proceed further");
					return;
				}
			}
		}
		else {
			chain.doFilter(request, response);
		}
	}

}
