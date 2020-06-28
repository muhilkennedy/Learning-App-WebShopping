package com.backend.commons.util;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.commons.configuration.DataSourceProperties;

@Component
public class DBUtil {

	@Autowired
	private DataSourceProperties dbProperties;

	public Connection getConnectionInstance() throws Exception {
		return DriverManager.getConnection(dbProperties.getUrl(), dbProperties.getUsername(),
				dbProperties.getPassword());
	}
	
}
