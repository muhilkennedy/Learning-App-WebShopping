package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Orders;

/**
 * @author Muhil
 *
 */
@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
	
	String findOrdersByIdQuery = "select order from Orders order where order.tenant = :tenant and order.orderId = :orderId";
	String findOrdersForTenantQuery = "select order from Orders order where order.tenant = :tenant";
	String findLimitedOrdersQuery = "select * from orders where tenantid = ?1 limit ?2 offset ?3";
	String findOrdersByCustomerQuery = "select order from Orders order where order.tenant = :tenant and order.customerId = :customerId";
	String findOrdersByStatusForEmployeeQuery = "select order from Orders order where order.tenant = :tenant and order.employeeId = :employeeId and order.status = :status";
	String findCustomerOrdersQuery = "select * from orders where tenantid = ?1 and customerid= ?2";
	String findCouponAppliedCountQuery = "select count(*) from Orders order where order.tenant = :tenant and order.customerId = :customerId and order.couponId = :couponId";
	
	String findOrdersByEmployeeQuery = "select order from Orders order where order.tenant = :tenant and order.employeeId = :employeeId";
	
	@Query(findOrdersByIdQuery)
	Orders findOrdersById(@Param("tenant") Tenant realm, @Param("orderId") Long orderId);
	
	@Query(findOrdersByCustomerQuery)
	List<Orders> findOrdersByCustomer(@Param("tenant") Tenant realm, @Param("customerId") Long customerId);
	
	@Query(findOrdersForTenantQuery)
	List<Orders> findOrdersForTenant(@Param("tenant") Tenant realm);
	
	@Query(value = findLimitedOrdersQuery, nativeQuery = true)
	List<Orders> findLimitedOrders(String tenant, int limit, int offset);
	
	@Query(value = findCustomerOrdersQuery, nativeQuery = true)
	List<Orders> findCustomerOrders(String tenant, Long customerId);
	
	@Query(findOrdersByStatusForEmployeeQuery)
	List<Orders> findOrdersByStatusForEmployee(@Param("tenant") Tenant realm, @Param("employeeId") Long employeeId,  @Param("status") String string);

	@Query(value = findCouponAppliedCountQuery)
	int findCouponAppliedCount(@Param("tenant") Tenant realm, Long customerId, Long couponId);
	
	@Query(value = findOrdersByEmployeeQuery)
	List<Orders> findOrdersByEmployeeQuery(@Param("tenant") Tenant realm, Long employeeId);
}
