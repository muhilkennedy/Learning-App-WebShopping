package com.backend.persistence.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.base.entity.ScheduledTaskAudit;

/**
 * @author Muhil
 *
 */
@Repository
public interface ScheduledTaskAuditRepository extends JpaRepository<ScheduledTaskAudit, Integer> {

}
