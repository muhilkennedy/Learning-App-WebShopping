package com.backend.commons.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.backend.commons.configuration.SpringSocialProperties;
import com.backend.core.service.BaseService;
import com.backend.core.util.ConfigUtil;
import com.backend.core.util.DashboardStatusUtil;

/**
 * @author muhil
 *
 */
@Service
public class EmailUtil {
	
	private static Logger logger = LoggerFactory.getLogger(EmailUtil.class);
	
	@Autowired
	private SpringSocialProperties props;
	
	@Autowired
	private ConfigUtil configUtil;
	
	@Autowired
	private BaseService baseService;
	
	
	public void sendEmail(String recipientEmail, String subject, String body, Map<String, File> inlineImages, File attachments) throws Exception {
		sendEmail(Arrays.asList(recipientEmail) , subject, body, inlineImages, Arrays.asList(attachments));
	}
	
	/**
	 * @param recipientEmail
	 * @param subject
	 * @param body text html part for formatting
	 * @param attachments file
	 */
	public void sendEmail(List<String> recipientEmail, String subject, String body, Map<String, File> inlineImages, List<File> attachments) throws Exception {
		if (configUtil.isProdMode() && props.getGmail().isEnableMailing()) {

			String emailId = baseService.getTenantInfo().getTenantDetail().getBusinessEmail();
			String password = baseService.getTenantInfo().getTenantDetail().getBusinessEmailPassword();
			
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
					return new PasswordAuthentication(emailId, password);
				}
			});

			try {
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress(emailId));
				message.setSubject(baseService.getTenantInfo().getUniqueName() + " : " + subject);
				Multipart multipartObject = new MimeMultipart();
				// Creating first MimeBodyPart object which contains body text.
				InternetHeaders headers = new InternetHeaders();
				headers.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE);				
				BodyPart bodyText = new MimeBodyPart(headers, body.getBytes(StandardCharsets.UTF_8.name()));
				multipartObject.addBodyPart(bodyText);
				// Creating second MimeBodyPart which contains inline body images.
				if(inlineImages != null) {
					inlineImages.entrySet().parallelStream().forEach(image -> {
						BodyPart imagePart = new MimeBodyPart();
						try {
							imagePart.setHeader("Content-ID", "<" + image.getKey() + ">");
							imagePart.setDisposition(MimeBodyPart.INLINE);
							imagePart.setFileName(image.getKey());
							InputStream stream = new FileInputStream(image.getValue());
							DataSource fds = new ByteArrayDataSource(IOUtils.toByteArray(stream), MediaType.IMAGE_PNG_VALUE);
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
						}
						catch(Exception ex) {
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
						DashboardStatusUtil.incrementEmailCount(baseService.getTenantInfo());
					} catch (Exception ex) {
						logger.debug("sendEmail :: Error sending mail to Recipient - " + recipient);
					}
				});

			} catch (Exception e) {
				logger.error("sendEmail :: Sending email to Recipient - " + e);
			}
		}
	}
	
}
