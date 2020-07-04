package com.backend.service.scheduledtask;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.commons.util.Constants;
import com.backend.persistence.base.entity.ScheduledTaskAudit;
import com.backend.persistence.base.entity.Tenant;
import com.backend.persistence.base.service.ScheduledTaskAuditService;

public abstract class ScheduledTask {
	
	@Autowired
	protected ScheduledTaskAuditService taskAuditService;
	
	protected ScheduledTaskAudit audit;
	
	public abstract void execute();
	
	protected void newTaskAudit (Tenant tenant) {
		audit = new ScheduledTaskAudit(tenant, PurgeTenantScheduledTask.class.getSimpleName());
		markSubmitted();
	}
	
	protected void markSubmitted() {
		audit.setStartTime(new Date());
		audit.setStatus(Constants.Task_Status_Submitted);
		taskAuditService.save(audit);
	}
	
	protected void markInProgress() {
		audit.setStatus(Constants.Task_Status_InProgress);
		taskAuditService.save(audit);
	}
	
	protected void markCompleted() {
		audit.setEndTime(new Date());
		audit.setStatus(Constants.Task_Status_Completed);
		taskAuditService.save(audit);
	}
	
	protected void markFailed() {
		audit.setEndTime(new Date());
		audit.setStatus(Constants.Task_Status_Failure);
		taskAuditService.save(audit);
	}
}
