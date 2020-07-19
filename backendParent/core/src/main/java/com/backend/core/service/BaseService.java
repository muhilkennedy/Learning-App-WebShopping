package com.backend.core.service;

import com.backend.core.entity.Tenant;
import com.backend.core.interfaces.User;

/**
 * @author Muhil
 * 
 * Contains information about current thread.
 *
 */
public interface BaseService {

	Tenant getTenantInfo();

	void setTenantInfo(Tenant tenantInfo);

	User getUserInfo();

	void setUserInfo(User userInfo);

	void clear();

}
