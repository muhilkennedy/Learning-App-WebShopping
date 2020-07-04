package com.backend.persistence.base.service;

import java.util.List;

import com.backend.persistence.base.entity.FeatureToggle;

public interface FeatureToggleService {

	void save(FeatureToggle feature);

	FeatureToggle findFeatureByName(String featureName);

	List<FeatureToggle> findAllFeatures();

	void deleteFeature(FeatureToggle feature);

}
