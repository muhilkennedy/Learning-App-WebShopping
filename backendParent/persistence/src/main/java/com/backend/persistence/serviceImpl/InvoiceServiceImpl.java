package com.backend.persistence.serviceImpl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.FileUtil;
import com.backend.core.entity.InvoiceTemplate;
import com.backend.core.repository.InvoiceRepository;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.entity.OrderDetails;
import com.backend.persistence.entity.OrderInvoice;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.entity.Product;
import com.backend.persistence.repository.OrderInvoiceRepository;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.InvoiceService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService{
	
	private static final String Key_CustomerName = "#CustomerName";
	private static final String Key_CustomerStreet = "#CustomerStreet";
	private static final String Key_CustomerCity = "#CustomerCity";
	private static final String Key_CustomerPin = "#CustomerPin";
	private static final String Key_CustomerMobile = "#CustomerMobile";
	private static final String Key_CustomerEmail = "#CustomerEmail";
	private static final String Key_OrderId = "#InvoiceNum";
	private static final String Key_OrderDate = "#InvoiceDate";
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Autowired
	private OrderInvoiceRepository orderInvoiceRepo;
	
	@Autowired
	private CustomerInfoService customerService;
	
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
	
	@Override
	public void createOrderInvoice(Orders order) throws Exception{
		OrderInvoice invoice = new OrderInvoice();
		invoice.setDocument(generateInvoice(order));
		invoice.setOrderId(order);
		invoice.setTenant(baseService.getTenantInfo());
		orderInvoiceRepo.save(invoice);
	}
	
	private Blob generateInvoice(Orders order) throws Exception {
		String g = baseService.getTenantInfo().getTenantID();
		InvoiceTemplate currentTemplate = invoiceRepository.findInvoiceTemplateForTenant(baseService.getTenantInfo());
		InputStream is = currentTemplate.getDocument().getBinaryStream();
		XWPFDocument poiDocx = new XWPFDocument(is);
		// generate map for all prop values.
		// Adress needs to be passed explicitly in future to handle multiple address.
		Map<String, String> map = generateInvoiceFieldsMap(order);
		// replace props in table.
		XWPFTable productTable = null;
		List<XWPFTable> tables = poiDocx.getTables();
		for (XWPFTable table : tables) {
			scanAndReplaceValueInTable(table, map);
			if(table.getText().contains("QTY")) {
				productTable = table;
			}
		}
		if(productTable == null) {
			throw new Exception("Cannot able to find Product table!");
		}
		MathContext mc = new MathContext(2);
		BigDecimal subTotal = new BigDecimal(0);
		BigDecimal totalDiscount = new BigDecimal(0);
		List<OrderDetails> items = order.getOrderDetails();
		for(OrderDetails item: items) {
			Product product = item.getProduct();
			XWPFTableRow newRow = productTable.createRow();
			newRow.getCell(0).setText(product.getProductName());
			newRow.getCell(1).setText(String.valueOf(item.getQuantity()));
			newRow.getCell(2).setText(product.getCost().toString());
			newRow.getCell(3).setText(product.getOffer().toString());
			BigDecimal total = new BigDecimal(0);
			if (product.getOffer().compareTo(new BigDecimal(0)) > 0) {
				BigDecimal discountedPrice = product.getCost().multiply(product.getOffer()).divide(new BigDecimal(100));
				discountedPrice = product.getCost().subtract(discountedPrice);
				total = discountedPrice.abs().multiply(new BigDecimal(item.getQuantity())).setScale(2, RoundingMode.CEILING);
				totalDiscount = totalDiscount.add(product.getCost().multiply(new BigDecimal(item.getQuantity()))).subtract(total);
			}
			else {
				total = product.getCost().multiply(new BigDecimal(item.getQuantity())).setScale(2, RoundingMode.CEILING);
			}
			subTotal = subTotal.add(total);
			newRow.getCell(4).setText(total.toString());
		}
		//inserting dummy row for clarity.
		productTable.createRow();
		//calculate sub-total and manipulate balance due.
		XWPFTableRow subTotalRow = productTable.createRow();
		subTotalRow.getCell(1).setText("Money Saved");
		subTotalRow.getCell(2).setText(totalDiscount.setScale(2, RoundingMode.CEILING).toString() + CommonUtil.Symbol_INR);
		subTotalRow.getCell(3).setText("SUB-TOTAL");
		subTotalRow.getCell(4).setText(subTotal.setScale(2, RoundingMode.CEILING).toString());
		// final row
		XWPFTableRow finalRow = productTable.createRow();
		finalRow.getCell(1).setText("Coupon Applied");
		finalRow.getCell(2).setText(order.getCouponDiscount() + CommonUtil.Symbol_PERCENT);
		finalRow.getCell(3).setText("AMOUNT-PAYABLE");
		finalRow.getCell(4).setText(order.getSubTotal().setScale(2, RoundingMode.CEILING).toString() + CommonUtil.Symbol_INR);
		//genearte file blob
		File tempFile = File.createTempFile("Invoice-"+order.getOrderId(), CommonUtil.Document_Extention); 
		poiDocx.write(new FileOutputStream(tempFile));
		Blob blob = new SerialBlob(FileUtils.readFileToByteArray(tempFile));
		//flush File
		CommonUtil.deleteDirectoryOrFile(tempFile);
		return blob;
	}
	
	private Map<String, String> generateInvoiceFieldsMap(Orders order) {
		CustomerInfo user = (CustomerInfo) baseService.getUserInfo();
		user = customerService.getCustomerByEmail(user.getEmailId());
		Map<String, String> map = new HashMap<>();
		map.put(Key_CustomerName, user.getFirstName().toUpperCase() + " " + user.getLastName().toUpperCase());
		map.put(Key_CustomerStreet, user.getCustomerAddress().get(0).getStreet());
		map.put(Key_CustomerCity, user.getCustomerAddress().get(0).getCity());
		map.put(Key_CustomerPin, user.getCustomerAddress().get(0).getPincode());
		try {
			map.put(Key_CustomerMobile, "Contact : " + user.getMobile());
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put(Key_CustomerEmail, "Email-Id : " + user.getEmailId());
		map.put(Key_OrderId, "Order-" + order.getOrderId());
		String pattern = "MM-dd-yyyy HH:mm";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		simpleDateFormat.setTimeZone(TimeZone.getTimeZone("IST"));
		String date = simpleDateFormat.format(new Date());
		map.put(Key_OrderDate, date);
		return map;
	}
	
	private static void scanAndReplaceValueInTable(XWPFTable table, Map<String, String> map) {
		for (XWPFTableRow row : table.getRows()) {
			for (XWPFTableCell cell : row.getTableCells()) {
				String cellContent = cell.getText();
				if (map.containsKey(cellContent)) {
					cell.removeParagraph(0);
					cell.setText(map.get(cellContent));
				}
			}
		}
	}

}
