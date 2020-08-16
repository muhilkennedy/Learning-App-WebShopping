package com.backend.api.admin.messages;

import java.io.Serializable;

public class MediaPOJOHelper implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int id;
	private int count;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

}
