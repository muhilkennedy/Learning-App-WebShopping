package com.backend.api.service;

import com.backend.commons.exceptions.InvalidUserException;
import com.backend.persistence.base.entity.Tenant;
import com.backend.persistence.base.interfaces.User;

public interface LoginService {

	User loginUser(User user, Tenant tenant);

	void updateUserPassword(User user, Tenant tenant) throws InvalidUserException;

	boolean createUser(User user, Tenant tenant);

}
