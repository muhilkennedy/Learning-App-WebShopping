package com.backend.persistence.repository;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
	
	String findOrderDetailsByIdQuery = "select od from OrderDetails od where od.tenant = :tenant and od.orderDetailId = :orderDetailId";
	String deleteProductQuery = "delete from OrderDetails od where od.tenant = :tenant and od.orderDetailId = :orderDetailId";
	
	@Query(findOrderDetailsByIdQuery)
	OrderDetails findOrdersByIdQuery(@Param("tenant") Tenant realm, @Param("orderDetailId") Long orderDetailId);
	
	@Modifying
	@Cascade(CascadeType.DELETE)
	@Query(deleteProductQuery)
	void deleteProduct(@Param("tenant") Tenant realm, @Param("orderDetailId") Long orderDetailId);

}
