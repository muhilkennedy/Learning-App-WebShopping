package com.backend.core.configuration;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.util.DBUtil;

/**
 * @author muhil
 *
 */
@Component
public class PaymentModes {

	private Logger logger = LoggerFactory.getLogger(PaymentModes.class);

	@Autowired
	private DBUtil dbUtil;

	private Map<Integer, String> getAllPaymentModes() throws Exception {
		Map<Integer, String> corsList = new HashMap<Integer, String>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select * from paymentmode");
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				corsList.put(rs.getInt(1), rs.getString(2));
			}
		} catch (Exception ex) {
			logger.error("Error in fetching Payment Modes :: " + ex.getMessage());
			throw new Exception(ex.getMessage());
		}
		return corsList;
	}

	public static Map<Integer, String> paymentModes;

	@PostConstruct
	private void loadTenantDetail() {
		try {
			paymentModes = getAllPaymentModes();
		} catch (Exception e) {
			logger.error("Error in loading Payment Modes : " + e.getMessage());
		}
	}

}
