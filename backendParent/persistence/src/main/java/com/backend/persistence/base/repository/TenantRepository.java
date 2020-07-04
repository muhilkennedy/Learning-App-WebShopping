package com.backend.persistence.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.base.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface TenantRepository extends JpaRepository<Tenant, Integer> {

	String findTenantByNameQuery = "select realm from Tenant realm where realm.uniqueName = :realmUniqueName";
	String findTenantByIDQuery = "select realm from Tenant realm where realm.tenantID = :tenantId";
	
	@Query(findTenantByNameQuery)
	Tenant findTenantByNameQuery(@Param("realmUniqueName") String realmUniqueName);
	
	@Query(findTenantByIDQuery)
	Tenant findTenantByIdQuery(@Param("tenantId") String tenantId);
	
}
