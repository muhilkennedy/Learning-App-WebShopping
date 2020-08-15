package com.backend.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfiguration {
	
	@Autowired
	private TokenFilter tokenFilter;
	
	@Autowired
	private AdminFilter adminFilter;
	
	@Bean
	public FilterRegistrationBean<TokenFilter> TokenFilterRegistration() {
	    FilterRegistrationBean<TokenFilter> registration = new  FilterRegistrationBean<TokenFilter>();
	    registration.setFilter(tokenFilter);
	    registration.addUrlPatterns("/secure/*", "/login/secure/*", "/tenant/*");
	    return registration;
	}
	
	@Bean
	public FilterRegistrationBean<AdminFilter> AdminFilterRegistration() {
	    FilterRegistrationBean<AdminFilter> registration = new  FilterRegistrationBean<AdminFilter>();
	    registration.setFilter(adminFilter);
	    registration.addUrlPatterns("/secure/admin/*","/admin/*", "/tenant/*");
	    return registration;
	}

}
