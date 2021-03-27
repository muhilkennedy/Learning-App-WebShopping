package com.backend.api.admin.controller;

import java.io.File;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.messages.GenericResponse;
import com.backend.api.messages.Response;
import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.DashboardReport;
import com.backend.core.service.BaseService;
import com.backend.core.util.DashboardStatusUtil;
import com.backend.persistence.service.ReportingService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/dashboard")
public class DashboardController {
	
	private static Logger logger = LoggerFactory.getLogger(DashboardController.class);
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private ReportingService reportingService;
	
	@RequestMapping(value = "/getDashboardReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<DashboardReport> getDashboardReport(HttpServletRequest request) {
		GenericResponse<DashboardReport> response = new GenericResponse<>();
		try {
			response.setData(DashboardStatusUtil.getDashboardStatus(baseService.getTenantInfo()));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getDashboardReport : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getDashboardWeeklyReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse getDashboardWeeklyReport(HttpServletRequest request) {
		GenericResponse response = new GenericResponse<>();
		try {
			Map<String, List<BigDecimal>> report = reportingService.getWeeklyCombinedData();
			List<String> dateList = new ArrayList<String>();
			List<BigDecimal> posList = new ArrayList<BigDecimal>();
			List<BigDecimal> onlineList = new ArrayList<BigDecimal>();
			for (Map.Entry<String, List<BigDecimal>> entry : report.entrySet()) {
				dateList.add(entry.getKey());
				posList.add(CommonUtil.isValidDecimalParam(entry.getValue().get(0)) ? entry.getValue().get(0) : new BigDecimal(0));
				onlineList.add(CommonUtil.isValidDecimalParam(entry.getValue().get(1)) ? entry.getValue().get(1) : new BigDecimal(0));
			}
			response.setDataList(Arrays.asList(dateList, posList, onlineList));
			response.setStatus(Response.Status.OK);
		} catch (Exception ex) {
			logger.error("getDashboardWeeklyReport : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping("/downloadReport")
	public ResponseEntity<Resource> generateReport()throws Exception 
	{
		File file = null;
		try {
			file = reportingService.getOverallReport();
	        HttpHeaders header = new HttpHeaders();
	        header.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.xlsx");
	    	Path path = Paths.get(file.getAbsolutePath());
	        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
	        long fileLength = file.length();
	        CommonUtil.deleteDirectoryOrFile(file);
	        return ResponseEntity.ok()
	                .headers(header)
	                .contentLength(fileLength)
	                .contentType(MediaType.parseMediaType("application/xlsx"))
	                .body(resource);
		}
		finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
    }

}
