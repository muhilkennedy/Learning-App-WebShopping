package com.backend.persistence.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.service.BaseService;
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
					.prepareStatement("INSERT INTO POINTOFSALE VALUES(?)");
			stmt.setString(1, json.toString());
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<POSData> getPOS (String mobile, String tenantId) throws Exception{
		List<POSData> json = new ArrayList<POSData>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("SELECT * FROM POINTOFSALE WHERE pos->\"$.tenantId\" = ? and pos->\"$.mobile\" = ?");
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
	
	/***********
	 * POS_SYNC 
	 ***********/
	public void createPOSSYNC (String mobile) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("INSERT INTO POSSYNC VALUES(?,?)");
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
			PreparedStatement stmt = con.prepareStatement("SELECT * FROM POSSYNC WHERE TENANTID = ?");
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
					.prepareStatement("DELETE FROM POSSYNC WHERE TENANTID = ?");
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
			int currentValue = 0;
			int incrementBy = 0; 
			PreparedStatement stmt = con.prepareStatement("SELECT * FROM POSSEQUENCE");
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				currentValue = rs.getInt(1);
				incrementBy = rs.getInt(2);
			}
			if(incrementBy != 0) {
				key = Key_Prefix + (currentValue + incrementBy);
			}
			else {
				throw new Exception("POS SEQUENCE GENERATION ERROR");
			}
			stmt = con.prepareStatement("UPDATE POSSEQUENCE SET CURRENTSEQUENCVALUE = ? WHERE CURRENTSEQUENCVALUE = ?");
			stmt.setInt(1, (currentValue + incrementBy));
			stmt.setInt(2, currentValue);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception - " + ex);
			throw new Exception(ex.getMessage());
		}
		return key;
	}

}
