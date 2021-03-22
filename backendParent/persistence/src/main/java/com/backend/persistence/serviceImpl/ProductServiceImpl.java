package com.backend.persistence.serviceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.persistence.dao.ProductDao;
import com.backend.persistence.entity.Category;
import com.backend.persistence.entity.Product;
import com.backend.persistence.entity.ProductImages;
import com.backend.persistence.helper.ProductPOJO;
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
	public List<Product> getAllProductsForTenant(int limit, int offset, Long categoryId){
		return productRepo.findLimitedProductsForCategory(baseService.getTenantInfo().getTenantID(), limit, offset, categoryId);
	}
	
	@Override
	public Product getProductByCode(String code) {
		return productRepo.findProductByCode(baseService.getTenantInfo(), code);
	}
	
	@Override
	public Product getProductById(Long id) {
		return productRepo.findProductById(baseService.getTenantInfo(), id);
	}
	
	@Override
	public Product createProduct(Product product, Long categoryId) {
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
	public List<Product> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset,
			boolean includeInactive, boolean outOfStock) throws Exception {
		return productDao.getProducts(cIds, pIds, limit, offset, includeInactive, outOfStock);
	}
	
	@Override
	public List<Product> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset, String sortByField, String sortByType,
			boolean includeInactive, boolean outOfStock) throws Exception {
		if(CommonUtil.isValidStringParam(sortByField) && CommonUtil.isValidStringParam(sortByType)) {
			return productDao.getProducts(cIds, pIds, limit, offset, sortByField, sortByType, includeInactive, outOfStock);
		}
		return productDao.getProducts(cIds, pIds, limit, offset, includeInactive, outOfStock);
	}
	
	@Override
	public List<ProductPOJO> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset, String sortByField, String sortByType) throws Exception {
		//considering always only one category will be sent from client
		if(cIds != null && cIds.size() > 0) {
			cIds = getProductRecursiveByCategoryId(cIds.get(0));
		}
		if(CommonUtil.isValidStringParam(sortByField) && CommonUtil.isValidStringParam(sortByType)) {
			return productDao.getProductsWithImages(cIds, pIds, limit, offset, sortByField, sortByType);
		}
		return productDao.getProductsWithImages(cIds, pIds, limit, offset, null, null);
	}
	
	@Override
	public List<ProductPOJO> getProductsWithSearchTerm(List<Long> cIds, String SearchTerm, String limit, String offset,
			String sortByField, String sortByType) throws Exception {
		if(!CommonUtil.isValidStringParam(SearchTerm)){
			SearchTerm = "";
		}
		// considering always only one category will be sent from client
		if (cIds != null && cIds.size() > 0) {
			cIds = getProductRecursiveByCategoryId(cIds.get(0));
		}
		if (CommonUtil.isValidStringParam(sortByField) && CommonUtil.isValidStringParam(sortByType)) {
			return productDao.getProductsBasedOnSearchTerm(cIds, SearchTerm, limit, offset, sortByField, sortByType);
		}
		return productDao.getProductsBasedOnSearchTerm(cIds, SearchTerm, limit, offset, null, null);
	}
	
	@Override
	public int getProductsCountWithSearchTerm(List<Long> cIds, String SearchTerm, String limit, String offset,
			String sortByField, String sortByType) throws Exception {
		// considering always only one category will be sent from client
		List<Long> allIds = null;
		if(cIds != null) {
			allIds = new ArrayList<Long>();
			allIds.addAll(cIds);
			for (Long cId : cIds) {
				allIds.addAll(getProductRecursiveByCategoryId(cId));
			}
		}
//		if (cIds != null && cIds.size() > 0) {
//			cIds = getProductRecursiveByCategoryId(cIds.get(0));
//		}
		if (CommonUtil.isValidStringParam(sortByField) && CommonUtil.isValidStringParam(sortByType)) {
			return productDao.getProductsCountBasedOnSearchTerm(allIds, SearchTerm, limit, offset, sortByField, sortByType);
		}
		return productDao.getProductsCountBasedOnSearchTerm(allIds, SearchTerm, limit, offset, null, null);
	}
	
	@Override
	public int getProductsCount(List<Long> cIds, boolean includeInactive) throws Exception {
		List<Long> allIds = null;
		if(cIds != null) {
			allIds = new ArrayList<Long>();
			allIds.addAll(cIds);
			for (Long cId : cIds) {
				allIds.addAll(getProductRecursiveByCategoryId(cId));
			}
		}
		return productDao.getProductsCount(allIds, includeInactive);
	}
	
	@Override
	public List<Product> getProducts(List<Long> ids){
		return productRepo.findProductByIds(baseService.getTenantInfo(), ids);
	}
	
	@Override
	public List<Long> getProductRecursiveByCategoryId(Long cId) throws Exception{
		return productDao.getChildCategoriesIdByCategoryId(cId);
	}
	
	@Override
	public List<Product> getProductRecursiveByCategoryId(Long cId, String limit, String offset, String sortByField, String sortByType, boolean includeInactive) throws Exception{
		return getProducts(Arrays.asList(cId), null, limit, offset, sortByField, sortByType, includeInactive, false);
	}

	@Override
	public Product createOrUpdateProduct(Product product, Long categoryId, byte[] productPic)
			throws Exception {
		if (product.getProductId() > -1) {
			// update existing product
			Product actualProduct = productRepo.findProductById(baseService.getTenantInfo(), product.getProductId());
			if(actualProduct == null) {
				throw new Exception("Product Not Found!");
			}
			actualProduct.setActive(false);
			actualProduct.setDeleted(true);
			actualProduct.setSearchText(null);
			// resetting product code to avoid unique constraint error(product code will be proper for one product entry at any point of time)
			actualProduct.setProductCode(actualProduct.getProductCode() + ":" + System.currentTimeMillis());
			actualProduct.setLastModified(CommonUtil.convertToUTC(new Date().getTime()));
			actualProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			saveAndFlush(actualProduct);
			// create new Product with old details
			Product newProduct = new Product();
			newProduct.setCategoryId(actualProduct.getCategoryId());
			newProduct.setActive(product.isActive());
			// keep review id consistent for all versions
			newProduct.setProductReviewId(actualProduct.getProductReviewId());
			if (!StringUtils.isEmpty(product.getProductName())) {
				newProduct.setProductName(product.getProductName());
				newProduct.setSearchText(product.getProductName());
			}
			if (!StringUtils.isEmpty(product.getBrandName())) {
				newProduct.setBrandName(product.getBrandName());
			}
			newProduct.setProductDescription("");
			if (!StringUtils.isEmpty(product.getProductDescription())) {
				newProduct.setProductDescription(product.getProductDescription());
			}
			if(!StringUtils.isEmpty(product.getProductCode())) {
				newProduct.setProductCode(product.getProductCode());
			}
			if (product.getCost() != null && product.getCost().doubleValue() > 0) {
				newProduct.setCost(product.getCost());
			}
			if (product.getOffer() != null && product.getOffer().floatValue() >= 0) {
				newProduct.setOffer(product.getOffer());
			}
			if (product.getSellingCost() != null && product.getSellingCost().floatValue() > 0) {
				newProduct.setSellingCost(product.getSellingCost());
			}
			if (product.getQuantityInStock() >= 0) {
				newProduct.setQuantityInStock(product.getQuantityInStock());
			}
			//copy product images
			actualProduct.setProductImages(null);
			List<ProductImages> images = imageRepo.findAllImagesForProduct(baseService.getTenantInfo(), actualProduct);
			images.parallelStream().forEach(image -> {
				image.setProductId(newProduct);
			});
			newProduct.setTenant(actualProduct.getTenant());
			newProduct.setLastModified(CommonUtil.convertToUTC(new Date().getTime()));
			newProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			saveAndFlush(newProduct);
			if(productDao.isFeaturedProduct(actualProduct.getProductId())) {
				productDao.deleteFeaturedProduct(actualProduct.getProductId());
			}
			product = newProduct;
		} else {
			// create new product
			Product newProduct = new Product();
			newProduct.setCategoryId(catService.getCategoryById(categoryId));
			newProduct.setProductName(product.getProductName());
			newProduct.setSearchText(product.getProductName());
			newProduct.setActive(product.isActive());
			newProduct.setBrandName(product.getBrandName());
			newProduct.setCost(product.getCost());
			newProduct.setSellingCost(product.getSellingCost());
			newProduct.setOffer(product.getOffer());
			newProduct.setProductDescription(product.getProductDescription());
			newProduct.setProductCode(product.getProductCode());
			newProduct.setQuantityInStock(product.getQuantityInStock());
			newProduct.setLastModified(CommonUtil.convertToUTC(new Date().getTime()));
			newProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			newProduct.setTenant(baseService.getTenantInfo());
			save(newProduct);
			newProduct.setProductReviewId(newProduct.getProductId());
			// create product image objects
			if (productPic != null) {
				List<ProductImages> productImages = new ArrayList<>();
				// later implement resize based on ui rendering quality.
				ProductImages prodImages = new ProductImages();
				prodImages.setImage(new SerialBlob(productPic));
				prodImages.setProductId(newProduct);
				prodImages.setTenant(baseService.getTenantInfo());
				prodImages.setPrimaryImage(true);
				productImages.add(prodImages);
				newProduct.setProductImages(productImages);
				product = newProduct;
				save(newProduct);
			}
		}
		return product;
	}
	
	@Override
	public void deleteProductsForCategory(Category category) {
		List<Product> products = getAllProductsForCategory(category);
		products.stream().forEach(product -> {
			markProductDeleted(product);
		});
	}
	
	@Override
	public void deleteProductById(Long pId) {
		Product product = getProductById(pId);
		if(product != null) {
			markProductDeleted(product);
		}
	}
	
	private void markProductDeleted(Product product) {
		product.setActive(false);
		product.setDeleted(true);
		product.setSearchText(null);
		product.setProductCode(product.getProductCode() + ":" + System.currentTimeMillis());
		product.setLastModified(CommonUtil.convertToUTC(new Date().getTime()));
		product.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
		save(product);
	}

	@Override
	public List<ProductImages> getProductImages(Product product) {
		return imageRepo.findAllImagesForProduct(baseService.getTenantInfo(), product);
	}

	@Override
	public List<ProductImages> getProductImages(List<Long> productIds) throws Exception {
		List<ProductImages> images = new ArrayList<>();
		for (Long productId : productIds) {
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
	public void addProductImage(Long productId, byte[] productPic) throws Exception {
		Product product = productRepo.findProductById(baseService.getTenantInfo(), productId);
		if(product == null) {
			throw new Exception("Product Not Found!");
		}
		ProductImages images = new ProductImages();
		images.setImage(new SerialBlob(productPic));
		images.setProductId(product);
		if(imageRepo.getProductCount(baseService.getTenantInfo(), product) <= 0) {
			images.setPrimaryImage(true);
		}
		images.setTenant(baseService.getTenantInfo());
		imageRepo.save(images);
	}
	
	@Override
	public void removeProductImage(Long imageId) throws Exception{
		imageRepo.deleteById(baseService.getTenantInfo(), imageId);
	}
	
	@Override
	public void replaceImage(Long imageId, byte[] productPic) throws Exception {
		ProductImages image = imageRepo.findImageById(baseService.getTenantInfo(), imageId);
		if(image == null) {
			throw new Exception("Product Image Not Found!");
		}
		image.setImage(new SerialBlob(productPic));
		imageRepo.save(image);
	}
	
	@Override
	public void changeProductStatus(Long productId, boolean status) throws Exception {
		Product product = productRepo.findProductById(baseService.getTenantInfo(), productId);
		if(product == null) {
			throw new Exception("Product Not Found!");
		}
		product.setActive(status);
		product.setLastModified(CommonUtil.convertToUTC(new Date().getTime()));
		product.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
		if(!status && isFeaturedProduct(product.getProductId())) {
			deleteFeaturedProduct(product.getProductId());
		}
		save(product);
	}
	
	@Override
	public List<Product> searchProductsByMatchingName(String searchTerm) {
		return productRepo.findProductByNameMatching(baseService.getTenantInfo(), searchTerm);
	}
	
	@Override
	public List<Product> searchProductsByMatchingNameOrCode(String searchTerm) {
		return productRepo.findProductByNameOrCode(baseService.getTenantInfo(), searchTerm);
	}
	
	@Override
	public void addToFeaturedProducts(Long pId) throws Exception {
		productDao.addFeaturedProduct(pId);
	}
	
	@Override
	public List<ProductPOJO> getFeaturedProducts() throws Exception {
		return productDao.getFeaturedProducts();
	}
	
	@Override
	public void deleteFeaturedProduct(Long pId) throws Exception{
		productDao.deleteFeaturedProduct(pId);
	}
	
	@Override
	public boolean isFeaturedProduct(Long pId) throws Exception {
		return productDao.isFeaturedProduct(pId);
	}
	
	@Override
	public Product cloneProduct(long productId) throws Exception {
		Product product = getProductById(productId);
		if (product != null) {
			Product newProduct = new Product();
			newProduct.setCategoryId(product.getCategoryId());
			newProduct.setProductName(product.getProductName());
			newProduct.setSearchText(product.getProductName());
			newProduct.setActive(product.isActive());
			newProduct.setBrandName(product.getBrandName());
			newProduct.setCost(product.getCost());
			newProduct.setSellingCost(product.getSellingCost());
			newProduct.setOffer(product.getOffer());
			newProduct.setProductDescription(product.getProductDescription());
			newProduct.setQuantityInStock(product.getQuantityInStock());
			newProduct.setLastModified(CommonUtil.convertToUTC(new Date().getTime()));
			newProduct.setLastModifiedById(((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
			newProduct.setTenant(baseService.getTenantInfo());
			newProduct.setProductCode(String.valueOf(product.getProductId()) + System.currentTimeMillis());
			saveAndFlush(newProduct);
			// copy product images
			List<ProductImages> productImages = new ArrayList<>();
			ProductImages prodImages = new ProductImages();
			List<ProductImages> images = imageRepo.findAllImagesForProduct(baseService.getTenantInfo(), product);
			images.parallelStream().forEach(image -> {
				prodImages.setImage(image.getBlobImage());
				prodImages.setProductId(newProduct);
				prodImages.setTenant(baseService.getTenantInfo());
				prodImages.setPrimaryImage(image.isPrimaryImage());
				productImages.add(prodImages);
			});
			newProduct.setProductImages(productImages);
			return newProduct;
		} else {
			throw new Exception("Product not found !");
		}
	}

}
