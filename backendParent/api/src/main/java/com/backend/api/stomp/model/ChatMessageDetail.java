package com.backend.api.stomp.model;

public class ChatMessageDetail {

	private String message;
	private String from;
	private String to;
	private String tenantId;
	private String userToken;

	public ChatMessageDetail() {
		super();
	}

	public ChatMessageDetail(String message, String from, String to, String tenantId, String token) {
		super();
		this.message = message;
		this.from = from;
		this.to = to;
		this.tenantId = tenantId;
		this.userToken = token;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getUserToken() {
		return userToken;
	}

	public void setUserToken(String userToken) {
		this.userToken = userToken;
	}

}
