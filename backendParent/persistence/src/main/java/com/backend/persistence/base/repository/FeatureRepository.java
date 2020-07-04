package com.backend.persistence.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.base.entity.FeatureToggle;

/**
 * @author Muhil
 *
 */
@Repository
public interface FeatureRepository extends JpaRepository<FeatureToggle, Integer> {
	
	String findFeatureByNameQuery = "select ft from FeatureToggle ft where ft.featureName = :featureName";
	
	@Query(findFeatureByNameQuery)
	FeatureToggle findFeatureByNameQuery(@Param("featureName") String featureName);
}
