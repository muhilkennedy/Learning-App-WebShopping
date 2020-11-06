package com.backend.persistence.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.backend.core.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "EMPLOYEEPERMISSIONSMAP")
public class EmployeePermissionsMap implements Serializable{

	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MAPID")
	private int mapId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "EMPLOYEEID", nullable = false)
	private EmployeeInfo employee;
	
	@ManyToOne
	@JoinColumn(name = "PERMISSIONID", nullable = false)
	private EmployeePermissions permission;

	public EmployeePermissionsMap() {
		super();
	}

	public EmployeePermissionsMap(Tenant tenant, EmployeeInfo employee, EmployeePermissions permission) {
		super();
		this.tenant = tenant;
		this.employee = employee;
		this.permission = permission;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public void setEmployee(EmployeeInfo employee) {
		this.employee = employee;
	}

	public EmployeePermissions getPermission() {
		return permission;
	}

	public void setPermission(EmployeePermissions permission) {
		this.permission = permission;
	}
	
}
