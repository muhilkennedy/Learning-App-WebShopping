package com.backend.persistence.service;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface ReportingService {

	Map<String, List<BigDecimal>> getWeeklyCombinedData() throws Exception;

	File getOverallReport() throws Exception;

}
