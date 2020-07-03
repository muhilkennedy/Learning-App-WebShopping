package com.backend.persistence.entity;

/**
 * @author Muhil
 *
 */
public class TenantCorsMapping {

	private String tenant;
	private String origin;

	public TenantCorsMapping() {
		super();
	}
	
	public TenantCorsMapping(String tenantId, String origin) {
		super();
		this.tenant = tenantId;
		this.origin = origin;
	}

	public String getTenant() {
		return tenant;
	}

	public void setTenant(String tenant) {
		this.tenant = tenant;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
}
