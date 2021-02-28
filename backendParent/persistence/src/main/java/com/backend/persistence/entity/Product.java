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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
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
	private Long productId;
	
	@ManyToOne
	@JoinColumn(name = "CATEGORYID", nullable = false)
	private Category categoryId;
	
	@Column(name = "PRODUCTNAME")
	private String productName;
	
	@Column(name = "BRAND")
	private String brandName;
	
	@Column(name = "COST")
	private BigDecimal cost;
	
	@Column(name = "SELLINGCOST")
	private BigDecimal sellingCost;
	
	@Column(name = "OFFER")
	private BigDecimal offer;
	
	@Column(name = "DESCRIPTION")
	private String productDescription;
	
	@Column(name = "UNITSINSTOCK")
	private int quantityInStock;
	
	@Column(name = "PRODUCTCODE")
	private String productCode;
	
	@Column(name = "LASTMODIFIED")
	private long lastModified;
	
	@Column(name = "LASTMODIFIEDEMPLOYEEID")
	private Long lastModifiedById;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	@Column(name = "ISDELETED")
	private boolean isDeleted;
	
	@Column(name = "PRODUCTRATING")
	private int productRating;
	
	@Column(name = "SEARCHTEXT")
	private String searchText;
	
	@Column(name = "PRODUCTREVIEWID")
	private long productReviewId;

	@OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ProductImages> productImages;
	
	/*@JsonIgnore
	@OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ProductReview> productReviews;*/
	
	@JsonIgnore
	@ManyToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<OrderDetails> orderDetails;

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
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

	public long getLastModified() {
		return lastModified;
	}

	public void setLastModified(long lastModified) {
		this.lastModified = lastModified;
	}

	public Long getLastModifiedById() {
		return lastModifiedById;
	}

	public void setLastModifiedById(Long lastModifiedById) {
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

	public BigDecimal getOffer() {
		return offer;
	}

	public void setOffer(BigDecimal offer) {
		this.offer = offer;
	}

	public void setProductImages(List<ProductImages> productImages) {
		this.productImages = productImages;
	}

	public int getQuantityInStock() {
		return quantityInStock;
	}

	public void setQuantityInStock(int quantityInStock) {
		this.quantityInStock = quantityInStock;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public int getProductRating() {
		return productRating;
	}

	public void setProductRating(int productRating) {
		this.productRating = productRating;
	}
	
	public BigDecimal getSellingCost() {
		return sellingCost;
	}

	public void setSellingCost(BigDecimal sellingCost) {
		this.sellingCost = sellingCost;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}

	public long getProductReviewId() {
		return productReviewId;
	}

	public void setProductReviewId(long productReviewId) {
		this.productReviewId = productReviewId;
	}

	@PrePersist
	private void prePersistCheck() {
		// A deleted product will be deactivated always
		if (isDeleted == true && active != false) {
			active = false;
		}
	}

}
