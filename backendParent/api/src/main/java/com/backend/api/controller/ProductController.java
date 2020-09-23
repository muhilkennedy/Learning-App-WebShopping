package com.backend.api.controller;

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

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.core.util.Constants;
import com.backend.persistence.entity.Product;
import com.backend.persistence.service.ProductService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("product")
public class ProductController {
	
	private static Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	private ProductService productService;
	
	/*
	 * ############################################ 
	 * 				common access
	 * ############################################
	 */
	@RequestMapping(value = "/getProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProducts(HttpServletRequest request, @RequestParam(value = "pIds", required = false) List<Integer> pIds,
			@RequestParam(value = "cIds", required = false) List<Integer> cIds) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			List<Product> productList = new ArrayList<Product>();
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			if(pIds != null && pIds.size() > 0) {
				productList.addAll(productService.getProducts(pIds));
			}
			else if(limit != null && offset != null) {
				productList.addAll(productService.getAllProductsForTenant(Integer.parseInt(limit), Integer.parseInt(offset)));
			}
			else {
				productList.addAll(productService.getAllProductsForTenant());
			}
			response.setDataList(productList);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	/*
	 * ############################################ 
	 * 				secure access
	 * ############################################
	 */
	@RequestMapping(value = "/createProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProducts(HttpServletRequest request, @RequestBody Product productPojo, @RequestParam(value = "categoryId", required = true) int catId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			Product product = productService.createProduct(productPojo, catId);
			if(product != null) {
				response.setData(product);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setErrorMessages(Arrays.asList("Failed To Create Product"));
				response.setStatus(Response.Status.ERROR);
			}
			
		} catch (Exception ex) {
			logger.error("getProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
