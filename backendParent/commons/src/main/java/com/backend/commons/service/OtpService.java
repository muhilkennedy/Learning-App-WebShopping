package com.backend.commons.service;

public interface OtpService {

	String generateOtp(String key);

	String getOtp(String key);

	void clearOtp(String key);

}
