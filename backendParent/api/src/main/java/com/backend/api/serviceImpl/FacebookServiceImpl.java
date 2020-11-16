package com.backend.api.serviceImpl;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.google.api.userinfo.GoogleUserInfo;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.service.SocialLoginService;
import com.backend.commons.configuration.SpringSocialProperties;

@Service
@Transactional
@Component("facebookService")
public class FacebookServiceImpl implements SocialLoginService {
	
	@Autowired
	private SpringSocialProperties properties;
	
	@Value("${spring.social.facebook.appSecret}")
    String appSecret;
    
    @Value("${spring.social.facebook.appId}")
    String appId;
    
    private FacebookConnectionFactory connectionFactoryLocator() {
        return new FacebookConnectionFactory(appId, appSecret);
    }

	@Override
	public String authenticationURL() {
		OAuth2Parameters parameters = new OAuth2Parameters();
		parameters.setScope(properties.getGoogle().getScope());
		return connectionFactoryLocator().getOAuthOperations().buildAuthenticateUrl(parameters);
	}

	@Override
	public String getAccessToken(String code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GoogleUserInfo getGoogleUserProfile(String accesstoken) {
		return null;
	}

	@Override
	public void createCustomerIfrequired(JSONObject json) {
		// TODO Auto-generated method stub
		
	}

}
