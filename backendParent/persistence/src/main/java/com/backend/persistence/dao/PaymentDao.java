package com.backend.persistence.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.util.DBUtil;

@Component
public class PaymentDao {
	
	private Logger logger = LoggerFactory.getLogger(PaymentDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	public String getPaymentModeById(int id) throws Exception {
		String mode = "";
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("select paymenttype from paymentmode where paymentmodeid=?");
			stmt.setInt(1, id);
			
			ResultSet result = stmt.executeQuery();
			
			if(result.next()) {
				mode = result.getString(1);
			}
			
		} catch (Exception ex) {
			logger.error("Exception inserting into cart- " + ex);
			throw new Exception(ex.getMessage());
		}
		return mode;
	}
	
	public Map<Integer, String> getPaymentModes() throws Exception {
		Map<Integer, String> modes = new HashedMap<Integer, String>();
 		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("select * from paymentmode");
			ResultSet result = stmt.executeQuery();
			
			while(result.next()) {
				modes.put(result.getInt(1), result.getString(2));
			}
			
		} catch (Exception ex) {
			logger.error("Exception inserting into cart- " + ex);
			throw new Exception(ex.getMessage());
		}
		return modes;
	}

}
