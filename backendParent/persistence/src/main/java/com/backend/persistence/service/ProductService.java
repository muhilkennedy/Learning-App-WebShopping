package com.backend.persistence.service;

import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import com.backend.persistence.entity.Category;
import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductImages;
import com.backend.persistence.helper.ProductPOJO;

public interface ProductService {

	void save(Product product);

	List<Product> getAllProductsForTenant();

	int getAllProductCountForTenant();

	List<Product> getAllProductsForCategory(Category category);

	int getAllProductsCountUnderCategory(Category category);

	List<Product> getAllProductsForTenant(int limit, int offset);

	List<Product> getAllProductsForTenant(int limit, int offset, Long categoryId);

	Product createProduct(Product product, Long categoryId);

	List<Product> getProducts(List<Long> ids);

	Product createOrUpdateProduct(Product product, Long categoryId, byte[] productPic)
			throws SerialException, SQLException, Exception;

	int getProductsCount(List<Long> cIds, boolean includeInactive) throws Exception;

	void deleteProductsForCategory(Category category);

	Product getProductByCode(String code);

	List<ProductImages> getProductImages(Product product);

	Product getProductById(Long id);

	List<ProductImages> getProductImages(List<Long> productIds) throws Exception;

	void addProductImage(Long productId, byte[] productPic) throws Exception;

	void removeProductImage(Long imageId) throws Exception;

	void replaceImage(Long imageId, byte[] productPic) throws Exception;

	void changeProductStatus(Long productId, boolean status) throws Exception;

	List<Product> searchProductsByMatchingName(String searchTerm);

	void addToFeaturedProducts(Long pId) throws Exception;

	List<ProductPOJO> getFeaturedProducts() throws Exception;

	void deleteFeaturedProduct(Long pId) throws Exception;

	boolean isFeaturedProduct(Long pId) throws Exception;

	List<Product> searchProductsByMatchingNameOrCode(String searchTerm);

	List<Long> getProductRecursiveByCategoryId(Long cId) throws Exception;

	List<Product> getProductRecursiveByCategoryId(Long cId, String limit, String offset, String sortByField,
			String sortByType, boolean includeInactive) throws Exception;

	void deleteProductById(Long pId);

	List<Product> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset, String sortByField,
			String sortByType, boolean includeInactive, boolean outOfStock) throws Exception;

	List<Product> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset,
			boolean includeInactive, boolean outOfStock) throws Exception;

	List<ProductPOJO> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset,
			String sortByField, String sortByType) throws Exception;

	List<ProductPOJO> getProductsWithSearchTerm(List<Long> cIds, String SearchTerm, String limit, String offset,
			String sortByField, String sortByType) throws Exception;

	int getProductsCountWithSearchTerm(List<Long> cIds, String SearchTerm, String limit, String offset,
			String sortByField, String sortByType) throws Exception;

}
