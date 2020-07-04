package com.backend.persistence.base.service;

import java.util.List;

import com.backend.persistence.base.entity.Tenant;

public interface TenantService {

	void save(Tenant tenant);

	Tenant findTenantByName(String uniquename);

	List<Tenant> getAllTenants();

	Tenant findTenantByID(String tenantId);

	void removeOrigins(String tenantId) throws Exception;

	void addAllowedOrigin(String tenantId, String origin) throws Exception;

	List<String> getAllowedOriginsForTenant(String tenantId) throws Exception;

}
