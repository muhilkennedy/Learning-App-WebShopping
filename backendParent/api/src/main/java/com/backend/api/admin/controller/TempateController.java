package com.backend.api.admin.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
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
import com.backend.core.entity.InvoiceTemplate;
import com.backend.persistence.service.InvoiceService;

/**
 * @author Muhil
 *
 */
@RestController
@RequestMapping("secure/admin/template")
public class TempateController {

	private static Logger logger = LoggerFactory.getLogger(TempateController.class);

	@Autowired
	private InvoiceService invoiceService;

	@RequestMapping(value = "/createTemplate", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<InvoiceTemplate> createTemplate(HttpServletRequest request,
			@RequestParam(value = "myFile", required = true) MultipartFile file) {
		GenericResponse<InvoiceTemplate> response = new GenericResponse<InvoiceTemplate>();
		try {
			String fileName = file.getOriginalFilename();
			String extension = fileName.substring(fileName.lastIndexOf("."));
			if (CommonUtil.template_Supported_Extentions.contains(extension)) {
				invoiceService.createTemplate(file.getBytes(), null);
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Document Format Not Supported!"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("createTemplate : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(value = "/getActiveTemplate", method = RequestMethod.GET)
	public Object getActiveTemplate(HttpServletRequest request) {
		File file = null;
		try {
			file = invoiceService.getActiveTemplateAsPDF();
			if (file == null) {
				GenericResponse response = new GenericResponse<>();
				response.setStatus(Response.Status.NO_CONTENT);
				return response;
			}
			logger.info("getActiveTemplate : " + file.getAbsolutePath());
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			logger.error("Exception in fetching active template : " + e.getMessage());
			e.printStackTrace();
		} finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
		return file;
	}

	@RequestMapping(value = "/downloadActiveTemplate", method = RequestMethod.GET)
	public Object downloadActiveTemplate(HttpServletRequest request) {
		File file = null;
		try {
			file = invoiceService.getActiveTemplateDocument();
			if (file == null) {
				GenericResponse response = new GenericResponse<>();
				response.setStatus(Response.Status.NO_CONTENT);
				return response;
			}
			logger.info("downloadActiveTemplate : " + file.getAbsolutePath());
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			logger.error("Exception in fetching active template : " + e.getMessage());
			e.printStackTrace();
		} finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
		return file;
	}
	
	@RequestMapping(value = "/createPosTemplate", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public GenericResponse<InvoiceTemplate> createPosTemplate(HttpServletRequest request,
			@RequestParam(value = "myFile", required = true) MultipartFile file) {
		GenericResponse<InvoiceTemplate> response = new GenericResponse<InvoiceTemplate>();
		try {
			String fileName = file.getOriginalFilename();
			String extension = fileName.substring(fileName.lastIndexOf("."));
			if (CommonUtil.template_Supported_Extentions.contains(extension)) {
				invoiceService.createTemplate(null, file.getBytes());
				response.setStatus(Response.Status.OK);
			} else {
				response.setErrorMessages(Arrays.asList("Document Format Not Supported!"));
				response.setStatus(Response.Status.ERROR);
			}
		} catch (Exception ex) {
			logger.error("createPosTemplate : " + ex);
			List<String> msg = Arrays.asList(ex.getMessage());
			response.setErrorMessages(msg);
			response.setStatus(Response.Status.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@RequestMapping(value = "/getActivePOSTemplate", method = RequestMethod.GET)
	public Object getActivePOSTemplate(HttpServletRequest request) {
		File file = null;
		try {
			file = invoiceService.getActivePosTemplateAsPDF();
			if (file == null) {
				GenericResponse response = new GenericResponse<>();
				response.setStatus(Response.Status.NO_CONTENT);
				return response;
			}
			logger.info("getActivePOSTemplate : " + file.getAbsolutePath());
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			logger.error("Exception in fetching active template : " + e.getMessage());
			e.printStackTrace();
		} finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
		return file;
	}
	
	@RequestMapping(value = "/downloadPosActiveTemplate", method = RequestMethod.GET)
	public Object downloadPosActiveTemplate(HttpServletRequest request) {
		File file = null;
		try {
			file = invoiceService.getActivePosTemplateDocument();
			if (file == null) {
				GenericResponse response = new GenericResponse<>();
				response.setStatus(Response.Status.NO_CONTENT);
				return response;
			}
			logger.info("downloadPosActiveTemplate : " + file.getAbsolutePath());
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			logger.error("Exception in fetching active template : " + e.getMessage());
			e.printStackTrace();
		} finally {
			CommonUtil.deleteDirectoryOrFile(file);
		}
		return file;
	}

}
