package com.backend.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.Constants;
import com.backend.persistence.base.entity.Tenant;


/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("base")
public class BaseController {
	
	private static Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	@RequestMapping("/ping")
	public GenericResponse<String> pingService(HttpServletRequest request) {
		logger.info("Ping for Tenant -" + request.getHeader(Constants.Header_TenantId));
		GenericResponse<String> response = new GenericResponse<String>();
		response.setStatus(Response.Status.OK);
		response.setData(request.getHeader(Constants.Header_TenantId) + " - Connection OK!");
		return response;
	}

}
