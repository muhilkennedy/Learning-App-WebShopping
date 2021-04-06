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
import com.backend.persistence.helper.POSData.PosProduct;
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
		return createPOS(data, null);
	}
	
	@Override
	public String createPOS(POSData data, POSData previous) throws Exception {
		data.setTimeCreated(CommonUtil.convertToUTC(data.getTimeCreated()));
		JSONObject json = new JSONObject(data);
		json.put(TenantUtil.Key_TenantId, baseService.getTenantInfo().getTenantID());
		String posKey = posDao.getPOSKEY();
		json.put(DBUtil.Key_PrimaryKey, posKey);
		json.put(POSData.Key_CreatedBy, ((EmployeeInfo)baseService.getUserInfo()).getFirstName());
		json.put(POSData.Key_CreatedById, ((EmployeeInfo)baseService.getUserInfo()).getEmployeeId());
		posDao.createPOS(json);
		for (PosProduct product : data.getPosProduct()) {
			Product actualProduct = productService.getProductById(product.getItemID());
			if (actualProduct != null) {
				if(previous != null){
					List<PosProduct> oldProducts = previous.getPosProduct();
					//handle logic for inventory management
					boolean newItem = true;
					int i = 0;
					for (PosProduct oldProduct : oldProducts) {
						if(product.getItemID().equals(oldProduct.getItemID())) {
							//if quantity is decreased update inventory by adding back excess quantity
							if (oldProduct.getQuantity() > product.getQuantity()) {
								actualProduct.setQuantityInStock(actualProduct.getQuantityInStock()
										+ (oldProduct.getQuantity() - product.getQuantity()));
								productService.saveAndFlush(actualProduct);
							}
							//if quantity is increased update inventory by reducing newly added quantity
							else if (oldProduct.getQuantity() < product.getQuantity()){
								actualProduct.setQuantityInStock(actualProduct.getQuantityInStock()
										- (product.getQuantity() - oldProduct.getQuantity()));
								productService.saveAndFlush(actualProduct);
							}
							newItem = false;
							break;
						}
						i++;
					}
					if(newItem) {
						actualProduct.setQuantityInStock(actualProduct.getQuantityInStock() - product.getQuantity());
						productService.saveAndFlush(actualProduct);
					}
				}
				else {
					actualProduct.setQuantityInStock(actualProduct.getQuantityInStock() - product.getQuantity());
					productService.saveAndFlush(actualProduct);
				}
				if (actualProduct.getQuantityInStock() < 1) {
					productNotification.createNotification(actualProduct.getProductName() + " Ran Out of Stock !",
							actualProduct.getProductId(), 0L, null);
				}
				else if (actualProduct.getQuantityInStock() <= 3) {
					productNotification.createNotification(actualProduct.getProductName() + " Running Out of Stock ! ("
							+ actualProduct.getQuantityInStock() + ")", actualProduct.getProductId(), 0L, null);
				}
			}
		}
		//increment only for new pos
		if(previous == null) {
			DashboardStatusUtil.incrementPosCount(baseService.getTenantInfo());
		}
		if(CommonUtil.isValidStringParam(data.getMobile())) {
			CustomerInfo customer = customerService.getCustomerByMobile(data.getMobile());
			if(customer != null) {
				//calculate only for new pos
				if (previous == null) {
					customerService.updateLoyalityPointByCustomerMobile(data.getMobile(), data.getSubTotal());
					emailService.sendPOSEmail(json.getString(DBUtil.Key_PrimaryKey), data.getSubTotal(),
							data.getTimeCreated(), data.getPaymentMode(), customer.getEmailId(),
							customer.getFirstName(), customer.getLastName(), baseService.getOrigin(),
							getPOSInvoice(json.getString(DBUtil.Key_PrimaryKey)));
				} else {
					emailService.sendPOSEmailUpdate(json.getString(DBUtil.Key_PrimaryKey), data.getSubTotal(),
							data.getTimeCreated(), data.getPaymentMode(), customer.getEmailId(),
							customer.getFirstName(), customer.getLastName(), baseService.getOrigin(),
							getPOSInvoice(json.getString(DBUtil.Key_PrimaryKey)));
				}
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
	
	@Override
	public List<POSData> posProvisionedByEmployee(long empId) throws Exception {
		return posDao.getPOSProvisionedByEmployee(baseService.getTenantInfo().getTenantID(), empId);
	}
	
	private POSData getFirstPOSEntryForTenant() throws Exception {
		return posDao.getFirstPOS(baseService.getTenantInfo().getTenantID());
	}

	/**
	 *@return map of date and list (0)-count (1)-subtotal
	 */
	@Override
	public Map<String, List<String>> getPosDateWiseReport() throws Exception {
		POSData firstPos = getFirstPOSEntryForTenant();
		if(firstPos != null) {
			Map<String, List<String>> result = posDao.getPosFullReport(baseService.getTenantInfo().getTenantID(), firstPos.getTimeCreated());
			return result;
		}
		return null;
	}
	
	@Override
	public String updatePOS(String primaryKey, POSData data) throws Exception {
		POSData pos = getPOSDATAById(primaryKey);
		String newPrimaryKey = createPOS(data, pos);
		//remove old version as its no longer needed
		posDao.removePOS(primaryKey, baseService.getTenantInfo().getTenantID());
		return newPrimaryKey;
	}
	
}
