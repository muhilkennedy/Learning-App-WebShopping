package com.backend.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TENANT")
public class Tenant {
	
	@Id
	@Column(name = "TENANTID")
	private String tenantID;
	
	@Column(name = "TENANTUNIQUENAME")
	private String uniqueName;
	
	@Column(name = "ACTIVE")
	private boolean active;

	public Tenant() {
		super();
	}
	
	public Tenant(String tenantID, String uniqueName, boolean active) {
		super();
		this.tenantID = tenantID;
		this.uniqueName = uniqueName;
		this.active = active;
	}

	public String getTenantID() {
		return tenantID;
	}

	public void setTenantID(String tenantID) {
		this.tenantID = tenantID;
	}

	public String getUniqueName() {
		return uniqueName;
	}

	public void setUniqueName(String uniqueName) {
		this.uniqueName = uniqueName;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
