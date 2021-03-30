package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.ProductNotification;

public interface ProductNotificationService {

	void save(ProductNotification notification);

	void deleteNotification(ProductNotification notification);

	List<ProductNotification> getAllNotificationsForAdmin();

	List<ProductNotification> getNotificationsForAdmin();

	void createNotification(String message, Long productid, Long adminid, Long clientid);

	void deleteNotifications(List<String> ids);

	ProductNotification getNotificationById(Long id);

}
