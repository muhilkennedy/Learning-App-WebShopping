package com.backend.persistence.service;

import java.util.Date;
import java.util.List;

import com.backend.persistence.entity.Task;

public interface TaskService {

	void save(Task task);

	List<Task> findAllTasksCreatedByUser();

	List<Task> findAllAssignedTasks();

	void createTask(Task task, int assigneeId);

	void createTask(String content, Date endDate, int assigneeId);

	void deleteTask(int id);

	void updateTask(int id, String status);

	List<Task> findAllOverdueTasks();

}
