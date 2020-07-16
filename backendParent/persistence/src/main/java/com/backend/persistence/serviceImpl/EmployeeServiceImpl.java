package com.backend.persistence.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.repository.EmployeeInfoRepository;
import com.backend.persistence.service.EmployeeService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private EmployeeInfoRepository employeeRepo;
	
	@Override
	public void save(EmployeeInfo emp) {
		employeeRepo.save(emp);
	}
	
	@Override
	public void delete(EmployeeInfo emp) {
		employeeRepo.delete(emp);
	}
	
	@Override
	public void deleteAllEmployeeForTenant() {
		employeeRepo.deleteAllEmployees(baseService.getTenantInfo());
	}
	
	@Override
	public EmployeeInfo findEmployeeByEmail(String email) {
		return employeeRepo.findEmployeeByEmail(email, baseService.getTenantInfo());
	}
	
	@Override
	public List<EmployeeInfo> findAllEmployeeForTenant (){
		return employeeRepo.findAllEmployees(baseService.getTenantInfo());
	}

}
