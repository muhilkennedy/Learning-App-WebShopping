package com.backend.persistence.serviceImpl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.dao.CartDao;
import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.repository.CustomerInfoRepository;
import com.backend.persistence.service.CustomerInfoService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class CustomerInfoServiceImpl implements CustomerInfoService{
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private CustomerInfoRepository customerRepo;
	
	@Autowired
	private CartDao cartDao;
	
	@Override
	public void save(CustomerInfo info) {
		customerRepo.save(info);
	}
	
	@Override
	public void saveAndFlush(CustomerInfo info) {
		customerRepo.saveAndFlush(info);
	}
	
	@Override
	public CustomerInfo getCustomerById(int id) {
		return customerRepo.findEmployeeById(id, baseService.getTenantInfo());
	}
	
	@Override
	public CustomerInfo getCustomerByEmail(String email) {
		return customerRepo.findEmployeeByEmail(email, baseService.getTenantInfo());
	}
	
	@Override
	public CustomerInfo getCustomerByMobile(String mobile) {
		return customerRepo.findEmployeeByMobile(mobile, baseService.getTenantInfo());
	}
	
	@Override
	public void addProductToCart(int productId) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.insertIntoCart(productId, customer.getCustomerId(), 1);
	}
	
	@Override
	public void removeFromCart(int productId) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.removeProductFromCart(productId, customer.getCustomerId());
	}
	
	@Override
	public void clearCustomerCart() throws Exception{
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.clearCustomerCart(customer.getCustomerId());
	}
	
	@Override
	public void updateProductQuantity(int productId, int quantity) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.updateProductQuantity(productId, customer.getCustomerId(), quantity);
	}
	
	@Override
	public int getUserCartCount() throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		return cartDao.getUserCartCount(customer.getCustomerId());
	}
	
	@Override
	public List<CustomerCart> getCustomerCartItems() throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		return cartDao.userCartItems(customer.getCustomerId());
	}
	
	public void updateLoyalityPoint(CustomerInfo customer, String total) {
		BigDecimal loyalityEarned = new BigDecimal(total).divide(new BigDecimal(100));
		customer.setLoyalitypoint(loyalityEarned.setScale(2, RoundingMode.CEILING));
	}
	
	@Override
	public void updateLoyalityPointByCustomerMobile(String mobile, String subTotal) {
		CustomerInfo customer = getCustomerByMobile(mobile);
		if(customer != null) {
			updateLoyalityPoint(customer, subTotal);
		}
	}

}
