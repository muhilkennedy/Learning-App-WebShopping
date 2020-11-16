package com.backend.api.serviceImpl;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.google.api.Google;
import org.springframework.social.google.api.impl.GoogleTemplate;
import org.springframework.social.google.api.userinfo.GoogleUserInfo;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.service.SocialLoginService;
import com.backend.api.util.SocialUtil;
import com.backend.commons.configuration.SpringSocialProperties;
import com.backend.commons.util.CommonUtil;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.service.CustomerInfoService;

@Service
@Transactional
@Component("googleService")
public class GoogleServiceImpl implements SocialLoginService {

	@Autowired
	private SpringSocialProperties properties;
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private CustomerInfoService custService;
	
	private GoogleConnectionFactory createGoogleConnection() {
		return new GoogleConnectionFactory(properties.getGoogle().getAppId(), properties.getGoogle().getAppSecret());
	}
	
	@Override
	public String authenticationURL() {
		OAuth2Parameters parameters = new OAuth2Parameters();
		parameters.setRedirectUri(properties.getGoogle().getRedirectUri());
		parameters.setScope(properties.getGoogle().getScope());
		JSONObject json = new JSONObject();
		json.put("TenantId", baseService.getTenantInfo().getTenantID());
		parameters.setState(json.toString());
		return createGoogleConnection().getOAuthOperations().buildAuthenticateUrl(parameters);
	}

	@Override
	public String getAccessToken(String code) {
		return createGoogleConnection().getOAuthOperations().exchangeForAccess(code, properties.getGoogle().getRedirectUri(), null)
				.getAccessToken();
	}

	@Override
	public GoogleUserInfo getGoogleUserProfile(String accesstoken) {
		Google google = new GoogleTemplate(accesstoken);
		return google.userOperations().getUserInfo();
	}
	
	@Override
	public void createCustomerIfrequired(JSONObject json) {
		CustomerInfo info = new CustomerInfo();
		info.setEmailId(json.getString(SocialUtil.googleData.email.toString()));
		info.setFirstName(json.getString(SocialUtil.googleData.firstName.toString()));
		info.setLastName(json.getString(SocialUtil.googleData.lastName.toString()));
		info.setProfilePicUrl(json.getString(SocialUtil.googleData.imageUrl.toString()));
		info.setLoginMode(CommonUtil.Key_googleUser);
		info.setActive(true);
		info.setTenant(baseService.getTenantInfo());
		custService.save(info);
	}
	
	
}
