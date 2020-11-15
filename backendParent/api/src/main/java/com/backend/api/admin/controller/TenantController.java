package com.backend.api.admin.controller;

import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.RSAUtil;
import com.backend.core.entity.TenantDetails;
import com.backend.core.service.TenantService;
import com.backend.core.util.ConfigUtil;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("tenant")
public class TenantController {
	
	private static Logger logger = LoggerFactory.getLogger(TenantController.class);
	
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private ConfigUtil configUtil;
	
	@RequestMapping(value = "/updateTenant", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> updateTenant(HttpServletRequest request, @RequestParam(value = "myFile", required = false) MultipartFile file,
			@RequestParam(value = "tenantEmail", required = false) String tenantEmail, @RequestParam(value = "tenantDetailId", required = false) int tenantDetailId,
			@RequestParam(value = "tenantStreet", required = false) String tenantStreet, @RequestParam(value = "tenantContact", required = false) String tenantContact,
			@RequestParam(value = "tenantPin", required = false) String tenantPin, @RequestParam(value = "tenantTwitter", required = false) String tenantTwitter,
			@RequestParam(value = "tenantFacebook", required = false) String tenantFacebook, @RequestParam(value = "tenantInsta", required = false) String tenantInsta,
			@RequestParam(value = "businessEmail", required = false) String businessEmail, @RequestParam(value = "tenantCity", required = false) String tenantCity,
			@RequestParam(value = "businessEmailPassword", required = false) String businessEmailPassword,
			@RequestParam(value = "gstIn", required = false) String gst) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			TenantDetails tenantDetail = new TenantDetails();
			tenantDetail.setTenantDetailId(tenantDetailId);
			tenantDetail.setBusinessEmail(businessEmail);
			if (!StringUtils.isEmpty(businessEmailPassword)) {
				String encryptedPassword = Base64.getEncoder()
						.encodeToString(RSAUtil.encrypt(businessEmailPassword, configUtil.getRsaPublic()));
				tenantDetail.setBusinessEmailPassword(encryptedPassword);
			}
			tenantDetail.setTenantCity(tenantCity);
			tenantDetail.setTenantContact(tenantContact);
			tenantDetail.setTenantEmail(tenantEmail);
			tenantDetail.setTenantFacebook(tenantFacebook);
			tenantDetail.setTenantTwitter(tenantTwitter);
			tenantDetail.setTenantInsta(tenantInsta);
			tenantDetail.setTenantStreet(tenantStreet);
			tenantDetail.setGstIn(gst);
			tenantService.updateTenantDetails(tenantDetail, file != null ? CommonUtil.getThumbnailImage(file.getBytes()) : null);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("updateTenant : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
