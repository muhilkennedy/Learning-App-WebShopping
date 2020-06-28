package com.backend.persistence.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.dao.TenantDao;
import com.backend.persistence.entity.Tenant;
import com.backend.persistence.entity.TenantCorsMapping;
import com.backend.persistence.repository.TenantRepository;
import com.backend.persistence.service.TenantService;

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
