package com.backend.core.configuration;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author muhil
 *
 */
@Component
@PropertySource("classpath:Tenant.properties")
@ConfigurationProperties(prefix = "app.tenant")
public class TenantProperties {
	
	private List<String> realm;

	public List<String> getRealm() {
		return realm;
	}

	public void setRealm(List<String> realm) {
		this.realm = realm;
	}

}
