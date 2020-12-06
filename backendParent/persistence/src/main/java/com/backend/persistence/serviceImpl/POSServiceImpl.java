package com.backend.persistence.serviceImpl;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.commons.util.CommonUtil;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.core.util.DBUtil;
import com.backend.core.util.DashboardStatusUtil;
import com.backend.core.util.TenantUtil;
import com.backend.persistence.dao.PosDao;
import com.backend.persistence.entity.Product;
import com.backend.persistence.helper.POSData;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.POSService;
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
	
	@Override
	public void createPOS(POSData data) throws Exception {
		data.setTimeCreated(CommonUtil.convertToUTC(data.getTimeCreated()));
		JSONObject json = new JSONObject(data);
		json.put(TenantUtil.Key_TenantId, baseService.getTenantInfo().getTenantID());
		json.put(DBUtil.Key_PrimaryKey, posDao.getPOSKEY());
		json.put(POSData.Key_CreatedBy, ((EmployeeInfo)baseService.getUserInfo()).getEmployeeId() + "-" + ((EmployeeInfo)baseService.getUserInfo()).getEmailId());
		posDao.createPOS(json);
		data.getPosProduct().stream().forEach(product -> {
			Product actualProduct = productService.getProductById(product.getItemID());
			if (actualProduct != null) {
				actualProduct.setQuantityInStock(actualProduct.getQuantityInStock() - product.getQuantity());
				productService.save(actualProduct);
			}
		});
		customerService.updateLoyalityPointByCustomerMobile(data.getMobile(), data.getSubTotal());
		DashboardStatusUtil.incrementPosCount(baseService.getTenantInfo());
	}
	
	@Override
	public List<POSData> getPOSDATA (String mobile) throws Exception{
		return posDao.getPOS(mobile, baseService.getTenantInfo().getTenantID());
	}
	
	@Override
	public List<POSData> getPOSDATA (String limit, String offset, String condition, long date) throws Exception{
		if(CommonUtil.isValidStringParam(condition) && date > 0L) {
			return posDao.getPOS(baseService.getTenantInfo().getTenantID(), limit, offset, condition, date);
		}
		return posDao.getPOS(baseService.getTenantInfo().getTenantID(), limit, offset);
	}

}
