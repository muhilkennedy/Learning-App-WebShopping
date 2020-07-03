package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfo, Integer> {

	String findEmployeeByEmailQuery = "select emp from EmployeeInfo emp where emp.emailId = :emailId and emp.tenant = :tenant";
	
	@Query(findEmployeeByEmailQuery)
	EmployeeInfo findEmployeeByEmail(@Param("emailId") String emailId, @Param("tenant") Tenant realm);
	
}
