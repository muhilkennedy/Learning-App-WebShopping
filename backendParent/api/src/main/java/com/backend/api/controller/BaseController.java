package com.backend.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.ConfigUtil;
import com.backend.persistence.util.FeatureUtil;


@RestController
@RequestMapping("base")
public class BaseController {
	
	@Autowired
	ConfigUtil config;
	
	@Autowired
	FeatureUtil dp;
	
	@RequestMapping("/ping")
	public GenericResponse<String> test() {
		GenericResponse<String> response = new GenericResponse<String>();
		response.setStatus(Response.Status.OK);
		response.setData("Application " + config.getApplicationName() + " is up and running");
		return response;
	}

}
