package com.backend.commons.util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.backend.core.util.Constants;

import io.micrometer.core.instrument.util.StringUtils;

public class CommonUtil {
	
	private static Logger logger = LoggerFactory.getLogger(CommonUtil.class);
	
	public static final String Key_Tenant = "Tenant";
	public static final boolean Key_active = true;
	public static final boolean Key_inactive = false;
	public static final String Key_userType = "USER_TYPE";
	public static final String Key_clientUser = "CLIENT";
	public static final String Key_employeeUser = "EMPLOYEE";
	public static final String Key_customerUser = "CUSTOMER";
	public static final String Key_googleUser = "GOOGLE";
	public static final String Key_facebookUser = "FACEBOOK";
	public static final String Key_internalUser = "INTERNAL";

	public static final int saltRounds = 5;
	private static final int randomCodeLength = 6;
	private static final int randomPasswordLength = 8;
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
	private static final String ALPHA_NUMERIC_SPECIAL_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz!@#$*";
	private static final String NUMERIC_STRING = "1234567890";
	
	public static final String Key_employeeOTP = "EmpOTP";
	public static final String Key_clientOTP = "clientOTP";

	public static final int Key_MaxPaginationLimit = 1000;
	
	public static final int Thumbnail_AspectWidth = 200;
	public static final int Thumbnail_AspectHeight = 200;
	public static final int Banner_AspectWidth = 1900;
	public static final int Banner_AspectHeight = 700;
	public static final int HomeImage_AspectWidth = 800;
	public static final int HomeImage_AspectHeight = 800;
	public static final String Thumbnail_Exension = "jpg";
	
	public static final String Symbol_INR = " ₹ ";
	public static final String Symbol_PERCENT = " % ";
	public static final String Document_Extention = ".docx";
	public static final String PDF_Extension = ".pdf";
	public static final String Png_Extension = ".png";
	public static final String Jpeg_Extension = ".jpeg";
	
	public static final String Invoice_Name = "Invoice";
	public static final String Icon_name = "icon";
	
	public static final List<String> template_Supported_Extentions = new ArrayList<String>() {
		private static final long serialVersionUID = 1L;
		{
			add(".doc");
			add(".docx");
		}
	};
	
	public static final List<String> images_Supported_Extentions = new ArrayList<String>() {
		private static final long serialVersionUID = 1L;
		{
			add(".jpg");
			add(".jpeg");
			add(".png");
		}
	};
	
	/**
	 * @return random password with pre-defined length and Alpha numeric characters.
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
	
	public static String generateRandomNumericCode() {
		StringBuilder builder = new StringBuilder();
		int count = randomCodeLength;
		while (count-- != 0) {
			int character = (int) (Math.random() * NUMERIC_STRING.length());
			builder.append(NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}
	
	/**
	 * @see This method needs to be called everytime after a temp file/Dir is
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
	
	// need to update aspect ratio later after ui dev for best fit.
	public static byte[] getProductImage(byte[] image) throws Exception {
		InputStream in = new ByteArrayInputStream(image);
		BufferedImage bImage = Scalr.resize(ImageIO.read(in), Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, HomeImage_AspectWidth,
				HomeImage_AspectHeight, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bImage, Thumbnail_Exension, baos);
		return baos.toByteArray();
	}
	
	/**
     * Resizes an image to a absolute width and height (the image may not be
     * proportional)
     * @param inputImagePath Path of the original image
     * @param outputImagePath Path to save the resized image
     * @param scaledWidth absolute width in pixels
     * @param scaledHeight absolute height in pixels
     * @throws IOException
     */
    public static byte[] resize(byte[] image, int scaledWidth, int scaledHeight)
            throws IOException {
    	ByteArrayInputStream bais = new ByteArrayInputStream(image);
        // reads input image
        BufferedImage inputImage = ImageIO.read(bais);
        // creates output image
        BufferedImage outputImage = new BufferedImage(scaledWidth,
                scaledHeight, inputImage.getType());
        // scales the input image to the output image
        Graphics2D g2d = outputImage.createGraphics();
        g2d.drawImage(inputImage, 0, 0, scaledWidth, scaledHeight, null);
        g2d.dispose();
        // writes to output file
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, "jpg", baos);
        return baos.toByteArray();
    }
	
	// compress the image bytes before storing it in the database
	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
		return outputStream.toByteArray();
	}

	// uncompress the image bytes before returning it to the angular application
	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();
	}
	
	/**
	 * @param parameter
	 * @return is valid input parameter
	 */
	public static boolean isValidStringParam(String param) {
		if (!StringUtils.isEmpty(param) && !param.equalsIgnoreCase("null") && !param.equalsIgnoreCase("undefined")) {
			return true;
		}
		return false;
	}
	
	public static boolean isValidDecimalParam(BigDecimal param) {
		if (param != null) {
			return true;
		}
		return false;
	}

	public static long convertToUTC(long time) {
		Instant instant = Instant.ofEpochMilli(time);
		ZoneId zoneId = ZoneId.of(Constants.Timezone_UTC);
		ZonedDateTime zdt = instant.atZone(zoneId);
		return zdt.toInstant().toEpochMilli();
	}
	
	public static long convertToIST(long time) {
		Instant instant = Instant.ofEpochMilli(time);
		ZoneId zoneId = ZoneId.of(Constants.Asia_Calcutta);
		ZonedDateTime zdt = instant.atZone(zoneId);
		return zdt.toInstant().toEpochMilli();
	}
}
