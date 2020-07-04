package com.backend.persistence.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.persistence.base.service.FeatureToggleService;

/**
 * @author muhil
 *
 */
@Component
public class FeatureUtil {
	
	@Autowired
	private FeatureToggleService featureService;
	
	public boolean isFeatureActive(String featureName) {
		return featureService.findFeatureByName(featureName).isActive();
	}

}
