package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.OrderDetails;
import com.backend.persistence.entity.Orders;

public interface OrdersService {

	void save(Orders order);

	void saveAndFlush(Orders order);

	void saveAndFlush(OrderDetails orderDetail);

	List<Integer> getAllUnassignedOrders() throws Exception;

	List<Orders> getOrders(int limit, int offset);

	void updateOrderStatus(String status, int orderId) throws Exception;

	int getAllUnassignedOrdersCount() throws Exception;

	List<Orders> getOrdersAssignedForEmployee(String status);

	List<Orders> getOrders(String limit, String offset, String condition, long date, String status) throws Exception;

	void createCustomerOrder(int couponId, int paymentMode) throws Exception;

}
