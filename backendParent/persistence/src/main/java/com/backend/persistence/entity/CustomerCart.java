package com.backend.persistence.entity;

import java.io.Serializable;

/**
 * @author Muhil
 * 
 * Cart is not declared as entity to avoid multiple key generations and handled DB txns in DAO.
 *
 */
public class CustomerCart implements Serializable {

	private static final long serialVersionUID = 1L;

	private String tenantid;
	private Long customerid;
	private Product product;
	private int quantity;

	public String getTenantid() {
		return tenantid;
	}

	public void setTenantid(String tenantid) {
		this.tenantid = tenantid;
	}

	public Long getCustomerid() {
		return customerid;
	}

	public void setCustomerid(Long customerid) {
		this.customerid = customerid;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

}
