package com.backend.persistence.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.ProductNotification;
import com.backend.persistence.repository.ProductNotificationRepository;
import com.backend.persistence.service.ProductNotificationService;


/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class ProductNotificationServiceImpl implements ProductNotificationService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ProductNotificationRepository notificationRepo;
	
	@Override
	public void save(ProductNotification notification) {
		notificationRepo.save(notification);
	}
	
	@Override
	public void createNotification(String message, Long productid, Long adminid, Long clientid) {
		ProductNotification notification = new ProductNotification();
		notification.setTenant(baseService.getTenantInfo());
		notification.setProductId(productid!=null? productid : 0);
		notification.setAdminid(adminid!=null? adminid : -1);
		notification.setClientid(clientid!=null? clientid : -1);
		notification.setContent(message);
		save(notification);
	}
	
	@Override
	public List<ProductNotification> getNotificationsForAdmin() {
		return notificationRepo.findAllProductNotificationForAdminbyId(baseService.getTenantInfo(),
				((EmployeeInfo)baseService.getUserInfo()).getEmployeeId());
	}
	
	@Override
	public List<ProductNotification> getAllNotificationsForAdmin() {
		return notificationRepo.findAllProductNotificationAdmin(baseService.getTenantInfo(),
				((EmployeeInfo) baseService.getUserInfo()).getEmployeeId());
	}

	@Override
	public void deleteNotification(ProductNotification notification) {
		notificationRepo.delete(notification);
	}
	
	@Override
	public void deleteNotifications(List<String> ids) {
		ids.parallelStream().forEach(id -> {
			 notificationRepo.deleteProductNotification(baseService.getTenantInfo(), Long.parseLong(id));
		 });
	}

}
