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
	private int orderId;
	
	@Column(name = "CUSTOMERID", nullable = false)
	private int customerId;
	
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
	private int couponId;
	
	@Column(name = "PAYMENTMODEID")
	private int paymentModeId;
	
	@Column(name = "ORDERPLACEDTIME")
	private long orderPlacedTime;
	
	@Column(name = "EMPLOYEEID", nullable = true)
	private int employeeId;
	
	@OneToOne(mappedBy = "orderId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private OrderInvoice invoice;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderDetails> orderDetails;
	
	@Column(name = "CUSTOMERADDRESSID")
	private int customerAddressId;

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
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

	public int getCouponId() {
		return couponId;
	}

	public void setCouponId(int couponId) {
		this.couponId = couponId;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
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

	public int getCustomerAddressId() {
		return customerAddressId;
	}

	public void setCustomerAddressId(int customerAddressId) {
		this.customerAddressId = customerAddressId;
	}

	public long getOrderPlacedTime() {
		return orderPlacedTime;
	}

	public void setOrderPlacedTime(long orderPlacedTime) {
		this.orderPlacedTime = orderPlacedTime;
	}

}
