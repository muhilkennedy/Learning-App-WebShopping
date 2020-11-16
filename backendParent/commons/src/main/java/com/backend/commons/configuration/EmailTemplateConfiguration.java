package com.backend.commons.configuration;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.annotation.PostConstruct;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

import com.backend.core.entity.Tenant;
import com.backend.core.entity.TenantDetails;
import com.backend.core.service.TenantService;
import com.backend.core.util.ConfigUtil;
import com.backend.core.util.RSAUtil;

/**
 * @author Muhil
 *
 */
@Configuration
public class EmailTemplateConfiguration {
	
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private ConfigUtil configUtil;
	
	@Autowired
	private SpringSocialProperties props;
	
	@Primary
	@Bean
	public FreeMarkerConfigurationFactoryBean emailTemplateBean() {
		FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
		bean.setTemplateLoaderPath("classpath:/emailTemplates");
		return bean;
	}
	
	/**
	 * Only for development purposes (encrypt default password)
	 */
	/*@PostConstruct
	private void encryptBusinessEmailPassword() {
		Tenant devTenant = tenantService.findTenantByID("devTenant");
		TenantDetails devTenantDetail = devTenant.getTenantDetail();
		String encryptedPassword;
		try {
			//skipping encrytion if length is more considering it is already encrypted.
			if(!(devTenantDetail.getBusinessEmailPassword().length() > 50)) {
				encryptedPassword = Base64.getEncoder().encodeToString(
						RSAUtil.encrypt(props.getGmail().getPassword(), configUtil.getRsaPublic()));
				devTenantDetail.setBusinessEmailPassword(encryptedPassword);
				tenantService.saveTenantDetail(devTenantDetail);
			}
		} catch (InvalidKeyException | BadPaddingException | IllegalBlockSizeException | NoSuchPaddingException
				| NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

	}*/

}
