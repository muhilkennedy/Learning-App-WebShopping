package com.backend.persistence.service;

import java.util.List;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.EmployeePermissions;
import com.backend.core.entity.EmployeePermissionsMap;

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

	List<EmployeeInfo> findAllEmployeeNameAndEmailForTenant();

	void updateEmployeeLoggedInStatus(EmployeeInfo emp);

	List<EmployeeInfo> findAllEmployeeById(List<Integer> ids);

	void toggleOrderPickUp();

}
