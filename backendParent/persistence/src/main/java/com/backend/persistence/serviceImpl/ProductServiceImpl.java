package com.backend.persistence.serviceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.core.service.BaseService;
import com.backend.persistence.dao.ProductDao;
import com.backend.persistence.entity.Category;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductImages;
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
	private ProductDao productDao;
	
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
	public Product getProductByCode(String code) {
		return productRepo.findProductByCode(baseService.getTenantInfo(), code);
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
	public List<Product> getProducts(List<Integer> cIds, List<Integer> pIds, String limit, String offset,
			boolean includeInactive) throws Exception {
		return productDao.getProducts(cIds, pIds, limit, offset, includeInactive);
	}
	
	@Override
	public List<Product> getProducts(List<Integer> cIds, List<Integer> pIds, String limit, String offset, String sortByField, String sortBytype,
			boolean includeInactive) throws Exception {
		if(CommonUtil.isValidStringParam(sortByField) && CommonUtil.isValidStringParam(sortBytype)) {
			return productDao.getProducts(cIds, pIds, limit, offset, sortByField, sortBytype, includeInactive);
		}
		return productDao.getProducts(cIds, pIds, limit, offset, includeInactive);
	}
	
	@Override
	public int getProductsCount(List<Integer> cIds, boolean includeInactive) throws Exception {
		return productDao.getProductsCount(cIds, includeInactive);
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

	@Override
	public Product createOrUpdateProduct(Product product, int categoryId, byte[] productPic)
			throws Exception {
		if (product.getProductId() > -1) {
			// update existing product
			Product actualProduct = productRepo.findProductById(baseService.getTenantInfo(), product.getProductId());
			if(actualProduct == null) {
				throw new Exception("Product Not Found!");
			}
			if (!StringUtils.isEmpty(product.getProductName())) {
				actualProduct.setProductName(product.getProductName());
			}
			if (!StringUtils.isEmpty(product.getBrandName())) {
				actualProduct.setBrandName(product.getBrandName());
			}
			if (!StringUtils.isEmpty(product.getProductDescription())) {
				actualProduct.setProductDescription(product.getProductDescription());
			}
			if(!StringUtils.isEmpty(product.getProductCode())) {
				actualProduct.setProductCode(product.getProductCode());
			}
			if (product.getCost() != null && product.getCost().intValue() > 0) {
				actualProduct.setCost(product.getCost());
			}
			if (product.getOffer() != null && product.getOffer().intValue() > 0) {
				actualProduct.setOffer(product.getOffer());
			}
			if (product.getQuantityInStock() >= 0) {
				actualProduct.setOffer(product.getOffer());
			}
			actualProduct.setLastModified(new Date());
			actualProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			productRepo.save(actualProduct);
		} else {
			// create new product
			Product newProduct = new Product();
			newProduct.setCategoryId(catService.getCategoryById(categoryId));
			newProduct.setProductName(product.getProductName());
			newProduct.setActive(product.isActive());
			newProduct.setBrandName(product.getBrandName());
			newProduct.setCost(product.getCost());
			newProduct.setOffer(product.getOffer());
			newProduct.setProductDescription(product.getProductDescription());
			newProduct.setProductCode(product.getProductCode());
			newProduct.setQuantityInStock(product.getQuantityInStock());
			newProduct.setLastModified(new Date());
			newProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			newProduct.setTenant(baseService.getTenantInfo());
			productRepo.save(newProduct);
			// create product image objects
			if (productPic != null) {
				List<ProductImages> productImages = new ArrayList<>();
				// later implement resize based on ui rendering quality.
				ProductImages prodImages = new ProductImages();
				prodImages.setImage(new SerialBlob(CommonUtil.getProductImage(productPic)));
				prodImages.setProductId(newProduct);
				prodImages.setTenant(baseService.getTenantInfo());
				productImages.add(prodImages);
				newProduct.setProductImages(productImages);
				productRepo.save(newProduct);
				product = newProduct;
			}
		}
		return product;
	}
	
	@Override
	public void deleteProductsForCategory(Category category) {
		List<Product> products = getAllProductsForCategory(category);
		products.stream().forEach(product -> {
			product.setActive(false);
			save(product);
		});
	}

}
