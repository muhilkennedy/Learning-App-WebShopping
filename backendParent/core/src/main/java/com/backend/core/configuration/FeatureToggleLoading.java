package com.backend.core.configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.entity.FeatureToggle;
import com.backend.core.service.FeatureToggleService;

/**
 * @author muhil
 *
 */
@Component
public class FeatureToggleLoading {
	
	private Logger logger = LoggerFactory.getLogger(FeatureToggleLoading.class);
	
	@Autowired
	private FeatureToggleProperties features;
	
	@Autowired
	private FeatureToggleService featureService;
	
	/**
	 * Read feature details from properties file and load into DB.
	 */
	@PostConstruct
	private void loadFeaturetoggleIntoDatabase() {
		logger.info("Loading feature toggle informations");
		Map<String, FeatureToggle> featureMap = getFeatureMap();
		for (String feature : features.getFt()) {
			String[] featureDetails = feature.split(",");
			FeatureToggle fToggle = featureMap.get(featureDetails[0]);
			if (fToggle != null) {
				fToggle.setActive(Boolean.parseBoolean(featureDetails[1].trim()));
			} else {
				fToggle = new FeatureToggle(featureDetails[0], Boolean.parseBoolean(featureDetails[1].trim()));
			}
			featureService.save(fToggle);
			featureMap.remove(featureDetails[0]);
			logger.info("Processed Feature -> " + fToggle.getFeatureID());
		}
		// All remaining toggles are considered deleted.
		if (!featureMap.isEmpty()) {
			featureMap.entrySet().stream().forEach(feature -> {
				featureService.deleteFeature(feature.getValue());
				logger.info("Removed Toggle -> " + feature.getValue().getFeatureID());
			});
		}
	}

	private Map<String, FeatureToggle> getFeatureMap() {
		List<FeatureToggle> fToggleList = featureService.findAllFeatures();
		Map<String, FeatureToggle> featureMap = new HashMap<String, FeatureToggle>();
		fToggleList.parallelStream().forEach(feature -> {
			featureMap.put(feature.getFeatureName(), feature);
		});
		return featureMap;
	}
}
