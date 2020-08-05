package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.EmployeePermissions;
import com.backend.persistence.entity.EmployeePermissionsMap;

public interface EmployeeService {

	void save(EmployeeInfo emp);

	EmployeeInfo findEmployeeByEmail(String email);

	List<EmployeeInfo> findAllEmployeeForTenant();

	void delete(EmployeeInfo emp);

	void deleteAllEmployeeForTenant();

	List<EmployeePermissionsMap> getEmployeePermissionsForTenant(EmployeeInfo emp);

	List<EmployeePermissions> getAllGenericPermissions();

	EmployeeInfo findEmployeeByEmailOrId(String emailOrId);

	EmployeeInfo findEmployeeById(int id);

	void overrirdePermissions(EmployeeInfo empInfo, List<Integer> permissionIds);

	void employeeStatus(EmployeeInfo emp, boolean status);

	void updateEmployee(EmployeeInfo actualEmployee, EmployeeInfo updatedEmployee, byte[] profilePic) throws Exception;

	List<EmployeeInfo> findAllEmployeeForTenant(int offset, int limit);

	int findAllEmployeesForTenantCount();

}
