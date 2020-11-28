package com.backend.service.scheduledtask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.entity.DashboardReport;
import com.backend.core.service.BaseService;
import com.backend.core.util.DashboardStatusUtil;
import com.backend.core.util.TenantUtil;

/**
 * @author Muhil Kennedy Task runs every midnight to reset the dashboard status
 *         counts.
 * 
 */
@Component
public class ResetDashboardStatusScheduledTask extends ScheduledTask {

	private Logger logger = LoggerFactory.getLogger(ResetDashboardStatusScheduledTask.class);

	@Autowired
	private BaseService baseService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0 0 * * * ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + ResetDashboardStatusScheduledTask.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.isActive()).forEach(tenant -> {
			try {
				newTaskAudit(tenant, DeactivateCouponsScheduledTask.class.getCanonicalName());
				markInProgress();
				//perform today columns reset
				DashboardReport report = DashboardStatusUtil.getDashboardStatus(tenant);
				if(report != null) {
					report.setOnlineCountToday(0);
					report.setSmsCountToday(0);
					report.setEmailCountToday(0);
					report.setPosCountToday(0);
					DashboardStatusUtil.save(report);
				}
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + ResetDashboardStatusScheduledTask.class.getCanonicalName()
						+ " Exception ", e.getMessage());
			}
			baseService.clear();
		});
		logger.info("Scheduled Task - " + ResetDashboardStatusScheduledTask.class.getCanonicalName() + " Completed");

	}

}
