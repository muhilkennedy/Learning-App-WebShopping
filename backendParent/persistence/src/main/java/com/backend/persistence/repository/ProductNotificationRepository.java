package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.ProductNotification;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductNotificationRepository extends JpaRepository<ProductNotification, Long> {

	String findProductNotificationByIdQuery = "select pn from ProductNotification pn where pn.tenant = :tenant and pn.notificationId = :id";
	String findAllProductNotificationByIdQuery = "select pn from ProductNotification pn where pn.tenant = :tenant and pn.adminid = :employeeid";
	String findAllProductNotificationAdminQuery = "select pn from ProductNotification pn where pn.tenant = :tenant and pn.adminid = :employeeid or pn.adminid=0";
	String findAllProductNotificationClientQuery = "select pn from ProductNotification pn where pn.tenant = :tenant and pn.clientid = :clientid";
	String deleteNotificationQuery = "delete from ProductNotification where tenant = :tenant and notificationId = :id";
	
	@Query(findProductNotificationByIdQuery)
	ProductNotification findProductNotificationById(@Param("tenant") Tenant tenant, @Param("id") Long id);
	
	@Query(findAllProductNotificationByIdQuery)
	List<ProductNotification> findAllProductNotificationForAdminbyId(@Param("tenant") Tenant tenant, @Param("employeeid") long employeeid);
	
	@Query(findAllProductNotificationAdminQuery)
	List<ProductNotification> findAllProductNotificationAdmin(@Param("tenant") Tenant tenant, @Param("employeeid") long employeeid);
	
	@Query(findAllProductNotificationClientQuery)
	List<ProductNotification> findAllProductNotificationForClient(@Param("tenant") Tenant tenant, @Param("clientid") long clientid);
	
	@Modifying
	@Query(deleteNotificationQuery)
	void deleteProductNotification(@Param("tenant") Tenant tenant, @Param("id") Long id);
	
}
