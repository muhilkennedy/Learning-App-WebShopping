package com.backend.api.service;

import org.json.JSONObject;
import org.springframework.social.google.api.userinfo.GoogleUserInfo;

public interface SocialLoginService {

	String authenticationURL();

	String getAccessToken(String code);

	GoogleUserInfo getGoogleUserProfile(String accesstoken);

	void createCustomerIfrequired(JSONObject json);

}
