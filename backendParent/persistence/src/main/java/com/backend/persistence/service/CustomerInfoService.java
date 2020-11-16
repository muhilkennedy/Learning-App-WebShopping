package com.backend.persistence.service;

import com.backend.persistence.entity.CustomerInfo;

public interface CustomerInfoService {

	void save(CustomerInfo info);

	void saveAndFlush(CustomerInfo info);

}
