package com.backend.persistence.app.entity;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;
import java.util.List;

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

import com.backend.persistence.base.entity.Tenant;
import com.backend.persistence.base.interfaces.User;

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
	private Date lastLogin;
	
	@Column(name = "LOGINVIA")
	private String loginVia;
	
	@Column(name = "PROFILEPIC")
	private Blob profilePic;
	
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<EmployeeAddress> employeeAddress;
	
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<EmployeePermissionsMap> employeePermissions;

	public EmployeeInfo() {
		super();
	}

	public EmployeeInfo(Tenant tenant, String firstName, String lastName, String emailId, String mobile,
			String password, String designation, boolean active, Date lastLogin, Blob profilePic, String loginVia) {
		super();
		this.tenant = tenant;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.password = password;
		this.mobile = mobile;
		this.designation = designation;
		this.active = active;
		this.lastLogin = lastLogin;
		this.profilePic = profilePic;
		this.loginVia = loginVia;
	}
	
	public Tenant getTenant() {
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

	public String getLoginVia() {
		return loginVia;
	}

	public void setLoginVia(String loginVia) {
		this.loginVia = loginVia;
	}
	
	/**
	 * Perform default actions before final persist.
	 */
	@PrePersist
	private void prePersistEmployeeInfo() {
		if(getLastLogin() == null) {
			setLastLogin(new Date());
		}
	}

}
