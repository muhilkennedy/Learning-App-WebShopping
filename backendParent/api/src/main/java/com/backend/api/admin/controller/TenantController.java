package com.backend.api.admin.controller;

import java.util.Arrays;
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
import com.backend.core.entity.TenantDetails;
import com.backend.core.service.BaseService;
import com.backend.core.service.TenantService;
import com.backend.core.util.RSAUtil;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/tenant")
public class TenantController {
	
	private static Logger logger = LoggerFactory.getLogger(TenantController.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private TenantService tenantService;
	
	@RequestMapping(value = "/updateTenant", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> updateTenant(HttpServletRequest request, @RequestParam(value = "myFile", required = false) MultipartFile file,
			@RequestParam(value = "tenantEmail", required = false) String tenantEmail, @RequestParam(value = "tenantDetailId", required = false) int tenantDetailId,
			@RequestParam(value = "tenantStreet", required = false) String tenantStreet, @RequestParam(value = "tenantContact", required = false) String tenantContact,
			@RequestParam(value = "tenantPin", required = false) String tenantPin, @RequestParam(value = "tenantTwitter", required = false) String tenantTwitter,
			@RequestParam(value = "tenantFacebook", required = false) String tenantFacebook, @RequestParam(value = "tenantInsta", required = false) String tenantInsta,
			@RequestParam(value = "businessEmail", required = false) String businessEmail, @RequestParam(value = "tenantCity", required = false) String tenantCity,
			@RequestParam(value = "businessEmailPassword", required = false) String businessEmailPassword,
			@RequestParam(value = "gstIn", required = false) String gst, @RequestParam(value = "fssai", required = false) String fssai) {
		GenericResponse<String> response = new GenericResponse<>();
		try {
			TenantDetails tenantDetail = new TenantDetails();
			tenantDetail.setTenantDetailId(tenantDetailId);
			tenantDetail.setBusinessEmail(businessEmail);
			if (!StringUtils.isEmpty(businessEmailPassword)) {
				tenantDetail.setBusinessEmailPassword(RSAUtil.decrypt(businessEmailPassword, baseService.getTenantInfo().fetchPrivateKey()));
			}
			tenantDetail.setTenantCity(tenantCity);
			tenantDetail.setTenantContact(tenantContact);
			tenantDetail.setTenantEmail(tenantEmail);
			tenantDetail.setTenantFacebook(tenantFacebook);
			tenantDetail.setTenantTwitter(tenantTwitter);
			tenantDetail.setTenantInsta(tenantInsta);
			tenantDetail.setTenantStreet(tenantStreet);
			tenantDetail.setGstIn(gst);
			tenantDetail.setFssai(fssai);
			tenantService.updateTenantDetails(tenantDetail, file != null ? file.getBytes() : null);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("updateTenant : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/updateTenantFssai", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> updateTenant(HttpServletRequest request, @RequestParam(value = "fssai", required = false) String fssai){
		GenericResponse<String> response = new GenericResponse<>();
		try {
			TenantDetails tenantDetail = new TenantDetails();
			tenantDetail.setFssai(fssai);
			tenantService.updateTenantDetails(tenantDetail, null);
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
