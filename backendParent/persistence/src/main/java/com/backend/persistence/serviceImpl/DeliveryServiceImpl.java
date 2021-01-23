package com.backend.persistence.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.dao.DeliveryDao;
import com.backend.persistence.entity.DeliveryConfiguration;
import com.backend.persistence.service.DeliveryService;

/**
 * @author Muhil
 *
 */
@Service
public class DeliveryServiceImpl implements DeliveryService{
	
	@Autowired
	private DeliveryDao deliveryDao;
	
	@Override
	public void createDeliveryConfig(DeliveryConfiguration config) throws Exception {
		deliveryDao.insertIntoDeliveryConfiguration(config.getPincode(), config.getDeliverycharge(), config.getMinimumamtforfreedelivery(),
				config.getDeliveryfromtime(), config.getDeliverytilltime(), config.getMinimumdeliveryhours());
	}
	
	@Override
	public List<DeliveryConfiguration> getAllConfigs() throws Exception{
		return deliveryDao.getAllDeliveryConfiguration();
	}
	
	@Override
	public DeliveryConfiguration getDeliveryConfiguration(String pincode) throws Exception {
		return deliveryDao.getDeliveryConfiguration(pincode);
	}
	
	@Override
	public void removePincodeConfig(String pincode) throws Exception {
		deliveryDao.removeDeliveryConfiguration(pincode);
	}
	
	@Override
	public void togglePincodeConfigStatus(String pincode) throws Exception {
		DeliveryConfiguration config = getDeliveryConfiguration(pincode);
		if(config != null) {
			deliveryDao.toggleConfigurationStatus(pincode, !config.isActive());
		}
		else {
			throw new Exception("Pincode Configuration not found!");
		}
	}

}
