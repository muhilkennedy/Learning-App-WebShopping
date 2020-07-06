package com.backend.persistence.app.service;

import java.util.List;

import com.backend.persistence.app.entity.Coupons;
import com.backend.persistence.base.entity.Tenant;

public interface CouponsService {

	void save(Coupons coup);

	List<Coupons> findAllActiveCoupons(Tenant tenant);

	List<Coupons> findExpiredCoupons(Tenant tenant);

}
