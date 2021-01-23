package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.PushNotification;

/**
 * @author Muhil
 *
 */
@Repository
public interface PushNotificationRepository extends JpaRepository<PushNotification, Long> {
	
	String findPushNotificationByIdQuery = "select pn from PushNotification pn where pn.tenant = :tenant and pn.employeeId = :employee and pn.notificationId = :id";
	String findAllPushNotificationQuery = "select pn from PushNotification pn where pn.tenant = :tenant and pn.employeeId = :employee";
	String deleteNotificationQuery = "delete from PushNotification where tenant = :tenant and employeeId = :employee and notificationId = :id";
	
	@Query(findPushNotificationByIdQuery)
	PushNotification findPushNotificationById(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee, @Param("id") Long id);
	
	@Query(findAllPushNotificationQuery)
	List<PushNotification> findAllPushNotification(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee);
	
	@Modifying
	@Query(deleteNotificationQuery)
	void deletePushNotification(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee, @Param("id") Long id);

}
