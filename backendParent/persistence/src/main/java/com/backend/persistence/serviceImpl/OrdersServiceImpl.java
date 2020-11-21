package com.backend.persistence.serviceImpl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.OrdersUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.persistence.dao.CartDao;
import com.backend.persistence.dao.OrdersDao;
import com.backend.persistence.entity.Coupons;
import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.entity.OrderDetails;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.repository.OrderDetailsRepository;
import com.backend.persistence.repository.OrdersRepository;
import com.backend.persistence.service.CouponsService;
import com.backend.persistence.service.OrdersService;

/**
 * @author Muhil
 *
 */
@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired
	private BaseService baseService;

	@Autowired
	private OrdersDao ordersDao;

	@Autowired
	private OrdersRepository ordersRepo;

	@Autowired
	private OrderDetailsRepository orderDetailsRepo;

	@Autowired
	private CouponsService couponService;

	@Autowired
	private CartDao cartDao;

	@Override
	public void save(Orders order) {
		ordersRepo.save(order);
	}

	@Override
	public void saveAndFlush(Orders order) {
		ordersRepo.saveAndFlush(order);
	}

	@Override
	public void saveAndFlush(OrderDetails orderDetail) {
		orderDetailsRepo.saveAndFlush(orderDetail);
	}

	private void createUnassignedOrder(int orderId) throws Exception {
		ordersDao.insertUnassignedOrder(orderId);
	}

	private void removeUnassignedOrder(int orderId) throws Exception {
		ordersDao.removeUnassignedOrders(orderId);
	}

	@Override
	public List<Integer> getAllUnassignedOrders() throws Exception {
		return ordersDao.getUnassignedOrders();
	}

	@Override
	public void createCustomerOrder(int couponId) throws Exception {
		Coupons coupon = couponService.findCouponById(couponId);
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		// create initial order object
		Orders order = new Orders();
		order.setOrderDate(CommonUtil.convertToUTC(new Date().getTime()));
		order.setStatus(OrdersUtil.orderStatus.Pending.toString());
		order.setCustomerId(customer.getCustomerId());
		order.setTenant(baseService.getTenantInfo());
		if (coupon != null) {
			order.setCouponId(coupon.getCouponId());
			order.setCouponDiscount(coupon.getDiscount());
			order.setCouponapplied(true);
		} else {
			order.setCouponapplied(false);
		}
		ordersRepo.saveAndFlush(order);

		List<CustomerCart> cartItems = cartDao.userCartItems(customer.getCustomerId());
		BigDecimal subTotal = new BigDecimal(0);
		for (CustomerCart item : cartItems) {
			OrderDetails detail = new OrderDetails();
			detail.setOrder(order);
			detail.setProduct(item.getProduct());
			detail.setQuantity(item.getQuantity());
			detail.setTenant(baseService.getTenantInfo());
			orderDetailsRepo.save(detail);
			subTotal.add(new BigDecimal(item.getQuantity())
					.multiply((item.getProduct().getCost().multiply(item.getProduct().getOffer())))
					.divide(new BigDecimal(100)));
		}
		if (coupon != null) {
			subTotal = subTotal.multiply(new BigDecimal(coupon.getDiscount())).divide(new BigDecimal(100));
		}
		order.setSubTotal(subTotal);
		ordersRepo.save(order);
		// create unassigned order to be picked up by a employee.
		createUnassignedOrder(order.getOrderId());
	}

	@Override
	public List<Orders> getOrders(int limit, int offset) {
		return ordersRepo.findLimitedOrders(baseService.getTenantInfo().getTenantID(), limit, offset);
	}
	
	@Override
	public void updateOrderStatus(String status, int orderId) {
		Orders order = ordersRepo.findOrdersByIdQuery(baseService.getTenantInfo(), orderId);
		if(order != null) {
			EmployeeInfo emp = (EmployeeInfo) baseService.getUserInfo();
			order.setEmployeeId(emp.getEmployeeId());
			switch (status.toLowerCase()) {
			case "accepted":
				order.setStatus(OrdersUtil.orderStatus.Accepted.toString());
				break;
			case "cancelled":
				order.setStatus(OrdersUtil.orderStatus.Cancelled.toString());
				break;
			case "outfordelivery":
				order.setStatus(OrdersUtil.orderStatus.OutForDelivery.toString());
				break;
			case "shipped":
				order.setStatus(OrdersUtil.orderStatus.Shipped.toString());
				break;
			case "delayed":
				order.setStatus(OrdersUtil.orderStatus.Delayed.toString());
				break;
			case "delivered":
				order.setStatus(OrdersUtil.orderStatus.Delivered.toString());
				break;
			default:
				order.setStatus(OrdersUtil.orderStatus.Pending.toString());
				break;
			}
		}
		ordersRepo.saveAndFlush(order);
	}

}
