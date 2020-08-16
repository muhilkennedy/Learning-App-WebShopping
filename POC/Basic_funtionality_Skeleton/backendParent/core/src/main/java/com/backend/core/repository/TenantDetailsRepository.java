package com.backend.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.core.entity.TenantDetails;

@Repository
public interface TenantDetailsRepository extends JpaRepository<TenantDetails, Integer>{

	String findTenantDetailByTenantIDQuery = "select realm from TenantDetails realm where realm.tenantID = :tenantId";
	
	@Query(findTenantDetailByTenantIDQuery)
	TenantDetails findTenantDetailByTenantID(@Param("tenantId") Tenant tenantId);

}
