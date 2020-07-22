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
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.persistence.entity.Coupons;
import com.backend.persistence.service.CouponsService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/coupon")
public class CouponController {
	
	private static Logger logger = LoggerFactory.getLogger(CouponController.class);
	
	@Autowired
	private CouponsService couponService;
	
	@RequestMapping(value = "/createCoupon", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Coupons> createCoupon(HttpServletRequest request,
											     @RequestBody Coupons coupon) {
		GenericResponse<Coupons> response = new GenericResponse<Coupons>();
		try {
			couponService.createCoupon(coupon);
			response.setData(coupon);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getAllCoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Coupons> getAllCouponsForTenant(HttpServletRequest request) {
		GenericResponse<Coupons> response = new GenericResponse<Coupons>();
		try {
			response.setDataList(couponService.findAllCouponsForTenant());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("employeeCreation : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}


}
