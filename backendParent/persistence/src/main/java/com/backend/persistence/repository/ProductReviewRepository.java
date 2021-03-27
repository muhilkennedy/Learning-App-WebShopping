package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.ProductReview;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long>{
	
	String findAllReviwesForProductQuery = "select pr from ProductReview pr where pr.tenant = :tenant and pr.productReviewId = :prId";
	String findAllReviwesForRatingQuery = "select count(*) from ProductReview pr where pr.tenant = :tenant and pr.productReviewId = :prId and pr.rating = :rating";
	String findReviwesForProductByCustomerQuery = "select pr from ProductReview pr where pr.tenant = :tenant and pr.customerId = :customerId";

	@Query(findAllReviwesForProductQuery)
	List<ProductReview> findAllReviewForProduct(@Param("tenant") Tenant realm, @Param("prId") long productReviewId);
	
	@Query(findAllReviwesForRatingQuery)
	int findAllReviwesForRating(@Param("tenant") Tenant realm, @Param("prId") long productReviewId, @Param("rating") int rating);
	
	@Query(findReviwesForProductByCustomerQuery)
	ProductReview findReviwesForProductByCustomer(@Param("tenant") Tenant realm, @Param("customerId") long customerId);

}
