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
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.io.ByteStreams;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "HOMEPAGEMEDIA")
public class HomePageMedia implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="MEDIAID")
	private Long mediaId;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenantID;
	
	@Column(name = "IMAGE")
	private Blob image;

	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "DESCRIPTION")
	private String description;
	
	@Column(name = "MESSAGE")
	private String message;
	
	@Column(name = "SHOPNOW")
	private boolean shopNow;
	
	@Column(name = "CONTACT")
	private boolean contact;
	
	@Column(name = "SLIDESHOW")
	private boolean sliderShow;

	public HomePageMedia() {
		super();
	}
	
	public HomePageMedia(Blob image, String title, String description, String message, boolean shopNow, boolean contact,
			boolean sliderShow) {
		super();
		this.image = image;
		this.title = title;
		this.description = description;
		this.message = message;
		this.shopNow = shopNow;
		this.contact = contact;
		this.sliderShow = sliderShow;
	}

	public Long getMediaId() {
		return mediaId;
	}

	public void setMediaId(Long mediaId) {
		this.mediaId = mediaId;
	}

	public String getImage() {
		if (image != null) {
			InputStream in;
			StringBuilder base64 = new StringBuilder();
			try {
				in = image.getBinaryStream();
				base64 = new StringBuilder("data:image/jpeg;base64,");
				base64.append(Base64.getEncoder().encodeToString(ByteStreams.toByteArray(in)));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return base64.toString();
		}
		return null;
	}

	public void setImage(Blob image) {
		this.image = image;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isShopNow() {
		return shopNow;
	}

	public void setShopNow(boolean shopNow) {
		this.shopNow = shopNow;
	}

	public boolean isContact() {
		return contact;
	}

	public void setContact(boolean contact) {
		this.contact = contact;
	}

	public boolean isSliderShow() {
		return sliderShow;
	}

	public void setSliderShow(boolean sliderShow) {
		this.sliderShow = sliderShow;
	}
	
	public void setTenant(Tenant tenant) {
		this.tenantID = tenant;
	}

}
