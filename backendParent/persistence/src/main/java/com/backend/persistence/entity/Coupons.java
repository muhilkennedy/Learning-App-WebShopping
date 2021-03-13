package com.backend.persistence.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "COUPONS")
public class Coupons implements Serializable{

	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "COUPONID")
	private Long couponId;
	
	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "CODE")
	private String code;
	
	@Column(name = "DISCOUNT")
	private int discount;
	
	@Column(name = "STARTDATE")
	private long startDate;
	
	@Column(name = "ENDDATE")
	private long endDate;
	
	@Column(name = "FREESHIPPING")
	private boolean freeShipping;
	
	@Column(name = "USERUSAGE")
	private int perUserUsage;
	
	@Column(name = "ACTIVE")
	private boolean active;

	@Column(name = "ISDELETED")
	private boolean deleted;
	
	@Column(name = "MAXDISCOUNTLIMIT")
	private int maxDiscountLimit;
	
	@Column(name = "MINTOTALLIMIT")
	private int minTotalLimit;
	
	public Coupons() {
		super();
	}

	public Coupons(Tenant tenant, String title, int discount, long startdate, long endDate, boolean freeShipping,
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

	public long getStartDate() {
		return CommonUtil.convertToIST(startDate);
	}

	public void setStartDate(long startDate) {
		this.startDate = CommonUtil.convertToUTC(startDate);
	}

	public long getEndDate() {
		return CommonUtil.convertToIST(endDate);
	}

	public void setEndDate(long endDate) {
		this.endDate = CommonUtil.convertToUTC(endDate);
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

	public Long getCouponId() {
		return couponId;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public int getMaxDiscountLimit() {
		return maxDiscountLimit;
	}

	public void setMaxDiscountLimit(int maxDiscountLimit) {
		this.maxDiscountLimit = maxDiscountLimit;
	}

	public int getMinTotalLimit() {
		return minTotalLimit;
	}

	public void setMinTotalLimit(int minTotalLimit) {
		this.minTotalLimit = minTotalLimit;
	}
	
}
