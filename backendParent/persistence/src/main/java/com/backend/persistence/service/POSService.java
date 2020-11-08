package com.backend.persistence.service;

import java.util.List;

import com.backend.persistence.helper.POSData;

public interface POSService {

	List<POSData> getPOSDATA(String mobile) throws Exception;

	void createPOS(POSData data) throws Exception;

	List<POSData> getPOSDATA(String limit, String offset, String condition, long date) throws Exception;

}
