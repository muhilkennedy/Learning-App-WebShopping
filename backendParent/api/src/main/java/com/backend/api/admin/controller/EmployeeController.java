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

import com.backend.api.admin.messages.EmployeePOJOHelper;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.api.service.LoginService;
import com.backend.persistence.entity.EmployeeInfo;
import com.backend.persistence.entity.EmployeePermissions;
import com.backend.persistence.service.EmployeeService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/employee")
public class EmployeeController {
	
	private static Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private EmployeeService empService;

	@RequestMapping(value = "/createEmployee", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> employeeCreation(HttpServletRequest request,
			@RequestBody EmployeeInfo empObj) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			if (loginService.createUser(empObj)) {
				//send a onboard email to the employee.
				response.setStatus(Response.Status.OK);
				response.setData(empObj);
			} else {
				response.setErrorMessages(Arrays.asList("Failed to create User"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAllPermissions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeePermissions> getPermissions(HttpServletRequest request) {
		GenericResponse<EmployeePermissions> response = new GenericResponse<EmployeePermissions>();
		try {
			response.setDataList(empService.getAllGenericPermissions());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getEmployee", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> getPermissions(HttpServletRequest request,
												@RequestParam(value = "emailOrId", required = true) String emailOrId) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			EmployeeInfo empInfo = empService.findEmployeeByEmailOrId(emailOrId);
			if(empInfo!=null) {
				response.setData(empInfo);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("No Employee Found"));
				response.setStatus(Response.Status.ERROR);
			}
			
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/overridePermissions", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> overridePermissions(HttpServletRequest request, @RequestBody EmployeePOJOHelper helper){
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			EmployeeInfo empInfo = empService.findEmployeeById(helper.getEmployeeId());
			if(empInfo!=null) {
				empService.overrirdePermissions(empInfo, helper.getPermissions());
				response.setData(empInfo);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("No Employee Found"));
				response.setStatus(Response.Status.ERROR);
			}
			
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/activateEmployee", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> updateEmployeeStatus(HttpServletRequest request, @RequestBody EmployeePOJOHelper helper) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			EmployeeInfo empInfo = empService.findEmployeeById(helper.getEmployeeId());
			if(empInfo!=null) {
				empService.employeeStatus(empInfo, helper.isActive());
				response.setData(empInfo);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("No Employee Found"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	
}
