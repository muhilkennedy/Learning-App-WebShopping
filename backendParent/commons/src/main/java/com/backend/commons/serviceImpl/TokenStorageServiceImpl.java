package com.backend.commons.serviceImpl;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.backend.commons.service.TokenStorage;
import com.backend.commons.util.CommonUtil;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Muhil
 * 
 * Stores token for limited time for ui redirection!
 *
 */
@Service
public class TokenStorageServiceImpl implements TokenStorage {
	
	private static Logger logger = LoggerFactory.getLogger(TokenStorageServiceImpl.class);
 
	private static final Integer EXPIRE_MINS = 2;
	private LoadingCache<String, String> tokenCache;
	
	public TokenStorageServiceImpl() {
		super();
		tokenCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
							   .build(new CacheLoader<String, String>() {
									public String load(String key) {
										return null;
									}
								});
	}

	@Override
	public String storeUserToken(String token) {
		String randomKey = CommonUtil.generateRandomCode();
		tokenCache.put(randomKey, token);
		return randomKey;
	}

	@Override
	public String getUserToken(String key) {
		try {
			return tokenCache.get(key);
		} catch (ExecutionException e) {
			logger.error("Requested Item released from Cache - " + e.getMessage());
			return null;
		}
	}

	@Override
	public void clearOtp(String key) {
		tokenCache.invalidate(key);
	}

}
