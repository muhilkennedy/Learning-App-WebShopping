package com.backend.api.controller;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.PingInfo;
import com.backend.api.messages.Response;
import com.backend.core.entity.HomePageMedia;
import com.backend.core.service.BaseService;
import com.backend.core.service.HomeMediaService;
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
	
	@Autowired
	private HomeMediaService mediaService;
	
	@RequestMapping("/ping")
	public GenericResponse<PingInfo> pingService(HttpServletRequest request) {
		logger.info("Ping for Tenant -" + baseService.getTenantInfo().getUniqueName());
		GenericResponse<PingInfo> response = new GenericResponse<PingInfo>();
		PingInfo info = new PingInfo();
		info.setMessage("Connection OK");
		info.setTenantId(baseService.getTenantInfo().getTenantID());
		info.setTenantUniqueName(baseService.getTenantInfo().getUniqueName());
		info.setTenantActive(baseService.getTenantInfo().isActive());
		info.setPublicKey(baseService.getTenantInfo().fetchPublicKey());
		response.setStatus(Response.Status.OK);
		response.setData(info);
		response.setDataList(Arrays.asList(baseService.getTenantInfo().getTenantDetail(), mediaService.getHomePageMediaCount()));
		return response;
	}
	
	@RequestMapping("/homeMedia")
	public GenericResponse<HomePageMedia> homeMedia(HttpServletRequest request) {
		logger.info("Load HomePageMedia for Tenant -" + request.getHeader(Constants.Header_TenantId));
		GenericResponse<HomePageMedia> response = new GenericResponse<HomePageMedia>();
		response.setDataList(mediaService.getHomeMediaContents());
		response.setStatus(Response.Status.OK);
		return response;
	}
	

}
