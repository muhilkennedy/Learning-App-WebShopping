package com.backend.persistence.entity;

import java.io.Serializable;
import java.util.Date;

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
@Table(name = "TASK")
public class Task implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TASKID")
	private int taskId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "EMPLOYEEID", nullable = false)
	private EmployeeInfo employeeId;
	
	@ManyToOne
	@JoinColumn(name = "ASSIGNEE", nullable = false)
	private EmployeeInfo assignee;
	
	@Column(name = "CONTENT")
	private String content;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "ENDDATE")
	private long endDate;
	
	public Task() {
		super();
	}

	public Task(Tenant tenant, EmployeeInfo employeeId, EmployeeInfo assignee, String content, String status,
			long endDate) {
		super();
		this.tenant = tenant;
		this.employeeId = employeeId;
		this.assignee = assignee;
		this.content = content;
		this.status = status;
		this.endDate = endDate;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public EmployeeInfo getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(EmployeeInfo employeeId) {
		this.employeeId = employeeId;
	}

	public EmployeeInfo getAssignee() {
		return assignee;
	}

	public void setAssignee(EmployeeInfo assignee) {
		this.assignee = assignee;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getEndDate() {
		return endDate;
	}

	public void setEndDate(long endDate) {
		this.endDate = endDate;
	}

}
