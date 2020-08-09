package com.backend.api.util;

import java.util.ArrayList;
import java.util.List;

import com.backend.api.admin.messages.TaskPOJO;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Task;

public class TaskUtil {

	public static List<TaskPOJO> prepareTaskResponse(List<Task> tasks) {
		List<TaskPOJO> taskResponse = new ArrayList<TaskPOJO>();
		tasks.parallelStream().forEach(task -> {
			TaskPOJO taskHelper = new TaskPOJO();
			//set asssignee details
			EmployeeInfo empInfo = task.getAssignee();
			taskHelper.setAssigneeEmail(empInfo.getEmailId());
			taskHelper.setAssigneeId(empInfo.getEmployeeId());
			taskHelper.setAssigneeName(empInfo.getFirstName());
			//set creator details
			empInfo = task.getEmployeeId();
			taskHelper.setCreatorId(empInfo.getEmailId());
			taskHelper.setCreatorName(empInfo.getFirstName());
			//set task details
			taskHelper.setEnddate(task.getEndDate());
			taskHelper.setContent(task.getContent());
			taskHelper.setStatus(task.getStatus());
			taskHelper.setTaskId(task.getTaskId());
			taskResponse.add(taskHelper);
		});
		return taskResponse;
	}

}
