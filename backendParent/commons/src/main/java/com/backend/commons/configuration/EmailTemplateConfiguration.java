package com.backend.commons.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * @author Muhil
 *
 */
@Configuration
public class EmailTemplateConfiguration {
	
	@Primary
	@Bean
	public FreeMarkerConfigurationFactoryBean emailTemplateBean() {
		FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
		bean.setTemplateLoaderPath("classpath:/emailTemplates");
		return bean;
	}

}
