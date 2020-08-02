package com.backend.api.messages;

import com.backend.persistence.entity.EmployeeInfo;

public class UserPOJOHelper {
	
	private EmployeeInfo employeeInfo;
	private boolean rememberMe;
	
	public EmployeeInfo getEmployeeInfo() {
		return employeeInfo;
	}
	public void setEmployeeInfo(EmployeeInfo employeeInfo) {
		this.employeeInfo = employeeInfo;
	}
	public boolean isRememberMe() {
		return rememberMe;
	}
	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}

}
