package com.backend.persistence.entity;

import java.io.InputStream;
import java.io.Serializable;
import java.sql.Blob;
import java.util.Base64;

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
import com.google.common.io.ByteStreams;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "PRODUCTIMAGES")
public class ProductImages implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PRODUCTIMAGESID")
	private Long pImagesId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "PRODUCTID", nullable = false)
	private Product productId;

	@Column(name = "IMAGE")
	private Blob image;
	
	@Column(name = "PRIMARYIMAGE")
	private boolean primaryImage;
	
	public ProductImages() {
		super();
	}
	
	public ProductImages(Tenant tenant, Product productId, Blob image) {
		super();
		this.tenant = tenant;
		this.productId = productId;
		this.image = image;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public Long getpImagesId() {
		return pImagesId;
	}

	public void setpImagesId(Long pImagesId) {
		this.pImagesId = pImagesId;
	}

	public Product getProductId() {
		return productId;
	}

	public void setProductId(Product productId) {
		this.productId = productId;
	}

	public String getImage() {
		if (image != null) {
			InputStream in;
			StringBuilder base64 = new StringBuilder();
			try {
				in = image.getBinaryStream();
				base64 = new StringBuilder("data:image/jpeg;base64,");
				base64.append(Base64.getEncoder().encodeToString(ByteStreams.toByteArray(in)));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return base64.toString();
		}
		return null;
	}

	public void setImage(Blob image) {
		this.image = image;
	}
	
	@JsonIgnore
	public Blob getBlobImage() {
		return this.image;
	}

	public boolean isPrimaryImage() {
		return primaryImage;
	}

	public void setPrimaryImage(boolean primaryImage) {
		this.primaryImage = primaryImage;
	}
	
}
