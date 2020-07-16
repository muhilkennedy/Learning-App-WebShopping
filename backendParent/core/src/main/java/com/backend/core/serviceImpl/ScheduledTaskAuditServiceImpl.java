package com.backend.core.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.entity.ScheduledTaskAudit;
import com.backend.core.repository.ScheduledTaskAuditRepository;
import com.backend.core.service.ScheduledTaskAuditService;

/**
 * @author muhil
 *
 */
@Service
@Transactional
public class ScheduledTaskAuditServiceImpl implements ScheduledTaskAuditService{
	
	@Autowired
	private ScheduledTaskAuditRepository auditRepo;
	
	@Override
	public void save(ScheduledTaskAudit audit) {
		auditRepo.save(audit);
	}

}
