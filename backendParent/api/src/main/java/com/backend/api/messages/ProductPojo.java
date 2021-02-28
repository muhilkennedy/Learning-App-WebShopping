package com.backend.api.messages;

import com.backend.persistence.entity.ProductReview;

public class ProductPOJO {

	private long productId;
	private ProductReview productReview;

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public ProductReview getProductReview() {
		return productReview;
	}

	public void setProductReview(ProductReview productReview) {
		this.productReview = productReview;
	}

}
