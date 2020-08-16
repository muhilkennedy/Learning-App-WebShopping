package com.backend.api.messages;

public class PingInfo {
	
	String tenantId;
	String tenantUniqueName;
	boolean tenantActive;
	String message;
	String publicKey;
	public String getTenantId() {
		return tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	public String getTenantUniqueName() {
		return tenantUniqueName;
	}
	public void setTenantUniqueName(String tenantUniqueName) {
		this.tenantUniqueName = tenantUniqueName;
	}
	public boolean isTenantActive() {
		return tenantActive;
	}
	public void setTenantActive(boolean tenantActive) {
		this.tenantActive = tenantActive;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPublicKey() {
		return publicKey;
	}
	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}

}
