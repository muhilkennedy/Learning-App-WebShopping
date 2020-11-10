package com.backend.api.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.client.utils.URIBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.social.google.api.userinfo.GoogleUserInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.backend.api.messages.Response;
import com.backend.api.messages.SocialResponse;
import com.backend.api.service.SocialLoginService;
import com.backend.api.util.SocialUtil;


/**
 * @author MuhilKennedy
 *
 */
@RestController
@RequestMapping("social")
public class SocialLoginController {
	
	@Autowired
	@Qualifier("googleService")
	private SocialLoginService googleService;
	
	@Autowired
	@Qualifier("facebookService")
	private SocialLoginService facebookService;
	
	/**
	 * @return redirect URL for google login
	 */
	@GetMapping(value = "/getConsentPageUrl")
	public SocialResponse googleLogin() {
		String url = googleService.authenticationURL();
		SocialResponse response = new SocialResponse();
		if (url != null) {
			response.setStatus(Response.Status.OK);
			response.setURL(url);
		} else {
			List<String> msg = new ArrayList<>();
			msg.add("Google Redirect URL is NOT GENERATED");
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.ERROR);
		}
		return response;
	}
	
	/**
	 * @param code sent from google based on the redirect url given in configuration
	 * @return	redirects to index page with auth details.
	 */
	@GetMapping(value = "/googleredirect")
	public String googleData(@RequestParam("code") String code) {
		RedirectView redirectURL = new RedirectView();
		String url = null;
		JSONObject jsonObj = new JSONObject();
		try {
			
			String accessToken = googleService.getAccessToken(code);
			GoogleUserInfo googleUser = googleService.getGoogleUserProfile(accessToken);
			jsonObj.put(SocialUtil.googleData.firstName.toString(), googleUser.getFirstName());
			jsonObj.put(SocialUtil.googleData.lastName.toString(), googleUser.getLastName());
			jsonObj.put(SocialUtil.googleData.imageUrl.toString(), googleUser.getProfilePictureUrl());
			jsonObj.put(SocialUtil.googleData.email.toString(), googleUser.getEmail());
			jsonObj.put(SocialUtil.googleData.accessToken.toString(), accessToken);
			//persist user details in db if logging in for first time.

		} catch (Exception ex) {
			System.out.println("exception " + ex.getMessage());
		} finally {
			redirectURL.setUrl(url);
			//return redirectURL;
			return jsonObj.toString();
		}
	}
	
	public String addParamsToUrl(String url, String token) throws URISyntaxException {
		URIBuilder urlBuilder = new URIBuilder(url);
		urlBuilder.setPath("/redirect");
		urlBuilder.addParameter("token", token);
		return urlBuilder.toString();
	}

	/**
	 * @return redirect URL for facebook login
	 */
	@GetMapping(value = "/getConsentPageUrlFB")
	public SocialResponse fbLogin() {
		String url = facebookService.authenticationURL();
		SocialResponse response = new SocialResponse();
		if (url != null) {
			response.setStatus(Response.Status.OK);
			response.setURL(url);
		} else {
			List<String> msg = new ArrayList<>();
			msg.add("Google Redirect URL is NOT GENERATED");
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.ERROR);
		}
		return response;
	}
}
