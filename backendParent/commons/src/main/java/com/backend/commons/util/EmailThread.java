package com.backend.commons.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.InternetHeaders;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.ws.rs.core.HttpHeaders;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import com.backend.core.util.DashboardStatusUtil;
import com.backend.core.util.TenantUtil;

public class EmailThread implements Runnable {
	
	private static Logger logger = LoggerFactory.getLogger(EmailThread.class);
	
	String tenantName;
	String tenantId;
	String businessEmail;
	String businessPassword;
	List<String> recipientEmail;
	String subject;
	String body;
	Map<String, File> inlineImages;
	List<File> attachments;

	public EmailThread() {}
	
	public EmailThread(String tenantName, String tenantId, String businessEmail, String businessPassword,
			List<String> recipientEmail, String subject, String body, Map<String, File> inlineImages,
			List<File> attachments) {
		this.tenantName = tenantName;
		this.tenantId = tenantId;
		this.businessEmail = businessEmail;
		this.businessPassword = businessPassword;
		this.recipientEmail = recipientEmail;
		this.subject = subject;
		this.body = body;
		this.inlineImages = inlineImages;
		this.attachments = attachments;
	}

	public void run() {
		try {
			List<File> newAttachments = new ArrayList<File>();
			for(File attachment: attachments) {
				if(attachment.getName().contains(CommonUtil.Invoice_Name)) {
					attachment = FileUtil.convertDocToPDF(attachment);
				}
				newAttachments.add(attachment);
			}
			attachments = newAttachments;
			sendEmail();
		} catch (Exception e) {
			logger.error("Error in Side Thread : " + e.getMessage());
		}
		finally {
			if(inlineImages != null) {
				for (Map.Entry<String,File> entry : inlineImages.entrySet()) {
					CommonUtil.deleteDirectoryOrFile(entry.getValue());
				}
			}
			if(attachments != null) {
				attachments.stream().forEach(attachment -> {
					CommonUtil.deleteDirectoryOrFile(attachment);
				});
			}
		}
	}

	/**
	 * @param tenantName
	 * @param tenantId
	 * @param businessEmail
	 * @param businessPassword
	 * @param recipientEmail
	 * @param subject
	 * @param body
	 * @param inlineImages
	 * @param attachments
	 * @throws Exception
	 */
	public void sendEmail() throws Exception {
		// Set system properties
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");

		// Make sure the used dev email must have Allow less secure apps option enabled.
		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(businessEmail, businessPassword);
			}
		});

		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(businessEmail));
			message.setSubject(tenantName + " : " + subject);
			Multipart multipartObject = new MimeMultipart();
			// Creating first MimeBodyPart object which contains body text.
			InternetHeaders headers = new InternetHeaders();
			headers.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE);
			BodyPart bodyText = new MimeBodyPart(headers, body.getBytes(StandardCharsets.UTF_8.name()));
			multipartObject.addBodyPart(bodyText);
			// Creating second MimeBodyPart which contains inline body images.
			if (inlineImages != null) {
				inlineImages.entrySet().parallelStream().forEach(image -> {
					BodyPart imagePart = new MimeBodyPart();
					try {
						imagePart.setHeader("Content-ID", "<" + image.getKey() + ">");
						imagePart.setDisposition(MimeBodyPart.INLINE);
						imagePart.setFileName(image.getKey());
						InputStream stream = new FileInputStream(image.getValue());
						DataSource fds = new ByteArrayDataSource(IOUtils.toByteArray(stream),
								MediaType.IMAGE_PNG_VALUE);
						imagePart.setDataHandler(new DataHandler(fds));
						multipartObject.addBodyPart(imagePart);
					} catch (MessagingException | IOException e) {
						logger.error("Exception while constructing Inline Images - " + e.getMessage());
					}

				});
			}
			// Creating third MimeBodyPart object which contains attachment.
			if (attachments != null && !attachments.isEmpty()) {
				attachments.parallelStream().filter(attachment -> attachment != null).forEach(attachment -> {
					try {
						BodyPart fileBodyPart = new MimeBodyPart();
						DataSource source = new FileDataSource(attachment);
						fileBodyPart.setDataHandler(new DataHandler(source));
						fileBodyPart.setFileName(attachment.getName());
						multipartObject.addBodyPart(fileBodyPart);
					} catch (Exception ex) {
						logger.error("Exception in adding Attachments - " + ex.getMessage());
					}

				});

			}
			// Attach body text and file attachment to the email.
			message.setContent(multipartObject, MediaType.MULTIPART_MIXED_VALUE);
			recipientEmail.stream().forEach(recipient -> {
				try {
					message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
					logger.debug("sendEmail :: Sending email to Recipient - " + recipient);
					Transport.send(message);
					logger.debug("sendEmail :: Email sent Successfully to Recipient - " + recipient);
					DashboardStatusUtil.incrementEmailCount(TenantUtil.getTenantInfo(tenantId));
				} catch (Exception ex) {
					logger.debug("sendEmail :: Error sending mail to Recipient - " + recipient);
				}
			});

		} catch (Exception e) {
			logger.error("sendEmail :: Sending email to Recipient - " + e);
		}
	}

}
