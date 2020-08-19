package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entity.ProductImages;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImages, Integer> {

}
