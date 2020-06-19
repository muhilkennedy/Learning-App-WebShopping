package com.backend.service.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.backend.commons.util.ConfigUtil;

@SpringBootApplication
@ComponentScan(basePackages = {"com.backend.commons","com.backend.api","com.backend.service"})
@EnableConfigurationProperties
@Configuration
public class Application {

	private static Logger logger = LoggerFactory.getLogger(Application.class);
	
	@Autowired
	ConfigUtil config;
	
	public static void main(String[] args) {
		logger.info("Starting SpringBoot Application");
		SpringApplication.run(Application.class, args);
	}

}
