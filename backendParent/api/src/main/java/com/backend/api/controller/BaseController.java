package com.backend.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.PingInfo;
import com.backend.api.messages.Response;
import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;


/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("base")
public class BaseController {
	
	private static Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	@Autowired
	private BaseService baseService;
	
	@RequestMapping("/ping")
	public GenericResponse<PingInfo> pingService(HttpServletRequest request) {
		logger.info("Ping for Tenant -" + request.getHeader(Constants.Header_TenantId));
		GenericResponse<PingInfo> response = new GenericResponse<PingInfo>();
		PingInfo info = new PingInfo();
		info.setMessage("Connection OK");
		info.setTenantId(baseService.getTenantInfo().getTenantID());
		info.setTenantUniqueName(baseService.getTenantInfo().getUniqueName());
		info.setTenantActive(baseService.getTenantInfo().isActive());
		info.setPublicKey(baseService.getTenantInfo().fetchPublicKey());
		response.setStatus(Response.Status.OK);
		response.setData(info);
		return response;
	}

}
