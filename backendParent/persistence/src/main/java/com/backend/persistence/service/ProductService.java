package com.backend.persistence.service;

import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

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

	Product createOrUpdateProduct(Product product, int categoryId, byte[] productPic)
			throws SerialException, SQLException, Exception;

	List<Product> getProducts(List<Integer> cIds, List<Integer> pIds, String limit, String offset,
			boolean includeInactive) throws Exception;

	int getProductsCount(List<Integer> cIds, boolean includeInactive) throws Exception;

	List<Product> getProducts(List<Integer> cIds, List<Integer> pIds, String limit, String offset, String sortByField,
			String sortBytype, boolean includeInactive) throws Exception;

	void deleteProductsForCategory(Category category);

}
