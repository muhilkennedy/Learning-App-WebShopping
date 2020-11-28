package com.backend.core.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "DASHBOARDREPORT")
public class DashboardReport implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private int id;
	
	@Column(name = "TOTALEMAIL")
	private int totalEmailCount;
	
	@Column(name = "TOTALSMS")
	private int totalSmsCount;
	
	@Column(name = "EMAILTODAY")
	private int emailCountToday;
	
	@Column(name = "SMSTODAY")
	private int smsCountToday;
	
	@Column(name = "TOTALPOS")
	private int totalPosCount;
	
	@Column(name = "TOTALONLINE")
	private int totalOnlineCount;
	
	@Column(name = "POSTODAY")
	private int posCountToday;
	
	@Column(name = "ONINETODAY")
	private int onlineCountToday;
	
	@Column(name = "TOTALCUSTOMERS")
	private int totalCustomers;

	public DashboardReport() {
		super();
	}
	
	public DashboardReport(Tenant tenant) {
		super();
		this.tenant = tenant;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTotalEmailCount() {
		return totalEmailCount;
	}

	public void setTotalEmailCount(int totalEmailCount) {
		this.totalEmailCount = totalEmailCount;
	}

	public int getTotalSmsCount() {
		return totalSmsCount;
	}

	public void setTotalSmsCount(int totalSmsCount) {
		this.totalSmsCount = totalSmsCount;
	}

	public int getEmailCountToday() {
		return emailCountToday;
	}

	public void setEmailCountToday(int emailCountToday) {
		this.emailCountToday = emailCountToday;
	}

	public int getSmsCountToday() {
		return smsCountToday;
	}

	public void setSmsCountToday(int smsCountToday) {
		this.smsCountToday = smsCountToday;
	}

	public int getTotalPosCount() {
		return totalPosCount;
	}

	public void setTotalPosCount(int totalPosCount) {
		this.totalPosCount = totalPosCount;
	}

	public int getTotalOnlineCount() {
		return totalOnlineCount;
	}

	public void setTotalOnlineCount(int totalOnlineCount) {
		this.totalOnlineCount = totalOnlineCount;
	}

	public int getPosCountToday() {
		return posCountToday;
	}

	public void setPosCountToday(int posCountToday) {
		this.posCountToday = posCountToday;
	}

	public int getOnlineCountToday() {
		return onlineCountToday;
	}

	public void setOnlineCountToday(int onlineCountToday) {
		this.onlineCountToday = onlineCountToday;
	}

	public int getTotalCustomers() {
		return totalCustomers;
	}

	public void setTotalCustomers(int totalCustomers) {
		this.totalCustomers = totalCustomers;
	}

}
