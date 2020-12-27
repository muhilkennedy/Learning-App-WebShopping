package com.backend.service.scheduledtask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.commons.util.CommonUtil;
import com.backend.core.service.BaseService;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.service.CouponsService;

/**
 * @author Muhil Kennedy
 * Task runs every day mid-night 12:05Am to deactivate expired coupons.
 * 
 */
@Component
public class DeactivateCouponsScheduledTask extends ScheduledTask {
	
	private Logger logger = LoggerFactory.getLogger(DeactivateCouponsScheduledTask.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private CouponsService coupService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 5 0 * * * ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.isActive()).forEach(tenant -> {
			try {
				newTaskAudit(tenant, DeactivateCouponsScheduledTask.class.getCanonicalName());
				markInProgress();
				baseService.setTenantInfo(tenant);
				//deactivate coupons.
				deactivateCoupons();
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Exception ",
						e.getMessage());
			}
			baseService.clear();
		});
		logger.info("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Completed");
	}
	
	public void executeForCurrentTenant() {
		logger.info("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Triggered for realm : " + baseService.getTenantInfo().getTenantID());
		try {
			newTaskAudit(baseService.getTenantInfo(), DeactivateCouponsScheduledTask.class.getCanonicalName());
			markInProgress();
			deactivateCoupons();
			markCompleted();
		} catch (Exception e) {
			audit.setFailureInfo(e.getMessage());
			markFailed();
			logger.error(
					"Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Exception ",
					e.getMessage());
		}
		logger.info("Scheduled Task - " + DeactivateCouponsScheduledTask.class.getCanonicalName() + " Completed");
	}
	
	private void deactivateCoupons() {
		coupService.findExpiredCoupons().stream().forEach(coupon -> {
			coupon.setActive(CommonUtil.Key_inactive);
			coupService.save(coupon);
		});
	}

}
