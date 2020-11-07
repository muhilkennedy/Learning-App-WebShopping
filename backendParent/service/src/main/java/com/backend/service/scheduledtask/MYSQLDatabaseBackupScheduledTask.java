package com.backend.service.scheduledtask;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import com.backend.core.util.DBUtil;

/**
 * @author Muhil Kennedy
 * Task runs once a week in sunday 3am to backup mysql database.
 */
public class MYSQLDatabaseBackupScheduledTask extends ScheduledTask {
	
	private Logger logger = LoggerFactory.getLogger(MYSQLDatabaseBackupScheduledTask.class);

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0 3 * * SUN ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Started");
		newTaskAudit(DBUtil.Key_BackUpTask, PurgeTenantScheduledTask.class.getCanonicalName());
		markInProgress();
		
		Date backupDate = new Date();
		SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
		String backupDateStr = format.format(backupDate);
		String dbNameList = "clouddatabase";

		String fileName = "DB_Backup"; // default file name
		String folderPath = "DatabaseBackup";
		File f1 = new File(folderPath);
		f1.mkdir(); // create folder if not exist
		String filePath = f1.getAbsolutePath();
		String saveFileName = fileName + "_" + backupDateStr + ".sql";
		String savePath = filePath + File.separator + saveFileName;

		String executeCmd = "mysqldump -u " + DBUtil.getDBUser() + " -p" + DBUtil.getDBPassword() + "  --databases " + dbNameList
				+ " -r " + savePath; 

		Process runtimeProcess = null;
		try {
			runtimeProcess = Runtime.getRuntime().exec(executeCmd);
		} catch (IOException e) {
			markFailed(e);
		}
		int processComplete = 0;
		try {
			processComplete = runtimeProcess.waitFor();
		} catch (InterruptedException e) {
			markFailed(e);
		}

		if (processComplete == 0) {
			markCompleted();
			logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Backup Completed - " + new Date().toString());
		} else {
			markFailed(new Exception("Backup Failure!"));
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
