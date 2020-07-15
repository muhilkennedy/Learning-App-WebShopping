package com.backend.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.ScheduledTaskAudit;

/**
 * @author Muhil
 *
 */
@Repository
public interface ScheduledTaskAuditRepository extends JpaRepository<ScheduledTaskAudit, Integer> {

}
