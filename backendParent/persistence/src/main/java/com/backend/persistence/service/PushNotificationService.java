package com.backend.persistence.service;

import java.util.List;

import com.backend.core.entity.EmployeeInfo;
import com.backend.persistence.entity.PushNotification;

public interface PushNotificationService {

	void save(PushNotification notification);

	List<PushNotification> getAllNotificationsForUser();

	void deleteNotifications(List<String> ids);

	void deleteNotification(PushNotification notification);

	void createNotification(String message, EmployeeInfo user);

}
