package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.CustomerCart;
import com.backend.persistence.entity.CustomerInfo;

public interface CustomerInfoService {

	void save(CustomerInfo info);

	void saveAndFlush(CustomerInfo info);

	CustomerInfo getCustomerById(int id);

	CustomerInfo getCustomerByEmail(String email);

	void addProductToCart(int productId) throws Exception;

	void removeFromCart(int productId) throws Exception;

	void updateProductQuantity(int productId, int quantity) throws Exception;

	int getUserCartCount() throws Exception;

	List<CustomerCart> getCustomerCartItems() throws Exception;

	void clearCustomerCart() throws Exception;

}
