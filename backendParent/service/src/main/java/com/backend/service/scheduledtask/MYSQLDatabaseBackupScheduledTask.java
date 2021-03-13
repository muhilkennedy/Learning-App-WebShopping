package com.backend.service.scheduledtask;

import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.configuration.DataSourceProperties;
import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;
import com.backend.core.util.DBUtil;

/**
 * @author Muhil Kennedy Task runs once a week in sunday 3am to backup mysql
 *         database.
 *        NOTE : limitations -> runs only on windows machine!
 */
@Component
public class MYSQLDatabaseBackupScheduledTask extends ScheduledTask {

	private Logger logger = LoggerFactory.getLogger(MYSQLDatabaseBackupScheduledTask.class);

	@Autowired
	private DataSourceProperties dbProps;

	private BufferedWriter p_stdin;
	
	@Autowired
	private BaseService baseService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0 3 * * * ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Started");
		newTaskAudit(DBUtil.Key_BackUpTask, MYSQLDatabaseBackupScheduledTask.class.getCanonicalName());
		markInProgress();
		
		try {

			SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATETIMEFORMAT_3);
	        sdf.setTimeZone(TimeZone.getTimeZone(Constants.Timezone_IST));
	        
			// init shell
			ProcessBuilder builder = new ProcessBuilder("C:/Windows/System32/cmd.exe");
			Process p = null;
			p = builder.start();
			// get stdin of shell
			p_stdin = new BufferedWriter(new OutputStreamWriter(p.getOutputStream()));

			// execute commands
			executeCommand("@echo -----------------Started_Generating_MYSQL_DUMP------------------");
			executeCommand("cd " + dbProps.getDatabaseInstallPath());
			executeCommand("mysqldump -u" + dbProps.getUsername() + " -p" + dbProps.getPassword() + " "
					+ dbProps.getDatabase() + " > C:\\" + sdf.format(new Date()) + ".sql");
			executeCommand("@echo -----------------Backup-COMPLETE------------------");
			executeCommand("exit");

			// write stdout of shell (=output of all commands)
			Scanner s = new Scanner(p.getInputStream());
			while (s.hasNext()) {
				String output = s.next();
				logger.debug(output);
			}
			s.close();

		} catch (Exception e) {
			try {
				executeCommand("@echo -----------------Backup-Failed------------------");
			} catch (Exception nested) {
				nested.printStackTrace();
			}
			logger.error(e.getMessage());
			markFailed(e);
		}

		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Completed");
	}
	
	//All currentTenant() logic has to be changed based on tenantID
	public void executeForCurrentTenant() {
		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Triggered for realm : " + baseService.getTenantInfo().getTenantID());
		try {
			execute();
		} catch (Exception e) {
			audit.setFailureInfo(e.getMessage());
			markFailed();
			logger.error(
					"Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Exception ",
					e.getMessage());
		}
		logger.info("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Completed");
	}


	private void markFailed(Exception e) {
		audit.setFailureInfo(e.getMessage());
		markFailed();
		logger.error("Scheduled Task - " + MYSQLDatabaseBackupScheduledTask.class.getCanonicalName() + " Exception ",
				e.getMessage());
	}

	private void executeCommand(String command) throws Exception {
		// single execution
		p_stdin.write(command);
		p_stdin.newLine();
		p_stdin.flush();
	}

}
