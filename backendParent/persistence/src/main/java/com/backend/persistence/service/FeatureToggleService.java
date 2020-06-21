package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.FeatureToggle;

public interface FeatureToggleService {

	void save(FeatureToggle feature);

	FeatureToggle findFeatureByName(String featureName);

	List<FeatureToggle> findAllFeatures();

	void deleteFeature(FeatureToggle feature);

}
