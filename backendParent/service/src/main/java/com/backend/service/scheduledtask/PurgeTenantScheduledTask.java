package com.backend.service.scheduledtask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.service.BaseService;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.service.EmployeeService;

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
	private BaseService baseService;

	@Autowired
	private EmployeeService empService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0 0 * * * ")
	public void execute() {
		logger.info("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.doPurge()).forEach(tenant -> {
			try {
				newTaskAudit(tenant, PurgeTenantScheduledTask.class.getCanonicalName());
				markInProgress();
				baseService.setTenantInfo(tenant);
				// perform purge operations
				//remove employees information for tenant
				empService.findAllEmployeeForTenant().stream().forEach(employee -> {
					empService.delete(employee);
				});
				
				//remove sales information 
				
				//remove product information
				
				//remove user information
				
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Exception ",
						e.getMessage());
			}
			baseService.clear();
		});
		logger.info("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Completed");
	}

}
