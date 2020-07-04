package com.backend.persistence.util;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.persistence.base.entity.Tenant;
import com.backend.persistence.base.service.TenantService;

/**
 * @author muhil
 *
 */
@Component
public class TenantUtil {
	
	private static Logger logger = LoggerFactory.getLogger(TenantUtil.class);

	private static TenantService tenantService;
	
	@Autowired
	public void setTenantService(TenantService tenantService) {
		TenantUtil.tenantService = tenantService;
	}
	
	public static Tenant getTenantInfo(String tenantId) {
		return tenantService.findTenantByID(tenantId);
	}
	
	public static boolean isTenantActive(String tenantId) {
		Tenant tenant = getTenantInfo(tenantId);
		return tenant != null ? tenant.isActive() : false;
	}
	
	public static boolean isAllowedOriginForTenant(String tenantId, String origin) {
		try {
			List<String> allowedOrigins = tenantService.getAllowedOriginsForTenant(tenantId);
			return allowedOrigins.contains(origin);
		} catch (Exception e) {
			logger.error("Exception in fetching origins - " + e.getMessage());
		}
		return false;
	}
	
	public static List<Tenant> getAllTenants(){
		return tenantService.getAllTenants();
	}
}
