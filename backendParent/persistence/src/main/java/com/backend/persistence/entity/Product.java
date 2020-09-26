package com.backend.persistence.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
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
import javax.persistence.Table;

import com.backend.core.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "PRODUCT")
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PRODUCTID")
	private int productId;
	
	@ManyToOne
	@JoinColumn(name = "CATEGORYID", nullable = false)
	private Category categoryId;
	
	@Column(name = "PRODUCTNAME")
	private String productName;
	
	@Column(name = "BRAND")
	private String brandName;
	
	@Column(name = "COST")
	private BigDecimal cost;
	
	@Column(name = "DESCRIPTION")
	private String productDescription;
	
	@Column(name = "LASTMODIFIED")
	private Date lastModified;
	
	@Column(name = "LASTMODIFIEDEMPLOYEEID")
	private Integer lastModifiedById;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	@OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ProductImages> productImages;
	
	@JsonIgnore
	@OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ProductReview> productReviews;

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public BigDecimal getCost() {
		return cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public Integer getLastModifiedById() {
		return lastModifiedById;
	}

	public void setLastModifiedById(Integer lastModifiedById) {
		this.lastModifiedById = lastModifiedById;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Category getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Category categoryId) {
		this.categoryId = categoryId;
	}

}
