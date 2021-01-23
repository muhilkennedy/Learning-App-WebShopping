package com.backend.persistence.entity;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.backend.core.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Muhil
 *
 */
@Entity
@Table(name = "ORDERINVOICE")
public class OrderInvoice implements Serializable {
		
		private static final long serialVersionUID = 1L;
		
		@JsonIgnore
		@ManyToOne
		@JoinColumn(name = "TENANTID", nullable = false)
		private Tenant tenant;
		
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		@Column(name = "USERINVOICEID")
		private Long invoiceId;
		
		@Column(name = "DOCUMENT")
		private Blob document;
		
		@JsonIgnore
		@OneToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "ORDERID", nullable = false)
	    private Orders orderId;

		public Long getInvoiceId() {
			return invoiceId;
		}

		public void setInvoiceId(Long invoiceId) {
			this.invoiceId = invoiceId;
		}

		public Blob getDocument() {
			return document;
		}

		public void setDocument(Blob document) {
			this.document = document;
		}

		public Orders getOrderId() {
			return orderId;
		}

		public void setOrderId(Orders orderId) {
			this.orderId = orderId;
		}

		public Tenant getTenant() {
			return tenant;
		}

		public void setTenant(Tenant tenant) {
			this.tenant = tenant;
		}

}
