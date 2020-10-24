package com.backend.persistence.helper;

import java.util.List;

/**
 * @author Muhil
 *
 */
public class POSData {

	private String primaryKey;
	private String tenantId;
	private String mobile;
	private String timeCreated;
	private String paymentMode;
	private List<PosProduct> posProduct;

	public String getTenantId() {
		return tenantId;
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

	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
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

	public static class PosProduct {

		private String itemCode;
		private int itemID;
		private String itemName;
		private float discount;
		private float total;
		private float mrp;
		private int quantity;

		public String getItemCode() {
			return itemCode;
		}

		public void setItemCode(String itemCode) {
			this.itemCode = itemCode;
		}

		public int getItemID() {
			return itemID;
		}

		public void setItemID(int itemID) {
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

	}

}
