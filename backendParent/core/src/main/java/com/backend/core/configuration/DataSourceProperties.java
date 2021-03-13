package com.backend.core.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author muhil
 *
 */
@Component
@ConfigurationProperties(prefix = "spring.datasource")
public class DataSourceProperties {

	private String url;
	private String username;
	private String password;
	private String database;
	private String databaseInstallPath;

	public void setUrl(String url) {
		this.url = url;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUrl() {
		return url;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getDatabase() {
		return database;
	}

	public void setDatabase(String database) {
		this.database = database;
	}

	public String getDatabaseInstallPath() {
		return databaseInstallPath;
	}

	public void setDatabaseInstallPath(String databaseInstallPath) {
		this.databaseInstallPath = databaseInstallPath;
	}
}
