package com.backend.api.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections4.map.HashedMap;
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
import com.backend.core.util.Constants;
import com.backend.persistence.entity.Product;
import com.backend.persistence.helper.ProductPOJO;
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
	 * common access
	 * ############################################
	 */
	@RequestMapping(value = "/getProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProducts(HttpServletRequest request,
			@RequestParam(value = "pIds", required = false) List<Integer> pIds,
			@RequestParam(value = "cIds", required = false) List<Integer> cIds,
			@RequestParam(value = "sortField", required = false) String sortByField,
			@RequestParam(value = "sortType", required = false) String sortByType,
			@RequestParam(value = "includeInactive", required = false) boolean includeInactive) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			response.setDataList(
					productService.getProducts(cIds, pIds, limit, offset, sortByField, sortByType, includeInactive));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getProductsById", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductsById(HttpServletRequest request,
			@RequestParam(value = "pIds", required = false) List<Integer> pIds) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(productService.getProducts(pIds));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsById : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getProductCount", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Map<String, Integer>> getProductCount(HttpServletRequest request,
			@RequestParam(value = "cIds", required = false) List<Integer> cIds,
			@RequestParam(value = "includeInactive", required = false) boolean includeInactive) {
		GenericResponse<Map<String, Integer>> response = new GenericResponse<>();
		try {
			Map<String, Integer> productCount = new HashedMap<String, Integer>();
			int count = productService.getProductsCount(cIds, includeInactive);
			productCount.put("productCount", count);
			response.setData(productCount);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductCount : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getProductsImage", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductsImage(HttpServletRequest request,
			@RequestParam(value = "pIds", required = true) List<Integer> pIds) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(productService.getProductImages(pIds));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getProductsByName", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductsByName(HttpServletRequest request,
			@RequestParam(value = "searchTerm", required = true) String searchTerm) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(productService.searchProductsByMatchingName(searchTerm));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsByName : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getProductsByNameOrCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductsByNameOrCode(HttpServletRequest request,
			@RequestParam(value = "searchTerm", required = true) String searchTerm) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(productService.searchProductsByMatchingNameOrCode(searchTerm));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsByNameOrCode : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getFeaturedProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getFeaturedProducts(HttpServletRequest request) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(productService.getFeaturedProducts());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getFeaturedProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getFeaturedProductImages", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<ProductPOJO> getFeaturedProductImages(HttpServletRequest request) {
		GenericResponse<ProductPOJO> response = new GenericResponse<>();
		try {
			response.setDataList(productService.getFeaturedProducts());
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getFeaturedProductImages : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	
}
