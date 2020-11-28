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
import com.backend.commons.util.CommonUtil;
import com.backend.core.util.Constants;
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
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("createPOS : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getPOS", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> getPOS(HttpServletRequest request,
										  @RequestParam(value = "filterCondition", required = false) String filterCondition,
										  @RequestParam(value = "filterDate", required = false) long filterDate) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			if(CommonUtil.isValidStringParam(limit) && CommonUtil.isValidStringParam(offset)) {
				response.setDataList(posService.getPOSDATA(limit, offset, filterCondition, filterDate));
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("getPOS : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
