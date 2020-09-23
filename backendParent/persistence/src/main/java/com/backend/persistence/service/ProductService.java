package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.Category;
import com.backend.persistence.entity.Product;

public interface ProductService {

	void save(Product product);

	List<Product> getAllProductsForTenant();

	int getAllProductCountForTenant();

	List<Product> getAllProductsForCategory(Category category);

	int getAllProductsCountUnderCategory(Category category);

	List<Product> getAllProductsForTenant(int limit, int offset);

	List<Product> getAllProductsForTenant(int limit, int offset, int categoryId);

	Product createProduct(Product product, int categoryId);

	List<Product> getProducts(List<Integer> ids);

}
