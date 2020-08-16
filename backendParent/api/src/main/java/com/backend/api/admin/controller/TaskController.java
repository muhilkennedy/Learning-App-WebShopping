package com.backend.api.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.admin.messages.TaskPOJO;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.api.util.TaskUtil;
import com.backend.persistence.service.TaskService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/task")
public class TaskController {

	private static Logger logger = LoggerFactory.getLogger(TaskController.class);
	
	@Autowired
	private TaskService taskService;
	
	@RequestMapping(value = "/createTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<TaskPOJO> createTask(HttpServletRequest request, @RequestBody TaskPOJO task) {
		GenericResponse<TaskPOJO> response = new GenericResponse<TaskPOJO>();
		try {
			taskService.createTask(task.getContent(), task.getEnddate(), task.getAssigneeId());
			response.setDataList(TaskUtil.prepareTaskResponse(taskService.findAllTasksCreatedByUser()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("createTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/updateTask", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<TaskPOJO> updateTask(HttpServletRequest request, @RequestBody TaskPOJO task) {
		GenericResponse<TaskPOJO> response = new GenericResponse<TaskPOJO>();
		try {
			taskService.updateTask(task.getTaskId(), task.getStatus());
			response.setDataList(TaskUtil.prepareTaskResponse(taskService.findAllAssignedTasks()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("updateTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getCreatedTasks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<TaskPOJO> getCreatedTasks(HttpServletRequest request) {
		GenericResponse<TaskPOJO> response = new GenericResponse<TaskPOJO>();
		try {
			response.setDataList(TaskUtil.prepareTaskResponse(taskService.findAllTasksCreatedByUser()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getCreatedTasks : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAssignedTasks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<TaskPOJO> getAssignedTasks(HttpServletRequest request) {
		GenericResponse<TaskPOJO> response = new GenericResponse<TaskPOJO>();
		try {
			response.setDataList(TaskUtil.prepareTaskResponse(taskService.findAllAssignedTasks()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getAssignedTasks : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deleteTask", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<TaskPOJO> deleteTask(HttpServletRequest request, @RequestParam(value = "id", required = true) int id) {
		GenericResponse<TaskPOJO> response = new GenericResponse<TaskPOJO>();
		try {
			taskService.deleteTask(id);
			response.setDataList(TaskUtil.prepareTaskResponse(taskService.findAllTasksCreatedByUser()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
}
