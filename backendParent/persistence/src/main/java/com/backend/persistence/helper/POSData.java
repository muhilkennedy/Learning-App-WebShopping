package com.backend.persistence.helper;

/**
 * @author Muhil
 *
 */
public class POSData {

	private String primaryKey;
	private String tenantId;
	private String mobile;
	private String timeCreated;
	// need to implement product details later

	public String getTenantId() {
		return tenantId;
	}

	public String getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(String primaryKey) {
		this.primaryKey = primaryKey;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
		this.timeCreated = timeCreated;
	}

}
