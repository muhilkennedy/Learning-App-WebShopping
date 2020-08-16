package com.backend.commons.util;

import java.io.File;

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

}
