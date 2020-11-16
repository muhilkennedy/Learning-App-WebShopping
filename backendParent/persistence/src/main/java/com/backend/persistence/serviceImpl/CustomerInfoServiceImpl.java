package com.backend.persistence.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.service.CustomerInfoService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class CustomerInfoServiceImpl implements CustomerInfoService{
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private CustomerInfoServiceImpl customerRepo;
	
	@Override
	public void save(CustomerInfo info) {
		customerRepo.save(info);
	}
	
	@Override
	public void saveAndFlush(CustomerInfo info) {
		customerRepo.saveAndFlush(info);
	}

}
