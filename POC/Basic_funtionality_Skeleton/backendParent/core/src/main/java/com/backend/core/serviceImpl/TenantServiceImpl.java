package com.backend.core.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.dao.TenantDao;
import com.backend.core.entity.Tenant;
import com.backend.core.repository.TenantDetailsRepository;
import com.backend.core.repository.TenantRepository;
import com.backend.core.service.TenantService;

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
	
	@Autowired
	private TenantDetailsRepository tenantDetailsRepo;
	
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
