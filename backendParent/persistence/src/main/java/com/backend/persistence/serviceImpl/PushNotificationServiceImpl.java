package com.backend.persistence.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.PushNotification;
import com.backend.persistence.repository.PushNotificationRepository;
import com.backend.persistence.service.PushNotificationService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class PushNotificationServiceImpl implements PushNotificationService{
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private PushNotificationRepository notificationRepo;
	
	@Override
	public void save(PushNotification notification) {
		notificationRepo.save(notification);
	}
	
	@Override
	public void createNotification(String message, EmployeeInfo user) {
		PushNotification notification = new PushNotification(baseService.getTenantInfo(), user, message);
		save(notification);
	}
	
	@Override
	public List<PushNotification> getAllNotificationsForUser() {
		return notificationRepo.findAllPushNotification(baseService.getTenantInfo(),
				(EmployeeInfo) baseService.getUserInfo());
	}
	
	@Override
	public void deleteNotification(PushNotification notification) {
		notificationRepo.delete(notification);
	}
	
	@Override
	public void deleteNotifications(List<String> ids) {
		 ids.parallelStream().forEach(id -> {
			 notificationRepo.deletePushNotification(baseService.getTenantInfo(),
				(EmployeeInfo) baseService.getUserInfo(), Integer.parseInt(id));
		 });
	}

}
