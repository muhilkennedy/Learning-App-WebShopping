package com.backend.commons.service;

import java.io.File;
import java.util.Map;

import com.backend.commons.messages.EmailPOJO;

public interface EmailService {

	void sendEmail(String recipientEmail, String subject, String body, Map<String, File> inlineImages,
			File attachments) throws Exception;

	void sendOnboardingEmail(String recipientEmail, String fname, String lname, Long empId, String password,
			String origin);

	void sendOtpEmail(String recipientEmail, String otp);

	void sendOrderStatusEmail(String orderId, String orderStatus, String subtotal, long createdTime, String paymentMode,
			String recipientEmail, String fname, String lname, String origin, java.sql.Blob recieptAttachment);

	void sendPOSEmail(String posId, String subtotal, long createdTime, String paymentMode, String recipientEmail,
			String fname, String lname, String origin, File invoice);

	void sendContactEmail(EmailPOJO email) throws Exception;

	void sendOrderAlertMailToAdmin() throws Exception;

	void sendPOSEmailUpdate(String posId, String subtotal, long createdTime, String paymentMode, String recipientEmail,
			String fname, String lname, String origin, File invoiceDoc);

}
