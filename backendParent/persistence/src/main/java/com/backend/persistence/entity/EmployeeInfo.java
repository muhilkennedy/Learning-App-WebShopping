package com.backend.persistence.entity;

import java.io.InputStream;
import java.io.Serializable;
import java.sql.Blob;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.backend.core.entity.Tenant;
import com.backend.core.interfaces.User;
import com.backend.core.util.Constants;
import com.google.common.io.ByteStreams;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "EMPLOYEEINFO")
public class EmployeeInfo implements Serializable, User{

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "EMPLOYEEID")
	private int employeeId;
	
	@Column(name = "FNAME")
	private String firstName;
	
	@Column(name = "LNAME")
	private String lastName;
	
	@Column(name = "EMAILID")
	private String emailId;
	
	@Column(name = "PASSWORD")
	private String password;
	
	@Column(name = "MOBILE")
	private String mobile;
	
	@Column(name = "DESIGNATION")
	private String designation;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	@Column(name = "LASTLOGIN")
	private long lastLogin;
	
	@Column(name = "ISLOGGEDIN")
	private boolean isLoggedIn;
	
	@Column(name = "DOB")
	private Date dob;
	
	@Column(name = "GENDER")
	private String gender;
	
	@Column(name = "PROFILEPIC")
	private Blob profilePic;
	
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<EmployeeAddress> employeeAddress;
	
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<EmployeePermissionsMap> employeePermissions;

	public EmployeeInfo() {
		super();
	}
	
	public EmployeeInfo(Tenant tenant, String firstName, String lastName, String emailId, String password,
			String mobile, String designation, boolean active, Date dob, String gender, Blob profilePic,
			List<EmployeeAddress> employeeAddress, List<EmployeePermissionsMap> employeePermissions) {
		super();
		this.tenant = tenant;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.password = password;
		this.mobile = mobile;
		this.designation = designation;
		this.active = active;
		this.dob = dob;
		this.gender = gender;
		this.profilePic = profilePic;
		this.employeeAddress = employeeAddress;
		this.employeePermissions = employeePermissions;
	}

	public Tenant fetchTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
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

	public long getLastLogin() {
		Instant instant = Instant.ofEpochMilli(lastLogin);
		ZoneId zoneId = ZoneId.of(Constants.Asia_Calcutta);
		ZonedDateTime zdt = instant.atZone(zoneId);
		lastLogin = zdt.toInstant().toEpochMilli();
		return lastLogin;
	}

	public void setLastLogin(long lastLogin) {
		Instant instant = Instant.ofEpochMilli(lastLogin);
		ZoneId zoneId = ZoneId.of(Constants.Timezone_UTC);
		ZonedDateTime zdt = instant.atZone(zoneId);
		lastLogin = zdt.toInstant().toEpochMilli();
		this.lastLogin = lastLogin;
	}

	public String getProfilePic() {
		if (profilePic != null) {
			InputStream in;
			StringBuilder base64 = new StringBuilder();
			try {
				in = profilePic.getBinaryStream();
				base64 = new StringBuilder("data:image/jpeg;base64,");
				base64.append(Base64.getEncoder().encodeToString(ByteStreams.toByteArray(in)));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return base64.toString();
		}
		return null;
	}

	public void setProfilePic(Blob profilePic) {
		this.profilePic = profilePic;
	}

	public List<EmployeeAddress> getEmployeeAddress() {
		return employeeAddress;
	}

	public void setEmployeeAddress(List<EmployeeAddress> employeeAddress) {
		this.employeeAddress = employeeAddress;
	}

	public List<EmployeePermissionsMap> getEmployeePermissions() {
		return employeePermissions;
	}

	public void setEmployeePermissions(List<EmployeePermissionsMap> employeePermissions) {
		this.employeePermissions = employeePermissions;
	}

	public String fetchPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isLoggedIn() {
		return isLoggedIn;
	}

	public void setLoggedIn(boolean isLoggedIn) {
		this.isLoggedIn = isLoggedIn;
	}


	public Date getDob() {
		return dob;
	}


	public void setDob(Date dob) {
		this.dob = dob;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}

}
