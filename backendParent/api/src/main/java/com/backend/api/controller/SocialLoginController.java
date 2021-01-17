package com.backend.api.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.client.utils.URIBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.social.google.api.userinfo.GoogleUserInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.api.messages.SocialPOJO;
import com.backend.api.messages.SocialResponse;
import com.backend.api.service.SocialLoginService;
import com.backend.api.util.SocialUtil;
import com.backend.commons.service.TokenStorage;
import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.JWTUtil;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.CustomerInfo;


/**
 * @author MuhilKennedy
 *
 */
@RestController
@RequestMapping("social")
public class SocialLoginController {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	@Qualifier("googleService")
	private SocialLoginService googleService;
	
	@Autowired
	@Qualifier("facebookService")
	private SocialLoginService facebookService;
	
	@Autowired
	private TokenStorage tokenService;
	
	/**
	 * @return redirect URL for google login
	 */
	@GetMapping(value = "/getConsentPageUrl")
	public SocialResponse googleLogin(HttpServletRequest request) {
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
	public RedirectView googleData(@RequestParam("code") String code,
							 @RequestParam("state") String state) {
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
			googleService.createCustomerIfrequired(jsonObj);
			String userToken = JWTUtil.generateToken(googleUser.getEmail(), CommonUtil.Key_googleUser, true);
			String tokenKey = tokenService.storeUserToken(userToken);
			url = baseService.getOrigin() + "/authenticate?key=" + tokenKey;
		} catch (Exception ex) {
			System.out.println("exception " + ex.getMessage());
		} finally {
			redirectURL.setUrl(url);
			return redirectURL;
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
	
	@RequestMapping(value = "/socialGoogleLogin", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> changeOrderStatus(HttpServletRequest request, @RequestBody SocialPOJO customerData) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			CustomerInfo customer = googleService.createCustomerIfrequired(customerData);
			if(customer != null) {
				response.setData(JWTUtil.generateToken(customer.getEmailId(), CommonUtil.Key_googleUser, true));
				response.setDataList(Arrays.asList(customer));
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("Error Logging in Social User!"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
}
