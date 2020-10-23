package com.backend.persistence.service;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import com.backend.persistence.entity.InvoiceTemplate;

public interface InvoiceService {

	InvoiceTemplate getInvoiceTemplateForTenant();

	List<InvoiceTemplate> getAllInvoiceTemplatesForTenant();

	void save(InvoiceTemplate template);

	InvoiceTemplate createTemplate(byte[] bytes) throws SerialException, SQLException;

	File getInvoicePDFDocument(InvoiceTemplate invoice) throws Exception;

	File getActiveTemplateAsPDF() throws Exception;

	File getActiveTemplateDocument() throws IOException, SQLException;

}
