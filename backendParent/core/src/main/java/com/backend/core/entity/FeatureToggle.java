package com.backend.core.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "FEATURETOGGLE")
public class FeatureToggle {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "FEATUREID")
	private Long featureID;
	
	@Column(name = "FEATURENAME")
	private String featureName;
	
	@Column(name = "ACTIVE")
	private boolean active;

	public FeatureToggle() {
		super();
	}
			
	public FeatureToggle(String featureName, boolean active) {
		super();
		this.featureName = featureName;
		this.active = active;
	}

	public Long getFeatureID() {
		return featureID;
	}

	public void setFeatureID(Long featureID) {
		this.featureID = featureID;
	}

	public String getFeatureName() {
		return featureName;
	}

	public void setFeatureName(String featureName) {
		this.featureName = featureName;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
