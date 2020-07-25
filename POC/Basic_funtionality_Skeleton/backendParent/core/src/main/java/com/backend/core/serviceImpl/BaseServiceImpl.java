package com.backend.core.serviceImpl;

import org.springframework.stereotype.Component;

import com.backend.core.entity.Tenant;
import com.backend.core.interfaces.User;
import com.backend.core.service.BaseService;

/**
 * @author Muhil 
 *
 */
@Component
public class BaseServiceImpl implements BaseService{

	private ThreadLocal<Tenant> tenantInfo = new ThreadLocal<Tenant>();
	
	private ThreadLocal<User> userInfo = new ThreadLocal<User>();

	@Override
	public Tenant getTenantInfo() {
		return tenantInfo.get();
	}

	@Override
	public void setTenantInfo(Tenant tenantInfo) {
		this.tenantInfo.set(tenantInfo);
	}

	@Override
	public User getUserInfo() {
		return userInfo.get();
	}

	@Override
	public void setUserInfo(User userInfo) {
		this.userInfo.set(userInfo);
	}
	
	@Override
	public void clear() {
		setTenantInfo(null);
		setUserInfo(null);
	}
	
}
