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
import com.backend.commons.util.CommonUtil;
import com.backend.core.util.Constants;
import com.backend.persistence.entity.Product;
import com.backend.persistence.helper.ProductPOJO;
import com.backend.persistence.service.ProductReviewService;
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
	
	@Autowired
	private ProductReviewService reviewService;

	/*
	 * ############################################
	 * common access
	 * ############################################
	 */
	@RequestMapping(value = "/getProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProducts(HttpServletRequest request,
			@RequestParam(value = "pIds", required = false) List<Long> pIds,
			@RequestParam(value = "cIds", required = false) List<Long> cIds,
			@RequestParam(value = "sortField", required = false) String sortByField,
			@RequestParam(value = "sortType", required = false) String sortByType,
			@RequestParam(value = "includeInactive", required = false) boolean includeInactive,
			@RequestParam(value = "outOfStock", required = false) boolean outOfStock) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			response.setDataList(
					productService.getProducts(cIds, pIds, limit, offset, sortByField, sortByType, includeInactive, outOfStock));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getProductsWithImages", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductsWithImages(HttpServletRequest request,
			@RequestParam(value = "pIds", required = false) List<Long> pIds,
			@RequestParam(value = "cIds", required = false) List<Long> cIds,
			@RequestParam(value = "sortField", required = false) String sortByField,
			@RequestParam(value = "sortType", required = false) String sortByType) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			response.setDataList(
					productService.getProducts(cIds, pIds, limit, offset, sortByField, sortByType));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsWithImages : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getProductsById", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductsById(HttpServletRequest request,
			@RequestParam(value = "pIds", required = false) List<Long> pIds) {
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
			@RequestParam(value = "cIds", required = false) List<Long> cIds,
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
			@RequestParam(value = "pIds", required = true) List<Long> pIds) {
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
	
	@RequestMapping(value = "/getProductReview", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<ProductPOJO> getProductInfo(HttpServletRequest request, @RequestParam(value = "prId", required = false) long productId) {
		GenericResponse<ProductPOJO> response = new GenericResponse<>();
		try {
			response.setDataList(reviewService.getReviewsForProduct(productId));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductInfo : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getProdctsRecursiveByCategory", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProdctsRecursiveByCategory(HttpServletRequest request,@RequestParam(value = "pIds", required = false) List<Integer> pIds,
			@RequestParam(value = "cIds", required = false) Long cId,
			@RequestParam(value = "sortField", required = false) String sortByField,
			@RequestParam(value = "sortType", required = false) String sortByType,
			@RequestParam(value = "includeInactive", required = false) boolean includeInactive) {
		String limit = request.getHeader(Constants.Header_Limit);
		String offset = request.getHeader(Constants.Header_Offset);
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(productService.getProductRecursiveByCategoryId(cId, limit, offset, sortByField, sortByType, includeInactive));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProdctsRecursiveByCategory : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getProductsBySearchText", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse getProductsBySearchText(HttpServletRequest request,
			@RequestParam(value = "searchTerm", required = true) String searchTerm,
			@RequestParam(value = "cIds", required = false) String cId,
			@RequestParam(value = "sortField", required = false) String sortByField,
			@RequestParam(value = "sortType", required = false) String sortByType,
			@RequestParam(value = "includeInactive", required = false) boolean includeInactive) {
		GenericResponse response = new GenericResponse<>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
//			response.setData(productService.getProductsCountWithSearchTerm(
//					CommonUtil.isValidStringParam(cId) ? Arrays.asList(Long.parseLong(cId)) : null, searchTerm, limit,
//					offset, sortByField, sortByType));
			List<ProductPOJO> products = productService.getProductsWithSearchTerm(
					CommonUtil.isValidStringParam(cId) ? Arrays.asList(Long.parseLong(cId)) : null, searchTerm, limit,
					offset, sortByField, sortByType); 
			response.setDataList(products);
			response.setData(products.size());	
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getProductsBySearchText : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
}
