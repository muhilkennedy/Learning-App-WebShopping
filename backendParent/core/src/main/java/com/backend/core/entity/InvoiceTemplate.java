package com.backend.core.entity;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "INVOICETEMPLATE")
public class InvoiceTemplate  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TENANTID", nullable = false)
	private Tenant tenant;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "INVOICEID")
	private Long invoiceId;
	
	@Column(name = "ACTIVE")
	private boolean active;
	
	@Column(name = "DOCUMENT")
	private Blob document;
	
	@Column(name = "POSDOCUMENT")
	private Blob posDocument;
	
	public InvoiceTemplate() {
		super();
	}

	public InvoiceTemplate(Tenant tenant, Long invoiceId, boolean active, Blob document) {
		super();
		this.tenant = tenant;
		this.invoiceId = invoiceId;
		this.active = active;
		this.document = document;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public Long getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Blob getDocument() {
		return document;
	}

	public void setDocument(Blob document) {
		this.document = document;
	}

	public Blob getPosDocument() {
		return posDocument;
	}

	public void setPosDocument(Blob posDocument) {
		this.posDocument = posDocument;
	}

}
