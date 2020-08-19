package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entity.Category;

/**
 * @author Muhil
 *
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
