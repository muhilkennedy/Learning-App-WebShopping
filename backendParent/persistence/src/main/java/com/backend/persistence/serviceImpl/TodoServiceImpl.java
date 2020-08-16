package com.backend.persistence.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Todo;
import com.backend.persistence.repository.TodoRepository;
import com.backend.persistence.service.TodoService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class TodoServiceImpl implements TodoService{
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private TodoRepository todoRepo;
	
	@Override
	public void save(Todo todo) {
		todoRepo.save(todo);
	}
	
	@Override
	public void createTodoForEmployee(Todo todo)
	{
		todo.setTenant(baseService.getTenantInfo());
		todo.setEmployeeId((EmployeeInfo)baseService.getUserInfo());
		save(todo);
	}
	
	@Override
	public List<Todo> findTodoForEmployee() {
		return todoRepo.findAllTodoForEmployeeQuery(baseService.getTenantInfo(),
				(EmployeeInfo) baseService.getUserInfo());
	}
	
	@Override
	public Todo findTodoById(int id) {
		return todoRepo.findTodoById(baseService.getTenantInfo(),
				(EmployeeInfo) baseService.getUserInfo(), id);
	}
	
	@Override
	public void toggleTodoStatus(int id) {
		Todo todo = findTodoById(id);
		todo.setDone(!todo.isDone());
		save(todo);
	}
	
	@Override
	public void deleteTodo(int id) {
		todoRepo.delete(findTodoById(id));
	}

}
