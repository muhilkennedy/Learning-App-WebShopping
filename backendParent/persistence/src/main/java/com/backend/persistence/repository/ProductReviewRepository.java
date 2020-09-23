package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductReview;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer>{
	
	String findAllReviwesForProduct = "select pr from ProductReview pr where pr.tenant = :tenant and pr.productId = :pId";
	
	@Query(findAllReviwesForProduct)
	List<ProductReview> findAllReviewForProduct(@Param("tenant") Tenant realm, @Param("pId") Product product);

}
