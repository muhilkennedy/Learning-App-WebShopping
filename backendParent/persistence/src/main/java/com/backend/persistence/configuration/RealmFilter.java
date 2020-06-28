package com.backend.persistence.configuration;

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

import com.backend.commons.util.Constants;
import com.backend.persistence.util.TenantUtil;

@Component
@Order(1) // AOP used for filter order precedence.
public class RealmFilter implements Filter {

	private static Logger logger = LoggerFactory.getLogger(RealmFilter.class);
	
	@Autowired
	private TenantUtil tenantUtil;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		try {
			HttpServletRequest req = (HttpServletRequest) request;
			String tenantId = null;
			if (StringUtils.isNotEmpty(req.getHeader(Constants.Header_TenantId))) {
				tenantId = req.getHeader(Constants.Header_TenantId);
			} else {
				tenantId = req.getParameter(Constants.Header_TenantId);
			}
			// Check for active tenant and allowed origins
			if (tenantUtil.isTenantActive(tenantId)) {
				logger.info("request for tenant - " + tenantId + " originated from - " + request.getLocalAddr());
				chain.doFilter(request, response);
			} else {
				((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN, "Tenant is not Active");
				return;
			}
		} catch (Exception ex) {
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			return;
		}
	}

}
