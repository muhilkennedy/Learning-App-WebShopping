package com.backend.api.customer.controller;

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
import com.backend.api.messages.ProductPOJO;
import com.backend.api.messages.Response;
import com.backend.persistence.entity.ProductReview;
import com.backend.persistence.service.ProductReviewService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/product")
public class ProductCustomerController {
	
	private static Logger logger = LoggerFactory.getLogger(ProductCustomerController.class);
	
	@Autowired
	private ProductReviewService reviewService;
	
	@RequestMapping(value = "/postReview", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<ProductReview> employeeCreation(HttpServletRequest request,
			@RequestBody ProductPOJO productPojo) {
		GenericResponse<ProductReview> response = new GenericResponse<ProductReview>();
		try {
			response.setDataList(
					(reviewService.createProductReview(productPojo.getProductId(), productPojo.getProductReview())));
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
