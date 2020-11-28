package com.backend.service.scheduledtask;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.core.service.BaseService;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.entity.Category;
import com.backend.persistence.service.CategoryService;
import com.backend.persistence.service.ProductService;

/**
 * @author Muhil Kennedy
 * Task runs every day mid-night 1:00Am to deactivate products under deleted category.
 * 
 */
@Component
public class DeactivateProdcutsForDeletedCategory extends ScheduledTask {
	
private Logger logger = LoggerFactory.getLogger(DeactivateProdcutsForDeletedCategory.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ProductService productService;

	// cron = sec min hour day mon dayOfWeek.
	@Scheduled(cron = " 1 0 0 * * * ", zone = "IST")
	@Override
	public void execute() {
		logger.info("Scheduled Task - " + DeactivateProdcutsForDeletedCategory.class.getCanonicalName() + " Started");
		TenantUtil.getAllTenants().stream().filter(tenant -> tenant.isActive()).forEach(tenant -> {
			try {
				newTaskAudit(tenant, DeactivateCouponsScheduledTask.class.getCanonicalName());
				markInProgress();
				baseService.setTenantInfo(tenant);
				//deactivate coupons.
				List<Category> categories = categoryService.getAllCategoriesForDelete();
				categories.stream().forEach(category -> {
					productService.deleteProductsForCategory(category);
					category.setMarkedForDelete(false);
					categoryService.save(category);
				});
				markCompleted();
			} catch (Exception e) {
				audit.setFailureInfo(e.getMessage());
				markFailed();
				logger.error("Scheduled Task - " + DeactivateProdcutsForDeletedCategory.class.getCanonicalName() + " Exception ",
						e.getMessage());
			}
			baseService.clear();
		});
		logger.info("Scheduled Task - " + DeactivateProdcutsForDeletedCategory.class.getCanonicalName() + " Completed");
	}

}
