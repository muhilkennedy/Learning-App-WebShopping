package com.backend.persistence.service;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import com.backend.persistence.entity.CustomerAddress;
import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.entity.CustomerInfo;

public interface CustomerInfoService {

	void save(CustomerInfo info);

	void saveAndFlush(CustomerInfo info);

	CustomerInfo getCustomerById(Long id);

	CustomerInfo getCustomerByEmail(String email);

	void addProductToCart(Long productId) throws Exception;

	void removeFromCart(Long productId) throws Exception;

	void updateProductQuantity(Long productId, int quantity) throws Exception;

	int getUserCartCount() throws Exception;

	List<CustomerCart> getCustomerCartItems() throws Exception;

	void clearCustomerCart() throws Exception;

	CustomerInfo getCustomerByMobile(String mobile) throws InvalidKeyException, BadPaddingException, IllegalBlockSizeException, NoSuchPaddingException, NoSuchAlgorithmException;

	void updateLoyalityPointByCustomerMobile(String mobile, String subTotal);

	void addCustomerAddress(CustomerAddress address);

	void updateCustomerMobile(String mobile) throws Exception;

	void updateLoyalityPointByCustomerMobile(String mobile, float subTotal);

	CustomerInfo getCustomerByEmailOrMobile(String emailOrMobile);

}
