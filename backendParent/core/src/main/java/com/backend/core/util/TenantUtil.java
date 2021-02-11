package com.backend.core.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.entity.Tenant;
import com.backend.core.entity.TenantDetails;
import com.backend.core.service.TenantService;

/**
 * @author muhil
 *
 */
@Component
public class TenantUtil {
	
	private static Logger logger = LoggerFactory.getLogger(TenantUtil.class);
	
	public static String Key_TenantId = "tenantId";

	private static TenantService tenantService;
	
	public static Map<String, Map<Tenant,TenantDetails>> tenantInfoList = new HashMap();
	
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
	
	public static void loadAllTenantsMap() {
		tenantInfoList.clear();
		List<Tenant> tenants = tenantService.getAllTenants();
		for(Tenant tenant: tenants){
			Map<Tenant, TenantDetails> temp = new HashMap<Tenant, TenantDetails>();
			temp.put(tenant, tenant.getTenantDetail());
			tenantInfoList.put(tenant.getTenantID(), temp);
		}
	}
	
}
