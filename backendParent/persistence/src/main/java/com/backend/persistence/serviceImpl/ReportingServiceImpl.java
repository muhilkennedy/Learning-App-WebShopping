package com.backend.persistence.serviceImpl;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.core.entity.EmployeeInfo;
import com.backend.core.service.BaseService;
import com.backend.persistence.entity.Orders;
import com.backend.persistence.helper.POSData;
import com.backend.persistence.service.EmployeeService;
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
	
	private Logger logger = LoggerFactory.getLogger(ReportingServiceImpl.class);
	
	private enum Days {
		Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
	}
	
	@Autowired
	private BaseService baseService;
	
	@Autowired
	private OrdersService ordersService;
	
	@Autowired
	private POSService posService;
	
	@Autowired
	private EmployeeService empService;
	
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
	
	@Override
	public File getOverallReport() throws Exception {
		// creating an instance of HSSFWorkbook class
		XSSFWorkbook workbook = new XSSFWorkbook();

		// Employee Report sheet
		XSSFSheet sheet = workbook.createSheet("Employee Report");
		// creating the 0th row using the createRow() method
		XSSFRow rowhead = sheet.createRow((short) 0);
		// creating cell by using the createCell() method and setting the values to the
		// cell by using the setCellValue() method
		rowhead.createCell(0).setCellValue("S.No.");
		rowhead.createCell(1).setCellValue("Employee Name");
		rowhead.createCell(2).setCellValue("Employee Id");
		rowhead.createCell(3).setCellValue("Status");
		rowhead.createCell(4).setCellValue("POS Orders Count");
		rowhead.createCell(5).setCellValue("POS Sales");
		rowhead.createCell(6).setCellValue("Online Orders Count");
		rowhead.createCell(7).setCellValue("Online Sales");
		List<EmployeeInfo> employees = empService.findAllEmployeeForTenant();
		for (int i = 0; i < employees.size(); i++) {
			EmployeeInfo employee = employees.get(i);
			// create row
			XSSFRow row = sheet.createRow((short) (i + 1));
			// inserting data in the row
			row.createCell(0).setCellValue(i + 1);
			row.createCell(1).setCellValue(employee.getFirstName());
			row.createCell(2).setCellValue(employee.getEmployeeId());
			row.createCell(3).setCellValue(employee.isActive() ? "Active" : "Locked");
			List<POSData> posData = posService.posProvisionedByEmployee(employee.getEmployeeId());
			if (posData != null) {
				float total = 0;
				for (POSData pos : posData) {
					total += Float.parseFloat(pos.getSubTotal());
				}
				row.createCell(4).setCellValue(posData.size());
				row.createCell(5).setCellValue(total);
			} else {
				row.createCell(4).setCellValue("N/A");
				row.createCell(5).setCellValue("N/A");
			}
			List<Orders> orders = ordersService.ordersProvisionedByEmployee(employee.getEmployeeId());
			if (orders != null) {
				BigDecimal total = new BigDecimal(0);
				for (Orders order : orders) {
					total = total.add(order.getSubTotal());
				}
				row.createCell(6).setCellValue(orders.size());
				row.createCell(7).setCellValue(total.floatValue());
			} else {
				row.createCell(6).setCellValue("N/A");
				row.createCell(7).setCellValue("N/A");
			}
		}

		// Customer Report sheet
		XSSFSheet customerSheet = workbook.createSheet("Customer Report");
		// creating the 0th row using the createRow() method
		XSSFRow custRowhead = customerSheet.createRow((short) 0);
		// creating cell by using the createCell() method and setting the values to the
		// cell by using the setCellValue() method
		custRowhead.createCell(0).setCellValue("S.No.");
		custRowhead.createCell(1).setCellValue("Customer Name");
		custRowhead.createCell(2).setCellValue("Customer Id");
		custRowhead.createCell(3).setCellValue("Status");
		custRowhead.createCell(4).setCellValue("POS Orders Count");
		custRowhead.createCell(5).setCellValue("POS Sales");
		custRowhead.createCell(6).setCellValue("Online Orders Count");
		custRowhead.createCell(7).setCellValue("Online Sales");

		// POS Date Report sheet
		XSSFSheet posSheet = workbook.createSheet("POS Date Report");
		// creating the 0th row using the createRow() method
		XSSFRow posRowhead = posSheet.createRow((short) 0);
		// creating cell by using the createCell() method and setting the values to the
		// cell by using the setCellValue() method
		posRowhead.createCell(0).setCellValue("S.No.");
		posRowhead.createCell(1).setCellValue("Date");
		posRowhead.createCell(2).setCellValue("Sales Count");
		posRowhead.createCell(3).setCellValue("Txn Done");
		//Day wise sales
		posRowhead.createCell(6).setCellValue("Day");
		posRowhead.createCell(7).setCellValue("Sales Count");
		posRowhead.createCell(8).setCellValue("Txn Done");
		Map<String, List<String>> posDateReportMap = posService.getPosDateWiseReport();
		if(posDateReportMap != null) {
			Map<String, List<String>> dayTxns = intializeDaysMap();
			int i = 0;
			for (Map.Entry<String, List<String>> entry : posDateReportMap.entrySet())  {
				XSSFRow row = posSheet.createRow((short) (i + 1));
				row.createCell(0).setCellValue(i + 1);
				row.createCell(1).setCellValue(entry.getKey());
				List<String> values = entry.getValue();
				String[] days = entry.getKey().split(" ");
				int count;
				int txns;
				List<String> existingValues = new ArrayList();
				switch(days[1]) {
					case "Mon" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Monday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Monday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Monday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					case "Tue" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Tuesday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Tuesday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Tuesday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					case "Wed" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Wednesday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Wednesday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Wednesday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					case "Thu" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Thursday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Thursday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Thursday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					case "Fri" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Friday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Friday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Friday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					case "Sat" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Saturday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Saturday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Saturday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					case "Sun" :count = Integer.parseInt(values.get(0));
								txns = Integer.parseInt(values.get(1));
								existingValues = dayTxns.get(Days.Sunday.toString());
								if(existingValues.size() > 0) {
									int oldCount = Integer.parseInt(existingValues.get(0));
									int oldTxns = Integer.parseInt(existingValues.get(1));
									dayTxns.replace(Days.Sunday.toString(), Arrays.asList(String.valueOf(count+oldCount) , String.valueOf(txns+oldTxns)));
								}
								else {
									dayTxns.put(Days.Sunday.toString(), Arrays.asList(String.valueOf(count) , String.valueOf(txns)));
								}
								break;
					
				}
				
				row.createCell(2).setCellValue(values.get(0));
				row.createCell(3).setCellValue(values.get(1));
				i++;
			}
			
			i=0;
			for (Map.Entry<String, List<String>> entry : dayTxns.entrySet())  {
				XSSFRow row = posSheet.getRow((short) (i + 1));
				List<String> values = entry.getValue();
				row.createCell(6).setCellValue(entry.getKey());
				row.createCell(7).setCellValue(values.get(0));
				row.createCell(8).setCellValue(values.get(1));
				i++;
			}
		}

		// Online Date Report Sheet
		XSSFSheet onlineSheet = workbook.createSheet("Online Date Report");
		// creating the 0th row using the createRow() method
		XSSFRow onlineRowhead = onlineSheet.createRow((short) 0);
		// creating cell by using the createCell() method and setting the values to the
		// cell by using the setCellValue() method
		onlineRowhead.createCell(0).setCellValue("S.No.");
		onlineRowhead.createCell(1).setCellValue("Date");
		onlineRowhead.createCell(2).setCellValue("Sales Count");
		onlineRowhead.createCell(3).setCellValue("Txn Done");

		// generate file
		File tempFile = File.createTempFile("workbook" + System.currentTimeMillis(), ".xls");
		FileOutputStream fileOut = new FileOutputStream(tempFile);
		workbook.write(fileOut);
		// closing the Stream
		fileOut.close();
		// closing the workbook
		workbook.close();
		// prints the message on the console
		logger.info("Excel Report has been generated successfully!");
		return tempFile;
	}
	
	private Map<String, List<String>> intializeDaysMap(){
		Map<String, List<String>> dayTxns = new LinkedHashMap<String, List<String>>();
		dayTxns.put(Days.Monday.toString(), new ArrayList());
		dayTxns.put(Days.Tuesday.toString(), new ArrayList());
		dayTxns.put(Days.Wednesday.toString(), new ArrayList());
		dayTxns.put(Days.Thursday.toString(), new ArrayList());
		dayTxns.put(Days.Friday.toString(), new ArrayList());
		dayTxns.put(Days.Saturday.toString(), new ArrayList());
		dayTxns.put(Days.Sunday.toString(), new ArrayList());
		return dayTxns;
	}
}