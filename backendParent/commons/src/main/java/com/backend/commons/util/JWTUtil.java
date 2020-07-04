package com.backend.commons.util;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

	private static ConfigUtil configUtil;
	
	@Autowired
	public void setConfigUtil(ConfigUtil config) {
		JWTUtil.configUtil = config;
	}

	// retrieve email from jwt token
	public String getUserEmailFromToken(String token) throws Exception {
		return getClaimFromToken(token, Claims::getSubject);
	}

	/*
	 * public boolean isAdminScope(String token) throws Exception { Claims claims =
	 * getAllClaimsFromToken(token); String scope = (String)
	 * claims.get(CommonUtil.Header_Scope);
	 * if(scope.equalsIgnoreCase(CommonUtil.Key_adminPermission)) { return true; }
	 * return false; }
	 */

	// retrieve expiration date from jwt token
	public Date getExpirationDateFromToken(String token) throws Exception {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) throws Exception {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	// for retrieveing any information from token we will need the secret key
	private Claims getAllClaimsFromToken(String token) throws Exception {
		return Jwts.parser().setSigningKey(configUtil.getJwtSecret()).parseClaimsJws(token).getBody();
	}

	// check if the token has expired
	private Boolean isTokenExpired(String token) throws Exception {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	/**
	 * @param userDetails user object
	 * @return JWT token for users
	 */
	// implement later when user entity is created.
//	public String generateToken(User userDetails) {
//		Map<String, Object> claims = new HashMap<>();
//		claims.put(Constants.Token_UserPosition, userDetails.getRole());
//		//we can add more details about user in future in Claims map if needed.
//		return doGenerateToken(claims, userDetails.getEmailId());
//	}

	/**
	 * @param claims  map for additional data
	 * @param subject user email
	 * @return JWT
	 */
	private String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, configUtil.getJwtSecret()).compact();
	}

	/**
	 * @param token
	 * @return true if token is valid.
	 */
	public Boolean validateToken(String token) throws Exception {
		String email = getUserEmailFromToken(token);
		return (!(StringUtils.isEmpty(email)) && !(isTokenExpired(token)));
	}

	public String extractToken(String token) {
		return token.replace(Constants.Token_Bearer + " ", "");
	}
}
