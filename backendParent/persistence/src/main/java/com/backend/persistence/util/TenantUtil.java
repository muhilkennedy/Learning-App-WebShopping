package com.backend.persistence.util;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.persistence.entity.Tenant;
import com.backend.persistence.service.TenantService;

/**
 * @author muhil
 *
 */
@Component
public class TenantUtil {
	
	private Logger logger = LoggerFactory.getLogger(TenantUtil.class);
	
	@Autowired
	private TenantService tenantService;
	
	public Tenant getTenantInfo(String tenantId) {
		return tenantService.findTenantByID(tenantId);
	}
	
	public boolean isTenantActive(String tenantId) {
		Tenant tenant = getTenantInfo(tenantId);
		return tenant != null ? tenant.isActive() : false;
	}
	
	public boolean isAllowedOriginForTenant(String tenantId, String origin) {
		try {
			List<String> allowedOrigins = tenantService.getAllowedOriginsForTenant(tenantId);
			return allowedOrigins.contains(origin);
		} catch (Exception e) {
			logger.error("Exception in fetching origins - " + e.getMessage());
		}
		return false;
	}
}
