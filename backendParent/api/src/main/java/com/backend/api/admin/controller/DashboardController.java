package com.backend.api.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.core.entity.DashboardReport;
import com.backend.core.service.BaseService;
import com.backend.core.util.DashboardStatusUtil;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/dashboard")
public class DashboardController {
	
	private static Logger logger = LoggerFactory.getLogger(DashboardController.class);
	
	@Autowired
	private BaseService baseService;
	
	@RequestMapping(value = "/getDashboardReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DashboardReport> getProductsById(HttpServletRequest request) {
		GenericResponse<DashboardReport> response = new GenericResponse<>();
		try {
			response.setData(DashboardStatusUtil.getDashboardStatus(baseService.getTenantInfo()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsById : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
