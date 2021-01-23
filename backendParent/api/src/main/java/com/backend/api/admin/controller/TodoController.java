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

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.persistence.entity.Todo;
import com.backend.persistence.service.TodoService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/todo")
public class TodoController {
	
	private static Logger logger = LoggerFactory.getLogger(TodoController.class);
	
	@Autowired
	private TodoService todoService;
	
	@RequestMapping(value = "/addTodo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Todo> addTodo(HttpServletRequest request, @RequestBody Todo todo) {
		GenericResponse<Todo> response = new GenericResponse<Todo>();
		try {
			todoService.createTodoForEmployee(todo);
			response.setDataList(todoService.findTodoForEmployee());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("addTodo : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getTodo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Todo> getTodo(HttpServletRequest request) {
		GenericResponse<Todo> response = new GenericResponse<Todo>();
		try {
			response.setDataList(todoService.findTodoForEmployee());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getTodo : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/updateTodo", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Todo> updateTodo(HttpServletRequest request, @RequestParam(value = "id", required = true) Long id) {
		GenericResponse<Todo> response = new GenericResponse<Todo>();
		try {
			todoService.toggleTodoStatus(id);
			response.setDataList(todoService.findTodoForEmployee());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("updateTodo : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deleteTodo", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Todo> deleteTodo(HttpServletRequest request, @RequestParam(value = "id", required = true) String id) {
		GenericResponse<Todo> response = new GenericResponse<Todo>();
		try {
			todoService.deleteTodo(Long.parseLong(id));
			response.setDataList(todoService.findTodoForEmployee());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteTodo : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}


}
