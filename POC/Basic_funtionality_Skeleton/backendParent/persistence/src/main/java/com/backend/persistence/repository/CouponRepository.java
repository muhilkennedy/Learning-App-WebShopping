package com.backend.persistence.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Coupons;

/**
 * @author Muhil
 *
 */
@Repository
public interface CouponRepository extends JpaRepository<Coupons, Integer> {
	
	String findAllActiveCouponsQuery = "select coup from Coupons coup where coup.active = true and coup.tenant = :tenant";
	String findExpiredCouponsQuery = "select coup from Coupons coup where coup.active = true and coup.tenant = :tenant and coup.endDate < :endDate";
	String findAllCouponsQuery = "select coup from Coupons coup where coup.tenant = :tenant";
	
	@Query(findAllActiveCouponsQuery)
	List<Coupons> findAllActiveCoupons(@Param("tenant") Tenant realm);
	
	@Query(findAllCouponsQuery)
	List<Coupons> findAllCouponsForTenant(@Param("tenant") Tenant realm);
	
	@Query(findExpiredCouponsQuery)
	List<Coupons> findExpiredCoupons(@Param("tenant") Tenant realm, @Param("endDate") Date endDate);

}
