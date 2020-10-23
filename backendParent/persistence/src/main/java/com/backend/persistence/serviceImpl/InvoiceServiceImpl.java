package com.backend.persistence.serviceImpl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.docx4j.Docx4J;
import org.docx4j.convert.out.FOSettings;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.FileUtil;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.InvoiceTemplate;
import com.backend.persistence.repository.InvoiceRepository;
import com.backend.persistence.service.InvoiceService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService{
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Override
	public void save(InvoiceTemplate template) {
		invoiceRepository.save(template);
	}
	
	@Override
	public InvoiceTemplate getInvoiceTemplateForTenant() {
		return invoiceRepository.findInvoiceTemplateForTenant(baseService.getTenantInfo());
	}
	
	@Override
	public List<InvoiceTemplate> getAllInvoiceTemplatesForTenant(){
		return invoiceRepository.findAllInvoiceTemplates(baseService.getTenantInfo());
	}
	
	@Override
	public InvoiceTemplate createTemplate(byte[] bytes) throws SerialException, SQLException {
		InvoiceTemplate newTemplate = new InvoiceTemplate();
		InvoiceTemplate currentTemplate = getInvoiceTemplateForTenant();
		if(currentTemplate != null) {
			currentTemplate.setActive(false);
			save(currentTemplate);
		}
		newTemplate.setActive(true);
		newTemplate.setTenant(baseService.getTenantInfo());
		newTemplate.setDocument(new SerialBlob(bytes));
		save(newTemplate);
		return newTemplate;
	}
	
	@Override
	public File getInvoicePDFDocument(InvoiceTemplate invoice) throws Exception{
		InputStream is = invoice.getDocument().getBinaryStream();
		File tempDocxFile = File.createTempFile("Invoice-"+invoice.getInvoiceId()+"DOC", ".docx");
		File tempPdfFile = File.createTempFile("Invoice-"+invoice.getInvoiceId()+"PDF", ".pdf");
		FileUtils.copyInputStreamToFile(is, tempDocxFile);
		FileUtil.convertDocToPDF(tempDocxFile, tempPdfFile);
		//flush File
		CommonUtil.deleteDirectoryOrFile(tempDocxFile);
		return tempPdfFile;
	}
	
	@Override
	public File getActiveTemplateAsPDF() throws Exception {
		InvoiceTemplate template = getInvoiceTemplateForTenant();
		if(template == null) {
			return null;
		}
		return getInvoicePDFDocument(template);
	}
	
	@Override
	public File getActiveTemplateDocument() throws IOException, SQLException {
		InvoiceTemplate template = getInvoiceTemplateForTenant();
		if(template == null) {
			return null;
		}
		File tempDocxFile = File.createTempFile("Invoice-"+template.getInvoiceId()+"DOC", ".docx");
		InputStream is = template.getDocument().getBinaryStream();
		FileUtils.copyInputStreamToFile(is, tempDocxFile);
		return tempDocxFile;
	}

}
