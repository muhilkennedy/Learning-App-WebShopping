package com.backend.persistence.app.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.app.entity.EmployeeInfo;
import com.backend.persistence.app.repository.EmployeeInfoRepository;
import com.backend.persistence.app.service.EmployeeService;
import com.backend.persistence.base.entity.Tenant;
import com.backend.persistence.base.service.TenantService;

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
	public void delete(EmployeeInfo emp) {
		employeeRepo.delete(emp);
	}
	
	@Override
	public void deleteAllEmployeeForTenant(Tenant tenant) {
		employeeRepo.deleteAllEmployees(tenant);
	}
	
	@Override
	public EmployeeInfo findEmployeeByEmail(String email, Tenant realm) {
		return employeeRepo.findEmployeeByEmail(email, realm);
	}
	
	@Override
	public List<EmployeeInfo> findAllEmployeeForTenant (Tenant realm){
		return employeeRepo.findAllEmployees(realm);
	}

}
