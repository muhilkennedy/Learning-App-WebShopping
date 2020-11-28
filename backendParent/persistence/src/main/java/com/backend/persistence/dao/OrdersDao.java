package com.backend.persistence.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.SQLQueryHandler;
import com.backend.core.service.BaseService;
import com.backend.core.util.DBUtil;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.helper.POSData;
import com.fasterxml.jackson.databind.ObjectMapper;

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
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
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
	
	public int getUnassignedOrdersCount() throws Exception{
		int count = 0 ;
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select count(*) from unassignedorders where tenantid=?");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				count = rs.getInt(1);
			}
		} catch (Exception ex) {
			logger.error("Exception in fetching customer cart items - " + ex);
			throw new Exception(ex.getMessage());
		}
		return count;
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
	
	/******************
	 * Orders Table
	 * ****************/
	public List<Integer> getOrders (String tenantId, String limit, String offset, String condition , long date, String status) throws Exception{
		List<Integer> orderIds = new ArrayList<Integer>();
		Date curdate = new Date(date);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(curdate);
		calendar.add(Calendar.DAY_OF_YEAR, 1);
		date = CommonUtil.convertToUTC(date);
		long nextDate = CommonUtil.convertToUTC(calendar.getTimeInMillis());
		try (Connection con = dbUtil.getConnectionInstance()) {
			SQLQueryHandler sqlHandler = null;
			switch(condition) {
				case "eq" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select orderid from orders")
															.setWhereClause()
															.setAndCondition("tenantid", tenantId)
															.andSetAndCondition("status", status)
															.andSetGreaterThanCondition("orderdate", date)
															.andSetLessThanCondition("orderdate", nextDate)
															.setOrderBy("orderdate")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();	
							break;
				case "lt" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select orderid from orders")
															.setWhereClause()
															.setAndCondition("tenantid", tenantId)
															.andSetAndCondition("status", status)
															.andSetLessThanCondition("orderdate", date)
															.setOrderBy("orderdate")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
							break;
				case "gt" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select orderid from orders")
															.setWhereClause()
															.setAndCondition("tenantid", tenantId)
															.andSetAndCondition("status", status)
															.andSetGreaterThanCondition("orderdate", date)
															.setOrderBy("orderdate")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
							break;
				default : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select orderid from orders")
															.setWhereClause()
															.setAndCondition("tenantid", tenantId)
															.andSetAndCondition("status", status)
															.setOrderBy("orderdate")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			}
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				orderIds.add(rs.getInt(1));
			}
			return orderIds;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}

}
