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
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.backend.core.entity.Tenant;
import com.backend.core.service.BaseService;
import com.backend.core.serviceImpl.CacheService;
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
			String tenantId = req.getHeader(Constants.Header_TenantId);
			String requestIP = getIPFromRequest(req);
			if(TenantUtil.tenantInfoList.isEmpty()) {
				//load teants on static variable and use it through the app lifecycle!
				TenantUtil.loadAllTenantsMap();
			}
			logger.info("doFilter :: Realm Filter :: URI - " + req.getRequestURI() + " (Requested IP : " + requestIP + ")");
			//verify for DOS attack (Ideally should be configured as server level config)
			CacheService.setIpCache(requestIP, req.getRequestURI());
			//Allow access for cross site request due to multiple deployments.
			res.setHeader("Access-Control-Allow-Origin", req.getHeader(Constants.Header_Origin));
			res.setHeader("Access-Control-Allow-Credentials","true");
			String origin = req.getHeader(Constants.Header_RequestFrom);
			if(StringUtils.isNotEmpty(origin)) {
				baseService.setOrigin(origin);
			}
			// skip realm check in case of load testing or health check urls
			if(req.getRequestURI().contains("/loadTesting") && !configUtil.isProdMode() || req.getRequestURI().contains("/actuator")) {
				baseService.setTenantInfo(TenantUtil.getTenantInfo("devTenant"));
				chain.doFilter(request, response);
			}
			// incase of socket request seperate interceptor will handle header parsing and realm initialization.
			else if(req.getRequestURI().contains("wsocket") || req.getRequestURI().contains("socket") || req.getRequestURI().contains("social/googleredirect")) {
				chain.doFilter(req, res);
			}
			// Incase of prod mode both tenantId and Origin url mandatory.
			else if (configUtil.isProdMode()) {
				if (StringUtils.isNotEmpty(tenantId)
						&& StringUtils.isNotEmpty(req.getHeader(Constants.Header_RequestOrigin))) {
					switch(req.getHeader(Constants.Header_RequestOrigin)) {
						case "web" : 	// Check for active tenant and allowed origins
										
										if (!StringUtils.isEmpty(origin) && TenantUtil.isTenantActive(tenantId)
												&& (requestIP.equals("0:0:0:0:0:0:0:1") || TenantUtil.isAllowedOriginForTenant(tenantId, origin))) {
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
				//incase of successfull google redirect tenant information is not required
				else if(req.getRequestURI().equals("/social/googleredirect") && StringUtils.isNotEmpty(req.getParameter("code"))) {
					if(req.getParameter("state") != null) {
						JSONObject json = new JSONObject(req.getParameter("state"));
						tenantId = json.getString("TenantId");
						chain.doFilter(request, response);
					}
					else {
						((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
								"Redirect URL missing state param");
						return;
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
				logger.info("Requested URI : " + req.getRequestURI());
				if(StringUtils.isEmpty(tenantId)) {
					if(req.getParameter("state") != null) {
						JSONObject json = new JSONObject(req.getParameter("state"));
						tenantId = json.getString("TenantId");
					}
					else {
						tenantId = "devTenant";
					}
				}
				baseService.setTenantInfo(TenantUtil.getTenantInfo(tenantId));
				chain.doFilter(request, response);
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
	
	private String getIPFromRequest(HttpServletRequest request) {
        String ip = null;
        if (request == null) {
            return null;
        }

        /*try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (!StringUtils.isEmpty(ip))
            return ip;*/

        for (String header : Constants.IP_HEADER_CANDIDATES) {
            String ipList = request.getHeader(header);
            if (ipList != null && ipList.length() != 0 && !"unknown".equalsIgnoreCase(ipList)) {
                return ipList.split(",")[0];
            }
        }

        return request.getRemoteAddr();
    }

}