package com.backend.persistence.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.commons.util.SQLQueryHandler;
import com.backend.core.service.BaseService;
import com.backend.core.util.DBUtil;
import com.backend.persistence.entity.Product;
import com.backend.persistence.helper.ProductPOJO;
import com.backend.persistence.repository.ProductImagesRepository;

/**
 * @author Muhil
 *
 */
@Component
public class ProductDao {

	private Logger logger = LoggerFactory.getLogger(ProductDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	@Autowired
	private ProductImagesRepository pImageRepo;
	
	@Autowired
	private BaseService baseService;
	
	public List<Product> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset, Boolean includeInactive, Boolean outOfStock) throws Exception {
		List<Product> productList = new ArrayList<Product>();
		Integer quantity = null;
		if(outOfStock == true) {
			quantity = 1;
		}
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID())
															.andSetAndCondition("active", includeInactive)
															.andSetAndCondition("isdeleted", false)
															.andSetOrConditions("categoryid", cIds)
															.andSetOrConditions("productid", pIds)
															.andSetLessThanCondition("unitsinstock", quantity)
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getLong(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getBigDecimal(7));
				product.setProductDescription(rs.getString(8));
				product.setProductCode(rs.getString(9));
				product.setQuantityInStock(rs.getInt(10));
				product.setLastModified(rs.getLong(11));
				product.setLastModifiedById(rs.getLong(12));
				product.setActive(rs.getBoolean(13));
				product.setProductRating(rs.getInt(15));
				product.setSellingCost(rs.getBigDecimal(16));
				product.setSearchText(rs.getString(17));
				product.setProductReviewId(rs.getLong(18));
				productList.add(product);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<ProductPOJO> getProductsWithImages(List<Long> cIds, List<Long> pIds, String limit, String offset, String sortByField, String sortBytype) throws Exception {
		List<ProductPOJO> productList = new ArrayList<ProductPOJO>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID())
															.andSetAndCondition("active", true)
															.andSetAndCondition("isdeleted", false)
															.andSetOrConditions("categoryid", cIds)
															.andSetOrConditions("productid", pIds)
															.setOrderBy(sortByField)
															.setSortOrder(sortBytype)
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getLong(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getBigDecimal(7));
				product.setProductDescription(rs.getString(8));
				product.setProductCode(rs.getString(9));
				product.setQuantityInStock(rs.getInt(10));
				product.setLastModified(rs.getLong(11));
				product.setLastModifiedById(rs.getLong(12));
				product.setActive(rs.getBoolean(13));
				product.setProductRating(rs.getInt(15));
				product.setSellingCost(rs.getBigDecimal(16));
				product.setSearchText(rs.getString(17));
				product.setProductReviewId(rs.getLong(18));
				ProductPOJO pojo = new ProductPOJO();
				pojo.setProductContent(product);
				pojo.setProductImage(pImageRepo.findAllImagesForProduct(baseService.getTenantInfo(), product));
				productList.add(pojo);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<ProductPOJO> getProductsBasedOnSearchTerm(List<Long> cIds, String SearchTerm, String limit, String offset, String sortByField, String sortBytype) throws Exception {
		List<ProductPOJO> productList = new ArrayList<ProductPOJO>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID())
															.andSetAndCondition("active", true)
															.andSetAndCondition("isdeleted", false)
															.andSetOrConditions("categoryid", cIds)
															.andSetLikeCondition("searchtext", "\"%" + SearchTerm + "%\"")
															.setOrderBy(sortByField)
															.setSortOrder(sortBytype)
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getLong(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getBigDecimal(7));
				product.setProductDescription(rs.getString(8));
				product.setProductCode(rs.getString(9));
				product.setQuantityInStock(rs.getInt(10));
				product.setLastModified(rs.getLong(11));
				product.setLastModifiedById(rs.getLong(12));
				product.setActive(rs.getBoolean(13));
				product.setProductRating(rs.getInt(15));
				product.setSellingCost(rs.getBigDecimal(16));
				product.setSearchText(rs.getString(17));
				product.setProductReviewId(rs.getLong(18));
				ProductPOJO pojo = new ProductPOJO();
				pojo.setProductContent(product);
				pojo.setProductImage(pImageRepo.findAllImagesForProduct(baseService.getTenantInfo(), product));
				productList.add(pojo);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public int getProductsCountBasedOnSearchTerm(List<Long> cIds, String SearchTerm, String limit, String offset, String sortByField, String sortBytype) throws Exception {
		int productCount =0;
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select count(*) from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID())
															.andSetAndCondition("active", true)
															.andSetAndCondition("isdeleted", false)
															.andSetOrConditions("categoryid", cIds)
															.andSetLikeCondition("searchtext", "\"%" + SearchTerm + "%\"")
															.setOrderBy(sortByField)
															.setSortOrder(sortBytype)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				productCount = rs.getInt(1);
			}
			return productCount;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}

	public List<Product> getProducts(List<Long> cIds, List<Long> pIds, String limit, String offset,
			String sortByField, String sortBytype, Boolean includeInactive, Boolean outOfStock) throws Exception {
		List<Product> productList = new ArrayList<Product>();
		Integer quantity = null;
		if(outOfStock == true) {
			quantity = 1;
		}
		try (Connection con = dbUtil.getConnectionInstance()) {
			// .setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID(), false)
															.andSetOrConditions("categoryid", cIds)
															.andSetOrConditions("productid", pIds)
															.andSetAndCondition("active", includeInactive)
															.andSetAndCondition("isdeleted", false)
															.andSetLessThanCondition("unitsinstock", quantity)
															.setOrderBy(sortByField)
															.setSortOrder(sortBytype)
															.setLimit(limit)
															.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getLong(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getBigDecimal(7));
				product.setProductDescription(rs.getString(8));
				product.setProductCode(rs.getString(9));
				product.setQuantityInStock(rs.getInt(10));
				product.setLastModified(rs.getLong(11));
				product.setLastModifiedById(rs.getLong(12));
				product.setActive(rs.getBoolean(13));
				product.setProductRating(rs.getInt(15));
				product.setSellingCost(rs.getBigDecimal(16));
				product.setSearchText(rs.getString(17));
				product.setProductReviewId(rs.getLong(18));
				productList.add(product);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<Product> getProductsIds(List<Long> cIds, List<Long> pIds, String limit, String offset, boolean includeInactive) throws Exception {
		List<Product> productList = new ArrayList<Product>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select productId from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID(), false)
															.andSetOrConditions("categoryid", cIds)
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getLong(3));
				productList.add(product);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public int getProductsCount(List<Long> cIds, boolean includeInactive) throws Exception {
		int count = 0;
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select count(*) from product")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID(), false)
															.andSetOrConditions("categoryid", cIds)
															.andSetAndCondition("active", !includeInactive)
															.andSetAndCondition("isdeleted", false)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				count = rs.getInt(1);
			}
			return count;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<ProductPOJO> getFeaturedProducts() throws Exception {
		List<ProductPOJO> productList = new ArrayList<ProductPOJO>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select  pi.productid, pi.productname, pi.brand, pi.cost, pi.offer, pi.description, pi.unitsinstock, pi.active,"
																	+ " pi.productrating, pi.sellingcost from product as pi where pi.productid in (select productid from homepagefeatured where tenantid = ?)")
															.setAndCondition("pi.tenantid", baseService.getTenantInfo().getTenantID(), true)
															.build();
															
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				ProductPOJO pojo = new ProductPOJO();
				
				Product product = new Product();
				product.setProductId(rs.getLong(1));
				product.setProductName(rs.getString(2));
				product.setBrandName(rs.getString(3));
				product.setCost(rs.getBigDecimal(4));
				product.setOffer(rs.getBigDecimal(5));
				product.setProductDescription(rs.getString(6));
				product.setQuantityInStock(rs.getInt(7));
				product.setActive(rs.getBoolean(8));
				product.setProductRating(rs.getInt(9));
				product.setSellingCost(rs.getBigDecimal(10));
				
				pojo.setProductContent(product);
				pojo.setProductImage(pImageRepo.findAllImagesForProduct(baseService.getTenantInfo().getTenantID(), product.getProductId()));
				productList.add(pojo);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public void addFeaturedProduct (Long productId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into homepagefeatured values(?,?)");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setLong(2, productId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public void deleteFeaturedProduct (Long productId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete from homepagefeatured where tenantid = ? and productid = ?");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setLong(2, productId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public boolean isFeaturedProduct (Long productId) throws Exception {
		boolean result = false;
		try (Connection con = dbUtil.getConnectionInstance()) {
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select count(*) from homepagefeatured")
															.setWhereClause()
															.setAndCondition("tenantid", baseService.getTenantInfo().getTenantID(), false)
															.andSetAndCondition("productid", productId)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			if (rs.next() && rs.getInt(1) > 0) {
				result = true;
			}
			return result;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	// query to get categories recursively
	/*with recursive cat_tree as (
			   select categoryid,
			          categoryname,
			          parentcategoryid
			   from category
			   where categoryid = 8  -- this defines the start of the recursion
			   union all
			   select child.categoryid,
			          child.categoryname,
			          child.parentcategoryid
			   from category as child
			     join cat_tree as parent on parent.categoryid = child.parentcategoryid -- the self join to the CTE builds up the recursion
			)
			select *
			from cat_tree;*/
	
	public List<Long> getChildCategoriesIdByCategoryId(Long cId) throws Exception {
		List<Long> categoryList = new ArrayList<Long>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("with recursive cat_tree as ( select categoryid, categoryname, parentcategoryid from category where tenantid =? and categoryid = ?"
																	+ " union all "
																	+ " select child.categoryid, child.categoryname, child.parentcategoryid from category as child "
																	+ " join cat_tree as parent on parent.categoryid = child.parentcategoryid )"
																	+ " select * from cat_tree ")
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setLong(2, cId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				categoryList.add(rs.getLong(1));
			}
			return categoryList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}

}
