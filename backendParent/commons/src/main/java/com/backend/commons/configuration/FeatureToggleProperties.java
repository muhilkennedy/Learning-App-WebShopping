package com.backend.commons.configuration;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author muhil
 *
 */
@Component
@PropertySource("classpath:FeatureToggle.properties")
@ConfigurationProperties(prefix = "app.feature")
public class FeatureToggleProperties {

	private List<String> ft;

	public List<String> getFt() {
		return ft;
	}

	public void setFt(List<String> ft) {
		this.ft = ft;
	}

}
