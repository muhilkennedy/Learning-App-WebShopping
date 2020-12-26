package com.backend.persistence.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Blob;
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
import javax.persistence.Table;

import com.backend.core.entity.Tenant;
import com.backend.core.interfaces.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "CUSTOMERINFO")
public class CustomerInfo implements Serializable, User {

	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CUSTOMERID")
	private int customerId;

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

	@Column(name = "ACTIVE")
	private boolean active;

	@Column(name = "LASTLOGIN")
	private long lastLogin;

	@Column(name = "PROFILEPIC")
	private Blob profilePic;

	@Column(name = "LOGINVIA")
	private String loginMode;

	@Column(name = "PROFILEPICURL")
	private String profilePicUrl;
	
	@Column(name = "LOYALITYPOINT")
	private BigDecimal loyalitypoint;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<CustomerAddress> customerAddress;

	public CustomerInfo() {
		super();
	}

	public CustomerInfo(Tenant tenant, String firstName, String lastName, String emailId, String password,
			String mobile, boolean active, long lastLogin, Blob profilePic, String loginMode, String profilePicUrl,
			List<CustomerAddress> customerAddress) {
		super();
		this.tenant = tenant;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.password = password;
		this.mobile = mobile;
		this.active = active;
		this.lastLogin = lastLogin;
		this.profilePic = profilePic;
		this.loginMode = loginMode;
		this.profilePicUrl = profilePicUrl;
		this.customerAddress = customerAddress;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
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

	public String fetchPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	public String getMobile() throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException,
//			NoSuchAlgorithmException, NoSuchPaddingException {
//		return StringUtils.isNotEmpty(mobile) ? RSAUtil.decrypt(this.mobile) : null;
//	}
	
//	public String getMobileWithOutEncryption() {
//		return this.mobile;
//	}

//	public void setMobileEncrypted(String mobile) throws InvalidKeyException, BadPaddingException, IllegalBlockSizeException,
//			NoSuchPaddingException, NoSuchAlgorithmException {
//		this.mobile = StringUtils.isNotEmpty(mobile) ? Base64.getEncoder().encodeToString(RSAUtil.encrypt(mobile))
//				: null;
//	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public long getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(long lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Blob getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(Blob profilePic) {
		this.profilePic = profilePic;
	}

	public String getLoginMode() {
		return loginMode;
	}

	public void setLoginMode(String loginMode) {
		this.loginMode = loginMode;
	}

	public String getProfilePicUrl() {
		return profilePicUrl;
	}

	public void setProfilePicUrl(String profilePicUrl) {
		this.profilePicUrl = profilePicUrl;
	}

	public List<CustomerAddress> getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(List<CustomerAddress> customerAddress) {
		this.customerAddress = customerAddress;
	}

	public BigDecimal getLoyalitypoint() {
		return loyalitypoint;
	}

	public void setLoyalitypoint(BigDecimal loyalitypoint) {
		this.loyalitypoint = loyalitypoint;
	}

}
