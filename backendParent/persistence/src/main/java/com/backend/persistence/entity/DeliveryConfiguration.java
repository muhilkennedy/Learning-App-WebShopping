package com.backend.persistence.entity;

import java.io.Serializable;

/**
 * @author Muhil
 * 
 *DeliveryConfiguration is not declared as entity to avoid multiple key
 *generations and handled DB txns in DAO.
 *
 */
public class DeliveryConfiguration implements Serializable {

	private static final long serialVersionUID = 1L;

	private String tenantid;
	private String pincode;
	private int deliverycharge;
	private int minimumamtforfreedelivery;
	private String deliveryfromtime;
	private String deliverytilltime;
	private int minimumdeliveryhours;
	private boolean active;

	public String getTenantid() {
		return tenantid;
	}

	public void setTenantid(String tenantid) {
		this.tenantid = tenantid;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public int getDeliverycharge() {
		return deliverycharge;
	}

	public void setDeliverycharge(int deliverycharge) {
		this.deliverycharge = deliverycharge;
	}

	public int getMinimumamtforfreedelivery() {
		return minimumamtforfreedelivery;
	}

	public void setMinimumamtforfreedelivery(int minimumamtforfreedelivery) {
		this.minimumamtforfreedelivery = minimumamtforfreedelivery;
	}

	public String getDeliveryfromtime() {
		return deliveryfromtime;
	}

	public void setDeliveryfromtime(String deliveryfromtime) {
		this.deliveryfromtime = deliveryfromtime;
	}

	public String getDeliverytilltime() {
		return deliverytilltime;
	}

	public void setDeliverytilltime(String deliverytilltime) {
		this.deliverytilltime = deliverytilltime;
	}

	public int getMinimumdeliveryhours() {
		return minimumdeliveryhours;
	}

	public void setMinimumdeliveryhours(int minimumdeliveryhours) {
		this.minimumdeliveryhours = minimumdeliveryhours;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
