package com.backend.core.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;


import com.backend.core.entity.Tenant;
import com.backend.core.service.BaseService;
import com.backend.core.util.ConfigUtil;
import com.backend.core.util.Constants;
import com.backend.core.util.TenantUtil;

@Component
@Order(1) // AOP used for filter order precedence.
public class RealmFilter implements Filter {

	private static Logger logger = LoggerFactory.getLogger(RealmFilter.class);
	
	@Autowired
	private ConfigUtil configUtil;
	
	@Autowired
	private BaseService baseService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		try {
			HttpServletRequest req = (HttpServletRequest) request;
			HttpServletResponse res = (HttpServletResponse) response;
			String tenantId = null;
			String origin = null;
			logger.info("doFilter :: Realm Filter");

			// skip realm check in case of load testing
			if(req.getRequestURI().contains("/loadTesting")) {
				baseService.setTenantInfo(TenantUtil.getTenantInfo("devTenant"));
				chain.doFilter(request, response);
			}
			// incase of socket request seperate interceptor will handle header parsing and realm initialization.
			else if(req.getRequestURI().contains("/wsocket")) {
				// to avoid cors issue incase of ws request Access-Control-Allow-Origin
				res.setHeader("Access-Control-Allow-Origin", req.getHeader(Constants.Header_Origin));
				res.setHeader("Access-Control-Allow-Credentials","true");
				chain.doFilter(req, res);
			}
			// Incase of prod mode both tenantId and Origin url mandatory.
			else if (configUtil.isProdMode()) {
				if (StringUtils.isNotEmpty(req.getHeader(Constants.Header_TenantId))
						&& StringUtils.isNotEmpty(req.getHeader(Constants.Header_RequestOrigin))) {
					tenantId = req.getHeader(Constants.Header_TenantId);
					switch(req.getHeader(Constants.Header_RequestOrigin)) {
						case "web" : 	// Check for active tenant and allowed origins
										origin = req.getHeader(Constants.Header_Origin);
										if (!StringUtils.isEmpty(origin) && TenantUtil.isTenantActive(tenantId)
												&& TenantUtil.isAllowedOriginForTenant(tenantId, origin)) {
											// setSession(tenantId, req);
											baseService.setTenantInfo(TenantUtil.getTenantInfo(tenantId));
											chain.doFilter(request, response);
										} else {
											((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
													"Access to Realm Restricted");
											return;
										}
										break;
						case "android" : 
										if (TenantUtil.isTenantActive(tenantId)) {
											baseService.setTenantInfo(TenantUtil.getTenantInfo(tenantId));
											chain.doFilter(request, response);
										} else {
											((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
													"Access to Realm Restricted");
											return;
										}
										break;
						case "ios" : break;
					}

				}
				else {
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
							"Required Headers Missing");
					return;
				}
				/*if (StringUtils.isNotEmpty(req.getHeader(Constants.Header_TenantId))
						&& StringUtils.isNotEmpty(req.getHeader(Constants.Header_Origin))) {
					tenantId = req.getHeader(Constants.Header_TenantId);
					origin = req.getHeader(Constants.Header_Origin);
					logger.info("request for tenant - " + tenantId + " originated from - " + origin);
				} else {
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
							"Required Headers Missing");
					return;
				}*/
				
			} else {
				if (StringUtils.isNotEmpty(req.getHeader(Constants.Header_TenantId))) {
					tenantId = req.getHeader(Constants.Header_TenantId);
					if (TenantUtil.isTenantActive(tenantId)) {
						//setSession(tenantId, req);
						baseService.setTenantInfo(TenantUtil.getTenantInfo(tenantId));
						chain.doFilter(request, response);
					} else {
						((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
								"Tenant is Disabled");
						return;
					}
				} else {
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
							"TenantId Header is Missing");
					return;
				}
			}
		} catch (Exception ex) {
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			return;
		}
	}
	
	private void setSession(String tenantId, HttpServletRequest request) {
		if (((Tenant) request.getSession().getAttribute(tenantId)) == null) {
			Tenant tenant = TenantUtil.getTenantInfo(tenantId);
			request.getSession().setAttribute(tenantId, tenant);
		}
	}

}