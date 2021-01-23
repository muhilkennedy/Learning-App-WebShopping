package com.backend.persistence.service;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import com.backend.core.entity.InvoiceTemplate;
import com.backend.persistence.entity.OrderInvoice;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.helper.POSData;

public interface InvoiceService {

	InvoiceTemplate getInvoiceTemplateForTenant();

	List<InvoiceTemplate> getAllInvoiceTemplatesForTenant();

	void save(InvoiceTemplate template);

	File getInvoicePDFDocument(InvoiceTemplate invoice) throws Exception;

	File getActiveTemplateAsPDF() throws Exception;

	File getActiveTemplateDocument() throws IOException, SQLException;

	OrderInvoice getInvoiceByOrder(Orders order);

	File generatePOSInvoice(POSData posData) throws Exception;

	File getPosPDFDocument(InvoiceTemplate invoice) throws Exception;

	File getActivePosTemplateDocument() throws IOException, SQLException;

	File getActivePosTemplateAsPDF() throws Exception;

	InvoiceTemplate createTemplate(byte[] bytes, byte[] posBytes) throws SerialException, SQLException;

	OrderInvoice createOrderInvoice(Orders order) throws Exception;

}
