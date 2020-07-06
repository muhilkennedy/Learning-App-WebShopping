package com.backend.service.scheduledtask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.commons.util.CommonUtil;
import com.backend.persistence.app.service.CouponsService;
import com.backend.persistence.util.TenantUtil;

/**
 * @author Muhil Kennedy
 * Task runs every day mid-night 12:05Am to deactivate expired coupons.
 * 
 */
@Component
public class DeactivateCouponsScheduledTask extends ScheduledTask {
	
	private Logger logger = LoggerFactory.getLogger(DeactivateCouponsScheduledTask.class);
	
	@Autowired
	private CouponsService coupService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 5 0 * * * ")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.isActive()).forEach(tenant -> {
			try {
				newTaskAudit(tenant);
				markInProgress();
				//deactivate coupons.
				coupService.findExpiredCoupons(tenant).stream().forEach(coupon -> {
					coupon.setActive(CommonUtil.Key_inactive);
					coupService.save(coupon);
				});
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + PurgeTenantScheduledTask.class.getCanonicalName() + " Exception ",
						e.getMessage());
			}

		});
		logger.info("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Completed");
	}

}
