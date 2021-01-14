package com.backend.api.admin.messages;

import java.io.Serializable;

import com.backend.persistence.entity.CustomerInfo;

public class CustomerPOJOHelper implements Serializable {

	private static final long serialVersionUID = 1L;

	private String otp;
	private CustomerInfo customerInfo;

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public CustomerInfo getCustomerInfo() {
		return customerInfo;
	}

	public void setCustomerInfo(CustomerInfo customerInfo) {
		this.customerInfo = customerInfo;
	}

}
