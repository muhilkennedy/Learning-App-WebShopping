package com.backend.core.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "TENANT")
public class Tenant implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "TENANTID")
	private String tenantID;
	
	@Column(name = "TENANTUNIQUENAME")
	private String uniqueName;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	@Column(name = "PURGETENANT")
	private boolean purge;
	
	@Column(name = "PRIVATEKEY")
	private String privateKey;
	
	@Column(name = "PUBLICKEY")
	private String publicKey;

	public Tenant() {
		super();
	}
	
	public Tenant(String tenantID, String uniqueName, boolean active, boolean purge) {
		super();
		this.tenantID = tenantID;
		this.uniqueName = uniqueName;
		this.active = active;
		this.purge = purge;
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

	public boolean doPurge() {
		return purge;
	}

	public void setPurge(boolean purge) {
		this.purge = purge;
	}

	public String fetchPrivateKey() {
		return privateKey;
	}

	public void setPrivateKey(String privateKey) {
		this.privateKey = privateKey;
	}

	public String fetchPublicKey() {
		return publicKey;
	}

	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}

}
