package com.backend.persistence.serviceImpl;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.service.EmailService;
import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.core.util.DBUtil;
import com.backend.core.util.DashboardStatusUtil;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.dao.PosDao;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.entity.Product;
import com.backend.persistence.helper.POSData;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.InvoiceService;
import com.backend.persistence.service.POSService;
import com.backend.persistence.service.ProductNotificationService;
import com.backend.persistence.service.ProductService;

/**
 * @author Muhil
 *
 */
@Service
public class POSServiceImpl implements POSService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private PosDao posDao;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CustomerInfoService customerService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private InvoiceService invoiceService;
	
	@Autowired
	private ProductNotificationService productNotification;
	
	@Override
	public String createPOS(POSData data) throws Exception {
		data.setTimeCreated(CommonUtil.convertToUTC(data.getTimeCreated()));
		JSONObject json = new JSONObject(data);
		json.put(TenantUtil.Key_TenantId, baseService.getTenantInfo().getTenantID());
		String posKey = posDao.getPOSKEY();
		json.put(DBUtil.Key_PrimaryKey, posKey);
		json.put(POSData.Key_CreatedBy, ((EmployeeInfo)baseService.getUserInfo()).getFirstName());
		json.put(POSData.Key_CreatedById, ((EmployeeInfo)baseService.getUserInfo()).getEmployeeId());
		posDao.createPOS(json);
		data.getPosProduct().stream().forEach(product -> {
			Product actualProduct = productService.getProductById(product.getItemID());
			if (actualProduct != null) {
				actualProduct.setQuantityInStock(actualProduct.getQuantityInStock() - product.getQuantity());
				productService.save(actualProduct);
				if (actualProduct.getQuantityInStock() < 1) {
					productNotification.createNotification(actualProduct.getProductName() + " Ran Out of Stock !",
							actualProduct.getProductId(), 0L, null);
				}
				else if (actualProduct.getQuantityInStock() <= 3) {
					productNotification.createNotification(actualProduct.getProductName() + " Running Out of Stock ! ("
							+ actualProduct.getQuantityInStock() + ")", actualProduct.getProductId(), 0L, null);
				}
			}
		});
		DashboardStatusUtil.incrementPosCount(baseService.getTenantInfo());
		if(CommonUtil.isValidStringParam(data.getMobile())) {
			CustomerInfo customer = customerService.getCustomerByMobile(data.getMobile());
			if(customer != null) {
				customerService.updateLoyalityPointByCustomerMobile(data.getMobile(), data.getSubTotal());
				emailService.sendPOSEmail(json.getString(DBUtil.Key_PrimaryKey), data.getSubTotal(), data.getTimeCreated(), data.getPaymentMode(), 
										customer.getEmailId(), customer.getFirstName(), customer.getLastName(), baseService.getOrigin(), getPOSInvoice(json.getString(DBUtil.Key_PrimaryKey)));
			}
		}
		return posKey;
	}
	
	@Override
	public List<POSData> getPOSDATA (String mobile) throws Exception{
		return posDao.getPOS(mobile, baseService.getTenantInfo().getTenantID());
	}
	
	@Override
	public List<POSData> getPOSDATAForCustomer () throws Exception{
		String mobile = ((CustomerInfo)baseService.getUserInfo()).getMobile();
		if(mobile != null) {
			return getPOSDATA(mobile);
		}
		return null;
	}
	
	@Override
	public POSData getPOSDATAById(String id) throws Exception {
		return posDao.getPOSById(id, baseService.getTenantInfo().getTenantID());
	}
	
	@Override
	public List<POSData> getPOSDATA (String limit, String offset, String condition, long date) throws Exception{
		if(CommonUtil.isValidStringParam(condition) && date > 0L) {
			return posDao.getPOS(baseService.getTenantInfo().getTenantID(), limit, offset, condition, date);
		}
		return posDao.getPOS(baseService.getTenantInfo().getTenantID(), limit, offset);
	}
	
	@Override
	public int getPOSDATACount (String condition, long date) throws Exception{
		if(CommonUtil.isValidStringParam(condition) && date > 0L) {
			return posDao.getPOSCount(baseService.getTenantInfo().getTenantID(), condition, date);
		}
		return posDao.getPOSCount(baseService.getTenantInfo().getTenantID());
	}
	
	@Override
	public Map<String, BigDecimal> posWeeklyReport() throws Exception{
		return posDao.getPosWeeklyTotal(baseService.getTenantInfo().getTenantID());
	}
	
	@Override
	public File getPOSInvoice(String id) throws Exception {
		POSData posData = getPOSDATAById(id);
		if(posData != null ) {
			return invoiceService.generatePOSInvoice(posData);
		}
		return null;
	}
	
	@Override
	public File getPOSInvoiceAsOnlinePdf(String id) throws Exception {
		POSData posData = getPOSDATAById(id);
		if(posData != null ) {
			return invoiceService.getPOSInvoiceAsOnlinePdf(posData);
		}
		return null;
	}


}
