package com.backend.commons.service;

import java.io.File;

public interface EmailService {

	void sendEmail(String recipientEmail, String subject, String body, File attachment);

	String constructOnboardEmailBody(String fname, String lname, int empId, String password, String origin);

}
