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
import com.backend.commons.util.CommonUtil;
import com.backend.persistence.entity.DeliveryConfiguration;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.service.CouponsService;
import com.backend.persistence.service.DeliveryService;
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
	
	@Autowired
	private DeliveryService deliveryService;
	
	@Autowired
	private CouponsService couponService;
	
	@RequestMapping(value = "/placeOrder", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Orders> customerTokenAuthentication(HttpServletRequest request, @RequestParam(value = "couponId", required = false) String couponId,
			@RequestParam(value = "paymentMode", required = false) String paymentMode) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			orderService.createCustomerOrder(StringUtils.isNotEmpty(couponId) ? Integer.parseInt(couponId) : -1, CommonUtil.isValidStringParam(paymentMode) ? Integer.parseInt(paymentMode) : 1);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("placeOrder : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getPincodeAndCouponDetails", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DeliveryConfiguration> getPincodeDetails(HttpServletRequest request, @RequestParam(value = "pincode", required = true) String pincode,
			 														@RequestParam(value = "coupon", required = false) String coupon) {
		GenericResponse<DeliveryConfiguration> response = new GenericResponse<DeliveryConfiguration>();
		try {
			response.setData(deliveryService.getDeliveryConfiguration(pincode));
			if(CommonUtil.isValidStringParam(coupon)) {
				response.setDataList(Arrays.asList(couponService.verifyIfCouponApplicableById(coupon)));
			}
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getPincodeDetails : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
