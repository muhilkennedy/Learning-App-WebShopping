package com.backend.persistence.serviceImpl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.service.BaseService;
import com.backend.persistence.service.OrdersService;
import com.backend.persistence.service.POSService;
import com.backend.persistence.service.ReportingService;


/**
 * @author Muhil
 *
 */
@Service
@Transactional
public class ReportingServiceImpl implements ReportingService {
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private OrdersService ordersService;
	
	@Autowired
	private POSService posService;
	
	@Override
	public Map<String, List<BigDecimal>> getWeeklyCombinedData() throws Exception {
		Map<String, List<BigDecimal>> report = new LinkedHashMap<String, List<BigDecimal>>();
		Map<String, BigDecimal> onlineOrders = ordersService.ordersWeeklyReport();
		Map<String, BigDecimal> posOrders = posService.posWeeklyReport();
		for (Map.Entry<String, BigDecimal> entry : onlineOrders.entrySet()) {
			List<BigDecimal> list = new ArrayList<>();
			list.add(posOrders.get(entry.getKey()));
			list.add(entry.getValue());
			report.put(entry.getKey(), list);
		}
		return report;
	}
}