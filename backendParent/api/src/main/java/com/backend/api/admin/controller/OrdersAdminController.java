package com.backend.api.admin.controller;

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
import com.backend.commons.util.CommonUtil;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.service.OrdersService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/orders")
public class OrdersAdminController {
	
	private static Logger logger = LoggerFactory.getLogger(OrdersAdminController.class);
	
	@Autowired
	private OrdersService orderService;
	
	@RequestMapping(value = "/getUnassignedOrders", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse getUnassignedOrders(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			response.setDataList(orderService.getAllUnassignedOrders());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getUnassignedOrders : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getUnassignedOrdersCount", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse getUnassignedOrdersCount(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			response.setData(orderService.getAllUnassignedOrdersCount());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getUnassignedOrders : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/changeOrderStatus", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Orders> changeOrderStatus(HttpServletRequest request,
															   @RequestParam(value = "status", required = false) String status,
															   @RequestParam(value = "orderId", required = false) String orderId) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			if(CommonUtil.isValidStringParam(status) && CommonUtil.isValidStringParam(orderId)) {
				orderService.updateOrderStatus(status, (StringUtils.isNotEmpty(orderId) ? Integer.parseInt(orderId) : -1));
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("changeOrderStatus : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}



}
