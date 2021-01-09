package com.backend.core.dao;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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
public class InvoiceDao {
	
private Logger logger = LoggerFactory.getLogger(InvoiceDao.class);
	
	@Autowired
	private DBUtil dbUtil;
	
	public void createInvoiceTemplate(String tenantId, Blob blob, Blob posBlob) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con
					.prepareStatement("insert into invoicetemplate (tenantid , document, posDocument, active) values (?, ?, ?, ?)");
			stmt.setString(1, tenantId);
			stmt.setBlob(2, blob);
			stmt.setBlob(3, posBlob);
			stmt.setBoolean(4, true);
			stmt.executeUpdate();
		} catch (Exception ex) {
			logger.error("Error in template for -> " + tenantId);
			throw new Exception(ex.getMessage());
		}
	}
	
	public boolean containsInvoiceTemplate(String tenantId) throws Exception {
		try (Connection con = dbUtil.getConnectionInstance()) {
			PreparedStatement stmt = con.prepareStatement("select count(*) from invoicetemplate where tenantid=? and active=true ");
			stmt.setString(1, tenantId);
			ResultSet rs = stmt.executeQuery();
			if (rs.next() && rs.getInt(1) > 0) {
				return true;
			}
		} catch (Exception ex) {
			logger.error("Error in containsInvoiceTemplate : " + tenantId);
			throw new Exception(ex.getMessage());
		}
		return false;
	}


}
