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

import com.backend.core.service.BaseService;
import com.backend.core.util.DBUtil;
import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.service.ProductService;

/**
 * @author Muhil
 * All DB txns related to CustomerCart goes here.
 */
@Component
public class CartDao {
	
	private Logger logger = LoggerFactory.getLogger(CartDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ProductService productService;
	
	public void insertIntoCart(int productid, int customerid, int quantity) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into customercart values(?,?,?,?)");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, customerid);
			stmt.setInt(3, productid);
			stmt.setInt(4, quantity);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception inserting into cart- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<CustomerCart> userCartItems(int customerid) throws Exception{
		List<CustomerCart> cartItems = new ArrayList<CustomerCart>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select productid,quantity from customercart where tenantid=? and customerid=?");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, customerid);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				CustomerCart cart = new CustomerCart();
				cart.setProduct(productService.getProductById(rs.getInt(1)));
				cart.setQuantity(rs.getInt(2));
				cartItems.add(cart);
			}
		} catch (Exception ex) {
			logger.error("Exception in fetching customer cart items - " + ex);
			throw new Exception(ex.getMessage());
		}
		return cartItems;
	}
	
	public void removeProductFromCart(int productid, int customerid) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete from customercart where tenantid=? and customerid=? and productid=? ");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, customerid);
			stmt.setInt(3, productid);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception removing from cart- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public void clearCustomerCart(int customerid) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete from customercart where tenantid=? and customerid=?");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, customerid);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception deleting from cart- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public void updateProductQuantity(int productid, int customerid, int quantity) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("update customercart set quantity=? where tenantid=? and customerid=? and productid=? ");
			stmt.setInt(1, quantity);
			stmt.setString(2, baseService.getTenantInfo().getTenantID());
			stmt.setInt(3, customerid);
			stmt.setInt(4, productid);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception inserting into cart- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public int getUserCartCount(int customerid) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("select count(*) from customercart where tenantid=? and customerid=? ");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, customerid);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getInt(1);
			}
		} catch (Exception ex) {
			logger.error("Exception in getting cart count- " + ex);
			throw new Exception(ex.getMessage());
		}
		return 0;
	}

}
