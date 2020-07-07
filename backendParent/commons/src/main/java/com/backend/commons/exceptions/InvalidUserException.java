package com.backend.commons.exceptions;

/**
 * @author Muhil
 *
 */
public class InvalidUserException extends Exception {

	private static final long serialVersionUID = 1L;

	public InvalidUserException(String msg) {
		super(msg);
	}
	
}
