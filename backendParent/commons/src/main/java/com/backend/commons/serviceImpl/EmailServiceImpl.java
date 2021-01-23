package com.backend.commons.serviceImpl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.backend.commons.service.EmailService;
import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.EmailConstants;
import com.backend.commons.util.EmailThread;
import com.backend.commons.util.EmailUtil;
import com.backend.core.service.BaseService;
import com.backend.core.util.Constants;

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
	public void sendEmail(String recipientEmail, String subject, String body, Map<String, File> inlineImages,
			File attachments) throws Exception {
		emailUtil.sendEmail(recipientEmail, subject, body, inlineImages, attachments);
	}

	/**
	 * @return - html string with substituted model values.
	 */
	public String constructOnboardEmailBody(String fname, String lname, Long empId, String password, String origin, File logo) {
		try {
			Template template = freeMarkerConfig.getTemplate(EmailConstants.employeeOnboardingTemplate);
			Map<String, Object> model = new HashMap<>();
			model.put(EmailConstants.Key_employeeName, fname + " " + lname);
			model.put(EmailConstants.Key_employeeId, empId);
			model.put(EmailConstants.Key_password, password);
			model.put(EmailConstants.Key_origin, origin);
			model.put(EmailConstants.Key_tenantName, baseService.getTenantInfo().getUniqueName());
			model.put(EmailConstants.Key_tenantLogo, "\"cid:" + logo.getName() + "\"");
			model.put(EmailConstants.Key_tenantStreet, baseService.getTenantInfo().getTenantDetail().getTenantStreet());
			model.put(EmailConstants.Key_tenantCity, baseService.getTenantInfo().getTenantDetail().getTenantCity());
			model.put(EmailConstants.Key_tenantPin, baseService.getTenantInfo().getTenantDetail().getTenantPin());
			model.put(EmailConstants.Key_tenantContact, baseService.getTenantInfo().getTenantDetail().getTenantContact());
			return FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
		} catch (Exception e) {
			logger.error("constructOnboardEmailBody : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		return null;
	}

	@Override
	public void sendOnboardingEmail(String recipientEmail, String fname, String lname, Long empId, String password,
			String origin) {
		File tempFile = null;
		try {
			String subject = " Welcome to " + baseService.getTenantInfo().getUniqueName() + " : Onboarding Email";
			tempFile = File.createTempFile(CommonUtil.Icon_name, CommonUtil.Png_Extension);
			InputStream is = baseService.getTenantInfo().getTenantDetail().fetchTenantLogoBlob().getBinaryStream();
			FileUtils.copyInputStreamToFile(is, tempFile);
			Map<String, File> inlineImages = new HashMap<String, File>();
			inlineImages.put(tempFile.getName(), tempFile);
			String body = constructOnboardEmailBody(fname, lname, empId, password, origin, tempFile);
			sendEmail(recipientEmail, subject, body, inlineImages, null);
		}
		catch (Exception e) {
			logger.error("sendOnboardingEmail : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		finally {
			CommonUtil.deleteDirectoryOrFile(tempFile);
		}
	}

	public String constructOtpEmailBody(String otp, File logo) {
		try {
			Template template = freeMarkerConfig.getTemplate(EmailConstants.employeeEmailOtpTemplate);
			Map<String, Object> model = new HashMap<>();
			model.put(EmailConstants.Key_otp, otp);
			model.put(EmailConstants.Key_tenantName, baseService.getTenantInfo().getUniqueName());
			model.put(EmailConstants.Key_tenantLogo, "\"cid:" + logo.getName() + "\"");
			model.put(EmailConstants.Key_tenantStreet, baseService.getTenantInfo().getTenantDetail().getTenantStreet());
			model.put(EmailConstants.Key_tenantCity, baseService.getTenantInfo().getTenantDetail().getTenantCity());
			model.put(EmailConstants.Key_tenantPin, baseService.getTenantInfo().getTenantDetail().getTenantPin());
			model.put(EmailConstants.Key_tenantContact, baseService.getTenantInfo().getTenantDetail().getTenantContact());
			return FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
		} catch (Exception e) {
			logger.error("constructOtpEmailBody : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		return null;
	}

	@Override
	public void sendOtpEmail(String recipientEmail, String otp) {
		File tempFile = null;
		try {
			String subject = "Email OTP Verification : " + baseService.getTenantInfo().getUniqueName();
			tempFile = File.createTempFile("icon", ".png");
			InputStream is = baseService.getTenantInfo().getTenantDetail().fetchTenantLogoBlob().getBinaryStream();
			FileUtils.copyInputStreamToFile(is, tempFile);
			Map<String, File> inlineImages = new HashMap<String, File>();
			inlineImages.put(tempFile.getName(), tempFile);
			sendEmail(recipientEmail, subject, constructOtpEmailBody(otp, tempFile), inlineImages, null);
		} catch (Exception e) {
			logger.error("sendOtpEmail : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		finally {
			CommonUtil.deleteDirectoryOrFile(tempFile);
		}

	}
	
	@Override
	public void sendPOSEmail(String posId, String subtotal, long createdTime, String paymentMode, String recipientEmail, String fname, String lname,
			String origin, File invoiceDoc) {
		File tempFile = null;
		try {
			String subject = " Purchase Information ";
			tempFile = File.createTempFile(CommonUtil.Icon_name, CommonUtil.Png_Extension);
			InputStream is = baseService.getTenantInfo().getTenantDetail().fetchTenantLogoBlob().getBinaryStream();
			FileUtils.copyInputStreamToFile(is, tempFile);
			Map<String, File> inlineImages = new HashMap<String, File>();
			inlineImages.put(tempFile.getName(), tempFile);
			SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATETIMEFORMAT_1);
	        sdf.setTimeZone(TimeZone.getTimeZone(Constants.Timezone_IST));
			String body = constructPOSEmailBody(tempFile, posId, subtotal, sdf.format(new Date(createdTime)), paymentMode);
			//send email in separate thread
			Runnable emailRunnable = new EmailThread(baseService.getTenantInfo().getUniqueName(),
					baseService.getTenantInfo().getTenantID(),
					baseService.getTenantInfo().getTenantDetail().getBusinessEmail(),
					baseService.getTenantInfo().getTenantDetail().getBusinessEmailPassword(),
					Arrays.asList(recipientEmail), subject, body, inlineImages, invoiceDoc != null ? Arrays.asList(invoiceDoc) : null);
			new Thread(emailRunnable).start();
		}
		catch (Exception e) {
			logger.error("sendOnboardingEmail : Failed to generate Email Body - Exception - " + e.getMessage());
		}
	}
	
	public String constructPOSEmailBody(File logo, String posId, String subtotal, String createdTime, String paymentMode ) {
		try {
			Template template = freeMarkerConfig.getTemplate(EmailConstants.orderStatusTemplate);
			Map<String, Object> model = new HashMap<>();
			model.put(EmailConstants.Key_orderId, posId);
			model.put(EmailConstants.Key_orderStatus, "POS");
			model.put(EmailConstants.Key_orderSubTotal, subtotal);
			model.put(EmailConstants.Key_orderPaymentMode, paymentMode);
			model.put(EmailConstants.Key_orderTime, createdTime);
			model.put(EmailConstants.Key_tenantName, baseService.getTenantInfo().getUniqueName());
			model.put(EmailConstants.Key_tenantLogo, "\"cid:" + logo.getName() + "\"");
			model.put(EmailConstants.Key_tenantStreet, baseService.getTenantInfo().getTenantDetail().getTenantStreet());
			model.put(EmailConstants.Key_tenantCity, baseService.getTenantInfo().getTenantDetail().getTenantCity());
			model.put(EmailConstants.Key_tenantPin, baseService.getTenantInfo().getTenantDetail().getTenantPin());
			model.put(EmailConstants.Key_tenantContact, baseService.getTenantInfo().getTenantDetail().getTenantContact());
			return FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
		} catch (Exception e) {
			logger.error("constructOtpEmailBody : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		return null;
	}
	
	@Override
	public void sendOrderStatusEmail(String orderId, String orderStatus, String subtotal, long createdTime, String paymentMode, String recipientEmail, String fname, String lname,
			String origin, Blob recieptAttachment) {
		try {
			String subject = " Order Information (STATUS:" + orderStatus.toUpperCase() + ")";
			File tempFile = File.createTempFile(CommonUtil.Icon_name, CommonUtil.Png_Extension);
			InputStream is = baseService.getTenantInfo().getTenantDetail().fetchTenantLogoBlob().getBinaryStream();
			FileUtils.copyInputStreamToFile(is, tempFile);
			Map<String, File> inlineImages = new HashMap<String, File>();
			inlineImages.put(tempFile.getName(), tempFile);
			SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATETIMEFORMAT_1);
	        sdf.setTimeZone(TimeZone.getTimeZone(Constants.Timezone_IST));
			String body = constructOrderStatusEmailBody(tempFile, orderId, subtotal, sdf.format(new Date(createdTime)), paymentMode, orderStatus);
			File invoiceDoc = null;
			if(recieptAttachment != null) {
				invoiceDoc = File.createTempFile(CommonUtil.Invoice_Name, CommonUtil.Document_Extention);
				byte[] bytes = recieptAttachment.getBytes(1, (int) recieptAttachment.length());
				is = new ByteArrayInputStream(bytes);
				FileUtils.copyInputStreamToFile(is, invoiceDoc);
			}
			//send email in separate thread
			Runnable emailRunnable = new EmailThread(baseService.getTenantInfo().getUniqueName(),
					baseService.getTenantInfo().getTenantID(),
					baseService.getTenantInfo().getTenantDetail().getBusinessEmail(),
					baseService.getTenantInfo().getTenantDetail().getBusinessEmailPassword(),
					Arrays.asList(recipientEmail), subject, body, inlineImages, invoiceDoc != null ? Arrays.asList(invoiceDoc) : null);
			new Thread(emailRunnable).start();
		}
		catch (Exception e) {
			logger.error("sendOnboardingEmail : Failed to generate Email Body - Exception - " + e.getMessage());
		}
	}
	
	public String constructOrderStatusEmailBody(File logo, String posId, String subtotal, String createdTime, String paymentMode, String orderStatus ) {
		try {
			Template template = freeMarkerConfig.getTemplate(EmailConstants.orderStatusTemplate);
			Map<String, Object> model = new HashMap<>();
			model.put(EmailConstants.Key_orderId, posId);
			model.put(EmailConstants.Key_orderStatus, orderStatus);
			model.put(EmailConstants.Key_orderSubTotal, subtotal);
			model.put(EmailConstants.Key_orderPaymentMode, paymentMode);
			model.put(EmailConstants.Key_orderTime, createdTime);
			model.put(EmailConstants.Key_tenantName, baseService.getTenantInfo().getUniqueName());
			model.put(EmailConstants.Key_tenantLogo, "\"cid:" + logo.getName() + "\"");
			model.put(EmailConstants.Key_tenantStreet, baseService.getTenantInfo().getTenantDetail().getTenantStreet());
			model.put(EmailConstants.Key_tenantCity, baseService.getTenantInfo().getTenantDetail().getTenantCity());
			model.put(EmailConstants.Key_tenantPin, baseService.getTenantInfo().getTenantDetail().getTenantPin());
			model.put(EmailConstants.Key_tenantContact, baseService.getTenantInfo().getTenantDetail().getTenantContact());
			return FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
		} catch (Exception e) {
			logger.error("constructOtpEmailBody : Failed to generate Email Body - Exception - " + e.getMessage());
		}
		return null;
	}
	
	
}
