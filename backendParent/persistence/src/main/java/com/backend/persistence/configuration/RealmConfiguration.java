package com.backend.persistence.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.backend.commons.security.SecurityConfiguration;

/**
 * @author muhil
 * 
 * web security is enabled at peristence level to verify realm level information for eaxh request.
 *
 */
@Configuration
@EnableWebSecurity
public class RealmConfiguration extends SecurityConfiguration {

	@Autowired
	private RealmFilter realmFilter;

	@Bean
	public FilterRegistrationBean<RealmFilter> RealmFilterRegistration() {
	    FilterRegistrationBean<RealmFilter> registration = new  FilterRegistrationBean<RealmFilter>();
	    registration.setFilter(realmFilter);
	    registration.addUrlPatterns("*");
	    return registration;
	}

}
