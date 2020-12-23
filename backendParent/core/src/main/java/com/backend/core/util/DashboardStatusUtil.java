package com.backend.core.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.entity.DashboardReport;
import com.backend.core.entity.Tenant;
import com.backend.core.repository.DashboardStatusRepository;

/**
 * @author Muhil
 *
 */
@Component
public class DashboardStatusUtil {
	
	private static DashboardStatusRepository dashboardRepo;
	
	@Autowired
	public void setDashboardRepo(DashboardStatusRepository repo) {
		DashboardStatusUtil.dashboardRepo = repo;
	}
	
	public static void save(DashboardReport report) {
		dashboardRepo.save(report);
	}
	
	public static DashboardReport createDashboardStatus(Tenant tenant) {
		dashboardRepo.save(new DashboardReport(tenant));
		return dashboardRepo.findReportForTenant(tenant);
	}
	
	public static DashboardReport getDashboardStatus(Tenant tenant) {
		DashboardReport report = dashboardRepo.findReportForTenant(tenant);
		if(report == null) {
			report = createDashboardStatus(tenant);
		}
		return report;
	}
	
	public static void incrementEmailCount(Tenant tenant) {
		DashboardReport report = getDashboardStatus(tenant);
		if(report != null) {
			report.setEmailCountToday(report.getEmailCountToday() + 1);
			report.setTotalEmailCount(report.getTotalEmailCount() + 1);
		}
		dashboardRepo.save(report);
	}
	
	public static void incrementSmsCount(Tenant tenant) {
		DashboardReport report = getDashboardStatus(tenant);
		if(report != null) {
			report.setSmsCountToday(report.getSmsCountToday() + 1);
			report.setTotalSmsCount(report.getTotalSmsCount() + 1);
		}
		dashboardRepo.save(report);
	}
	
	public static void incremenOnlineCount(Tenant tenant) {
		DashboardReport report = getDashboardStatus(tenant);
		if(report != null) {
			report.setOnlineCountToday(report.getOnlineCountToday() + 1);
			report.setTotalOnlineCount(report.getTotalOnlineCount() + 1);
		}
		dashboardRepo.save(report);
	}
	
	public static void decrementOnlineCount(Tenant tenant) {
		DashboardReport report = getDashboardStatus(tenant);
		if(report != null) {
			report.setOnlineCountToday(report.getOnlineCountToday() - 1);
			report.setTotalOnlineCount(report.getTotalOnlineCount() - 1);
		}
		dashboardRepo.save(report);
	}
	
	public static void incrementPosCount(Tenant tenant) {
		DashboardReport report = getDashboardStatus(tenant);
		if(report != null) {
			report.setPosCountToday(report.getPosCountToday() + 1);
			report.setTotalPosCount(report.getTotalPosCount() + 1);
		}
		dashboardRepo.save(report);
	}
	
	public static void incrementCustomerCount(Tenant tenant) {
		DashboardReport report = getDashboardStatus(tenant);
		if(report != null) {
			report.setTotalCustomers(report.getTotalCustomers() + 1);
		}
		dashboardRepo.save(report);
	}

}
