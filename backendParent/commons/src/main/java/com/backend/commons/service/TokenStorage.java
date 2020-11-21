package com.backend.commons.service;

public interface TokenStorage {

	String storeUserToken(String token);

	String getUserToken(String key);

	void clearOtp(String key);

}
