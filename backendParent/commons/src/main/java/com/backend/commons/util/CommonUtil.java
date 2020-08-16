package com.backend.commons.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonUtil {
	
	private static Logger logger = LoggerFactory.getLogger(CommonUtil.class);
	
	public static final String Key_Tenant = "Tenant";
	public static final boolean Key_active = true;
	public static final boolean Key_inactive = false;
	public static final String Key_userType = "USER_TYPE";
	public static final String Key_clientUser = "CLIENT";
	public static final String Key_employeeUser = "EMPLOYEE";
	public static final String Key_googleUser = "GOOGLE";
	public static final String Key_facebookUser = "FACEBOOK";
	public static final String Key_internalUser = "INTERNAL";

	public static final int saltRounds = 5;
	private static final int randomCodeLength = 6;
	private static final int randomPasswordLength = 20;
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
	private static final String ALPHA_NUMERIC_SPECIAL_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz!@#$%^&*()";
	
	public static final String Key_employeeOTP = "EmpOTP";
	public static final String Key_clientOTP = "clientOTP";
	
	public static final int Thumbnail_AspectWidth = 200;
	public static final int Thumbnail_AspectHeight = 200;
	public static final int Banner_AspectWidth = 1900;
	public static final int Banner_AspectHeight = 700;
	public static final int HomeImage_AspectWidth = 1200;
	public static final int HomeImage_AspectHeight = 900;
	public static final String Thumbnail_Exension = "jpg";
	
	/**
	 * @return randome password wiht pre-defined length and Alpha numeric characters.
	 */
	public static String generateRandomPassword() {
		StringBuilder builder = new StringBuilder();
		int count = randomPasswordLength;
		while (count-- != 0) {
			int character = (int) (Math.random() * ALPHA_NUMERIC_SPECIAL_STRING.length());
			builder.append(ALPHA_NUMERIC_SPECIAL_STRING.charAt(character));
		}
		return builder.toString();
	}
	
	public static String generateRandomCode() {
		StringBuilder builder = new StringBuilder();
		int count = randomCodeLength;
		while (count-- != 0) {
			int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}
	
	/**
	 * @see This methos needs to be called everytime after a temp file/Dir is
	 *      created in order keep the memory optimized.
	 * @param file to be deleted
	 * @return true if successfully removed.
	 */
	public static boolean deleteDirectoryOrFile(File dir) {
		if(dir != null) {
			if (dir.isDirectory()) {
				File[] children = dir.listFiles();
				for (int i = 0; i < children.length; i++) {
					boolean success = deleteDirectoryOrFile(children[i]);
					if (!success) {
						return false;
					}
				}
			}
			logger.info("Removing Dir - " + dir.getPath());
			return dir.delete();
		}
		return false;
	}
	

	/**
	 * @param originalImage
	 * @param targetWidth
	 * @param targetHeight
	 * @return resized Image byte[]
	 * @throws Exception
	 */
	public static byte[] getThumbnailImage(byte[] image) throws Exception {
		InputStream in = new ByteArrayInputStream(image);
		BufferedImage bImage = Scalr.resize(ImageIO.read(in), Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, Thumbnail_AspectWidth,
				Thumbnail_AspectHeight, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bImage, Thumbnail_Exension, baos);
		return baos.toByteArray();
	}
	
	public static byte[] getBannerImage(byte[] image) throws Exception {
		InputStream in = new ByteArrayInputStream(image);
		BufferedImage bImage = Scalr.resize(ImageIO.read(in), Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, Banner_AspectWidth,
				Banner_AspectHeight, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bImage, Thumbnail_Exension, baos);
		return baos.toByteArray();
	}
	
	public static byte[] getHomeImage(byte[] image) throws Exception {
		InputStream in = new ByteArrayInputStream(image);
		BufferedImage bImage = Scalr.resize(ImageIO.read(in), Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, HomeImage_AspectWidth,
				HomeImage_AspectHeight, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bImage, Thumbnail_Exension, baos);
		return baos.toByteArray();
	}

}
