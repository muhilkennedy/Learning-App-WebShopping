package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.entity.Coupons;

public interface CouponsService {

	void save(Coupons coup);

	List<Coupons> findAllActiveCoupons();

	List<Coupons> findExpiredCoupons();

	void createCoupon(Coupons coup);

	List<Coupons> findAllCouponsForTenant();

	void toggleCoupon(Long id);

	void deleteCoupon(Long id);

	Coupons findCouponById(Long id);

	Coupons getCouponByCode(String code);

	Coupons verifyIfCouponApplicableById(String code);

}
