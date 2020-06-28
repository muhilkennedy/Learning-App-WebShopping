package com.backend.commons.security;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.backend.commons.util.ConfigUtil;

/**
 * @author muhil
 *
 */
// This class is extended by RealmConfiguration in persistence package to avoid cyclic dependency.
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	private static Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);

	@Autowired
	private ConfigUtil config;
	
	@Autowired
	private TokenFilter tokenFilter;
	
	@Autowired
	private AdminFilter adminFilter;

	/*
	 * overrides spring default /login authentication.
	 */
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		logger.info("<<<<<<<<<<App Running in " + config.getDeploymentMode() + " mode >>>>>>>>");
        http.csrf().disable();
        http.cors().and()
        	.authorizeRequests().antMatchers("/**").permitAll().and().headers().frameOptions().disable();
    }
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() 
    {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedOrigins(Arrays.asList(config.getAllowedOrigin()));
        configuration.setAllowedMethods(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	@Bean
	public FilterRegistrationBean<TokenFilter> TokenFilterRegistration() {
	    FilterRegistrationBean<TokenFilter> registration = new  FilterRegistrationBean<TokenFilter>();
	    registration.setFilter(tokenFilter);
	    registration.addUrlPatterns("/secure/*");
	    return registration;
	}
	
	@Bean
	public FilterRegistrationBean<AdminFilter> AdminFilterRegistration() {
	    FilterRegistrationBean<AdminFilter> registration = new  FilterRegistrationBean<AdminFilter>();
	    registration.setFilter(adminFilter);
	    registration.addUrlPatterns("/admin/*");
	    return registration;
	}
}
