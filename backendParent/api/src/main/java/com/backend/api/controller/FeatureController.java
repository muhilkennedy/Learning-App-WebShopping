package com.backend.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.FeatureInfo;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.core.service.FeatureToggleService;
import com.backend.core.util.Constants;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("feature")
public class FeatureController {
	
	private static Logger logger = LoggerFactory.getLogger(FeatureController.class);
	
	@Autowired
	private FeatureToggleService featureService;
	
	@RequestMapping(value = "/getFeatureStatus", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<FeatureInfo> getFeatureStatus(HttpServletRequest request, @RequestParam(value = "featureName", required = true) String featureName) {
		logger.info("Load HomePageMedia for Tenant -" + request.getHeader(Constants.Header_TenantId));
		GenericResponse<FeatureInfo> response = new GenericResponse<FeatureInfo>();
		FeatureInfo featureInfo = new FeatureInfo();
		featureInfo.setFeatureName(featureName);
		featureInfo.setFeatureStatus(featureService.getFeatureStatus(featureName));
		response.setData(featureInfo);
		response.setStatus(Response.Status.OK);
		return response;
	}

}
