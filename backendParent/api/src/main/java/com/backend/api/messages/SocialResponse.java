package com.backend.api.messages;

/**
 * @author MuhilKennedy
 * Derived params for additional info on social request response(customizable based on usecases).
 */
public class SocialResponse extends Response {
		
	private String URL;
	
	public String getURL() {
		return URL;
	}
	
	public void setURL(String uRL) {
		URL = uRL;
	}	
	
}
