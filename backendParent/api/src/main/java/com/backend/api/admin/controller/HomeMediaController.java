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
import org.springframework.web.multipart.MultipartFile;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.core.service.HomeMediaService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/media")
public class HomeMediaController {

	private static Logger logger = LoggerFactory.getLogger(HomeMediaController.class);
	
	@Autowired
	private HomeMediaService mediaService;
	
	@RequestMapping(value = "/updateMedia", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> updateMedia(HttpServletRequest request, @RequestParam("myFile") MultipartFile file,
			@RequestParam(value = "id", required = true) int id, @RequestParam(value = "isSlider", required = false) boolean isSlider,
			@RequestParam(value = "title", required = false) String title, @RequestParam(value = "desc", required = false) String description,
			@RequestParam(value = "isShop", required = false) boolean isShopNow, @RequestParam(value = "isContact", required = false) boolean isContact,
			@RequestParam(value = "message", required = false) String message) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			mediaService.updateMedia(id, file.getBytes(), title, description, isShopNow, isContact, isSlider, message);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("updateMedia : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/addMedia", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> addMedia(HttpServletRequest request, 
			@RequestParam("myFile") MultipartFile file, @RequestParam(value = "isSlider", required = false) boolean isSlider,
			@RequestParam(value = "title", required = false) String title, @RequestParam(value = "desc", required = false) String description,
			@RequestParam(value = "isShop", required = false) boolean isShopNow, @RequestParam(value = "isContact", required = false) boolean isContact,
			@RequestParam(value = "message", required = false) String message) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			mediaService.addMedia(file.getBytes(), title, description, isShopNow, isContact, isSlider, message);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("addMedia : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deleteMedia", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> deleteMedia(HttpServletRequest request, @RequestParam(value = "id", required = true) int id) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			mediaService.delete(id);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("updateMedia : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
}
