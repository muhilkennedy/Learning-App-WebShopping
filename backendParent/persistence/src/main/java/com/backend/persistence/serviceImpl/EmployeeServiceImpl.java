package com.backend.persistence.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Tenant;
import com.backend.persistence.repository.EmployeeInfoRepository;
import com.backend.persistence.service.EmployeeService;
import com.backend.persistence.service.TenantService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	EmployeeInfoRepository employeeRepo;
	
	@Autowired
	TenantService tenant;
	
	@Override
	public void save(EmployeeInfo emp) {
		employeeRepo.save(emp);
	}
	
	@Override
	public EmployeeInfo findEmployeeByEmail(String email, Tenant realm) {
		return employeeRepo.findEmployeeByEmail(email, realm);
	}

}
