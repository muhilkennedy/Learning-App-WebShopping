package com.backend.commons.service;

import java.io.File;
import java.util.Map;

public interface EmailService {

	void sendEmail(String recipientEmail, String subject, String body, Map<String, File> inlineImages,
			File attachments) throws Exception;

	void sendOnboardingEmail(String recipientEmail, String fname, String lname, int empId, String password,
			String origin);

	void sendOtpEmail(String recipientEmail, String otp);

}
