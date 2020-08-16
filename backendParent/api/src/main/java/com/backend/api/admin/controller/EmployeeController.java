  package com.backend.api.admin.controller;

import java.util.ArrayList;
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
import org.springframework.web.multipart.MultipartFile;

import com.backend.api.admin.messages.EmployeePOJOHelper;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.api.service.LoginService;
import com.backend.commons.service.EmailService;
import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;
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
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private BaseService baseService;
	
	@RequestMapping(value = "/employeeTokenAuthentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> employeeTokenAuthentication(HttpServletRequest request) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			EmployeeInfo info = (EmployeeInfo)baseService.getUserInfo();
			info = empService.findEmployeeByEmail(info.getEmailId());
			response.setData(info);
			if(info.isActive()) {
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("Account is Deactivated.. Please contact Admin!"));
				response.setStatus(Response.Status.FORBIDDEN);
			}
		} catch (Exception ex) {
			logger.error("employeeTokenAuthentication : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/createEmployee", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> employeeCreation(HttpServletRequest request,
			@RequestBody EmployeeInfo empObj) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			if(loginService.checkIfUserExists(empObj.getEmailId())) {
				response.setErrorMessages(Arrays.asList("Email Id Exists"));
				response.setStatus(Response.Status.ERROR);
			}
			String generatedaPassword = loginService.createUser(empObj);
			if (generatedaPassword != null) {
				//send a onboard email to the employee.
				emailService.sendOnboardingEmail(empObj.getEmailId(), empObj.getFirstName(), empObj.getLastName(),
						empObj.getEmployeeId(), generatedaPassword, request.getHeader(Constants.Header_Origin));
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
	
	@RequestMapping(value = "/deactivateEmployee", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> deactivateEmployee(HttpServletRequest request) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			loginService.toggleUserStatus(false);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deactivateEmployee : " + ex);
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
			logger.error("getPermissions : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getEmployee", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> getEmployee(HttpServletRequest request,
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
			logger.error("getEmployee : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAllEmployeeNames", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> getAllEmployeeNames(HttpServletRequest request) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			response.setDataList(empService.findAllEmployeeNameAndEmailForTenant());
			response.setStatus(Response.Status.OK);

		} catch (Exception ex) {
			logger.error("getEmployee : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAllEmployee", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> getAllEmployee(HttpServletRequest request) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			List<EmployeeInfo> empInfo = new ArrayList<EmployeeInfo>();
			if(limit != null && offset != null) {
				empInfo = empService.findAllEmployeeForTenant(Integer.parseInt(offset), Integer.parseInt(limit));
			}
			else {
				empInfo	= empService.findAllEmployeeForTenant();
			}
			if(empInfo!=null) {
				response.setDataList(empInfo);
				response.setStatus(Response.Status.OK);
			}			
		} catch (Exception ex) {
			logger.error("getAllEmployee : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAllEmployeesCount", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Integer> getAllEmployeesCount(HttpServletRequest request) {
		GenericResponse<Integer> response = new GenericResponse<Integer>();
		try {
			response.setData(empService.findAllEmployeesForTenantCount());
			response.setStatus(Response.Status.OK);			
		} catch (Exception ex) {
			logger.error("getAllEmployee : " + ex);
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
			logger.error("overridePermissions : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/activateEmployee", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> activateEmployee(HttpServletRequest request, @RequestBody EmployeePOJOHelper helper) {
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
			logger.error("activateEmployee : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/updateEmployee", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<EmployeeInfo> updateEmployee(HttpServletRequest request, @RequestParam(value = "myFile", required = false) MultipartFile file,
														@RequestParam(value = "id", required = true) int id,
														@RequestParam(value = "firstName", required = false) String firstName,
														@RequestParam(value = "lastName", required = false) String lastName,
														@RequestParam(value = "emailId", required = false) String emailId,
														@RequestParam(value = "mobile", required = false) String mobile) {
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		EmployeeInfo employeeInfo = new EmployeeInfo();
		employeeInfo.setEmployeeId(id);
		employeeInfo.setFirstName(firstName);
		employeeInfo.setLastName(lastName);
		employeeInfo.setEmailId(emailId);
		employeeInfo.setMobile(mobile);
		try {
			EmployeeInfo empInfo = empService.findEmployeeById(employeeInfo.getEmployeeId());
			if(empInfo!=null) {
				empService.updateEmployee(empInfo, employeeInfo, (file != null)? file.getBytes() : null);
				response.setData(empInfo);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("No Employee Found"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("updateEmployee : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	
}
