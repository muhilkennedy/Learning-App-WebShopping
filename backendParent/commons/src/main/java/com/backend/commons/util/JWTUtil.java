package com.backend.commons.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.backend.core.util.ConfigUtil;
import com.backend.core.util.Constants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author Muhil Kenenedy Java Web Token(JWT) generation and verification
 *         implementation.
 */
@Component
public class JWTUtil {

	// 2hours validity
	public static final long JWT_TOKEN_VALIDITY = 2 * 60 * 60;
	// 1month validity incase of remember me action
	public static final long JWT_TOKEN_VALIDITY_REMEMBER_ME = 744 * 60 * 60;

	private static ConfigUtil configUtil;
	
	@Autowired
	public void setConfigUtil(ConfigUtil config) {
		JWTUtil.configUtil = config;
	}

	// retrieve email from jwt token
	public static String getUserEmailFromToken(String token) throws Exception {
		return getClaimFromToken(token, Claims::getSubject);
	}

	
	public static boolean isEmployeeUser(String token) throws Exception {
		Claims claims = getAllClaimsFromToken(token);
		String type = (String) claims.get(CommonUtil.Key_userType);
		if (type.equalsIgnoreCase(CommonUtil.Key_employeeUser)) {
			return true;
		}
		return false;
	}
	 

	// retrieve expiration date from jwt token
	public static Date getExpirationDateFromToken(String token) throws Exception {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public static <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) throws Exception {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	// for retrieveing any information from token we will need the secret key
	private static Claims getAllClaimsFromToken(String token) throws Exception {
		return Jwts.parser().setSigningKey(configUtil.getJwtSecret()).parseClaimsJws(token).getBody();
	}

	// check if the token has expired
	private static Boolean isTokenExpired(String token) throws Exception {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	/**
	 * @param userDetails user object
	 * @return JWT token for users
	 */
	// implement later when user entity is created.
	public static String generateToken(String emailId, String userType, boolean rememberMe) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(CommonUtil.Key_userType, userType);
		//we can add more details about user in future in Claims map if needed.
		return doGenerateToken(claims, emailId, rememberMe);
	}

	/**
	 * @param claims  map for additional data
	 * @param subject user email
	 * @return JWT
	 */
	private static String doGenerateToken(Map<String, Object> claims, String subject, boolean rememberMe) {
		if(rememberMe) {
			return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY_REMEMBER_ME * 1000))
					.signWith(SignatureAlgorithm.HS512, configUtil.getJwtSecret()).compact();
		}
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, configUtil.getJwtSecret()).compact();
	}

	/**
	 * @param token
	 * @return true if token is valid.
	 */
	public static Boolean validateToken(String token) throws Exception {
		String email = getUserEmailFromToken(token);
		return (!(StringUtils.isEmpty(email)) && !(isTokenExpired(token)));
	}

	public static String extractToken(String token) {
		return token.replace(Constants.Token_Bearer, "").trim();
	}
}
