package com.backend.commons.serviceImpl;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.backend.commons.service.OtpService;
import com.backend.commons.util.CommonUtil;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Muhil
 * 
 * Store generated OTP in cahche and release periodically.
 *
 */
@Service
public class OtpServiceImpl implements OtpService {
	
	private static Logger logger = LoggerFactory.getLogger(OtpServiceImpl.class);
 
	private static final Integer EXPIRE_MINS = 5;
	private LoadingCache<String, String> otpCache;

	public OtpServiceImpl() {
		super();
		otpCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
							   .build(new CacheLoader<String, String>() {
									public String load(String key) {
										return null;
									}
								});
	}

	@Override
	public String generateOtp(String key) {
		String otp = CommonUtil.generateRandomCode();
		otpCache.put(key, otp);
		return otp;
	}

	@Override
	public String getOtp(String key) {
		try {
			return otpCache.get(key);
		} catch (ExecutionException e) {
			logger.error("Requested Item released from Cache - " + e.getMessage());
			return null;
		}
	}

	@Override
	public void clearOtp(String key) {
		otpCache.invalidate(key);
	}
}