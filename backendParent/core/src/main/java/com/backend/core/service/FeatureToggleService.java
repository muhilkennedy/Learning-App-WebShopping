package com.backend.core.service;

import java.util.List;

import com.backend.core.entity.FeatureToggle;

public interface FeatureToggleService {

	void save(FeatureToggle feature);

	FeatureToggle findFeatureByName(String featureName);

	List<FeatureToggle> findAllFeatures();

	void deleteFeature(FeatureToggle feature);

	boolean getFeatureStatus(String featureName);

}
