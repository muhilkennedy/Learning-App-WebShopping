package com.backend.api.customer.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
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
import com.backend.persistence.entity.Orders;
import com.backend.persistence.service.OrdersService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/orders")
public class OrdersController {
	
	private static Logger logger = LoggerFactory.getLogger(OrdersController.class);
	
	@Autowired
	private OrdersService orderService;
	
	@RequestMapping(value = "/placeOrder", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Orders> customerTokenAuthentication(HttpServletRequest request, @RequestParam(value = "couponId", required = false) String couponId) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			orderService.createCustomerOrder(StringUtils.isNotEmpty(couponId) ? Integer.parseInt(couponId) : -1);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("placeOrder : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
