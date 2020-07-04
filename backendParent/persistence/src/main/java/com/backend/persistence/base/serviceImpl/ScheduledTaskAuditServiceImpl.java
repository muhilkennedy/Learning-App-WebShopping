package com.backend.persistence.base.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.base.entity.ScheduledTaskAudit;
import com.backend.persistence.base.repository.ScheduledTaskAuditRepository;
import com.backend.persistence.base.service.ScheduledTaskAuditService;

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
