package com.backend.persistence.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
					.prepareStatement("update EMPLOYEEINFO set isloggedin = ?, lastlogin=? where employeeid = ?");
			stmt.setBoolean(1, status);
			stmt.setTimestamp(2, new Timestamp(new Date().getTime()));
			stmt.setInt(3, id);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Error in removing CORS Mapping for EmployeeId -> " + id);
			throw new Exception(ex.getMessage());
		}
	}

}
