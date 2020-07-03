package com.backend.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.Constants;
import com.backend.persistence.service.EmployeeService;


@RestController
@RequestMapping("base")
public class BaseController {
	
	@Autowired
	EmployeeService empService;
	
	@RequestMapping("/ping")
	public GenericResponse<String> pingService(HttpServletRequest request) {
		GenericResponse<String> response = new GenericResponse<String>();
		response.setStatus(Response.Status.OK);
		response.setData(request.getHeader(Constants.Header_TenantId) + " - Connection OK!");
		return response;
	}

}
