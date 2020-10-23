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
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.persistence.helper.POSData;
import com.backend.persistence.service.POSService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/pos")
public class POSController {
	
	private static Logger logger = LoggerFactory.getLogger(POSController.class);
	
	@Autowired
	private POSService posService;
	
	@RequestMapping(value = "/createPOS", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> createPOS(HttpServletRequest request,
			@RequestBody POSData posData) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			posService.createPOS(posData);
			response.setDataList(posService.getPOSDATA("8778125099"));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
