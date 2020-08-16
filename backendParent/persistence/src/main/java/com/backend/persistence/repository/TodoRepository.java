package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.Todo;

/**
 * @author Muhil
 *
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer>  {
	
	String findTodoByIdQuery = "select t from Todo t where t.tenant = :tenant and t.employeeId = :employee and t.todoId = :id";
	String findAllTodoForEmployeeQuery = "select t from Todo t where t.tenant = :tenant and t.employeeId = :employee";
	
	@Query(findTodoByIdQuery)
	Todo findTodoById(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee,  @Param("id") int id);
	
	@Query(findAllTodoForEmployeeQuery)
	List<Todo> findAllTodoForEmployeeQuery(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee);

}
