package com.backend.api.messages;

import com.backend.core.entity.EmployeeInfo;
import com.backend.persistence.entity.CustomerInfo;

public class UserPOJOHelper {

	private EmployeeInfo employeeInfo;
	private CustomerInfo customerInfo;
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

	public CustomerInfo getCustomerInfo() {
		return customerInfo;
	}

	public void setCustomerInfo(CustomerInfo customerInfo) {
		this.customerInfo = customerInfo;
	}

}
