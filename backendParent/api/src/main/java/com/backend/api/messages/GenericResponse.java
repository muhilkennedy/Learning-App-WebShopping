package com.backend.api.messages;

import java.util.List;

/**
 * @author MuhilKennedy
 *
 * @param <T> can be used for any object/List of Objects as generic response type.
 */
public class GenericResponse<T> extends Response {

	private T data;
	private List<?> dataList;
	
	public T getData() {
		return data;
	}
	
	public void setData(T data) {
		this.data = data;
	}
	
	public List<?> getDataList() {
		return dataList;
	}
	
	public void setDataList(List<?> dataList) {
		this.dataList = dataList;
	}

}
