package com.backend.persistence.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.backend.core.entity.Tenant;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "EMPLOYEEADDRESS")
public class EmployeeAddress implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ADDRESSID")
	private int addressId;
	
	@Column(name = "DOORNUMBER")
	private String doorNumber;
	
	@Column(name = "STREET")
	private String street;
	
	@Column(name = "CITY")
	private String city;
	
	@Column(name = "STATE")
	private String state;
	
	@Column(name = "PINCODE")
	private String pincode;
	
	@ManyToOne
	@JoinColumn(name = "EMPLOYEEID", nullable = false)
	private EmployeeInfo employee;

	public EmployeeAddress() {
		super();
	}

	public EmployeeAddress(Tenant tenant, String doorNumber, String street, String city, String state, String pincode,
			EmployeeInfo employeeId) {
		super();
		this.tenant = tenant;
		this.doorNumber = doorNumber;
		this.street = street;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.employee = employeeId;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public String getDoorNumber() {
		return doorNumber;
	}

	public void setDoorNumber(String doorNumber) {
		this.doorNumber = doorNumber;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public void setEmployee(EmployeeInfo employeeId) {
		this.employee = employeeId;
	}

	public int getAddressId() {
		return addressId;
	}

}
