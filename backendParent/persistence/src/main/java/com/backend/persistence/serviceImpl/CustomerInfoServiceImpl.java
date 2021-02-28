package com.backend.persistence.serviceImpl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.dao.CartDao;
import com.backend.persistence.entity.CustomerAddress;
import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.entity.CustomerInfo;
import com.backend.persistence.entity.Product;
import com.backend.persistence.repository.CustomerInfoRepository;
import com.backend.persistence.service.CustomerInfoService;
import com.backend.persistence.service.ProductService;

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
	private ProductService productService;
	
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
	public CustomerInfo getCustomerById(Long id) {
		return customerRepo.findCustomerById(id, baseService.getTenantInfo());
	}
	
	@Override
	public CustomerInfo getCustomerByEmail(String email) {
		return customerRepo.findCustomerByEmail(email, baseService.getTenantInfo());
	}
	
	@Override
	public CustomerInfo getCustomerByMobile(String mobile) {
		return customerRepo.findCustomerByMobile(mobile, baseService.getTenantInfo());
	}
	
	@Override
	public CustomerInfo getCustomerByEmailOrMobile(String emailOrMobile) {
		return customerRepo.findCustomerByEmailOrMobile(emailOrMobile, baseService.getTenantInfo());
	}
	
	@Override
	public void addProductToCart(Long productId, int quantity) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		List<CustomerCart> cartItems = cartDao.userCartItems(customer.getCustomerId());
		for(CustomerCart cartItem: cartItems) {
			if(cartItem.getProduct().getProductId() == productId) {
				quantity = cartItem.getQuantity() + 1;
				updateProductQuantity(productId, quantity);
				return;
			}
		}
		Product product = productService.getProductById(productId);
		if(product.getQuantityInStock() < quantity) {
			throw new Exception("Only " + product.getQuantityInStock() + " left !");
		}
		else {
			cartDao.insertIntoCart(productId, customer.getCustomerId(), quantity);
		}
	}
	
	@Override
	public void removeFromCart(Long productId) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.removeProductFromCart(productId, customer.getCustomerId());
	}
	
	@Override
	public void clearCustomerCart() throws Exception{
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		cartDao.clearCustomerCart(customer.getCustomerId());
	}
	
	@Override
	public void updateProductQuantity(Long productId, int quantity) throws Exception {
		CustomerInfo customer = (CustomerInfo) baseService.getUserInfo();
		if(quantity <= 0) {
			removeFromCart(productId);
		}
		else {
			Product product = productService.getProductById(productId);
			if(product.getQuantityInStock() < quantity) {
				throw new Exception("Only " + product.getQuantityInStock() + " left in stock !");
			}
			else {
				cartDao.updateProductQuantity(productId, customer.getCustomerId(), quantity);
			}
		}
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
		//1 inr for every 200 spent 
		BigDecimal loyalityEarned = new BigDecimal(total).divide(new BigDecimal(200));
		customer.setLoyalitypoint(customer.getLoyalitypoint() != null
				? customer.getLoyalitypoint().add(loyalityEarned.setScale(2, RoundingMode.CEILING))
				: loyalityEarned.setScale(2, RoundingMode.CEILING));
	}
	
	public void updateLoyalityPoint(CustomerInfo customer, float total) {
		//1 inr for every 200 spent 
		BigDecimal loyalityEarned = new BigDecimal(total).divide(new BigDecimal(200));
		customer.setLoyalitypoint(customer.getLoyalitypoint() != null
				? customer.getLoyalitypoint().add(loyalityEarned.setScale(2, RoundingMode.CEILING))
				: loyalityEarned.setScale(2, RoundingMode.CEILING));
	}

	@Override
	public void updateLoyalityPointByCustomerMobile(String mobile, String subTotal) {
		CustomerInfo customer = getCustomerByMobile(mobile);
		if (customer != null) {
			updateLoyalityPoint(customer, subTotal);
		}
	}
	
	@Override
	public void updateLoyalityPointByCustomerMobile(String mobile, float subTotal) {
		CustomerInfo customer = getCustomerByMobile(mobile);
		if (customer != null) {
			updateLoyalityPoint(customer, subTotal);
		}
	}
	
	@Override
	public void addCustomerAddress(CustomerAddress address) {
		CustomerInfo customer = (CustomerInfo)baseService.getUserInfo();
		customer = getCustomerByEmail(customer.getEmailId());
		address.setTenant(baseService.getTenantInfo());
		address.setCustomer(customer);
		customer.getCustomerAddress().add(address);
		save(customer);
	}
	
	@Override
	public void updateCustomerMobile(String mobile) throws Exception {
		CustomerInfo existingCustomer = getCustomerByMobile(mobile);
		if(existingCustomer == null) {
			CustomerInfo customer = (CustomerInfo)baseService.getUserInfo();
			customer.setMobile(mobile);
			save(customer);
		}
		else {
			throw new Exception("Another Account with Same Mobile Number Exists!");
		}
	}
	
	@Override
	public void updateCustomerEmail(String email) throws Exception {
		CustomerInfo existingCustomer = getCustomerByEmail(email);
		if(existingCustomer == null) {
			CustomerInfo customer = (CustomerInfo)baseService.getUserInfo();
			customer.setEmailId(email);
			save(customer);
		}
		else {
			throw new Exception("Another Account with Same Mobile Number Exists!");
		}
	}

	@Override
	public List<CustomerInfo> findAllCustomersForTenant(int offset, int limit) {
		return customerRepo.findLimitedCustomers(baseService.getTenantInfo().getTenantID(),limit,offset);
	}
	
	@Override
	public List<CustomerInfo> findAllCustomersForTenant() {
		return customerRepo.findAllCustomers(baseService.getTenantInfo());
	}
	
	@Override
	public int findAllCustomersCountForTenant(){
		return customerRepo.findAllCustomersCount(baseService.getTenantInfo());
	}
	
	@Override
	public void toggleCustomerStatus(CustomerInfo customer) {
		customer.setActive(!customer.isActive());
		save(customer);
	}

}
