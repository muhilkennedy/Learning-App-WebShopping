package com.backend.persistence.entity;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "EMPLOYEEINFO")
public class EmployeeInfo implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "EMPLOYEEID")
	private String employeeId;
	
	@Column(name = "FNAME")
	private String firstName;
	
	@Column(name = "LNAME")
	private String lastName;
	
	@Column(name = "EMAILID")
	private String emailId;
	
	@Column(name = "MOBILE")
	private String mobile;
	
	@Column(name = "DESIGNATION")
	private String designation;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	@Column(name = "LASTLOGIN")
	private Date lastLogin;
	
	@Column(name = "PROFILEPIC")
	private Blob profilePic;

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Blob getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(Blob profilePic) {
		this.profilePic = profilePic;
	}

}
