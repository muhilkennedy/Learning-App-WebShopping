package com.backend.core.configuration;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.rowset.serial.SerialBlob;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import com.backend.core.entity.Tenant;
import com.backend.core.entity.TenantDetails;
import com.backend.core.security.RSAKeyPairGenerator;
import com.backend.core.service.TenantService;

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
	 * This method is for dev purposes only. 
	 * In future ER can be done to implement default data to onboarded tenant.(has to be merged as single method)
	 */
	@PostConstruct
	private void loadTenantDetail() {
		try {
			File file = ResourceUtils.getFile(
				      "classpath:devAssets/Brand-Icon.png");
			Tenant devTenant = tenantService.findTenantByID("devTenant");
			TenantDetails devTenantDetail = devTenant.getTenantDetail();
			byte[] test = FileUtils.readFileToByteArray(file);
			devTenantDetail.setTenantLogo(new SerialBlob(test));
			tenantService.save(devTenant);
		} catch (Exception e) { 
			e.printStackTrace();
		}		
	}
	
	/**
	 * Load Tenant/realm details from properties file and load into DB.
	 * @throws Exception 
	 */
	@PostConstruct
	private void loadRealmInformation() throws Exception {
		logger.info("loading Tenant/Realm information");
		Map<String, Tenant> tenantMap = getTenantMap();
		for (String tenant : tenants.getRealm()) {
			String[] tenantDetails = tenant.split(",");
			Tenant realm = tenantMap.get(tenantDetails[1].trim());
			if (realm != null) {
				realm.setUniqueName(tenantDetails[0].trim());
				realm.setActive(Boolean.parseBoolean(tenantDetails[2].trim()));
				realm.setPurge(Boolean.parseBoolean(tenantDetails[4].trim()));
				String originsList = tenantDetails[3].trim().replace("[", "").replace("]", "");
				String[] allowedOrigins = originsList.split("-");
				tenantService.removeOrigins(realm.getTenantID());
				for (String origin : allowedOrigins) {
					tenantService.addAllowedOrigin(realm.getTenantID(), origin);
				}
			} else {
				realm = new Tenant(tenantDetails[1].trim(), tenantDetails[0].trim(),
						Boolean.parseBoolean(tenantDetails[2].trim()), Boolean.parseBoolean(tenantDetails[4].trim()));
			}
			RSAKeyPairGenerator rsa = new RSAKeyPairGenerator();
			realm.setPublicKey(rsa.getPublicKey());
			realm.setPrivateKey(rsa.getPrivateKey());
			tenantService.save(realm);
			tenantMap.remove(tenantDetails[1].trim());
			logger.info("loaded tenant -> " + realm.getUniqueName());
		}
		// remaing tenants are considered removed.
		if (!tenantMap.isEmpty()) {
			tenantMap.entrySet().parallelStream().forEach(tenant -> {
				tenant.getValue().setPurge(false);
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
