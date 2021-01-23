package com.backend.persistence.repository;

import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfo, Long> {

	String findEmployeeByEmailQuery = "select emp from EmployeeInfo emp where emp.emailId = :emailId and emp.tenant = :tenant";
	String findEmployeeByIdQuery = "select emp from EmployeeInfo emp where emp.employeeId = :employeeId and emp.tenant = :tenant";
	String findAllEmployeesQuery = "select emp from EmployeeInfo emp where emp.tenant = :tenant";
	String findAllEmployeesCountQuery = "select count(*) from EmployeeInfo emp where emp.tenant = :tenant";
	String findLimitedEmployeesQuery = "select * from employeeinfo where tenantid = ?1 limit ?2 offset ?3";
	String deleteAllEmployeesQuery = "delete from EmployeeInfo where tenant = :tenant";
	String findEmployeeByEmailOrIdQuery = "select emp from EmployeeInfo emp where emp.tenant = :tenant and (emp.emailId = :emailId OR emp.employeeId = :emailId)";
	String findAllEmployeeNameAndEmailForTenantQuery = "select employeeId,emailId,fName,lName from employeeinfo emp where emp.tenantid = :tenant";
	String findMatchingEmployeeQuery = "select * from employeeinfo where tenantid = ?1 and emailid like %?2%";
	
	@Query(findEmployeeByEmailQuery)
	EmployeeInfo findEmployeeByEmail(@Param("emailId") String emailId, @Param("tenant") Tenant realm);
	
	@Query(findEmployeeByIdQuery)
	EmployeeInfo findEmployeeById(@Param("employeeId") Long employeeId, @Param("tenant") Tenant realm);
	
	@Query(value = findLimitedEmployeesQuery, nativeQuery = true)
	List<EmployeeInfo> findLimitedEmployees(String tenant, int limit, int offset);
	
	@Query(value = findMatchingEmployeeQuery, nativeQuery = true)
	List<EmployeeInfo> findMatchingEmployee(String tenant, String keyword);
	
	@Query(findAllEmployeesQuery)
	List<EmployeeInfo> findAllEmployees(@Param("tenant") Tenant realm);
	
	@Query(findAllEmployeesCountQuery)
	int findAllEmployeesCount(@Param("tenant") Tenant realm);
	
	@Query(value = findAllEmployeeNameAndEmailForTenantQuery, nativeQuery = true)
	List<Object[]> findAllEmployeeNameAndEmailForTenant(@Param("tenant") String tenantId);
	
	@Modifying
	@Cascade(CascadeType.DELETE)
	@Query(deleteAllEmployeesQuery)
	void deleteAllEmployees(@Param("tenant") Tenant realm);

	@Query(findEmployeeByEmailOrIdQuery)
	EmployeeInfo findEmployeeByEmailOrId(@Param("emailId") String emailOrId, @Param("tenant") Tenant realm);
	
}
