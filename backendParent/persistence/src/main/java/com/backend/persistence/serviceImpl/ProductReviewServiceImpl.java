package com.backend.persistence.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductReview;
import com.backend.persistence.repository.ProductReviewRepository;
import com.backend.persistence.service.ProductReviewService;
import com.backend.persistence.service.ProductService;


/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class ProductReviewServiceImpl implements ProductReviewService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ProductReviewRepository reviewRepo;
	
	@Autowired
	private ProductService productService;
	
	@Override
	public void save(ProductReview review) {
		reviewRepo.save(review);
	}
	
	@Override
	public List<ProductReview> getReviewsForProduct(long productReviewId){
		return reviewRepo.findAllReviewForProduct(baseService.getTenantInfo(), productReviewId);
	}
	
	@Override
	public List<ProductReview> createProductReview(long productId, ProductReview review) {
		ProductReview existingReview = reviewRepo.findReviwesForProductByCustomer(baseService.getTenantInfo(), ((CustomerInfo)baseService.getUserInfo()).getCustomerId());
		long productReviewId = 0L;
		if(existingReview != null) {
			existingReview.setRating(review.getRating());
			existingReview.setReviewHeader(review.getReviewHeader());
			existingReview.setReviewDescription(review.getReviewDescription());
			productReviewId = existingReview.getProductReviewId();
		}
		else {
			review.setTenant(baseService.getTenantInfo());
			review.setCustomerId(((CustomerInfo)baseService.getUserInfo()).getCustomerId());
			save(review);
			productReviewId = review.getProductReviewId();
		}
		List<ProductReview> allReviews = getReviewsForProduct(productReviewId);
		Product product = productService.getProductById(productId);
		//calculate average of all ratings
		List<Integer> ratingAvg = new ArrayList<Integer>();
		for(int i=1; i<=5; i++) {
			int count = reviewRepo.findAllReviwesForRating(baseService.getTenantInfo(), productReviewId, i);
			ratingAvg.add(i*count);
		}
		
		int sumAvg = ratingAvg.stream().mapToInt(Integer::intValue).sum();
		int avgRating = sumAvg / allReviews.size();
		
		product.setProductRating(avgRating);
		return allReviews;
	}

}
