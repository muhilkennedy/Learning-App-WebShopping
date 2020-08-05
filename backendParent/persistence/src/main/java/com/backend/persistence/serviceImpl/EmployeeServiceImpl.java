package com.backend.persistence.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;
import javax.sql.rowset.serial.SerialBlob;
import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.EmployeePermissions;
import com.backend.persistence.entity.EmployeePermissionsMap;
import com.backend.persistence.repository.EmployeeInfoRepository;
import com.backend.persistence.repository.EmployeePermissionsMapRepository;
import com.backend.persistence.repository.EmployeePermissionsRepository;
import com.backend.persistence.service.EmployeeService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private EmployeeInfoRepository employeeRepo;
	
	@Autowired
	private EmployeePermissionsMapRepository permissionMapRepo;
	
	@Autowired
	private EmployeePermissionsRepository permissionsRepo;
	
	@Override
	public void save(EmployeeInfo emp) {
		employeeRepo.save(emp);
	}
	
	@Override
	public void delete(EmployeeInfo emp) {
		employeeRepo.delete(emp);
	}
	
	@Override
	public void employeeStatus(EmployeeInfo emp, boolean status) {
		emp.setActive(status);
		employeeRepo.save(emp);
	}
	
	@Override
	public void deleteAllEmployeeForTenant() {
		employeeRepo.deleteAllEmployees(baseService.getTenantInfo());
	}
	
	@Override
	public EmployeeInfo findEmployeeById(int id) {
		return employeeRepo.findEmployeeById(id, baseService.getTenantInfo());
	}
	
	@Override
	public EmployeeInfo findEmployeeByEmail(String email) {
		return employeeRepo.findEmployeeByEmail(email, baseService.getTenantInfo());
	}
	
	@Override
	public EmployeeInfo findEmployeeByEmailOrId(String emailOrId) {
		return employeeRepo.findEmployeeByEmailOrId(emailOrId, baseService.getTenantInfo());
	}
	
	@Override
	public int findAllEmployeesForTenantCount(){
		return employeeRepo.findAllEmployeesCount(baseService.getTenantInfo());
	}
	
	@Override
	public List<EmployeeInfo> findAllEmployeeForTenant() {
		return employeeRepo.findAllEmployees(baseService.getTenantInfo());
	}
	
	@Override
	public List<EmployeeInfo> findAllEmployeeForTenant(int offset, int limit) {
		return employeeRepo.findLimitedEmployees(baseService.getTenantInfo().getTenantID(), limit, offset);
	}
	
	@Override
	public List<EmployeePermissionsMap> getEmployeePermissionsForTenant (EmployeeInfo emp){
		return permissionMapRepo.findAllEmployeePermissions(baseService.getTenantInfo(), emp);
	}
	
	@Override
	public List<EmployeePermissions> getAllGenericPermissions (){
		return permissionsRepo.findAll();
	}
	
	@Override
	public void overrirdePermissions(EmployeeInfo empInfo, List<Integer> permissionIds) {
		Map<Integer, EmployeePermissions> allPermissionsMap = loadPermissionsMap();
		empInfo.getEmployeePermissions().parallelStream().forEach(permission -> {
			permissionMapRepo.delete(permission);
		});
		List<EmployeePermissionsMap> employeePermission = new ArrayList<EmployeePermissionsMap>();
		CollectionUtils.emptyIfNull(permissionIds).stream().forEach(permissionId -> {
			if(allPermissionsMap.get(permissionId) != null) {
				EmployeePermissionsMap permMap = new EmployeePermissionsMap(baseService.getTenantInfo(), empInfo,
						allPermissionsMap.get(permissionId));
				employeePermission.add(permMap);
			}
		});
		empInfo.setEmployeePermissions(employeePermission);
		employeeRepo.save(empInfo);
	}

	private Map<Integer, EmployeePermissions> loadPermissionsMap(){
		Map<Integer, EmployeePermissions> permissionsMap = new HashMap<>();
		permissionsRepo.findAll().parallelStream().forEach(permission -> {
			permissionsMap.put(permission.getPermissionId(), permission);
		});
		return permissionsMap;
	}
	
	@Override
	public void updateEmployee(EmployeeInfo actualEmployee, EmployeeInfo updatedEmployee, byte[] profilePic) throws Exception {
		if(profilePic != null) {
			actualEmployee.setProfilePic(new SerialBlob(profilePic));
		}
		if(!StringUtils.isEmpty(updatedEmployee.getEmailId())) {
			actualEmployee.setEmailId(updatedEmployee.getEmailId());
		}
		if(!StringUtils.isEmpty(updatedEmployee.getMobile())) {
			actualEmployee.setMobile(updatedEmployee.getMobile());
		}
		if(!StringUtils.isEmpty(updatedEmployee.getFirstName())) {
			actualEmployee.setFirstName(updatedEmployee.getFirstName());
		}
		if(!StringUtils.isEmpty(updatedEmployee.getLastName())) {
			actualEmployee.setLastName(updatedEmployee.getLastName());
		}
		employeeRepo.save(actualEmployee);
	}
	
}
