package com.backend.service.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.backend.commons.util.ConfigUtil;

/**
 * @author muhil
 * Entry point for the Spring-Boot application.
 */
@SpringBootApplication
@ComponentScan(basePackages = { "com.backend.commons", "com.backend.api", "com.backend.service",
		"com.backend.persistence" })
@EnableConfigurationProperties
@ConfigurationPropertiesScan("com.backend.commons")
@EntityScan(basePackages = { "com.backend.persistence" })
@EnableJpaRepositories("com.backend.persistence")
@EnableScheduling
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
