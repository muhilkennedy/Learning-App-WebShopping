package com.backend.persistence.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
	private BigDecimal couponDiscount;
	
	@Column(name = "COUPONAPPLIED")
	private boolean couponapplied;
	
	@Column(name = "COUPONID")
	private int couponId;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderDetails> orderDetails;

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

	public BigDecimal getCouponDiscount() {
		return couponDiscount;
	}

	public void setCouponDiscount(BigDecimal couponDiscount) {
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

}
