package com.backend.service.scheduledtask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.persistence.app.service.EmployeeService;
import com.backend.persistence.util.TenantUtil;

/**
 * @author Muhil Kennedy
 * Task runs every day mid-night to remove tenant related data.
 * 
 * Remove any tenant related information like employee, user, products etc.
 */
@Component
public class PurgeTenantScheduledTask extends ScheduledTask {

	private Logger logger = LoggerFactory.getLogger(PurgeTenantScheduledTask.class);

	@Autowired
	private EmployeeService empService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0 0 * * * ")
	public void execute() {
		logger.info("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.isPurge()).forEach(tenant -> {
			try {
				newTaskAudit(tenant);
				markInProgress();
				// perform purge operations
				empService.deleteAllEmployeeForTenant(tenant);
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Exception ",
						e.getMessage());
			}

		});
		logger.info("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Completed");
	}

}
