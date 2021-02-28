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

import com.backend.core.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "PRODUCTREVIEW")
public class ProductReview implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "REVIEWID")
	private Long reviewId;
	
	@Column(name = "CUSTOMERID")
	private Long customerId;
	
	@Column(name = "RATING")
	private int rating;
	
	@Column(name = "REVIEW")
	private String reviewDescription;
	
	@Column(name = "REVIEWHEADER")
	private String reviewHeader;

	@Column(name = "USEFULLCOUNT")
	private int usefullCount;
	
	@Column(name = "PRODUCTREVIEWID")
	private long productReviewId;

	public ProductReview() {
		super();
	}
	
	public ProductReview(Tenant tenant, Long customerId, int rating, String reviewDescription,
			String reviewHeader, int usefullCount) {
		super();
		this.tenant = tenant;
		this.customerId = customerId;
		this.rating = rating;
		this.reviewDescription = reviewDescription;
		this.reviewHeader = reviewHeader;
		this.usefullCount = usefullCount;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public Long getReviewId() {
		return reviewId;
	}

	public void setpReviewId(Long pReviewId) {
		this.reviewId = pReviewId;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getReviewDescription() {
		return reviewDescription;
	}

	public void setReviewDescription(String reviewDescription) {
		this.reviewDescription = reviewDescription;
	}

	public String getReviewHeader() {
		return reviewHeader;
	}

	public void setReviewHeader(String reviewHeader) {
		this.reviewHeader = reviewHeader;
	}

	public int getUsefullCount() {
		return usefullCount;
	}

	public void setUsefullCount(int usefullCount) {
		this.usefullCount = usefullCount;
	}

	public long getProductReviewId() {
		return productReviewId;
	}

	public void setProductReviewId(long productReviewId) {
		this.productReviewId = productReviewId;
	}

}
