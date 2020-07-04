package com.backend.persistence.app.service;

import java.util.List;

import com.backend.persistence.app.entity.EmployeeInfo;
import com.backend.persistence.base.entity.Tenant;

public interface EmployeeService {

	void save(EmployeeInfo emp);

	EmployeeInfo findEmployeeByEmail(String email, Tenant realm);

	List<EmployeeInfo> findAllEmployeeForTenant(Tenant realm);

	void delete(EmployeeInfo emp);

	void deleteAllEmployeeForTenant(Tenant tenant);

}
