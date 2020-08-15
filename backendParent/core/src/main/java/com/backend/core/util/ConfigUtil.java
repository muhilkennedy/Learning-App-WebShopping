package com.backend.core.util;

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
	
	@Value("${spring.rsa.privatekey}")
	private String rsaPrivate;
	
	@Value("${spring.rsa.publickey}")
	private String rsaPublic;
	
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

	public String getRsaPrivate() {
		return rsaPrivate;
	}

	public String getRsaPublic() {
		return rsaPublic;
	}

}
