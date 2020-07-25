package com.backend.commons.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.stereotype.Component;

/**
 * @author muhil
 *
 */
@Component
@ConfigurationProperties(prefix = "spring.social")
public class SpringSocialProperties {

	@NestedConfigurationProperty
	private Gmail gmail;

	@NestedConfigurationProperty
	private Google google;

	public static class Gmail {
		private String id;
		private String password;
		private boolean enableMailing;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public boolean isEnableMailing() {
			return enableMailing;
		}

		public void setEnableMailing(boolean enableMailing) {
			this.enableMailing = enableMailing;
		}

	}

	public Gmail getGmail() {
		return gmail;
	}

	public void setGmail(Gmail gmail) {
		this.gmail = gmail;
	}

	public static class Google {
		private String appId;
		private String appSecret;
		private String redirectUri;
		private String scope;

		public String getAppId() {
			return appId;
		}

		public void setAppId(String appId) {
			this.appId = appId;
		}

		public String getAppSecret() {
			return appSecret;
		}

		public void setAppSecret(String appSecret) {
			this.appSecret = appSecret;
		}

		public String getRedirectUri() {
			return redirectUri;
		}

		public void setRedirectUri(String redirectUri) {
			this.redirectUri = redirectUri;
		}

		public String getScope() {
			return scope;
		}

		public void setScope(String scope) {
			this.scope = scope;
		}

	}

	public Google getGoogle() {
		return google;
	}

	public void setGoogle(Google google) {
		this.google = google;
	}

}
