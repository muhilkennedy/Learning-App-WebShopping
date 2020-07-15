package com.backend.commons.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.backend.commons.util.JWTUtil;
import com.backend.core.util.ConfigUtil;

@Component
@Order(2)
public class TokenFilter implements Filter {

	private static Logger logger = LoggerFactory.getLogger(TokenFilter.class);
	
	@Autowired
	private ConfigUtil configUtil;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		logger.info("doFilter :: JWT Token Filter");
		if (configUtil.isProdMode()) {
			String token = req.getHeader(HttpHeaders.AUTHORIZATION);
			if (token != null && !StringUtils.isEmpty(JWTUtil.extractToken(token))) {
				try {
					if (JWTUtil.validateToken(JWTUtil.extractToken(token))) {
						chain.doFilter(request, response);
					} else {
						((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN,
								"Token Validation failed");
						return;
					}
				} catch (Exception e) {
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
							"Authorization Header is Missing");
					return;
				}
			} else {
				((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST,
						"Authorization Header is Missing");
				return;
			}
		} else {
			chain.doFilter(request, response);
		}
	}

}
