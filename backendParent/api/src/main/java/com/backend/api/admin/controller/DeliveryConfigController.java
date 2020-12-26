package com.backend.api.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.persistence.entity.Coupons;
import com.backend.persistence.entity.DeliveryConfiguration;
import com.backend.persistence.service.DeliveryService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/delivery")
public class DeliveryConfigController {
	
	private static Logger logger = LoggerFactory.getLogger(DeliveryConfigController.class);
	
	@Autowired
	private DeliveryService deliveryService;
	
	@RequestMapping(value = "/createPincode", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Coupons> createPincode(HttpServletRequest request,
											     @RequestBody DeliveryConfiguration config) {
		GenericResponse<Coupons> response = new GenericResponse<Coupons>();
		try {
			deliveryService.createDeliveryConfig(config);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("createPincode : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAllPincodes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DeliveryConfiguration> getAllPincodes(HttpServletRequest request) {
		GenericResponse<DeliveryConfiguration> response = new GenericResponse<DeliveryConfiguration>();
		try {
			response.setDataList(deliveryService.getAllConfigs());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getAllPincodes : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getPincodeDetails", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DeliveryConfiguration> getPincodeDetails(HttpServletRequest request, @RequestParam(value = "pincode", required = true) String pincode) {
		GenericResponse<DeliveryConfiguration> response = new GenericResponse<DeliveryConfiguration>();
		try {
			response.setData(deliveryService.getDeliveryConfiguration(pincode));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getPincodeDetails : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deletePinCodeConfig", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DeliveryConfiguration> deletePinCodeConfig(HttpServletRequest request, @RequestParam(value = "pincode", required = true) String pincode) {
		GenericResponse<DeliveryConfiguration> response = new GenericResponse<DeliveryConfiguration>();
		try {
			deliveryService.removePincodeConfig(pincode);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deletePinCodeConfig : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/togglePincodeStatus", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DeliveryConfiguration> togglePincodeStatus(HttpServletRequest request, @RequestParam(value = "pincode", required = true) String pincode) {
		GenericResponse<DeliveryConfiguration> response = new GenericResponse<DeliveryConfiguration>();
		try {
			deliveryService.togglePincodeConfigStatus(pincode);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("togglePincodeStatus : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
