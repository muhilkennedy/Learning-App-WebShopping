package com.backend.api.service;

import com.backend.commons.exceptions.InvalidUserException;
import com.backend.core.entity.EmployeeInfo;
import com.backend.core.interfaces.User;
import com.backend.persistence.entity.CustomerInfo;

public interface LoginService {

	User loginUser(User user);

	void updateUserPassword(User user) throws InvalidUserException;

	String createUser(User user) throws Exception;

	boolean checkIfUserExists(String email);

	boolean updateEmployeePassword(String email, String newPassword);

	void logoutUser();

	void toggleUserStatus(boolean status);

	boolean updateEmployeePasswordWithCheck(String newPassword, String oldPassword);

	boolean checkIfCustomerExists(String email);

	CustomerInfo getCustomerByEmail(String email);

	boolean updateCustomerPassword(String email, String newPassword);

	void setEmployeeLoggedStatus(EmployeeInfo emp);

}
