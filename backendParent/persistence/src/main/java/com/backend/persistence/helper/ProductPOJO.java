package com.backend.persistence.helper;

import java.util.List;

import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductImages;
import com.backend.persistence.entity.ProductReview;

public class ProductPOJO {

	private Product productContent;
	private List<ProductImages> productImage;
	private List<ProductReview> productReview;

	public Product getProductContent() {
		return productContent;
	}

	public void setProductContent(Product productContent) {
		this.productContent = productContent;
	}

	public List<ProductImages> getProductImage() {
		return productImage;
	}

	public void setProductImage(List<ProductImages> productImage) {
		this.productImage = productImage;
	}

	public List<ProductReview> getProductReview() {
		return productReview;
	}

	public void setProductReview(List<ProductReview> productReview) {
		this.productReview = productReview;
	}

}
