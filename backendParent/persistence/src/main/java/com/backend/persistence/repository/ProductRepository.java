package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Category;
import com.backend.persistence.entity.Product;

/**
 * @author Muhil
 *
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	String findProductByIdQuery = "select p from Product p where p.tenant = :tenant and p.productId = :pId";
	String findProductsForCategoryQuery = "select p from Product p where p.tenant = :tenant and p.categoryId = :category";
	String findAllProductsQuery = "select p from Product p where p.tenant = :tenant";
	String findAllProductsCountQuery = "select count(*) from Product p where p.tenant = :tenant";
	String findProductCountForCategory = "select count(*) from Product p where p.tenant = :tenant and p.categoryId = :category";
	String findLimitedProductsQuery = "select * from Product where tenantid = ?1 limit ?2 offset ?3";
	String findLimitedProductsForCategoryQuery = "select * from Product where tenantid = ?1 and categoryid = ?4 limit ?2 offset ?3";
	String findProductByCodeQuery = "select p from Product p where p.tenant = :tenant and p.productCode = :pCode";
	String findProductByIdsQuery = "select p from Product p where p.tenant = :tenant and p.productId in :pIds";
	String findProductByNameQuery = "select p from Product p where p.tenant = :tenant and p.active = true and p.productName like :searchTerm%";
	
	@Query(findAllProductsQuery)
	List<Product> findAllProducts(@Param("tenant") Tenant realm);
	
	@Query(value = findLimitedProductsQuery, nativeQuery = true)
	List<Product> findLimitedProducts(String tenant, int limit, int offset);
	
	@Query(value = findLimitedProductsForCategoryQuery, nativeQuery = true)
	List<Product> findLimitedProductsForCategory(String tenant, int limit, int offset, int categoryId);
	
	@Query(findAllProductsCountQuery)
	int findAllProductsCount(@Param("tenant") Tenant realm);
	
	@Query(findProductsForCategoryQuery)
	List<Product> findProductsForCategory(@Param("tenant") Tenant realm, @Param("category") Category category);
	
	@Query(findProductByIdQuery)
	Product findProductById(@Param("tenant") Tenant realm, @Param("pId") int id);
	
	@Query(findProductCountForCategory)
	int findProductCountForCategory(@Param("tenant") Tenant realm, @Param("category") Category category);
	
	@Query(findProductByCodeQuery)
	Product findProductByCode(@Param("tenant") Tenant realm, @Param("pCode") String productCode);
	
	@Query(findProductByIdsQuery)
	List<Product> findProductByIds(@Param("tenant") Tenant realm, @Param("pIds") List<Integer> pIds);
	
	@Query(findProductByNameQuery)
	List<Product> findProductByNameMatching(@Param("tenant") Tenant realm, @Param("searchTerm") String searchTerm);

}
