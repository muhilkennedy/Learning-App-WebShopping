package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.EmployeeInfo;

public interface EmployeeService {

	void save(EmployeeInfo emp);

	EmployeeInfo findEmployeeByEmail(String email);

	List<EmployeeInfo> findAllEmployeeForTenant();

	void delete(EmployeeInfo emp);

	void deleteAllEmployeeForTenant();

}
