package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.CustomerInfo;

/**
 * @author Muhil
 *
 */
@Repository
public interface CustomerInfoRepository extends JpaRepository<CustomerInfo, Integer> {

	String findEmployeeByEmailQuery = "select cus from CustomerInfo cus where cus.emailId = :emailId and cus.tenant = :tenant";
	String findEmployeeByIdQuery = "select cus from CustomerInfo cus where cus.customerId = :customerId and cus.tenant = :tenant";

	@Query(findEmployeeByEmailQuery)
	CustomerInfo findEmployeeByEmail(@Param("emailId") String emailId, @Param("tenant") Tenant realm);
	
	@Query(findEmployeeByIdQuery)
	CustomerInfo findEmployeeById(@Param("customerId") int customerId, @Param("tenant") Tenant realm);
}
