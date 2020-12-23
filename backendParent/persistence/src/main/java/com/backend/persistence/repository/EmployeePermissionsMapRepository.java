package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.EmployeePermissionsMap;
import com.backend.core.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface EmployeePermissionsMapRepository extends JpaRepository<EmployeePermissionsMap, Integer> {
	
	String findAllEmployeePermissionsQuery = "select li from EmployeePermissionsMap as li where tenant = :tenant and employee = :employee";
	
	@Query(findAllEmployeePermissionsQuery)
	List<EmployeePermissionsMap> findAllEmployeePermissions(@Param("tenant") Tenant realm, @Param("employee") EmployeeInfo employee);

}
