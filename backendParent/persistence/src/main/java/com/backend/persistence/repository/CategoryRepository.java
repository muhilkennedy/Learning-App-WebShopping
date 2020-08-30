package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Category;

/**
 * @author Muhil
 *
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	String getAllCategoryQuery = "select cat from Category cat where cat.tenant = :tenant and cat.active = true";
	String getAllBaseCategoryQuery = "select cat from Category cat where cat.tenant = :tenant and cat.parentCategoryId is null and cat.active = true";
	String getCategoryByIdQuery = "select cat from Category cat where cat.tenant = :tenant and cat.categoryId = :catId";
	String getCategoryChildrenQuery = "select cat from Category cat where cat.tenant = :tenant and cat.parentCategoryId = :parentCatId and cat.active = true";
	
	@Query(getAllCategoryQuery)
	List<Category> getAllCategory(@Param("tenant") Tenant realm);
	
	@Query(getAllBaseCategoryQuery)
	List<Category> getAllBaseCategory(@Param("tenant") Tenant realm);
	
	@Query(getCategoryByIdQuery)
	Category getCategoryById(@Param("tenant") Tenant realm, @Param("catId") int id);
	
	@Query(getCategoryChildrenQuery)
	List<Category> getCategoryChildren(@Param("tenant") Tenant realm, @Param("parentCatId") int parentCategoryId);

}
