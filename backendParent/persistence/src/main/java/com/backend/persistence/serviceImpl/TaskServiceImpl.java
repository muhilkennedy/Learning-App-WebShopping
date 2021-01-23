package com.backend.persistence.serviceImpl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.Task;
import com.backend.persistence.repository.TaskRepository;
import com.backend.persistence.service.EmployeeService;
import com.backend.persistence.service.PushNotificationService;
import com.backend.persistence.service.TaskService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class TaskServiceImpl implements TaskService {
	
	public static final String Key_Status_Pending = "Pending";
	public static final String Key_Status_Completed = "Completed";
	public static final String Key_Status_Overdue = "Overdue";
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private TaskRepository taskRepo;
	
	@Autowired
	private PushNotificationService notificationService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Override
	public void save(Task task) {
		taskRepo.save(task);
	}
	
	@Override
	public List<Task> findAllTasksCreatedByUser() {
		return taskRepo.findAllTaskCreatedByEmployee(baseService.getTenantInfo(),
				(EmployeeInfo) baseService.getUserInfo());
	}
	
	@Override
	public List<Task> findAllAssignedTasks() {
		return taskRepo.findAllAssignedTasks(baseService.getTenantInfo(), (EmployeeInfo) baseService.getUserInfo());
	}
	
	@Override
	public void createTask(Task task, Long assigneeId) {
		task.setEmployeeId((EmployeeInfo) baseService.getUserInfo());
		EmployeeInfo assignee = employeeService.findEmployeeById(assigneeId);
		task.setAssignee(assignee);
		task.setAssignee(employeeService.findEmployeeById(assigneeId));
		save(task);
		notificationService
				.createNotification("New Task Assigned - " + ((EmployeeInfo) baseService.getUserInfo()).getFirstName(), assignee);
	}
	
	@Override
	public void createTask(String content, long endDate, Long assigneeId) {
		Task task = new Task();
		task.setEmployeeId((EmployeeInfo) baseService.getUserInfo());
		task.setTenant(baseService.getTenantInfo());
		EmployeeInfo assignee = employeeService.findEmployeeById(assigneeId);
		task.setAssignee(assignee);
		task.setContent(content);
		task.setEndDate(endDate);
		task.setStatus(Key_Status_Pending);
		save(task);
		notificationService
				.createNotification("New Task Assigned - " + ((EmployeeInfo) baseService.getUserInfo()).getFirstName(), assignee);
	}
	
	@Override
	public void deleteTask(Long id) {
		taskRepo.deleteTask(baseService.getTenantInfo(), (EmployeeInfo) baseService.getUserInfo(), id);
	}
	
	@Override
	public void updateTask(Long id, String status) {
		Task task = taskRepo.findTaskAssignedById(baseService.getTenantInfo(), (EmployeeInfo) baseService.getUserInfo(), id);
		if(status.equalsIgnoreCase(Key_Status_Completed)) {
			task.setStatus(Key_Status_Completed);
		}
		else if(status.equalsIgnoreCase(Key_Status_Overdue)) {
			task.setStatus(Key_Status_Overdue);
		}
		else if(status.equalsIgnoreCase(Key_Status_Pending)) {
			task.setStatus(Key_Status_Pending);
		}
		notificationService
				.createNotification("Task Update - STATUS : " + task.getStatus() + " :: " + task.getAssignee().getFirstName(), task.getEmployeeId());
	}
	
	@Override
	public List<Task> findAllOverdueTasks() {
		return taskRepo.findAllOverdueTasks(baseService.getTenantInfo(), CommonUtil.convertToIST(new Date().getTime()));
	}
	
	@Override
	public int findPendingAndOverdueTasksCount() {
		return taskRepo.findPendingOverdueTasksCount(baseService.getTenantInfo());
	}

}
