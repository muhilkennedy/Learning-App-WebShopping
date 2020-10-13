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
	private BaseService baseService;
	
	public List<Product> getProducts(List<Integer> cIds, List<Integer> pIds, String limit, String offset, Boolean includeInactive) throws Exception {
		List<Product> productList = new ArrayList<Product>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from PRODUCT")
															.setWhereClause()
															.setAndCondition("TENANTID", baseService.getTenantInfo().getTenantID())
															.andSetAndCondition("ACTIVE", includeInactive)
															.andSetOrConditions("CATEGORYID", cIds)
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getInt(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getInt(7));
				product.setProductDescription(rs.getString(8));
				productList.add(product);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}

	public List<Product> getProducts(List<Integer> cIds, List<Integer> pIds, String limit, String offset,
			String sortByField, String sortBytype, Boolean includeInactive) throws Exception {
		List<Product> productList = new ArrayList<Product>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			// .setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from PRODUCT")
															.setWhereClause()
															.setAndCondition("TENANTID", baseService.getTenantInfo().getTenantID(), false)
															.andSetOrConditions("CATEGORYID", cIds)
															.andSetAndCondition("ACTIVE", includeInactive)
															.setOrderBy(sortByField)
															.setSortOrder(sortBytype)
															.setLimit(limit)
															.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getInt(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getInt(7));
				product.setProductDescription(rs.getString(8));
				productList.add(product);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<Product> getProductsIds(List<Integer> cIds, List<Integer> pIds, String limit, String offset, boolean includeInactive) throws Exception {
		List<Product> productList = new ArrayList<Product>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select productId from PRODUCT")
															.setWhereClause()
															.setAndCondition("TENANTID", baseService.getTenantInfo().getTenantID(), false)
															.andSetOrConditions("CATEGORYID", cIds)
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Product product = new Product();
				product.setProductId(rs.getInt(3));
				product.setProductName(rs.getString(4));
				product.setBrandName(rs.getString(5));
				product.setCost(rs.getBigDecimal(6));
				product.setOffer(rs.getInt(7));
				product.setProductDescription(rs.getString(8));
				productList.add(product);
			}
			return productList;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public int getProductsCount(List<Integer> cIds, boolean includeInactive) throws Exception {
		int count = 0;
		try (Connection con = dbUtil.getConnectionInstance()) {
			//.setAndCondition("active", "true", true)
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select count(*) from PRODUCT")
															.setWhereClause()
															.setAndCondition("TENANTID", baseService.getTenantInfo().getTenantID(), false)
															.andSetOrConditions("CATEGORYID", cIds)
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
}
