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

/**
 * @author Muhil
 * All DB txns related to Orders goes here.
 */
@Component
public class OrdersDao {
	
private Logger logger = LoggerFactory.getLogger(OrdersDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	@Autowired
	private BaseService baseService;
	
	/*************************
	 * unassigned orders table
	 * ***********************/
	public void insertUnassignedOrder(int orderId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into unassignedorders values(?,?)");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, orderId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception inserting into cart- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<Integer> getUnassignedOrders() throws Exception{
		List<Integer> cartItems = new ArrayList<Integer>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select orderid from unassignedorders where tenantid=?");
			stmt.setString(1, baseService.getTenantInfo().getUniqueName());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				cartItems.add(rs.getInt(1));
			}
		} catch (Exception ex) {
			logger.error("Exception in fetching customer cart items - " + ex);
			throw new Exception(ex.getMessage());
		}
		return cartItems;
	}
	
	public void removeUnassignedOrders(int orderId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete from unassignedorders where tenantid=? and orderid=?");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setInt(2, orderId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception inserting into cart- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	

}
