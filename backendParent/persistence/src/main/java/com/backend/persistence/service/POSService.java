package com.backend.persistence.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.backend.persistence.helper.POSData;

public interface POSService {

	List<POSData> getPOSDATA(String mobile) throws Exception;

	void createPOS(POSData data) throws Exception;

	List<POSData> getPOSDATA(String limit, String offset, String condition, long date) throws Exception;

	int getPOSDATACount(String condition, long date) throws Exception;

	Map<String, BigDecimal> posWeeklyReport() throws Exception;

}
