package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.DeliveryConfiguration;

public interface DeliveryService {

	void createDeliveryConfig(DeliveryConfiguration config) throws Exception;

	List<DeliveryConfiguration> getAllConfigs() throws Exception;

	DeliveryConfiguration getDeliveryConfiguration(String pincode) throws Exception;

	void removePincodeConfig(String pincode) throws Exception;

	void togglePincodeConfigStatus(String pincode) throws Exception;

}
