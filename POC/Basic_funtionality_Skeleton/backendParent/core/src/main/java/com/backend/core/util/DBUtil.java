package com.backend.core.util;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.configuration.DataSourceProperties;

/**
 * @author Muhil
 *
 */
@Component
public class DBUtil {

	private static DataSourceProperties dbProperties;
	
	@Autowired
	public void setDbProperties(DataSourceProperties props) {
		DBUtil.dbProperties = props;
	}

	public static Connection getConnectionInstance() throws Exception {
		return DriverManager.getConnection(dbProperties.getUrl(), dbProperties.getUsername(),
				dbProperties.getPassword());
	}
	
}
