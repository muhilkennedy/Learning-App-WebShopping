package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entity.Product;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

}
