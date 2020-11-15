package com.backend.core.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
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
	
	// Default Password is set for admin users
	public void createAdminUserForTenant(String tenantId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into employeeinfo (tenantid , fname, lname, emailid, mobile, password, designation, lastlogin) values (?, 'SUPERUSER', 'PRODUCTION', 'prodemail@email.com', '0000000000', ?, 'CUSTOMERSUPPORTADMIN', ?);");
			stmt.setString(1, tenantId);
			stmt.setString(2, BCrypt.hashpw("Qwerty@1996", BCrypt.gensalt(5)));
			stmt.setLong(3, new Date().getTime());
			stmt.executeUpdate();
			
			stmt = con.prepareStatement("insert into employeepermissionsmap (tenantid, employeeid, permissionid) values (?, (select employeeid from employeeinfo where tenantid=? and emailid='prodemail@email.com' ), 1)");
			stmt.setString(1, tenantId);
			stmt.setString(2, tenantId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Error in creating Admin for -> " + tenantId);
			throw new Exception(ex.getMessage());
		}
	}
	
	public boolean isCustomerSupportAdminPresent(String tenantId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			
		} catch (Exception ex) {
			logger.error("Error in isCustomerSupportAdminPresent : " + tenantId);
			throw new Exception(ex.getMessage());
		}
		return false;
	}

}
