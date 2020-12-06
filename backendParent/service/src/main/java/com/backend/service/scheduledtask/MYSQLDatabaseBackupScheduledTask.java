package com.backend.service.scheduledtask;

import java.io.File;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.configuration.DataSourceProperties;
import com.backend.core.util.DBUtil;
import com.smattme.MysqlExportService;

/**
 * @author Muhil Kennedy
 * Task runs once a week in sunday 3am to backup mysql database.
 */
@Component
public class MYSQLDatabaseBackupScheduledTask extends ScheduledTask {
	
	private Logger logger = LoggerFactory.getLogger(MYSQLDatabaseBackupScheduledTask.class);
	
	@Autowired
	private DataSourceProperties dbProps;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0 3 * * SUN ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Started");
		newTaskAudit(DBUtil.Key_BackUpTask, PurgeTenantScheduledTask.class.getCanonicalName());
		markInProgress();
		
		String folderPath = "DatabaseBackup";
		File f1 = new File(folderPath);
		f1.mkdir(); // create folder if not exist

		//required properties for exporting of db
		
		Properties properties = new Properties();
		
		properties.setProperty(MysqlExportService.DB_NAME, dbProps.getDatabase());
		properties.setProperty(MysqlExportService.DB_USERNAME, dbProps.getUsername());
		properties.setProperty(MysqlExportService.DB_PASSWORD, dbProps.getPassword());
		properties.setProperty(MysqlExportService.JDBC_CONNECTION_STRING, dbProps.getUrl());
		properties.setProperty(MysqlExportService.TEMP_DIR, f1.getPath());
		properties.setProperty(MysqlExportService.PRESERVE_GENERATED_SQL_FILE, "true");
		try { 
			MysqlExportService mysqlExportService = new MysqlExportService(properties);
			mysqlExportService.export();
			
			//File file = mysqlExportService.getGeneratedZipFile();
			//mysqlExportService.clearTempFiles(false);

			/*boolean res = MysqlImportService.builder()
			        .setDatabase("test15")
			        .setSqlString(mysqlExportService.getGeneratedSql())
			        .setUsername("root")
			        .setPassword("root@123")
			        .importDatabase();

			System.out.println(res);*/
			
		} catch (Exception e) {
			markFailed(e);
		}

		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Completed");
	}
	
	private void markFailed(Exception e) {
		audit.setFailureInfo(e.getMessage());
		markFailed();
		logger.error("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Exception ",
				e.getMessage());
	}
	
}
