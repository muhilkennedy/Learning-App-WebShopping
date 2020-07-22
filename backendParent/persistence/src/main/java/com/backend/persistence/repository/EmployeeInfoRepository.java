package com.backend.persistence.repository;

import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;

/**
 * @author Muhil
 *
 */
@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfo, Integer> {

	String findEmployeeByEmailQuery = "select emp from EmployeeInfo emp where emp.emailId = :emailId and emp.tenant = :tenant";
	String findEmployeeByIdQuery = "select emp from EmployeeInfo emp where emp.employeeId = :employeeId and emp.tenant = :tenant";
	String findAllEmployeesQuery = "select emp from EmployeeInfo emp where emp.tenant = :tenant";
	String deleteAllEmployeesQuery = "delete from EmployeeInfo where tenant = :tenant";
	String findEmployeeByEmailOrIdQuery = "select emp from EmployeeInfo emp where emp.emailId = :emailId OR emp.employeeId = :emailId and emp.tenant = :tenant";
	
	@Query(findEmployeeByEmailQuery)
	EmployeeInfo findEmployeeByEmail(@Param("emailId") String emailId, @Param("tenant") Tenant realm);
	
	@Query(findEmployeeByIdQuery)
	EmployeeInfo findEmployeeById(@Param("employeeId") int employeeId, @Param("tenant") Tenant realm);
	
	@Query(findAllEmployeesQuery)
	List<EmployeeInfo> findAllEmployees(@Param("tenant") Tenant realm);
	
	@Modifying
	@Cascade(CascadeType.DELETE)
	@Query(deleteAllEmployeesQuery)
	void deleteAllEmployees(@Param("tenant") Tenant realm);

	@Query(findEmployeeByEmailOrIdQuery)
	EmployeeInfo findEmployeeByEmailOrId(@Param("emailId") String emailOrId, @Param("tenant") Tenant realm);
	
}
