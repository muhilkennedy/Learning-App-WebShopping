package com.backend.persistence.helper;

import java.util.List;

/**
 * @author Muhil
 *
 */
public class POSData {

	public static String Key_CreatedBy = "createdBy";
	public static String Key_CreatedById = "createdById";
	
	private String primaryKey;
	private String tenantId;
	private String mobile;
	private long timeCreated;
	private String createdBy;
	private String createdById;
	private String paymentMode;
	private String subTotal;
	private String actualSubTotal;
	private List<PosProduct> posProduct;
	private String totalQuantity;
	
	public String getActualSubTotal() {
		return actualSubTotal;
	}

	public void setActualSubTotal(String actualSubTotal) {
		this.actualSubTotal = actualSubTotal;
	}

	public String getTenantId() {
		return tenantId;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(String primaryKey) {
		this.primaryKey = primaryKey;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public long getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(long timeCreated) {
		this.timeCreated = timeCreated;
	}

	public List<PosProduct> getPosProduct() {
		return posProduct;
	}

	public void setPosProduct(List<PosProduct> posProduct) {
		this.posProduct = posProduct;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}

	public String getCreatedById() {
		return createdById;
	}

	public void setCreatedById(String createdById) {
		this.createdById = createdById;
	}

	public String getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(String totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	public static class PosProduct {

		private String itemCode;
		private Long itemID;
		private String itemName;
		private float discount;
		private float total;
		private float mrp;
		private int quantity;
		private float sellingCost;

		public String getItemCode() {
			return itemCode;
		}

		public void setItemCode(String itemCode) {
			this.itemCode = itemCode;
		}

		public Long getItemID() {
			return itemID;
		}

		public void setItemID(Long itemID) {
			this.itemID = itemID;
		}

		public float getDiscount() {
			return discount;
		}

		public void setDiscount(float discount) {
			this.discount = discount;
		}

		public float getTotal() {
			return total;
		}

		public void setTotal(float total) {
			this.total = total;
		}

		public float getMrp() {
			return mrp;
		}

		public void setMrp(float mrp) {
			this.mrp = mrp;
		}

		public int getQuantity() {
			return quantity;
		}

		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}

		public String getItemName() {
			return itemName;
		}

		public void setItemName(String itemName) {
			this.itemName = itemName;
		}

		public float getSellingCost() {
			return sellingCost;
		}

		public void setSellingCost(float sellingCost) {
			this.sellingCost = sellingCost;
		}

	}

}
