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
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	String findOrdersByIdQuery = "select order from Orders order where order.tenant = :tenant and order.orderId = :orderId";
	String findOrdersForTenantQuery = "select order from Orders order where order.tenant = :tenant";
	String findLimitedOrdersQuery = "select * from orders where tenantid = ?1 limit ?2 offset ?3";
	String findOrdersByCustomerQuery = "select order from Orders order where order.tenant = :tenant and order.customerId = :customerId";
	
	@Query(findOrdersByIdQuery)
	Orders findOrdersByIdQuery(@Param("tenant") Tenant realm, @Param("orderId") int orderId);
	
	@Query(findOrdersByCustomerQuery)
	List<Orders> findOrdersByCustomer(@Param("tenant") Tenant realm, @Param("customerId") int customerId);
	
	@Query(findOrdersForTenantQuery)
	List<Orders> findOrdersForTenant(@Param("tenant") Tenant realm);
	
	@Query(value = findLimitedOrdersQuery, nativeQuery = true)
	List<Orders> findLimitedOrders(String tenant, int limit, int offset);

}
