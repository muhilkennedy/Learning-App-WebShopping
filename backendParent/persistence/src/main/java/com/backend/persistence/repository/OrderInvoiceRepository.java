package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.OrderInvoice;
import com.backend.persistence.entity.Orders;

/**
 * @author Muhil
 *
 */
@Repository
public interface OrderInvoiceRepository extends JpaRepository<OrderInvoice, Long> {
	
	String findOrdersByOrderIdQuery = "select order from OrderInvoice order where order.tenant = :tenant and order.orderId = :orderId";
	
	@Query(findOrdersByOrderIdQuery)
	OrderInvoice findOrdersByOrderId(@Param("tenant") Tenant realm, @Param("orderId") Orders orderId);

}
