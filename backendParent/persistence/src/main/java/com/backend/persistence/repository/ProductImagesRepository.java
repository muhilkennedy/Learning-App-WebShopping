package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductImages;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImages, Integer> {
	
	String findAllImagesForProduct = "select pi from ProductImages pi where pi.tenant = :tenant and pi.productId = :pId";
	
	@Query(findAllImagesForProduct)
	List<ProductImages> findAllImagesForProduct(@Param("tenant") Tenant realm, @Param("pId") Product product);

}
