package com.backend.persistence.app.serviceImpl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.app.entity.Coupons;
import com.backend.persistence.app.repository.CouponRepository;
import com.backend.persistence.app.service.CouponsService;
import com.backend.persistence.base.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class CouponsServiceImpl implements CouponsService {

	@Autowired
	private CouponRepository coupRepo;
	
	@Override
	public void save(Coupons coup) {
		coupRepo.save(coup);
	}
	
	@Override
	public List<Coupons> findAllActiveCoupons(Tenant tenant){
		return coupRepo.findAllActiveCoupons(tenant);
	}
	
	@Override
	public List<Coupons> findExpiredCoupons(Tenant tenant){
		return coupRepo.findExpiredCoupons(tenant, new Date());
	}
	
}
