package com.backend.persistence.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.util.Constants;
import com.backend.core.util.DBUtil;

/**
 * @author Muhil
 *
 */
@Component
public class EmployeeDao {
	
	private Logger logger = LoggerFactory.getLogger(EmployeeDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	public void updateEmployeeLoggedInStatus(int id, boolean status) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("update employeeinfo set isloggedin = ?, lastlogin=? where employeeid = ?");
			stmt.setBoolean(1, status);
			Instant instant = Instant.ofEpochMilli(new Date().getTime());
			ZoneId zoneId = ZoneId.of(Constants.Timezone_UTC);
			ZonedDateTime zdt = instant.atZone(zoneId);
			stmt.setLong(2, zdt.toInstant().toEpochMilli());;
			stmt.setInt(3, id);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Error in removing CORS Mapping for EmployeeId -> " + id);
			throw new Exception(ex.getMessage());
		}
	}

}
