package com.backend.commons.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigUtil {

	@Value("${spring.application.name}")
	private String appName;

	@Value("${project.deployment.mode}")
	private String deploymentMode;

	public String getApplicationName() {
		return appName;
	}

	public String getDeploymentMode() {
		return deploymentMode;
	}

}
