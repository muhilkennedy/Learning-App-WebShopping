package com.backend.persistence.helper;

import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductImages;
import com.backend.persistence.entity.ProductReview;

public class ProductPOJO {

	private Product productContent;
	private ProductImages productImage;
	private ProductReview productReview;

	public Product getProductContent() {
		return productContent;
	}

	public void setProductContent(Product productContent) {
		this.productContent = productContent;
	}

	public ProductImages getProductImage() {
		return productImage;
	}

	public void setProductImage(ProductImages productImage) {
		this.productImage = productImage;
	}

	public ProductReview getProductReview() {
		return productReview;
	}

	public void setProductReview(ProductReview productReview) {
		this.productReview = productReview;
	}

}
