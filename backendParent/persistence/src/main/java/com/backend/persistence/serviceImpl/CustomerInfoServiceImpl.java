package com.backend.persistence.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.dao.CartDao;
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
	public void updateProductQuantity(int productId, int quantity) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.updateProductQuantity(productId, customer.getCustomerId(), quantity);
	}
	
	@Override
	public int getUserCartCount() throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		return cartDao.getUserCartCount(customer.getCustomerId());
	}

}
