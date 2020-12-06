package com.backend.api.customer.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.service.CustomerInfoService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/customer")
public class CustomerController {

	private static Logger logger = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	private BaseService baseService;

	@Autowired
	private CustomerInfoService customerService;

	@RequestMapping(value = "/customerTokenAuthentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<CustomerInfo> customerTokenAuthentication(HttpServletRequest request) {
		GenericResponse<CustomerInfo> response = new GenericResponse<CustomerInfo>();
		try {
			CustomerInfo info = (CustomerInfo) baseService.getUserInfo();
			info = customerService.getCustomerByEmail(info.getEmailId());
			if (info.isActive()) {
				info.setLastLogin(CommonUtil.convertToUTC(new Date().getTime()));
				response.setData(info);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Account is Deactivated.. Please contact Admin!"));
				response.setStatus(Response.Status.FORBIDDEN);
			}
		} catch (Exception ex) {
			logger.error("customerTokenAuthentication : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/addProductToCart", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<CustomerCart> addProductToCart(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) String pId) {
		GenericResponse<CustomerCart> response = new GenericResponse<CustomerCart>();
		try {
			if (CommonUtil.isValidStringParam(pId)) {
				customerService.addProductToCart(Integer.parseInt(pId));
				response.setStatus(Response.Status.OK);
			} else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("addProductToCart : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getCustomerCart", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<CustomerCart> getCustomerCart(HttpServletRequest request) {
		GenericResponse<CustomerCart> response = new GenericResponse<CustomerCart>();
		try {
			response.setDataList(customerService.getCustomerCartItems());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getCustomerCart : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getCustomerCartCount", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse getCustomerCartCount(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			response.setData(customerService.getUserCartCount());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getCustomerCartCount : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/updateProductQuantity", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse updateProductQuantity(HttpServletRequest request,
												@RequestParam(value = "productId", required = true) String pId,
												@RequestParam(value = "quantity", required = true) String quantity) {
		GenericResponse response = new GenericResponse();
		try {
			if (CommonUtil.isValidStringParam(pId) && CommonUtil.isValidStringParam(quantity)) {
				customerService.updateProductQuantity(Integer.parseInt(pId), Integer.parseInt(quantity));
				response.setStatus(Response.Status.OK);
			} else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("updateProductQuantity : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}