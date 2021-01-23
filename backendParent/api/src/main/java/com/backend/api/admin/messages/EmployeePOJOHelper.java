package com.backend.api.admin.messages;

import java.io.Serializable;
import java.util.List;

public class EmployeePOJOHelper implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long employeeId;
	private String emailId;
	private String otp;
	private List<Integer> permissions;
	private boolean active;

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public List<Integer> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Integer> permissions) {
		this.permissions = permissions;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

}
