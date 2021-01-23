package com.backend.persistence.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.backend.core.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "ORDERS")
public class Orders implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ORDERID")
	private Long orderId;
	
	@Column(name = "CUSTOMERID", nullable = false)
	private Long customerId;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "ORDERDATE")
	private long orderDate;
	
	@Column(name = "SUBTOTAL")
	private BigDecimal subTotal;
	
	@Column(name = "COUPONDISCOUNT")
	private int couponDiscount;
	
	@Column(name = "COUPONAPPLIED")
	private boolean couponapplied;
	
	@Column(name = "COUPONID")
	private Long couponId;
	
	@Column(name = "PAYMENTMODEID")
	private int paymentModeId;
	
	@Column(name = "ORDERPLACEDTIME")
	private long orderPlacedTime;
	
	@Column(name = "EMPLOYEEID", nullable = true)
	private Long employeeId;
	
	@OneToOne(mappedBy = "orderId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private OrderInvoice invoice;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderDetails> orderDetails;
	
	@Column(name = "CUSTOMERADDRESSID")
	private Long customerAddressId;
	
	@Column(name = "DELIVERYCHARGE")
	private int deliveryCharge;

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(long orderDate) {
		this.orderDate = orderDate;
	}

	public BigDecimal getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(BigDecimal subTotal) {
		this.subTotal = subTotal;
	}

	public int getCouponDiscount() {
		return couponDiscount;
	}

	public void setCouponDiscount(int couponDiscount) {
		this.couponDiscount = couponDiscount;
	}

	public boolean isCouponapplied() {
		return couponapplied;
	}

	public void setCouponapplied(boolean couponapplied) {
		this.couponapplied = couponapplied;
	}

	public Long getCouponId() {
		return couponId;
	}

	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public List<OrderDetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}
	
	public OrderInvoice fetchOrderInvoice() {
		return this.invoice;
	}

	public int getPaymentModeId() {
		return paymentModeId;
	}

	public void setPaymentModeId(int paymentModeId) {
		this.paymentModeId = paymentModeId;
	}

	public Long getCustomerAddressId() {
		return customerAddressId;
	}

	public void setCustomerAddressId(Long customerAddressId) {
		this.customerAddressId = customerAddressId;
	}

	public long getOrderPlacedTime() {
		return orderPlacedTime;
	}

	public void setOrderPlacedTime(long orderPlacedTime) {
		this.orderPlacedTime = orderPlacedTime;
	}

	public int getDeliveryCharge() {
		return deliveryCharge;
	}

	public void setDeliveryCharge(int deliveryCharge) {
		this.deliveryCharge = deliveryCharge;
	}

}
