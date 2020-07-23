package com.backend.api.service;

import com.backend.commons.exceptions.InvalidUserException;
import com.backend.core.interfaces.User;

public interface LoginService {

	User loginUser(User user);

	void updateUserPassword(User user) throws InvalidUserException;

	String createUser(User user);

}
