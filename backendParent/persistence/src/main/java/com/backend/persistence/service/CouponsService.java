package com.backend.persistence.service;

import java.util.List;

import com.backend.core.entity.Tenant;
import com.backend.persistence.entity.Coupons;

public interface CouponsService {

	void save(Coupons coup);

	List<Coupons> findAllActiveCoupons(Tenant tenant);

	List<Coupons> findExpiredCoupons(Tenant tenant);

}
