package com.backend.commons.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;

import org.docx4j.Docx4J;
import org.docx4j.convert.out.FOSettings;
import org.docx4j.fonts.IdentityPlusMapper;
import org.docx4j.fonts.Mapper;
import org.docx4j.fonts.PhysicalFont;
import org.docx4j.fonts.PhysicalFonts;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

/**
 * @author Muhil
 *
 */
public class FileUtil {
	
	private static Logger logger = LoggerFactory.getLogger(FileUtil.class);
	
	/**
	 * @param docFile
	 * @param pdfFile
	 * @throws Exception - Docx4jException
	 */
	public static void convertDocToPDF(File docFile, File pdfFile) throws Exception {
		WordprocessingMLPackage word = WordprocessingMLPackage.load(docFile);
		OutputStream os = new FileOutputStream(pdfFile);
		FOSettings fset = Docx4J.createFOSettings();
		Path tempPath = Files.createTempDirectory(null);
		fset.setImageDirPath(tempPath.toString());
		fset.setWmlPackage(word);
		Docx4J.toFO(fset, os, Docx4J.FLAG_EXPORT_PREFER_XSL);
		//flush Image Directory
		deleteDirectoryOrFile(tempPath.toFile());
	}
	
	public static File convertDocToPDF(File docFile) throws Exception {
		File pdfFile = File.createTempFile(CommonUtil.Invoice_Name, CommonUtil.PDF_Extension);
		WordprocessingMLPackage word = WordprocessingMLPackage.load(docFile);
		
		//need to take care of custom fonts (only tamil font is added for now)
		Mapper fontMapper = new IdentityPlusMapper();
		String fontFamily = "Arima Madurai";
		ClassPathResource classPathResource = new ClassPathResource("fonts/ArimaMadurai-Regular.ttf");
		URL simsunUrl = classPathResource.getURL();
		PhysicalFonts.addPhysicalFonts(fontFamily, simsunUrl);
		PhysicalFont simsunFont = PhysicalFonts.get(fontFamily);
		fontMapper.put(fontFamily, simsunFont);
		word.setFontMapper(fontMapper);
		
		OutputStream os = new FileOutputStream(pdfFile);
		FOSettings fset = Docx4J.createFOSettings();
		Path tempPath = Files.createTempDirectory(null);
		fset.setImageDirPath(tempPath.toString());
		fset.setWmlPackage(word);
		Docx4J.toFO(fset, os, Docx4J.FLAG_EXPORT_PREFER_XSL);
		//flush Image Directory
		deleteDirectoryOrFile(tempPath.toFile());
		return pdfFile;
	}
	
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
