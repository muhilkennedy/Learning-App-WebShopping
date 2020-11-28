package com.backend.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.DashboardReport;
import com.backend.core.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Repository
public interface DashboardStatusRepository extends JpaRepository<DashboardReport, Integer> {
	
	String findReportForTenantQuery = "select rp from DashboardReport rp where rp.tenant = :tenant";
	
	@Query(findReportForTenantQuery)
	DashboardReport findReportForTenant(@Param("tenant") Tenant tenant);

}
