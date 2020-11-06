package com.backend.service.scheduledtask;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.serviceImpl.CacheService;
import com.backend.core.util.ConfigUtil;
import com.backend.persistence.dao.EmployeeDao;

/**
 * @author Muhil Kennedy
 * Task runs every minute to update the logged in cache status of an employee.
 * 
 */
@Component
public class EmployeeLoggedInStatusScheduleTask extends ScheduledTask {
	
	private Logger logger = LoggerFactory.getLogger(EmployeeLoggedInStatusScheduleTask.class);
	
	@Autowired
	private EmployeeDao empDao;
	
	@Autowired
	private ConfigUtil configUtil;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 0/1 * * * * ")
	@Override
	public void execute() {
		if(configUtil.isProdMode()) {
			logger.info("Scheduled Task - " + EmployeeLoggedInStatusScheduleTask.class.getCanonicalName() + " Started");
		}
		CacheService.getLoggedInStatusCacheMap().entrySet().parallelStream().forEach(item -> {
			try {
				if (checkTimeLapsed(item.getValue())) {
					empDao.updateEmployeeLoggedInStatus(item.getKey(), false);
					logger.info("Scheduled Task - " + EmployeeLoggedInStatusScheduleTask.class.getCanonicalName()
							+ " :: Employee ID : " + item.getKey() + " cleared from cache");
					CacheService.clearLoggedInStatus(item.getKey());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		if(configUtil.isProdMode()) {
			logger.info("Scheduled Task - " + EmployeeLoggedInStatusScheduleTask.class.getCanonicalName() + " Completed");
		}
	}
	
	private boolean checkTimeLapsed(Date date) {
		Instant taskStartInstant = date.toInstant();
		Instant maxVerificationTimeLimit = Instant.now().minus(60, ChronoUnit.SECONDS);
		if (taskStartInstant.isBefore(maxVerificationTimeLimit)) {
			return true;
		}
		return false;
	}
	
	

}
