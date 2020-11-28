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

	Product getProductByCode(String code);

	List<ProductImages> getProductImages(Product product);

	Product getProductById(int id);

	List<ProductImages> getProductImages(List<Integer> productIds) throws Exception;

	void addProductImage(int productId, byte[] productPic) throws Exception;

	void removeProductImage(int imageId) throws Exception;

	void replaceImage(int imageId, byte[] productPic) throws Exception;

	void changeProductStatus(int productId, boolean status) throws Exception;

	List<Product> searchProductsByMatchingName(String searchTerm);

	void addToFeaturedProducts(int pId) throws Exception;

	List<ProductPOJO> getFeaturedProducts() throws Exception;

	void deleteFeaturedProduct(int pId) throws Exception;

	boolean isFeaturedProduct(int pId) throws Exception;

	List<Product> searchProductsByMatchingNameOrCode(String searchTerm);

}
