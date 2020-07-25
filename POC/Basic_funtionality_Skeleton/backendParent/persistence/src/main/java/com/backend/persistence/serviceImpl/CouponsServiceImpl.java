package com.backend.persistence.serviceImpl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.entity.Coupons;
import com.backend.persistence.repository.CouponRepository;
import com.backend.persistence.service.CouponsService;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class CouponsServiceImpl implements CouponsService {

	@Autowired
	private CouponRepository coupRepo;
	
	@Autowired
	private BaseService baseService;
	
	@Override
	public void save(Coupons coup) {
		coupRepo.save(coup);
	}
	
	@Override
	public List<Coupons> findAllActiveCoupons(){
		return coupRepo.findAllActiveCoupons(baseService.getTenantInfo());
	}
	
	@Override
	public List<Coupons> findExpiredCoupons(){
		return coupRepo.findExpiredCoupons(baseService.getTenantInfo(), new Date());
	}
	
	@Override
	public void createCoupon(Coupons coup) {
		coup.setTenant(baseService.getTenantInfo());
		save(coup);
	}
	
	@Override
	public List<Coupons> findAllCouponsForTenant(){
		return coupRepo.findAllCouponsForTenant(baseService.getTenantInfo());
	}
}
