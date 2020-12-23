package com.backend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.core.entity.EmployeePermissions;

/**
 * @author Muhil
 *
 */
@Repository
public interface EmployeePermissionsRepository extends JpaRepository<EmployeePermissions, Integer> {
	
	String findEmployeePermissionQuery = "select perm from EmployeePermissions as perm where perm.permissionId = :permissionId";
	
	@Query(findEmployeePermissionQuery)
	EmployeePermissions findEmployeePermissionById(@Param("permissionId") int permissionId);

}
