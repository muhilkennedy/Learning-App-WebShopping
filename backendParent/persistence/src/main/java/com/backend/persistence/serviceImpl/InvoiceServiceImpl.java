package com.backend.persistence.serviceImpl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.commons.util.FileUtil;
import com.backend.core.entity.InvoiceTemplate;
import com.backend.core.entity.Tenant;
import com.backend.core.repository.InvoiceRepository;
import com.backend.core.service.BaseService;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.entity.Coupons;
import com.backend.persistence.entity.CustomerAddress;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.entity.OrderDetails;
import com.backend.persistence.entity.OrderInvoice;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.entity.Product;
import com.backend.persistence.helper.POSData;
import com.backend.persistence.helper.POSData.PosProduct;
import com.backend.persistence.repository.OrderInvoiceRepository;
import com.backend.persistence.service.CouponsService;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.InvoiceService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService{
	
	private static final String Key_CustomerName = "CustomerName";
	private static final String Key_CustomerStreet = "CustomerStreet";
	private static final String Key_CustomerCity = "CustomerCity";
	private static final String Key_CustomerPin = "CustomerPin";
	private static final String Key_CustomerMobile = "CustomerMobile";
	private static final String Key_CustomerEmail = "CustomerEmail";
	private static final String Key_OrderId = "#InvoiceNum";
	private static final String Key_OrderDate = "#InvoiceDate";
	
	private static final String Key_PosId = "PosId";
	private static final String Key_SubTotal = "SubTotal";
	private static final String Key_ActTotal = "ActTotal";
	private static final String Key_PosDate = "PosDate";
	private static final String Key_Discount = "Discount";
	private static final String Key_PaymentMode = "PaymentMode";
	private static final String Key_TotalQty = "totalQty";
	private static final String Key_EmpName = "EmpName";
	private static final String Key_TenantName = "TenantName";
	private static final String Key_TenantMobile = "TenantMobile";
	private static final String Key_TenantCity = "TenantCity";
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Autowired
	private OrderInvoiceRepository orderInvoiceRepo;
	
	@Autowired
	private CustomerInfoService customerService;
	
	@Autowired
	private CouponsService couponService;
	
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
	public InvoiceTemplate createTemplate(byte[] bytes, byte[] posBytes) throws SerialException, SQLException {
		InvoiceTemplate newTemplate = new InvoiceTemplate();
		InvoiceTemplate currentTemplate = getInvoiceTemplateForTenant();
		if(currentTemplate != null) {
			currentTemplate.setActive(false);
			newTemplate.setDocument(currentTemplate.getDocument());
			newTemplate.setPosDocument(currentTemplate.getPosDocument());
			save(currentTemplate);
		}
		newTemplate.setActive(true);
		newTemplate.setTenant(baseService.getTenantInfo());
		if(bytes != null) {
			newTemplate.setDocument(new SerialBlob(bytes));
		}
		if(posBytes != null) {
			newTemplate.setPosDocument(new SerialBlob(posBytes));
		}
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
	public File getPosPDFDocument(InvoiceTemplate invoice) throws Exception{
		InputStream is = invoice.getPosDocument().getBinaryStream();
		File tempDocxFile = File.createTempFile("Pos-"+invoice.getInvoiceId()+"DOC", ".docx");
		File tempPdfFile = File.createTempFile("Pos-"+invoice.getInvoiceId()+"PDF", ".pdf");
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
	public File getActivePosTemplateAsPDF() throws Exception {
		InvoiceTemplate template = getInvoiceTemplateForTenant();
		if(template == null) {
			return null;
		}
		return getPosPDFDocument(template);
	}
	
	@Override
	public File getActivePosTemplateDocument() throws IOException, SQLException {
		InvoiceTemplate template = getInvoiceTemplateForTenant();
		if(template == null) {
			return null;
		}
		File tempDocxFile = File.createTempFile("Pos-"+template.getInvoiceId()+"DOC", ".docx");
		InputStream is = template.getPosDocument().getBinaryStream();
		FileUtils.copyInputStreamToFile(is, tempDocxFile);
		return tempDocxFile;
	}
	
	@Override
	public OrderInvoice getInvoiceByOrder(Orders order) {
		return orderInvoiceRepo.findOrdersByOrderId(baseService.getTenantInfo(), order);
	}
	
	@Override
	public OrderInvoice createOrderInvoice(Orders order) throws Exception{
		OrderInvoice invoice = new OrderInvoice();
		invoice.setDocument(generateInvoice(order));
		invoice.setOrderId(order);
		invoice.setTenant(baseService.getTenantInfo());
		orderInvoiceRepo.saveAndFlush(invoice);
		return invoice;
	}
	
	private Blob generateInvoice(Orders order) throws Exception {
		InvoiceTemplate currentTemplate = invoiceRepository.findInvoiceTemplateForTenant(baseService.getTenantInfo());
		InputStream is = currentTemplate.getDocument().getBinaryStream();
		XWPFDocument poiDocx = new XWPFDocument(is);
		// generate map for all prop values.
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
		BigDecimal subTotal = new BigDecimal(0);
		BigDecimal totalDiscount = new BigDecimal(0);
		List<OrderDetails> items = order.getOrderDetails();
		for(OrderDetails item: items) {
			Product product = item.getProduct();
			XWPFTableRow newRow = productTable.createRow();
			newRow.getCell(0).setText(product.getProductName());
			newRow.getCell(1).setText(String.valueOf(item.getQuantity()));
			newRow.getCell(2).setText(product.getCost().toString());
			newRow.getCell(3).setText(product.getOffer().setScale(0, RoundingMode.CEILING).toString()+"%");
			newRow.getCell(4).setText(product.getSellingCost().toString());
			BigDecimal total = new BigDecimal(0);
			if (product.getOffer().compareTo(new BigDecimal(0)) > 0) {
				BigDecimal singleOffer = product.getCost().subtract(product.getSellingCost());
				totalDiscount = totalDiscount.add(singleOffer).multiply(new BigDecimal(item.getQuantity()));
			}
			total = product.getSellingCost().multiply(new BigDecimal(item.getQuantity())).setScale(2, RoundingMode.CEILING);
			subTotal = subTotal.add(total);
			newRow.getCell(5).setText(total.toString());
		}
		Coupons coupon = null;
		if (order.isCouponapplied()) {
			coupon = couponService.findCouponById(order.getCouponId());
			BigDecimal couponAmount = subTotal.multiply(new BigDecimal(order.getCouponDiscount()))
					.divide(new BigDecimal(100));
			if (couponAmount.compareTo(new BigDecimal(coupon.getMaxDiscountLimit())) > 0) {
				totalDiscount = totalDiscount.add(new BigDecimal(coupon.getMaxDiscountLimit()));
			} else {
				totalDiscount = totalDiscount.add(couponAmount);
			}
		}
		//inserting dummy row for clarity.
		productTable.createRow();
		//calculate sub-total and manipulate balance due.
		XWPFTableRow subTotalRow = productTable.createRow();
		subTotalRow.getCell(2).setText("Money Saved");
		subTotalRow.getCell(3).setText(totalDiscount.setScale(2, RoundingMode.CEILING).toString() + CommonUtil.Symbol_INR);
		subTotalRow.getCell(4).setText("SUB-TOTAL");
		subTotalRow.getCell(5).setText(subTotal.setScale(2, RoundingMode.CEILING).toString());
		// final row
		XWPFTableRow finalRow = productTable.createRow();
		finalRow.getCell(2).setText("Coupon Applied");
		finalRow.getCell(3).setText(order.getCouponDiscount() + CommonUtil.Symbol_PERCENT + getMaxCouponLimit(coupon) );
		finalRow.getCell(4).setText("Delivery Charge");
		finalRow.getCell(5).setText((order.getDeliveryCharge() == 0)? "FREE" : (order.getDeliveryCharge() + CommonUtil.Symbol_INR));
		XWPFTableRow payableRow = productTable.createRow();
		payableRow.getCell(4).setText("AMOUNT-PAYABLE");
		payableRow.getCell(5).setText(order.getSubTotal().setScale(2, RoundingMode.CEILING).toString() + CommonUtil.Symbol_INR);
		//genearte file blob
		File tempFile = File.createTempFile("Invoice-"+order.getOrderId(), CommonUtil.Document_Extention); 
		poiDocx.write(new FileOutputStream(tempFile));
		Blob blob = new SerialBlob(FileUtils.readFileToByteArray(tempFile));
		//flush File
		CommonUtil.deleteDirectoryOrFile(tempFile);
		IOUtils.closeQuietly(is);
		return blob;
	}
	
	private Map<String, String> generateInvoiceFieldsMap(Orders order) {
		CustomerInfo user = (CustomerInfo) baseService.getUserInfo();
		user = customerService.getCustomerByEmail(user.getEmailId());
		Map<String, String> map = new HashMap<>();
		map.put(Key_CustomerName, user.getFirstName().toUpperCase() + " " + user.getLastName().toUpperCase());
		List<CustomerAddress> addresses = user.getCustomerAddress();
		CustomerAddress deliveryAddress = null;
		for(CustomerAddress address : addresses) {
			long orderAddressId = order.getCustomerAddressId();
			long actualAddressId = address.getAddressId();
			if (orderAddressId == actualAddressId) {
				deliveryAddress = address;
			}
		}
		if(deliveryAddress != null) {
			map.put(Key_CustomerStreet, deliveryAddress.getStreet());
			map.put(Key_CustomerCity, deliveryAddress.getCity());
			map.put(Key_CustomerPin, deliveryAddress.getPincode());
			map.put(Key_CustomerMobile, deliveryAddress.getMobileContact());
		}
		map.put(Key_CustomerEmail, user.getEmailId());
		map.put(Key_OrderId, "Order-" + order.getOrderId());
		String pattern = "dd-MM-yyyy HH:mm";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		simpleDateFormat.setTimeZone(TimeZone.getTimeZone("IST"));
		String date = simpleDateFormat.format(new Date());
		map.put(Key_OrderDate, date);
		return map;
	}
	
	private String getMaxCouponLimit(Coupons coupon) {
		if (coupon != null) {
			return " (Max-" + coupon.getMaxDiscountLimit() + CommonUtil.Symbol_INR + ")";
		}
		return "";
	}
	
	private static void scanAndReplaceValueInTable(XWPFTable table, Map<String, String> map) {
		for (XWPFTableRow row : table.getRows()) {
			for (XWPFTableCell cell : row.getTableCells()) {
				String cellContent = cell.getText();
				for (XWPFParagraph p : cell.getParagraphs()) {
					for (XWPFRun r : p.getRuns()) {
						String text = r.getText(0);
						if (text != null && map.containsKey(cellContent)) {
							text = text.replace(cellContent, map.get(cellContent));
							r.setText(text, 0);
						}
					}
				}
			}
		}
	}

	
	@Override
	public File generatePOSInvoice(POSData posData) throws Exception {
		InvoiceTemplate currentTemplate = invoiceRepository.findInvoiceTemplateForTenant(baseService.getTenantInfo());
		InputStream is = currentTemplate.getPosDocument().getBinaryStream();
		XWPFDocument poiDocx = new XWPFDocument(is);
		// generate map for all prop values.
		Map<String, String> map = generatePOSInvoiceFieldsMap(posData);
		// replace props in table.
		XWPFTable productTable = null;
		List<XWPFTable> tables = poiDocx.getTables();
		for (XWPFTable table : tables) {
			scanAndReplaceValueInTable(table, map);
			if (table.getText().contains("QTY")) {
				productTable = table;
			}
		}
		if (productTable == null) {
			throw new Exception("Cannot able to find Product table!");
		}
		Float subTotal = 0F;
		Float totalDiscount = 0F;
		List<PosProduct> items = posData.getPosProduct();
		for (PosProduct item : items) {
			XWPFTableRow newRow = productTable.createRow();
			Float total = 0F;
			Float discountedPrice = 0F;
			if (item.getDiscount() > 0) {
				discountedPrice = item.getMrp() - item.getSellingCost();
				totalDiscount += discountedPrice*item.getQuantity();
			}
			total = item.getSellingCost() * item.getQuantity();
			
			// we have customized this code for 58mm printer(need to introduce a feature toggle for 80mm support).
			StringBuilder str = new StringBuilder(item.getItemName());
			String line = str.toString();
			if(str.length() > 7) {
				String part2 = str.subSequence(6, str.length()).toString();
				line = str.subSequence(0, 6).toString() + "\r\n" + part2.replace(" ", "");
			}
			
			XWPFRun run = newRow.getCell(0).addParagraph().createRun();
			run.setFontSize(8);
			run.setText(line);

			run = newRow.getCell(1).addParagraph().createRun();
			run.setFontSize(8);
			run.setText(String.format("%.0f", item.getMrp()));

			run = newRow.getCell(2).addParagraph().createRun();
			run.setFontSize(8);
			run.setText(String.format("%.1f", item.getSellingCost()));

			run = newRow.getCell(3).addParagraph().createRun();
			run.setFontSize(8);
			run.setText(String.valueOf(item.getQuantity()));

			run = newRow.getCell(4).addParagraph().createRun();
			run.setFontSize(8);
			run.setText(String.format("%.2f", total));

			subTotal += total;
		}
		map.clear();
		map.put(Key_Discount, String.format("%.2f", totalDiscount));
		for (XWPFTable table : tables) {
			scanAndReplaceValueInTable(table, map);
		}
		// genearte docx file and convert to pdf
		File tempFile = File.createTempFile("Invoice-" + posData.getPrimaryKey(), CommonUtil.Document_Extention);
		poiDocx.write(new FileOutputStream(tempFile));
		File pdfFile = FileUtil.convertDocToPDF(tempFile);
		// flush File
		CommonUtil.deleteDirectoryOrFile(tempFile);
		IOUtils.closeQuietly(is);
		return pdfFile;
	}

	private Map<String, String> generatePOSInvoiceFieldsMap(POSData posData) {
		Map<String, String> map = new HashMap<>();
		map.put(Key_EmpName, posData.getCreatedBy());
		Tenant tenant = TenantUtil.getTenantInfo(baseService.getTenantInfo().getTenantID());
		map.put(Key_TenantName, baseService.getTenantInfo().getUniqueName());
		map.put(Key_TenantCity, tenant.getTenantDetail().getTenantCity());
		map.put(Key_TenantMobile, tenant.getTenantDetail().getTenantContact());
		String pattern = "dd-MM-yyyy hh:mm a";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		simpleDateFormat.setTimeZone(TimeZone.getTimeZone("IST"));
		String date = simpleDateFormat.format(new Date());
		map.put(Key_PosDate, date);
		map.put(Key_PosId, posData.getPrimaryKey());
		map.put(Key_SubTotal, posData.getSubTotal());
		map.put(Key_ActTotal, String.format("%.2f", Float.parseFloat(posData.getActualSubTotal())));
		map.put(Key_PaymentMode, posData.getPaymentMode());
		map.put(Key_TotalQty, posData.getTotalQuantity());
		return map;
	}

}
