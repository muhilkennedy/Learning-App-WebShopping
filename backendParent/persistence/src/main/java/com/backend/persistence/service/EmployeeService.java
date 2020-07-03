package com.backend.persistence.service;

import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Tenant;

public interface EmployeeService {

	void save(EmployeeInfo emp);

	EmployeeInfo findEmployeeByEmail(String email, Tenant realm);

}
