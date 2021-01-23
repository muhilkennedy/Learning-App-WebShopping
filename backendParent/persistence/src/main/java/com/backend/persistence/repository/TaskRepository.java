package com.backend.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Task;

/**
 * @author Muhil
 *
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
	
	String findTaskAssignedByIdQuery = "select t from Task t where t.tenant = :tenant and t.assignee = :employee and t.taskId = :id";
	String findAllAssignedTaskQuery = "select t from Task t where t.tenant = :tenant and t.assignee = :assignee";
	String findAllTaskCreatedByEmployeeQuery = "select t from Task t where t.tenant = :tenant and t.employeeId = :employee";
	String deleteTaskQuery = "delete from Task where tenant = :tenant and employeeId = :employee and taskId = :id";
	String findAllOverdueTasksQuery = "select t from Task t where t.tenant = :tenant and t.endDate < :endDate and t.status = 'Pending'";
	String findPendingOverdueTasksCountQuery = "select count(*) from Task t where t.tenant = :tenant and t.status = 'Pending' or t.status = 'Overdue'";
	
	@Query(findTaskAssignedByIdQuery)
	Task findTaskAssignedById(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee, @Param("id") Long id);
	
	@Query(findAllTaskCreatedByEmployeeQuery)
	List<Task> findAllTaskCreatedByEmployee(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee);
	
	@Query(findAllAssignedTaskQuery)
	List<Task> findAllAssignedTasks(@Param("tenant") Tenant tenant, @Param("assignee") EmployeeInfo assignee);

	@Modifying
	@Query(deleteTaskQuery)
	void deleteTask(@Param("tenant") Tenant tenant, @Param("employee") EmployeeInfo employee, @Param("id") Long id);

	@Query(findAllOverdueTasksQuery)
	List<Task> findAllOverdueTasks(@Param("tenant") Tenant tenant, @Param("endDate") long endDate);
	
	@Query(findPendingOverdueTasksCountQuery)
	int findPendingOverdueTasksCount(@Param("tenant") Tenant tenant);
	
}
