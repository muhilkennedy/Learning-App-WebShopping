package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entity.ProductReview;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer>{

}
