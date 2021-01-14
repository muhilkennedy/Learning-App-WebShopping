package com.backend.persistence.service;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.backend.persistence.helper.POSData;

public interface POSService {

	List<POSData> getPOSDATA(String mobile) throws Exception;

	String createPOS(POSData data) throws Exception;

	List<POSData> getPOSDATA(String limit, String offset, String condition, long date) throws Exception;

	int getPOSDATACount(String condition, long date) throws Exception;

	Map<String, BigDecimal> posWeeklyReport() throws Exception;

	POSData getPOSDATAById(String id) throws Exception;

	File getPOSInvoice(String id) throws Exception;

	List<POSData> getPOSDATAForCustomer() throws Exception;

}
