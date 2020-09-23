package com.backend.api.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.persistence.entity.Category;
import com.backend.persistence.service.CategoryService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("category")
public class CategoryController {
	
	private static Logger logger = LoggerFactory.getLogger(CategoryController.class);
	
	@Autowired
	private CategoryService categoryService;
	
	/*
	 * ############################################ 
	 * 				common access
	 * ############################################
	 */
	
	@RequestMapping(value = "/baseCategories", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Category> baseCategories(HttpServletRequest request) {
		GenericResponse<Category> response = new GenericResponse<>();
		try {
			response.setDataList(categoryService.getAllBaseCategories());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("baseCategories : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getCategory", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Category> getCategory(HttpServletRequest request, @RequestParam int id) {
		GenericResponse<Category> response = new GenericResponse<>();
		try {
			response.setData(categoryService.getCategoryById(id));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getCategory : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getCategories", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Map> getCategories(HttpServletRequest request) {
		GenericResponse<Map> response = new GenericResponse<>();
		try {
			response.setData(categoryService.getCategoriesRecursive());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getCategories : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	/*
	 * ############################################ 
	 * 				secured access
	 * ############################################
	 */
	
	@RequestMapping(value = "/secure/admin/createCategory", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Map> createCategory(HttpServletRequest request, @RequestBody Category cat) {
		GenericResponse<Map> response = new GenericResponse<>();
		try {
			categoryService.createCategory(cat);
			response.setData(categoryService.getCategoriesRecursive());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("createCategory : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/secure/admin/deleteCategory", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Map> deleteCategory(HttpServletRequest request, @RequestParam(value = "ids", required = true) List<Integer> ids) {
		GenericResponse<Map> response = new GenericResponse<>();
		try {
			categoryService.deleteCategory(ids);
			response.setData(categoryService.getCategoriesRecursive());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteCategory : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/secure/admin/editCategoryName", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Map> editCategory(HttpServletRequest request, @RequestBody Category cat) {
		GenericResponse<Map> response = new GenericResponse<>();
		try {
			categoryService.updateCategoryName(cat.getCategoryId(), cat.getCategoryName());
			response.setData(categoryService.getCategoriesRecursive());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("editCategory : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	

}
