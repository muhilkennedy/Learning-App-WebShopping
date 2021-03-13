package com.backend.api.admin.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.core.util.Constants;
import com.backend.persistence.entity.OrderDetails;
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
	public GenericResponse<Integer> getUnassignedOrders(HttpServletRequest request) {
		GenericResponse<Integer> response = new GenericResponse<Integer>();
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
	public GenericResponse<Integer> getUnassignedOrdersCount(HttpServletRequest request) {
		GenericResponse<Integer> response = new GenericResponse<Integer>();
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
	
	@RequestMapping(value = "/getAssignedOrders", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Orders> getUnassignedOrdersCount(HttpServletRequest request, @RequestParam(value = "status", required = true) String status) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			response.setDataList(orderService.getOrdersAssignedForEmployee(status));
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
													@RequestParam(value = "status", required = true) String status,
													@RequestParam(value = "orderId", required = true) String orderId,
													@RequestParam(value = "paymentMode", required = false) String paymentType) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			if(CommonUtil.isValidStringParam(status) && CommonUtil.isValidStringParam(orderId)) {
				orderService.updateOrderStatus(status, (StringUtils.isNotEmpty(orderId) ? Long.parseLong(orderId) : -1), paymentType);
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
	
	@RequestMapping(value = "/getOrders", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse getOrders(HttpServletRequest request,
										  @RequestParam(value = "filterCondition", required = false) String filterCondition,
										  @RequestParam(value = "filterDate", required = false) long filterDate,
										  @RequestParam(value = "filterStatus", required = false) String filterStatus) {
		GenericResponse response = new GenericResponse();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			if(!CommonUtil.isValidStringParam(filterCondition)) {
				filterCondition = null;
			}
			if(!CommonUtil.isValidStringParam(filterStatus)) {
				filterStatus = null;
			}
			if(CommonUtil.isValidStringParam(limit) && CommonUtil.isValidStringParam(offset)) {
				response.setData(orderService.getOrdersCount(limit, offset, filterCondition, filterDate, filterStatus));
				response.setDataList(orderService.getOrders(limit, offset, filterCondition, filterDate, filterStatus));
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("getPOS : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping("/viewPdf")
	public ResponseEntity<Resource> viewPdf( @RequestParam(value = "id", required = true) String id)throws Exception 
	{
		File file = null;
		try {
			if (CommonUtil.isValidStringParam(id)) {
				file = orderService.getOrderInvoice(Long.parseLong(id));
				HttpHeaders header = new HttpHeaders();
				header.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=Dummy.pdf");
				Path path = Paths.get(file.getAbsolutePath());
				ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
				long fileLength = file.length();
				CommonUtil.deleteDirectoryOrFile(file);
				return ResponseEntity.ok().headers(header).contentLength(fileLength)
						.contentType(MediaType.parseMediaType("application/pdf")).body(resource);
			}
			return null;
		} finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
	}

	@RequestMapping(value = "/updateOrderDetail", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Orders> updateOrderDetail(HttpServletRequest request,
			@RequestParam(value = "quantity", required = true) String quantity,
			@RequestParam(value = "productId", required = true) String productId,
			@RequestParam(value = "orderId", required = true) String orderId) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			if (CommonUtil.isValidStringParam(quantity) && CommonUtil.isValidStringParam(orderId)
					&& CommonUtil.isValidStringParam(productId)) {
				orderService.updateProductQuantity(Long.parseLong(orderId), Long.parseLong(productId),
						Integer.parseInt(quantity));
				response.setStatus(Response.Status.OK);
			} else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("updateOrderDetail : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/updateOrderDetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<OrderDetails> addOrderDetail(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) String productId,
			@RequestParam(value = "orderId", required = true) String orderId) {
		GenericResponse<OrderDetails> response = new GenericResponse<OrderDetails>();
		try {
			if (CommonUtil.isValidStringParam(orderId) && CommonUtil.isValidStringParam(productId)) {
				response.setData(orderService.addProductToOrder(Long.parseLong(orderId), Long.parseLong(productId)));
				response.setStatus(Response.Status.OK);
			} else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("addOrderDetail : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/updateOrderDetail", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<Orders> deleteOrderDetail(HttpServletRequest request,
			@RequestParam(value = "productId", required = true) String productId,
			@RequestParam(value = "orderId", required = true) String orderId) {
		GenericResponse<Orders> response = new GenericResponse<Orders>();
		try {
			if (CommonUtil.isValidStringParam(orderId) && CommonUtil.isValidStringParam(productId)) {
				orderService.removeProductFromOrder(Long.parseLong(orderId), Long.parseLong(productId));
				response.setStatus(Response.Status.OK);
			} else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("deleteOrderDetail : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/reassembleInvoice", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<OrderDetails> reassembleInvoice(HttpServletRequest request,
			@RequestParam(value = "orderId", required = true) String orderId) {
		GenericResponse<OrderDetails> response = new GenericResponse<OrderDetails>();
		try {
			if (CommonUtil.isValidStringParam(orderId)) {
				orderService.reassembleInvoice(Long.parseLong(orderId));
				response.setStatus(Response.Status.OK);
			} else {
				response.setStatus(Response.Status.BAD_REQUEST);
			}
		} catch (Exception ex) {
			logger.error("reassembleInvoice : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

}
