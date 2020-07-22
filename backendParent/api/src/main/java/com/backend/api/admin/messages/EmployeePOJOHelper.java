package com.backend.api.admin.messages;

import java.util.List;

public class EmployeePOJOHelper {

	private int employeeId;
	private List<Integer> permissions;
	private boolean active;

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public List<Integer> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Integer> permissions) {
		this.permissions = permissions;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
