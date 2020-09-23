package com.backend.persistence.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.Category;
import com.backend.persistence.entity.Product;
import com.backend.persistence.repository.ProductRepository;
import com.backend.persistence.service.CategoryService;
import com.backend.persistence.service.ProductService;


/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ProductRepository productRepo;
	
	@Autowired
	private CategoryService catService;
	
	@Override
	public void save(Product product) {
		productRepo.save(product);
	}
	
	@Override
	public List<Product> getAllProductsForTenant() {
		return productRepo.findAllProducts(baseService.getTenantInfo());
	}
	
	@Override
	public int getAllProductCountForTenant() {
		return productRepo.findAllProductsCount(baseService.getTenantInfo());
	}
	
	@Override
	public List<Product> getAllProductsForCategory(Category category){
		return productRepo.findProductsForCategory(baseService.getTenantInfo(), category);
	}
	
	@Override
	public int getAllProductsCountUnderCategory(Category category) {
		return productRepo.findProductCountForCategory(baseService.getTenantInfo(), category);
	}
	
	@Override
	public List<Product> getAllProductsForTenant(int limit, int offset){
		return productRepo.findLimitedProducts(baseService.getTenantInfo().getTenantID(), limit, offset);
	}
	
	@Override
	public List<Product> getAllProductsForTenant(int limit, int offset, int categoryId){
		return productRepo.findLimitedProductsForCategory(baseService.getTenantInfo().getTenantID(), limit, offset, categoryId);
	}
	
	@Override
	public Product createProduct(Product product, int categoryId) {
		Category cat = catService.getCategoryById(categoryId);
		if(cat != null) {
			product.setTenant(baseService.getTenantInfo());
			product.setCategoryId(cat);
			product.setActive(true);
			productRepo.save(product);
			return product;
		}
		else {
			return null;
		}
	}
	
	@Override
	public List<Product> getProducts(List<Integer> ids){
		List<Product> products = new ArrayList<Product>();
		ids.forEach(id -> {
			Product p = productRepo.findProductById(baseService.getTenantInfo(), id);
			if(p != null) {
				products.add(p);
			}
		});
		return products;
	}

}
