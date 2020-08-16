package com.backend.core.serviceImpl;

import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.dao.TenantDao;
import com.backend.core.entity.Tenant;
import com.backend.core.entity.TenantDetails;
import com.backend.core.repository.TenantDetailsRepository;
import com.backend.core.repository.TenantRepository;
import com.backend.core.service.BaseService;
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
	
	@Autowired
	private BaseService baseService;
	
	@Override
	public void save(Tenant tenant) {
		tenantRepo.save(tenant);
	}
	
	@Override
	public void saveTenantDetail(TenantDetails tenantDetail) {
		tenantDetailsRepo.save(tenantDetail);
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
	
	@Override
	public void updateTenantDetails(TenantDetails tenantDetails, byte[] logo) throws Exception {
		TenantDetails actualTenantDetail = tenantDetailsRepo.findTenantDetailByTenantID(baseService.getTenantInfo());
		if(logo != null) {
			actualTenantDetail.setTenantLogo(new SerialBlob(logo));
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantEmail())) {
			actualTenantDetail.setTenantEmail(tenantDetails.getTenantEmail());
		}
		if(!StringUtils.isEmpty(tenantDetails.getBusinessEmail())) {
			actualTenantDetail.setBusinessEmail(tenantDetails.getBusinessEmail());
		}
		if(!StringUtils.isEmpty(tenantDetails.getBusinessEmailPassword())) {
			actualTenantDetail.setBusinessEmailPassword(tenantDetails.getBusinessEmailPassword());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantCity())) {
			actualTenantDetail.setTenantCity(tenantDetails.getTenantCity());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantContact())) {
			actualTenantDetail.setTenantContact(tenantDetails.getTenantContact());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantStreet())) {
			actualTenantDetail.setTenantStreet(tenantDetails.getTenantStreet());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantFacebook())) {
			actualTenantDetail.setTenantFacebook(tenantDetails.getTenantFacebook());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantTwitter())) {
			actualTenantDetail.setTenantTwitter(tenantDetails.getTenantTwitter());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantInsta())) {
			actualTenantDetail.setTenantInsta(tenantDetails.getTenantInsta());
		}
		if(!StringUtils.isEmpty(tenantDetails.getTenantPin())) {
			actualTenantDetail.setTenantPin(tenantDetails.getTenantPin());
		}
		tenantDetailsRepo.save(actualTenantDetail);
	}

}
