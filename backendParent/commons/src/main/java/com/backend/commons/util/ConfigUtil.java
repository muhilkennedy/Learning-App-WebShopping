package com.backend.commons.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author muhil
 *
 */
@Component
public class ConfigUtil {

	@Value("${spring.application.name}")
	private String appName;

	@Value("${app.deployment.mode}")
	private String deploymentMode;
	
	@Value("${cors.allowed-origin}")
	private String allowedOrigin;
	
	@Value("${spring.security.jwt.secret}")
	private String jwtSecret;
	
	private enum deploymentModes {
		prod, dev
	}

	public String getApplicationName() {
		return appName;
	}

	public String getDeploymentMode() {
		return deploymentMode;
	}
	
	public boolean isProdMode() {
		return deploymentMode.equals(deploymentModes.prod.toString());
	}

	public String getAllowedOrigin() {
		return allowedOrigin;
	}

	public String getJwtSecret() {
		return jwtSecret;
	}

}
