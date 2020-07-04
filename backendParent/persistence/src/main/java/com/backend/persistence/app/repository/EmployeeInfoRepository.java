package com.backend.persistence.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.app.entity.EmployeeInfo;
import com.backend.persistence.base.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfo, Integer> {

	String findEmployeeByEmailQuery = "select emp from EmployeeInfo emp where emp.emailId = :emailId and emp.tenant = :tenant";
	String findAllEmployeesQuery = "select emp from EmployeeInfo emp where emp.tenant = :tenant";
	String deleteAllEmployeesQuery = "delete from EmployeeInfo where tenant = :tenant";
	
	@Query(findEmployeeByEmailQuery)
	EmployeeInfo findEmployeeByEmail(@Param("emailId") String emailId, @Param("tenant") Tenant realm);
	
	@Query(findAllEmployeesQuery)
	List<EmployeeInfo> findAllEmployees(@Param("tenant") Tenant realm);
	
	@Modifying
	@Query(deleteAllEmployeesQuery)
	void deleteAllEmployees(@Param("tenant") Tenant realm);
	
}
