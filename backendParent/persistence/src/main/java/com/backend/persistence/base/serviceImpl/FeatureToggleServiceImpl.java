package com.backend.persistence.base.serviceImpl;

import javax.transaction.Transactional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.base.entity.FeatureToggle;
import com.backend.persistence.base.repository.FeatureRepository;
import com.backend.persistence.base.service.FeatureToggleService;

/**
 * @author muhil
 *
 */
@Service
@Transactional
public class FeatureToggleServiceImpl implements FeatureToggleService {
	
	@Autowired
	private FeatureRepository featureRepo;
	
	@Override
	public void save(FeatureToggle feature) {
		featureRepo.save(feature);
	}
	
	@Override
	public FeatureToggle findFeatureByName(String featureName) {
		return featureRepo.findFeatureByNameQuery(featureName);
	}
	
	@Override
	public List<FeatureToggle> findAllFeatures(){
		return featureRepo.findAll();
	}
	
	@Override
	public void deleteFeature(FeatureToggle feature) {
		featureRepo.delete(feature);
	}

}
