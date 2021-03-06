package com.backend.core.entity;

import java.util.Date;

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
@Table(name = "SCHEDULEDTASKAUDIT")
public class ScheduledTaskAudit {
	
	@Column(name = "TENANTID")
	private String tenant;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "AUDITID")
	private Long auditId;
	
	@Column(name = "TASKNAME")
	private String taskName;
	
	@Column(name = "STARTTIME")
	private Date startTime;
	
	@Column(name = "ENDTIME")
	private Date endTime;
	
	@Column(name = "STATUS")
	private String status;

	@Column(name = "FAILUREINFO")
	private String failureInfo;

	public ScheduledTaskAudit() {
		super();
	}
	
	public ScheduledTaskAudit(String tenant, String taskName) {
		super();
		this.tenant = tenant;
		this.taskName = taskName;
	}

	public ScheduledTaskAudit(String tenant, String taskName, Date startTime, Date endTime, String status,
			String failureInfo) {
		super();
		this.tenant = tenant;
		this.taskName = taskName;
		this.startTime = startTime;
		this.endTime = endTime;
		this.status = status;
		this.failureInfo = failureInfo;
	}

	public String getTenant() {
		return tenant;
	}

	public void setTenant(String tenant) {
		this.tenant = tenant;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFailureInfo() {
		return failureInfo;
	}

	public void setFailureInfo(String failureInfo) {
		this.failureInfo = failureInfo;
	}

	public Long getAuditId() {
		return auditId;
	}

	public void setAuditId(Long auditId) {
		this.auditId = auditId;
	}
	
}
