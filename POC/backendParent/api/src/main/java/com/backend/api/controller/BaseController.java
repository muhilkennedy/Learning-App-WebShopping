package com.backend.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.commons.util.ConfigUtil;


@RestController
public class BaseController {
	
	@Autowired
	ConfigUtil config;
	
	@GetMapping(value = "/ping")
	public String test() {
		return "AppName = " + config.getApplicationName();
	}

}
