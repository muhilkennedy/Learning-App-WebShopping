package com.backend.persistence.base.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.base.entity.Tenant;
import com.backend.persistence.base.repository.TenantRepository;
import com.backend.persistence.base.service.TenantService;
import com.backend.persistence.dao.TenantDao;

/**
 * @author muhil
 *
 */
@Service
@Transactional
public class TenantServiceImpl implements TenantService {
	
	@Autowired
	private TenantRepository tenantRepo;
	
	@Autowired
	private TenantDao tenantDao;
	
	@Override
	public void save(Tenant tenant) {
		tenantRepo.save(tenant);
	}
	
	@Override
	public Tenant findTenantByName(String uniquename) {
		return tenantRepo.findTenantByNameQuery(uniquename);
	}
	
	@Override
	public Tenant findTenantByID(String tenantId) {
		return tenantRepo.findTenantByIdQuery(tenantId);
	}
	
	@Override
	public List<Tenant> getAllTenants(){
		return tenantRepo.findAll();
	}
	
	@Override
	public void removeOrigins(String tenantId) throws Exception {
		tenantDao.removeOrigins(tenantId);
	}

	@Override
	public void addAllowedOrigin(String tenantId, String origin) throws Exception {
		tenantDao.addAllowedOrigin(tenantId, origin);
	}
	
	@Override
	public List<String> getAllowedOriginsForTenant(String tenantId) throws Exception {
		return tenantDao.getAllowedOrigins(tenantId);
	}
	
}
