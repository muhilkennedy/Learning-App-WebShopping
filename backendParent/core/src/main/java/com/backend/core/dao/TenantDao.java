package com.backend.core.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

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
public class TenantDao {
	
	private Logger logger = LoggerFactory.getLogger(TenantDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	public List<String> getAllowedOrigins(String tenantId) throws Exception {
		List<String> corsList = new ArrayList<String>();
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("select origin from TENANTCORSMAPPING where tenantid = ?");
			stmt.setString(1, tenantId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				corsList.add(rs.getString(1));
			}
		} catch (Exception ex) {
			logger.error("Error in fetching CORS Mapping for realm -> " + tenantId + " :: " + ex.getMessage());
			throw new Exception(ex.getMessage());
		}
		return corsList;
	}
	
	public void removeOrigins(String tenantId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("delete maps from TENANTCORSMAPPING as maps where maps.tenantid = ?");
			stmt.setString(1, tenantId);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Error in removing CORS Mapping for realm -> " + tenantId + " :: " + ex.getMessage());
			throw new Exception(ex.getMessage());
		}
	}
	
	public void addAllowedOrigin(String tenantId, String origin) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into TENANTCORSMAPPING values(?,?)");
			stmt.setString(1, tenantId);
			stmt.setString(2, origin);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Error in removing CORS Mapping for realm -> " + tenantId + " :: " + ex.getMessage());
			throw new Exception(ex.getMessage());
		}
	}

}
