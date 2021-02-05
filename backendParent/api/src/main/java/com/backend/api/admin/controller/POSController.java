package com.backend.api.admin.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.core.util.Constants;
import com.backend.persistence.helper.POSData;
import com.backend.persistence.service.POSService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/pos")
public class POSController {
	
	private static Logger logger = LoggerFactory.getLogger(POSController.class);
	
	@Autowired
	private POSService posService;
	
	@RequestMapping(value = "/createPOS", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> createPOS(HttpServletRequest request,
			@RequestBody POSData posData) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			String posKey = posService.createPOS(posData);
			if(posKey != null) {
				response.setData(posKey);
				response.setStatus(Response.Status.OK);
			}
			else {
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("createPOS : " + ex);
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
			file = posService.getPOSInvoice(id);
	        HttpHeaders header = new HttpHeaders();
	        header.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=Dummy.pdf");
	    	Path path = Paths.get(file.getAbsolutePath());
	        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
	        long fileLength = file.length();
	        CommonUtil.deleteDirectoryOrFile(file);
	        return ResponseEntity.ok()
	                .headers(header)
	                .contentLength(fileLength)
	                .contentType(MediaType.parseMediaType("application/pdf"))
	                .body(resource);
		}
		finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
    }
	
	@RequestMapping(value = "/getPOS", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<String> getPOS(HttpServletRequest request,
										  @RequestParam(value = "filterCondition", required = false) String filterCondition,
										  @RequestParam(value = "filterDate", required = false) long filterDate) {
		GenericResponse<String> response = new GenericResponse<String>();
		try {
			String limit = request.getHeader(Constants.Header_Limit);
			String offset = request.getHeader(Constants.Header_Offset);
			if(CommonUtil.isValidStringParam(limit) && CommonUtil.isValidStringParam(offset)) {
				response.setData(String.valueOf(posService.getPOSDATACount(filterCondition, filterDate)));
				response.setDataList(posService.getPOSDATA(limit, offset, filterCondition, filterDate));
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

}