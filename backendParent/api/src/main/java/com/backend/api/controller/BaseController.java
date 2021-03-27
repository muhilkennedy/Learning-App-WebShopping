package com.backend.api.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.PingInfo;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.DashboardReport;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.entity.HomePageMedia;
import com.backend.core.security.RSAKeyPairGenerator;
import com.backend.core.service.BaseService;
import com.backend.core.service.HomeMediaService;
import com.backend.core.util.Constants;
import com.backend.persistence.service.EmployeeService;
import com.backend.persistence.service.ReportingService;


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
	
	@Autowired
	private EmployeeService empService;
	
	private static int count = 0;
	
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
		if(baseService.getTenantInfo().getTenantDetail() != null) {
			response.setDataList(Arrays.asList(baseService.getTenantInfo().getTenantDetail(), baseService.getTenantInfo().getTenantDetail().fetchTenantLogo()));
		}
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
	
	@RequestMapping("/homeInfoMedia")
	public GenericResponse<HomePageMedia> homeInfoMedia(HttpServletRequest request) {
		GenericResponse<HomePageMedia> response = new GenericResponse<HomePageMedia>();
		response.setDataList(mediaService.getHomePageMediaForTenant());
		response.setStatus(Response.Status.OK);
		return response;
	}
	
	@RequestMapping("/homeBannerMedia")
	public GenericResponse<HomePageMedia> homeBannerMedia(HttpServletRequest request) {
		GenericResponse<HomePageMedia> response = new GenericResponse<HomePageMedia>();
		response.setDataList(mediaService.getHomePageBannerMedia());
		response.setStatus(Response.Status.OK);
		return response;
	}
	
	@RequestMapping("/loadTesting")
	public GenericResponse<EmployeeInfo> loadTesting(HttpServletRequest request) {
		count++;
		System.out.println("###############->"+count);
		System.out.println("###############->"+ new Date().toString());
		GenericResponse<EmployeeInfo> response = new GenericResponse<EmployeeInfo>();
		response.setDataList(empService.findAllEmployeeForTenant());
		return response;
	}
	
	@RequestMapping("/getkeys")
	public GenericResponse<?> getRSAkeys(HttpServletRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			RSAKeyPairGenerator rsa = new RSAKeyPairGenerator();
			Map<String, String> keyMap = new HashMap<String, String>();
			keyMap.put("privateKey", rsa.getPrivateKey());
			keyMap.put("publicKey", rsa.getPublicKey());
			response.setData(keyMap);
			response.setStatus(Response.Status.OK);
		}
		catch (NoSuchAlgorithmException e) {
			logger.error(e.getMessage());
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return null;
	}

}
