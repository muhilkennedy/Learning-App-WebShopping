package com.backend.persistence.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.backend.core.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "COUPONS")
public class Coupons implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "COUPONID")
	private int couponId;
	
	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "CODE")
	private String code;
	
	@Column(name = "DISCOUNT")
	private int discount;
	
	@Column(name = "STARTDATE")
	private Date startDate;
	
	@Column(name = "ENDDATE")
	private Date endDate;
	
	@Column(name = "FREESHIPPING")
	private boolean freeShipping;
	
	@Column(name = "USERUSAGE")
	private int perUserUsage;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	public Coupons() {
		super();
	}

	public Coupons(Tenant tenant, String title, int discount, Date startdate, Date endDate, boolean freeShipping,
			int perUserUsage, boolean active, String code) {
		super();
		this.tenant = tenant;
		this.title = title;
		this.discount = discount;
		this.startDate = startdate;
		this.endDate = endDate;
		this.freeShipping = freeShipping;
		this.perUserUsage = perUserUsage;
		this.active = active;
		this.code = code;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startdate) {
		this.startDate = startdate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public boolean isFreeShipping() {
		return freeShipping;
	}

	public void setFreeShipping(boolean freeShipping) {
		this.freeShipping = freeShipping;
	}

	public int getPerUserUsage() {
		return perUserUsage;
	}

	public void setPerUserUsage(int perUserUsage) {
		this.perUserUsage = perUserUsage;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getCouponId() {
		return couponId;
	}
	
}
