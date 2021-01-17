package com.backend.api.service;

import org.json.JSONObject;
import org.springframework.social.google.api.userinfo.GoogleUserInfo;

import com.backend.api.messages.SocialPOJO;
import com.backend.persistence.entity.CustomerInfo;

public interface SocialLoginService {

	String authenticationURL();

	String getAccessToken(String code);

	GoogleUserInfo getGoogleUserProfile(String accesstoken);

	void createCustomerIfrequired(JSONObject json);

	CustomerInfo createCustomerIfrequired(SocialPOJO customerData);

}
