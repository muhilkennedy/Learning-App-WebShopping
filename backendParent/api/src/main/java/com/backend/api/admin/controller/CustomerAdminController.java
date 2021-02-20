package com.backend.api.admin.controller;


import java.io.Console;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.admin.messages.CustomerPOJOHelper;
import com.backend.api.admin.messages.EmployeePOJOHelper;
import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;
import com.backend.persistence.entity.CustomerAddress;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.EmployeeService;

/*
 *@author Chris
 * 
 */

@RestController

@RequestMapping("secure/admin/customer")

public class CustomerAdminController {
	
	//setting the logs for testing purposes
	private static Logger logger = LoggerFactory.getLogger(CustomerAdminController.class); 
	
	@Autowired
	private CustomerInfoService customerService;
	
	@GetMapping(value = "/getAllCustomers", produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<CustomerInfo> getAllCustomer(HttpServletRequest request) {
		GenericResponse<CustomerInfo> response = new GenericResponse<CustomerInfo>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			List<CustomerInfo> customerInfo = new ArrayList<CustomerInfo>();
			if(limit != null && offset != null) {
				customerInfo = customerService.findAllCustomersForTenant(Integer.parseInt(offset), Integer.parseInt(limit));
			}
			else {
				customerInfo = customerService.findAllCustomersForTenant();
			}
			if(customerInfo!=null) {
				response.setDataList(customerInfo);
				response.setStatus(Response.Status.OK);
			}			
		} catch (Exception ex) {
			logger.error("getAllCustomer : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
		
	@GetMapping(value = "/getAllCustomersCount", produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Integer> getAllCustomersCount(HttpServletRequest request) {
		GenericResponse<Integer> response = new GenericResponse<Integer>();
		try {
			response.setData(customerService.findAllCustomersCountForTenant());
			response.setStatus(Response.Status.OK);			
		} catch (Exception ex) {
			logger.error("getAllCustomer : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/changeCustomerStatus", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<CustomerInfo> customerStatus(HttpServletRequest request,  @RequestBody CustomerPOJOHelper helper) {
		GenericResponse<CustomerInfo> response = new GenericResponse<CustomerInfo>();
		try {
			CustomerInfo custInfo = customerService.getCustomerById(helper.getCustomerInfo().getCustomerId());
			if(custInfo!=null) {
				customerService.toggleCustomerStatus(custInfo);
				response.setData(custInfo);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("No Customer Found"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("customerStatus"
					+ ": " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
}
