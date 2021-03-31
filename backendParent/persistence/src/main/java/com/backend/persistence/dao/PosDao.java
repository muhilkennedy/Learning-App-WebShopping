package com.backend.persistence.dao;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.SQLQueryHandler;
import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;
import com.backend.core.util.DBUtil;
import com.backend.persistence.helper.POSData;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Muhil
 * All DB txns related to POS goes here.
 */
@Component
public class PosDao {
	
	private Logger logger = LoggerFactory.getLogger(ProductDao.class);
	
	private final String Key_Prefix = "POS";
	
	@Autowired
	private DBUtil dbUtil;
	
	@Autowired
	private BaseService baseService;
	
	/***************
	 * POINT OF SALE 
	 ***************/
	public void createPOS (JSONObject json) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into pointofsale values(?)");
			stmt.setString(1, json.toString());
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public POSData getPOSById (String id, String tenantId) throws Exception{
		POSData data = new POSData();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from pointofsale where pos->\"$.tenantId\" = ? and pos->\"$.primaryKey\" = ?");
			stmt.setString(1, tenantId);
			stmt.setString(2, id);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
			}
			return data;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<POSData> getPOS (String mobile, String tenantId) throws Exception{
		List<POSData> json = new ArrayList<POSData>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from pointofsale where pos->\"$.tenantId\" = ? and pos->\"$.mobile\" = ?");
			stmt.setString(1, tenantId);
			stmt.setString(2, mobile);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				POSData data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
				json.add(data);
			}
			return json;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public POSData getFirstPOS (String tenantId) throws Exception{
		POSData json = null;
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from pointofsale where pos->\"$.tenantId\" = ? order by pos->\"$.timeCreated\" limit 1");
			stmt.setString(1, tenantId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				json = new ObjectMapper().readValue(rs.getString(1), POSData.class);
			}
			return json;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public int getPOSCount (String tenantId) throws Exception{
		int count = 0;
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select count(*) from pointofsale where pos->\"$.tenantId\" = ?");
			stmt.setString(1, tenantId);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				count = rs.getInt(1);
			}
			return count;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<POSData> getPOS (String tenantId, String limit, String offset) throws Exception{
		List<POSData> json = new ArrayList<POSData>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				POSData data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
				json.add(data);
			}
			return json;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public int getPOSCount (String tenantId, String condition , long date) throws Exception{
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
															.setQuery("select count(*) from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.andSetGreaterThanCondition("pos->\"$.timeCreated\"", date)
															.andSetLessThanCondition("pos->\"$.timeCreated\"", nextDate)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
															.build();	
							break;
				case "lt" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.andSetLessThanCondition("pos->\"$.timeCreated\"", date)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
															.build();
							break;
				case "gt" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.andSetGreaterThanCondition("pos->\"$.timeCreated\"", date)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
															.build();
			}
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			if(rs.next()) {
				return rs.getInt(1);
			}
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
		return 0;
	}
	
	public List<POSData> getPOS (String tenantId, String limit, String offset, String condition , long date) throws Exception{
		List<POSData> json = new ArrayList<POSData>();
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
															.setQuery("select * from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.andSetGreaterThanCondition("pos->\"$.timeCreated\"", date)
															.andSetLessThanCondition("pos->\"$.timeCreated\"", nextDate)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();	
							break;
				case "lt" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.andSetLessThanCondition("pos->\"$.timeCreated\"", date)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
							break;
				case "gt" : sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
															.setQuery("select * from pointofsale")
															.setWhereClause()
															.setAndCondition("pos->\"$.tenantId\"", tenantId)
															.andSetGreaterThanCondition("pos->\"$.timeCreated\"", date)
															.setOrderBy("pos->\"$.timeCreated\"")
															.setSortOrder("desc")
														  	.setLimit(limit)
														  	.setOffset(offset)
															.build();
			}
			PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				POSData data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
				json.add(data);
			}
			return json;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public Map<String, BigDecimal> getPosWeeklyTotal(String tenantId) throws Exception {
		Map<String, BigDecimal> orders = new LinkedHashMap<String, BigDecimal>();
		Date curdate = new Date();
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone(Constants.Asia_Calcutta));
		calendar.set(curdate.getYear() + 1900, curdate.getMonth(), curdate.getDate(), 0, 0, 0);
		try (Connection con = dbUtil.getConnectionInstance()) {
			for (int i = 0; i < 7; i++) {
				SimpleDateFormat df = new SimpleDateFormat(Constants.DATETIMEFORMAT_2);
				df.setTimeZone(TimeZone.getTimeZone(Constants.Timezone_IST));
				String tDate = df.format(calendar.getTime());
				long todaysDate = CommonUtil.convertToUTC(calendar.getTimeInMillis());
				calendar.add(Calendar.DAY_OF_YEAR, 1);
				long nextDate = CommonUtil.convertToUTC(calendar.getTimeInMillis());
				SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
						.setQuery("select * from pointofsale")
						.setWhereClause()
						.setAndCondition("pos->\"$.tenantId\"", tenantId)
						.andSetGreaterThanCondition("pos->\"$.timeCreated\"", todaysDate)
						.andSetLessThanCondition("pos->\"$.timeCreated\"", nextDate)
						.build();
				PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
				ResultSet rs = stmt.executeQuery();
				BigDecimal subTotal = new BigDecimal(0);
				while (rs.next()) {
					POSData data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
					subTotal = subTotal.add(new BigDecimal(data.getSubTotal()));
				}
				orders.put(tDate, subTotal);
				calendar.add(Calendar.DAY_OF_YEAR, -2);
			}

		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
		return orders;
	}
	
	public Map<String, List<String>> getPosFullReport(String tenantId, long endDate) throws Exception {
		Map<String, List<String>> orders = new LinkedHashMap<String, List<String>>();
		Date curdate = new Date();
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone(Constants.Asia_Calcutta));
		calendar.set(curdate.getYear() + 1900, curdate.getMonth(), curdate.getDate(), 0, 0, 0);
		try (Connection con = dbUtil.getConnectionInstance()) {
			int canContinue = 0;
			do {
				int count= 0;
				SimpleDateFormat df = new SimpleDateFormat(Constants.DATETIMEFORMAT_Report);
				df.setTimeZone(TimeZone.getTimeZone(Constants.Timezone_IST));
				String tDate = df.format(calendar.getTime());
				long todaysDate = CommonUtil.convertToUTC(calendar.getTimeInMillis());
				calendar.add(Calendar.DAY_OF_YEAR, 1);
				long nextDate = CommonUtil.convertToUTC(calendar.getTimeInMillis());
				SQLQueryHandler sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
						.setQuery("select * from pointofsale")
						.setWhereClause()
						.setAndCondition("pos->\"$.tenantId\"", tenantId)
						.andSetGreaterThanCondition("pos->\"$.timeCreated\"", todaysDate)
						.andSetLessThanCondition("pos->\"$.timeCreated\"", nextDate)
						.build();
				PreparedStatement stmt = con.prepareStatement(sqlHandler.getQuery());
				ResultSet rs = stmt.executeQuery();
				BigDecimal subTotal = new BigDecimal(0);
				while (rs.next()) {
					count++;
					POSData data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
					subTotal = subTotal.add(new BigDecimal(data.getSubTotal()));
				}
				List<String> values = Arrays.asList(String.valueOf(count), subTotal.toPlainString());
				orders.put(tDate, values);
				calendar.add(Calendar.DAY_OF_YEAR, -2);
				
				sqlHandler = new SQLQueryHandler.SQLQueryBuilder()
						.setQuery("select count(*) from pointofsale")
						.setWhereClause()
						.setAndCondition("pos->\"$.tenantId\"", tenantId)
						.andSetLessThanCondition("pos->\"$.timeCreated\"", todaysDate)
						.build();
				PreparedStatement stmt1 = con.prepareStatement(sqlHandler.getQuery());
				ResultSet rs1 = stmt1.executeQuery();
				if (rs1.next()) {
					canContinue = rs1.getInt(1);
				}
			}while(canContinue>0);

		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
		return orders;
	}
	
	public List<POSData> getPOSProvisionedByEmployee (String tenantId, long empId) throws Exception{
		List<POSData> json = new ArrayList<POSData>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from pointofsale where pos->\"$.tenantId\" = ? and pos->\"$.createdById\" = ? ");
			stmt.setString(1, tenantId);
			stmt.setLong(2, empId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				POSData data = new ObjectMapper().readValue(rs.getString(1), POSData.class);
				json.add(data);
			}
			return json;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	/***********
	 * POS_SYNC 
	 ***********/
	public void createPOSSYNC (String mobile) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into possync VALUES(?,?)");
			stmt.setString(1, mobile);
			stmt.setString(2, baseService.getTenantInfo().getTenantID());
			stmt.executeQuery();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<String> getPOSSYNC (String tenantId) throws Exception{
		List<String> mobile = new ArrayList<String>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from possync where tenantid = ?");
			stmt.setString(1, tenantId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				mobile.add(rs.getString(1));
			}
			return mobile;
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public void deletePOSSYNC (String tenantId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete from possync where tenantid = ?");
			stmt.setString(1, tenantId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	/**************
	 * POS_SEQUENCE 
	 * @throws Exception 
	 **************/
	public String getPOSKEY() throws Exception {
		String key = null;
		try (Connection con = dbUtil.getConnectionInstance()) {
			double currentValue = 0;
			int incrementBy = 0; 
			PreparedStatement stmt = con.prepareStatement("select * from possequence");
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				currentValue = rs.getDouble(1);
				incrementBy = rs.getInt(2);
			}
			if(incrementBy != 0) {
				key = Key_Prefix +  String.format("%.0f", (currentValue + incrementBy));
			}
			else {
				throw new Exception("POS SEQUENCE GENERATION ERROR");
			}
			stmt = con.prepareStatement("update possequence set currentsequencevalue = ? where currentsequencevalue = ?");
			stmt.setDouble(1, (currentValue + incrementBy));
			stmt.setDouble(2, currentValue);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
		return key;
	}

}
