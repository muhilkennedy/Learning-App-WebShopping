package com.backend.api.admin.controller;

import java.math.BigDecimal;
import java.util.Arrays;
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
import org.springframework.web.multipart.MultipartFile;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.persistence.entity.Product;
import com.backend.persistence.service.ProductService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("product/secure/admin")
public class ProductAdminController {
	
	private static Logger logger = LoggerFactory.getLogger(ProductAdminController.class);

	@Autowired
	private ProductService productService;
	
	@RequestMapping(value = "/createOrUpdateProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
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
			@RequestParam(value = "units", required = false) String unitsInStock,
			@RequestParam(value = "sellingCost", required = false) String sellingCost) {
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
			productPojo.setSellingCost(CommonUtil.isValidStringParam(sellingCost) ? new BigDecimal(sellingCost) : productPojo.getCost());
			productPojo.setProductId(CommonUtil.isValidStringParam(pId) ? Long.parseLong(pId) : -1);
			productPojo.setActive(CommonUtil.isValidStringParam(active) ? Boolean.parseBoolean(active) : false);
			productPojo.setProductDescription(CommonUtil.isValidStringParam(description) ? description : "");
			productPojo.setProductCode(pcode);
			productPojo.setQuantityInStock(CommonUtil.isValidStringParam(offer) ? Integer.parseInt(unitsInStock) : -1);
			Product product = productService.createOrUpdateProduct(productPojo,
					CommonUtil.isValidStringParam(offer) ? Long.parseLong(catId) : 0,
					file != null ? CommonUtil.getProductImage(file.getOriginalFilename(), file.getBytes()) : null);
			if (product != null) {
				response.setDataList(Arrays.asList(product));
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
	
	@RequestMapping(value = "/deleteProduct", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> deleteProduct(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) long pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.deleteProductById(pId);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteProduct : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/cloneProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> cloneProduct(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) long pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			response.setDataList(Arrays.asList(productService.cloneProduct(pId)));			
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("cloneProduct : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getProductByCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
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

	@RequestMapping(value = "/uploadProductImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> uploadProductImage(HttpServletRequest request,
			@RequestParam(value = "productImage", required = false) MultipartFile file,
			@RequestParam(value = "productId", required = true) String pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.addProductImage(CommonUtil.isValidStringParam(pId) ?  Long.parseLong(pId) : -1,
					file != null ? CommonUtil.getProductImage(file.getOriginalFilename(), file.getBytes()) : null);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("uploadProductImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/removeProductImage", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> removeProductImage(HttpServletRequest request,
			@RequestParam(value = "productImageId", required = true) String piId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.removeProductImage(CommonUtil.isValidStringParam(piId) ? Long.parseLong(piId) : -1);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("removeProductImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/replaceProductImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> replaceProductImage(HttpServletRequest request,
			@RequestParam(value = "productImage", required = false) MultipartFile file,
			@RequestParam(value = "productImageId", required = true) String piId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.replaceImage(CommonUtil.isValidStringParam(piId) ? Long.parseLong(piId) : -1,
					file != null ? CommonUtil.getProductImage(file.getOriginalFilename(), file.getBytes()) : null);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("replaceProductImage : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/toggleProductStatus", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> toggleProductStatus(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) String pId,
			@RequestParam(value = "productStatus", required = true) String status) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			if (CommonUtil.isValidStringParam(status) && CommonUtil.isValidStringParam(pId)) {
				productService.changeProductStatus(CommonUtil.isValidStringParam(pId) ?  Long.parseLong(pId) : -1,
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
	
	@RequestMapping(value = "/addFeaturedProducts", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> addFeaturedProducts(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) String pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			if (CommonUtil.isValidStringParam(pId)) {
				productService.addToFeaturedProducts(Long.parseLong(pId));
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Parameters are not Valid!"));
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("addFeaturedProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/deleteFeaturedProducts", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> deleteFeaturedProducts(HttpServletRequest request,
														@RequestParam(value = "productId", required = true) long pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			productService.deleteFeaturedProduct(pId);
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("deleteFeaturedProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/isFeaturedProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Product> isFeaturedProducts(HttpServletRequest request,
														@RequestParam(value = "productId", required = true) long pId) {
		GenericResponse<Product> response = new GenericResponse<>();
		try {
			if(productService.isFeaturedProduct(pId)) {
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setStatus(Response.Status.NO_CONTENT);
			}
		} catch (Exception ex) {
			logger.error("deleteFeaturedProducts : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
