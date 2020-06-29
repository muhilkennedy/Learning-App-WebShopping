package com.backend.persistence.configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.commons.configuration.TenantProperties;
import com.backend.persistence.dao.TenantDao;
import com.backend.persistence.entity.Tenant;
import com.backend.persistence.service.TenantService;

/**
 * @author muhil
 *
 */
@Component
public class TenantInfoLoading {
	
	private Logger logger = LoggerFactory.getLogger(TenantInfoLoading.class);
	
	@Autowired
	private TenantProperties tenants;
	
	@Autowired
	private TenantService tenantService;
	
	/**
	 * Load Tenant/realm details from properties file and load into DB.
	 * @throws Exception 
	 */
	@PostConstruct
	private void loadReamInformation() throws Exception {
		logger.info("loading Tenant/Realm information");
		Map<String, Tenant> tenantMap = getTenantMap();
		for (String tenant : tenants.getRealm()) {
			String[] tenantDetails = tenant.split(",");
			Tenant realm = tenantMap.get(tenantDetails[1].trim());
			if (realm != null) {
				realm.setUniqueName(tenantDetails[0].trim());
				realm.setActive(Boolean.parseBoolean(tenantDetails[2].trim()));
				String origins = tenantDetails[3].trim();
				String originsList = origins.replace("[", "").replace("]", "");
				String[] allowedOrigins = originsList.split("-");
				tenantService.removeOrigins(realm.getTenantID());
				for (String origin : allowedOrigins) {
					tenantService.addAllowedOrigin(realm.getTenantID(), origin);
				}
			} else {
				realm = new Tenant(tenantDetails[1].trim(), tenantDetails[0].trim(),
						Boolean.parseBoolean(tenantDetails[1].trim()));
			}
			tenantService.save(realm);
			tenantMap.remove(tenantDetails[1].trim());
			logger.info("loaded tenant -> " + realm.getUniqueName());
		}
		// remaing tenants are considered Inactive.
		if (!tenantMap.isEmpty()) {
			tenantMap.entrySet().parallelStream().forEach(tenant -> {
				tenant.getValue().setActive(false);
				tenantService.save(tenant.getValue());
				logger.info("Tenant Deactivated -> " + tenant.getValue().getUniqueName());
			});
		}
	}
	
	private Map<String, Tenant> getTenantMap() {
		List<Tenant> tenantList = tenantService.getAllTenants();
		Map<String, Tenant> tenantMap = new HashMap<String, Tenant>();
		tenantList.parallelStream().forEach(tenant -> {
			tenantMap.put(tenant.getTenantID(), tenant);
		});
		return tenantMap;
	}

}
