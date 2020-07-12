package com.backend.persistence.app.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "EMPLOYEEPERMISSIONS")
public class EmployeePermissions {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PERMISSIONID")
	private int permissionId;
	
	@Column(name = "PERMISSIONNAME")
	private String permissionName;
	
	public EmployeePermissions() {
		super();
	}

	public EmployeePermissions(String permission) {
		super();
		this.permissionName = permission;
	}

	public int getPermissionId() {
		return permissionId;
	}

	public void setPermissionId(int permissionId) {
		this.permissionId = permissionId;
	}

	public String getPermissionName() {
		return permissionName;
	}

	public void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}
	
}
