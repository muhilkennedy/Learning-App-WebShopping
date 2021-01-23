package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.Task;

public interface TaskService {

	void save(Task task);

	List<Task> findAllTasksCreatedByUser();

	List<Task> findAllAssignedTasks();

	void createTask(Task task, Long assigneeId);

	void createTask(String content, long endDate, Long assigneeId);

	void deleteTask(Long id);

	void updateTask(Long id, String status);

	List<Task> findAllOverdueTasks();
	
	int findPendingAndOverdueTasksCount();

}
