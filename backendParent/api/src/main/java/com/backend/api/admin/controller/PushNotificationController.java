package com.backend.api.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.persistence.entity.ProductNotification;
import com.backend.persistence.entity.PushNotification;
import com.backend.persistence.service.ProductNotificationService;
import com.backend.persistence.service.PushNotificationService;

/**
 * @author Muhil
 *
 *	handles push and product notifications
 */
@RestController
@RequestMapping("secure/admin/pushNotification")
public class PushNotificationController {
	
	private static Logger logger = LoggerFactory.getLogger(PushNotificationController.class);
	
	@Autowired
	private PushNotificationService notificationService;
	
	@Autowired
	private ProductNotificationService productNotificationService;
	
	@RequestMapping(value = "/getNotifications", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<PushNotification> getNotifications(HttpServletRequest request) {
		GenericResponse<PushNotification> response = new GenericResponse<PushNotification>();
		try {
			response.setDataList(notificationService.getAllNotificationsForUser());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getNotifications : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deleteNotification", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<PushNotification> deleteNotification(HttpServletRequest request, @RequestParam(value = "id", required = true) List<String> ids) {
		GenericResponse<PushNotification> response = new GenericResponse<PushNotification>();
		try {
			notificationService.deleteNotifications(ids);
			response.setDataList(notificationService.getAllNotificationsForUser());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteNotification : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getProductNotifications", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<ProductNotification> getProductNotifications(HttpServletRequest request) {
		GenericResponse<ProductNotification> response = new GenericResponse<ProductNotification>();
		try {
			response.setDataList(productNotificationService.getAllNotificationsForAdmin());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductNotifications : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deleteProductNotification", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<ProductNotification> deleteProductNotification(HttpServletRequest request, @RequestParam(value = "id", required = true) List<String> ids) {
		GenericResponse<ProductNotification> response = new GenericResponse<ProductNotification>();
		try {
			productNotificationService.deleteNotifications(ids);
			response.setDataList(productNotificationService.getAllNotificationsForAdmin());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteProductNotification : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
