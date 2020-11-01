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
import com.backend.persistence.repository.ProductImagesRepository;
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
	
	@Autowired
	private ProductImagesRepository imageRepo;
	
	@Override
	public void save(Product product) {
		productRepo.save(product);
	}
	
	// save might stay just in memory, until flush or commit commands are issued,
	// hence save and flush will fire DB query immedietly.
	private void saveAndFlush(Product product) {
		productRepo.saveAndFlush(product);
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
	public Product getProductById(int id) {
		return productRepo.findProductById(baseService.getTenantInfo(), id);
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
		return productRepo.findProductByIds(baseService.getTenantInfo(), ids);
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
			actualProduct.setActive(false);
			actualProduct.setDeleted(true);
			// resetting product code to avoid unique constraint error(product code will be proper for one product entry at any point of time)
			actualProduct.setProductCode(actualProduct.getProductCode() + ":" + System.currentTimeMillis());
			actualProduct.setLastModified(new Date().getTime());
			actualProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			saveAndFlush(actualProduct);
			// create new Product with old details
			Product newProduct = new Product();
			newProduct.setCategoryId(actualProduct.getCategoryId());
			newProduct.setActive(product.isActive());
			if (!StringUtils.isEmpty(product.getProductName())) {
				newProduct.setProductName(product.getProductName());
			}
			if (!StringUtils.isEmpty(product.getBrandName())) {
				newProduct.setBrandName(product.getBrandName());
			}
			if (!StringUtils.isEmpty(product.getProductDescription())) {
				newProduct.setProductDescription(product.getProductDescription());
			}
			if(!StringUtils.isEmpty(product.getProductCode())) {
				newProduct.setProductCode(product.getProductCode());
			}
			if (product.getCost() != null && product.getCost().doubleValue() > 0) {
				newProduct.setCost(product.getCost());
			}
			if (product.getOffer() != null && product.getOffer().floatValue() > 0) {
				newProduct.setOffer(product.getOffer());
			}
			if (product.getQuantityInStock() >= 0) {
				newProduct.setQuantityInStock(product.getQuantityInStock());
			}
			//copy product images
			newProduct.setTenant(actualProduct.getTenant());
			newProduct.setLastModified(new Date().getTime());
			newProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			save(newProduct);
			product = newProduct;
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
			newProduct.setLastModified(new Date().getTime());
			newProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			newProduct.setTenant(baseService.getTenantInfo());
			save(newProduct);
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
				save(newProduct);
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
			product.setDeleted(true);
			save(product);
		});
	}

	@Override
	public List<ProductImages> getProductImages(Product product) {
		return imageRepo.findAllImagesForProduct(baseService.getTenantInfo(), product);
	}

	@Override
	public List<ProductImages> getProductImages(List<Integer> productIds) throws Exception {
		List<ProductImages> images = new ArrayList<>();
		for (int productId : productIds) {
			Product product = getProductById(productId);
			if (product != null) {
				images.addAll(getProductImages(product));
			} else {
				throw new Exception("Product ID : " + productId + " Not Found!" );
			}
		}
		return images;
	}
	
	@Override
	public void addProductImage(int productId, byte[] productPic) throws Exception {
		Product product = productRepo.findProductById(baseService.getTenantInfo(), productId);
		if(product == null) {
			throw new Exception("Product Not Found!");
		}
		ProductImages images = new ProductImages();
		images.setImage(new SerialBlob(CommonUtil.getProductImage(productPic)));
		images.setProductId(product);
		images.setTenant(baseService.getTenantInfo());
		imageRepo.save(images);
	}
	
	@Override
	public void removeProductImage(int imageId) throws Exception{
		imageRepo.deleteById(baseService.getTenantInfo(), imageId);
	}
	
	@Override
	public void replaceImage(int imageId, byte[] productPic) throws Exception {
		ProductImages image = imageRepo.findImageById(baseService.getTenantInfo(), imageId);
		if(image == null) {
			throw new Exception("Product Image Not Found!");
		}
		image.setImage(new SerialBlob(CommonUtil.getProductImage(productPic)));
		imageRepo.save(image);
	}
	
	@Override
	public void changeProductStatus(int productId, boolean status) throws Exception {
		Product product = productRepo.findProductById(baseService.getTenantInfo(), productId);
		if(product == null) {
			throw new Exception("Product Not Found!");
		}
		product.setActive(status);
		product.setLastModified(new Date().getTime());
		product.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
		save(product);
	}
	
	@Override
	public List<Product> searchProductsByMatchingName(String searchTerm) {
		return productRepo.findProductByNameMatching(baseService.getTenantInfo(), searchTerm);
	}
	
	@Override
	public void addToFeaturedProducts(int pId) throws Exception {
		productDao.addFeaturedProduct(pId);
	}
	
	@Override
	public List<Product> getFeaturedProducts() throws Exception {
		return productDao.getFeaturedProducts();
	}
	
	@Override
	public void deleteFeaturedProduct(int pId) throws Exception{
		productDao.deleteFeaturedProduct(pId);
	}
	
	@Override
	public boolean isFeaturedProduct(int pId) throws Exception {
		return productDao.isFeaturedProduct(pId);
	}

}
