package com.backend.core.entity;

import java.io.InputStream;
import java.io.Serializable;
import java.sql.Blob;
import java.util.Base64;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.io.ByteStreams;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "TENANTDETAILS")
public class TenantDetails implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="TENANTDETAILID")
	private Integer tenantDetailId;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenantID;
	
	@Column(name = "TENANTCONTACT")
	private String tenantContact;
	
	@Column(name = "TENANTEMAIL")
	private String tenantEmail;
	
	@Column(name = "TENANTSTREET")
	private String tenantStreet;
	
	@Column(name = "TENANTCITY")
	private String tenantCity;
	
	@Column(name = "TENANTPIN")
	private String tenantPin;
	
	@Column(name = "TENANTLOGO")
	private Blob tenantLogo;
	
	@Column(name = "TENANTFACEBOOK")
	private String tenantFacebook;
	
	@Column(name = "TENANTTWITTER")
	private String tenantTwitter;
	
	@Column(name = "TENANTINSTA")
	private String tenantInsta;
	
	public Integer getTenantDetailId() {
		return tenantDetailId;
	}

	public void setTenantDetailId(Integer tenantDetailId) {
		this.tenantDetailId = tenantDetailId;
	}

	public Tenant getTenantID() {
		return tenantID;
	}

	public void setTenantID(Tenant tenantID) {
		this.tenantID = tenantID;
	}

	public String getTenantContact() {
		return tenantContact;
	}

	public void setTenantContact(String tenantContact) {
		this.tenantContact = tenantContact;
	}

	public String getTenantEmail() {
		return tenantEmail;
	}

	public void setTenantEmail(String tenantEmail) {
		this.tenantEmail = tenantEmail;
	}

	public String getTenantStreet() {
		return tenantStreet;
	}

	public void setTenantStreet(String tenantStreet) {
		this.tenantStreet = tenantStreet;
	}

	public String getTenantCity() {
		return tenantCity;
	}

	public void setTenantCity(String tenantCity) {
		this.tenantCity = tenantCity;
	}

	public String getTenantPin() {
		return tenantPin;
	}

	public void setTenantPin(String tenantPin) {
		this.tenantPin = tenantPin;
	}

	public String fetchTenantLogo() {
		if (tenantLogo != null) {
			InputStream in;
			StringBuilder base64 = new StringBuilder();
			try {
				in = tenantLogo.getBinaryStream();
				base64 = new StringBuilder("data:image/jpeg;base64,");
				base64.append(Base64.getEncoder().encodeToString(ByteStreams.toByteArray(in)));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return base64.toString();
		}
		return null;
	}
	
	public Blob fetchTenantLogoBlob() {
		return tenantLogo;
	}

	public void setTenantLogo(Blob tenantLogo) {
		this.tenantLogo = tenantLogo;
	}

	public String getTenantFacebook() {
		return tenantFacebook;
	}

	public void setTenantFacebook(String tenantFacebook) {
		this.tenantFacebook = tenantFacebook;
	}

	public String getTenantTwitter() {
		return tenantTwitter;
	}

	public void setTenantTwitter(String tenantTwitter) {
		this.tenantTwitter = tenantTwitter;
	}

	public String getTenantInsta() {
		return tenantInsta;
	}

	public void setTenantInsta(String tenantInsta) {
		this.tenantInsta = tenantInsta;
	}

}
