package com.backend.commons.serviceImpl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.backend.commons.service.EmailService;
import com.backend.commons.util.EmailConstants;
import com.backend.commons.util.EmailUtil;
import com.backend.core.service.BaseService;

import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * @author Muhil
 *
 */
@Service
public class EmailServiceImpl implements EmailService {
	
	private static Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
	
	@Autowired
	private EmailUtil emailUtil;
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private Configuration freeMarkerConfig;
	
	@Override
	public void sendEmail(String recipientEmail, String subject, String body, File attachment) {
		emailUtil.sendEmail(recipientEmail, subject, body, attachment);
	}
	
	/**
	 *@return - html string with substituted model values.
	 */
	@Override
	public String constructOnboardEmailBody(String fname, String lname, int empId, String password, String origin) {
		try {
			Template template = freeMarkerConfig.getTemplate(EmailConstants.employeeOnboardingTemplate);
			Map<String, Object> model = new HashMap<>();
			model.put(EmailConstants.Key_employeeName, fname + " " + lname);
			model.put(EmailConstants.Key_employeeId, empId);
			model.put(EmailConstants.Key_password, password);
			model.put(EmailConstants.Key_origin, origin);
			model.put(EmailConstants.Key_tenantName, baseService.getTenantInfo().getUniqueName());
			return FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
		}catch (Exception e) {
			logger.error("constructOnboardEmailBody : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		return null;
	}

}
