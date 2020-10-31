package com.backend.api.controller;

import java.math.BigDecimal;
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
import org.springframework.web.multipart.MultipartFile;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
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

	/*
	 * ############################################
	 * secure access
	 * ############################################
	 */
	@RequestMapping(value = "/secure/admin/createOrUpdateProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> createOrUpdateProduct(HttpServletRequest request,
			@RequestParam(value = "productImage", required = false) MultipartFile file,
			@RequestParam(value = "categoryId", required = false) String catId,
			@RequestParam(value = "productId", required = false) String pId,
			@RequestParam(value = "productName", required = false) String productName,
			@RequestParam(value = "productBrand", required = false) String productBrand,
			@RequestParam(value = "cost", required = false) String cost,
			@RequestParam(value = "offer", required = false) String offer,
			@RequestParam(value = "description", required = false) String description,
			@RequestParam(value = "active", required = false) String active,
			@RequestParam(value = "code", required = false) String pcode,
			@RequestParam(value = "units", required = false) String unitsInStock) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			// Initial checks
			if (!CommonUtil.isValidStringParam(pId) && !CommonUtil.isValidStringParam(catId)) {
				response.setErrorMessages(Arrays.asList("Both Category Id and Product Id cannot be empty!"));
				response.setStatus(Response.Status.BAD_REQUEST);
				return response;
			}
			// create pojo object
			Product productPojo = new Product();
			productPojo.setProductName(productName);
			productPojo.setProductDescription(description);
			productPojo.setBrandName(productBrand);
			productPojo.setCost(CommonUtil.isValidStringParam(cost) ? new BigDecimal(cost) : new BigDecimal(0));
			productPojo.setOffer(CommonUtil.isValidStringParam(offer) ? new BigDecimal(offer) : new BigDecimal(0));
			productPojo.setProductId(CommonUtil.isValidStringParam(pId) ? Integer.parseInt(pId) : -1);
			productPojo.setActive(CommonUtil.isValidStringParam(active) ? Boolean.parseBoolean(active) : false);
			productPojo.setProductCode(pcode);
			productPojo.setQuantityInStock(CommonUtil.isValidStringParam(offer) ? Integer.parseInt(unitsInStock) : -1);
			Product product = productService.createOrUpdateProduct(productPojo,
					CommonUtil.isValidStringParam(offer) ? Integer.parseInt(catId) : 0,
					file != null ? file.getBytes() : null);
			if (product != null) {
				response.setData(product);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Failed To Create Product!"));
				response.setStatus(Response.Status.ERROR);
			}

		} catch (Exception ex) {
			logger.error("createOrUpdateProduct : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/secure/admin/getProductByCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> getProductByCode(HttpServletRequest request,
			@RequestParam(value = "pCode", required = true) String pCode) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			Product product = productService.getProductByCode(pCode);
			if (product != null) {
				response.setData(product);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Product NOT FOUND"));
				response.setStatus(Response.Status.NO_CONTENT);
			}
		} catch (Exception ex) {
			logger.error("getProductByCode : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/secure/admin/uploadProductImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> uploadProductImage(HttpServletRequest request,
			@RequestParam(value = "productImage", required = false) MultipartFile file,
			@RequestParam(value = "productId", required = true) String pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.addProductImage(CommonUtil.isValidStringParam(pId) ? Integer.parseInt(pId) : -1,
					file != null ? file.getBytes() : null);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("uploadProductImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/secure/admin/removeProductImage", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> removeProductImage(HttpServletRequest request,
			@RequestParam(value = "productImageId", required = true) String piId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.removeProductImage(CommonUtil.isValidStringParam(piId) ? Integer.parseInt(piId) : -1);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("removeProductImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/secure/admin/replaceProductImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> replaceProductImage(HttpServletRequest request,
			@RequestParam(value = "productImage", required = false) MultipartFile file,
			@RequestParam(value = "productImageId", required = true) String piId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.replaceImage(CommonUtil.isValidStringParam(piId) ? Integer.parseInt(piId) : -1,
					file != null ? file.getBytes() : null);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("replaceProductImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/secure/admin/toggleProductStatus", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> toggleProductStatus(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) String pId,
			@RequestParam(value = "productStatus", required = true) String status) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			if (CommonUtil.isValidStringParam(status) && CommonUtil.isValidStringParam(pId)) {
				productService.changeProductStatus(CommonUtil.isValidStringParam(pId) ? Integer.parseInt(pId) : -1,
						Boolean.parseBoolean(status));
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Parameters are not Valid!"));
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("toggleProductStatus : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
