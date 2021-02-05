package com.backend.service.scheduledtask.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.service.scheduledtask.DeactivateCouponsScheduledTask;
import com.backend.service.scheduledtask.DeactivateProductsForDeletedCategory;
import com.backend.service.scheduledtask.MYSQLDatabaseBackupScheduledTask;
import com.backend.service.scheduledtask.ResetDashboardStatusScheduledTask;
import com.backend.service.scheduledtask.TaskUpdateScheduledTask;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/scheduledtask")
public class ScheduledTaskController {
	
	private static Logger logger = LoggerFactory.getLogger(ScheduledTaskController.class);
	
	@Autowired
	private ResetDashboardStatusScheduledTask resetDashboardTask;
	
	@Autowired
	private DeactivateProductsForDeletedCategory deactivateProductsTask;
	
	@Autowired
	private TaskUpdateScheduledTask taskUpdateTask;
	
	@Autowired
	private MYSQLDatabaseBackupScheduledTask sqlTask;
	
	@Autowired
	private DeactivateCouponsScheduledTask deactivateCouponsTask;
	
	@RequestMapping(value = "/triggerResetDashBoardTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse triggerResetDashBoardTask(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			resetDashboardTask.executeForCurrentTenant();
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("triggerResetDashBoardTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/triggerDeleteCategoryTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse triggerDeleteCategoryTask(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			deactivateProductsTask.executeForCurrentTenant();
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("triggerDeleteCategoryTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/triggerTaskUpdateTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse triggerTaskUpdateTask(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			taskUpdateTask.executeForCurrentTenant();
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("triggerTaskUpdateTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/triggerDeactivateCouponsTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse triggerDeactivateCouponsTask(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			deactivateCouponsTask.executeForCurrentTenant();
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("triggerTaskUpdateTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/triggerDatabaseBackupTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse triggerDatabaseBackupTask(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			sqlTask.executeForCurrentTenant();
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("triggerDatabaseBackupTask : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
