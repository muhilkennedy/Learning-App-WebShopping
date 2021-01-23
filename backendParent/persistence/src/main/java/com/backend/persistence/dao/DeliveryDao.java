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
import com.backend.persistence.entity.DeliveryConfiguration;

/**
 * @author Muhil
 * All DB txns related to deliveryConfiguration goes here.
 */
@Component
public class DeliveryDao {
	
	private Logger logger = LoggerFactory.getLogger(DeliveryDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	@Autowired
	private BaseService baseService;
	
	public void insertIntoDeliveryConfiguration(String pincode, int delieryCharge, int minimumAmtForDelivery, String deliveryFrom, String deliveryTill, int minimumDeliveryHours) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into deliveryConfiguration values(?,?,?,?,?,?,?, true)");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setString(2, pincode);
			stmt.setInt(3, delieryCharge);
			stmt.setInt(4, minimumAmtForDelivery);
			stmt.setString(5, deliveryFrom);
			stmt.setString(6, deliveryTill);
			stmt.setInt(7, minimumDeliveryHours);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception insertIntoDeliveryConfiguration- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public List<DeliveryConfiguration> getAllDeliveryConfiguration() throws Exception{
		List<DeliveryConfiguration> dConfigs = new ArrayList<DeliveryConfiguration>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from deliveryConfiguration where tenantid=?");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				DeliveryConfiguration config = new DeliveryConfiguration();
				config.setPincode(rs.getString(2));
				config.setDeliverycharge(rs.getInt(3));
				config.setMinimumamtforfreedelivery(rs.getInt(4));
				config.setDeliveryfromtime(rs.getString(5));
				config.setDeliverytilltime(rs.getString(6));
				config.setMinimumdeliveryhours(rs.getInt(7));
				config.setActive(rs.getBoolean(8));
				dConfigs.add(config);
			}
		} catch (Exception ex) {
			logger.error("Exception in getAllDeliveryConfiguration - " + ex);
			throw new Exception(ex.getMessage());
		}
		return dConfigs;
	}
	
	public DeliveryConfiguration getDeliveryConfiguration(String pincode) throws Exception {
		DeliveryConfiguration config = null;
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("select * from deliveryConfiguration where tenantid=? and pincode=? ");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setString(2, pincode);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				config = new DeliveryConfiguration();
				config.setPincode(rs.getString(2));
				config.setDeliverycharge(rs.getInt(3));
				config.setMinimumamtforfreedelivery(rs.getInt(4));
				config.setDeliveryfromtime(rs.getString(5));
				config.setDeliverytilltime(rs.getString(6));
				config.setMinimumdeliveryhours(rs.getInt(7));
				config.setActive(rs.getBoolean(8));
			}
		} catch (Exception ex) {
			logger.error("Exception in getDeliveryConfiguration - " + ex);
			throw new Exception(ex.getMessage());
		}
		return config;
	}
	
	public void removeDeliveryConfiguration(String pincode) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete from deliveryConfiguration where tenantid=? and pincode=? ");
			stmt.setString(1, baseService.getTenantInfo().getTenantID());
			stmt.setString(2, pincode);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception in removeDeliveryConfiguration- " + ex);
			throw new Exception(ex.getMessage());
		}
	}
	
	public void toggleConfigurationStatus(String pincode, boolean status) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("update deliveryConfiguration set active=? where tenantid=? and pincode=? ");
			stmt.setBoolean(1, status);
			stmt.setString(2, baseService.getTenantInfo().getTenantID());
			stmt.setString(3, pincode);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Exception in toggleConfigurationStatus- " + ex);
			throw new Exception(ex.getMessage());
		}
	}

}
