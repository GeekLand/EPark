package com.permession.exception;

/**
 * 权限检测异常
 * 
 * @author weiguangming
 *
 */
public class PermissionCheckException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PermissionCheckException(String exception) {
		super(exception);
	}
}
