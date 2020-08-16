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
@Table(name = "PUSHNOTIFICATION")
public class PushNotification implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "NOTIFICATIONID")
	private int notificationId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "EMPLOYEEID", nullable = false)
	private EmployeeInfo employeeId;
	
	@Column(name = "NOTIFICATONCONTENT")
	private String content;
	
	public PushNotification() {
		super();
	}

	public PushNotification(Tenant tenant, EmployeeInfo employeeId, String content) {
		super();
		this.tenant = tenant;
		this.employeeId = employeeId;
		this.content = content;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(int notificationId) {
		this.notificationId = notificationId;
	}

	public EmployeeInfo getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(EmployeeInfo employeeId) {
		this.employeeId = employeeId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
