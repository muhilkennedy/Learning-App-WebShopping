package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.ProductReview;

public interface ProductReviewService {

	void save(ProductReview review);

	List<ProductReview> getReviewsForProduct(long productId);

	List<ProductReview> createProductReview(long productId, ProductReview review);

}
