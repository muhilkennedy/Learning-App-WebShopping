package com.backend.service.scheduledtask;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.core.entity.ScheduledTaskAudit;
import com.backend.core.entity.Tenant;
import com.backend.core.service.ScheduledTaskAuditService;
import com.backend.core.util.Constants;

public abstract class ScheduledTask {
	
	@Autowired
	protected ScheduledTaskAuditService taskAuditService;
	
	protected ScheduledTaskAudit audit;
	
	public abstract void execute();
	
	protected void newTaskAudit(Tenant tenant, String taskName) {
		audit = new ScheduledTaskAudit(tenant.getTenantID(), taskName);
		markSubmitted();
	}
	
	protected void newTaskAudit(String alternateTenantValue, String taskName) {
		audit = new ScheduledTaskAudit(alternateTenantValue, taskName);
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
