package com.backend.service.scheduledtask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.service.BaseService;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.service.PushNotificationService;
import com.backend.persistence.service.TaskService;
import com.backend.persistence.serviceImpl.TaskServiceImpl;

/**
 * @author Muhil Kennedy
 * Task runs every day mid-night 12:05Am to deactivate expired coupons.
 * 
 */
@Component
public class TaskUpdateScheduledTask extends ScheduledTask{
	
	private Logger logger = LoggerFactory.getLogger(TaskUpdateScheduledTask.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private PushNotificationService notificationService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 0 5 0 * * * ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + TaskUpdateScheduledTask.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.isActive()).forEach(tenant -> {
			try {
				newTaskAudit(tenant, TaskUpdateScheduledTask.class.getCanonicalName());
				markInProgress();
				baseService.setTenantInfo(tenant);
				//Set overdue tasks
				taskService.findAllOverdueTasks().stream().forEach(task -> {
					task.setStatus(TaskServiceImpl.Key_Status_Overdue);
					notificationService.createNotification("Overdue Task(s)!", task.getAssignee());
					taskService.save(task);
				});
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + TaskUpdateScheduledTask.class.getCanonicalName() + " Exception ",
						e.getMessage());
			}
			baseService.clear();
		});
		logger.info("Scheduled Task - " + TaskUpdateScheduledTask.class.getCanonicalName() + " Completed");		
	}
	
	

}
