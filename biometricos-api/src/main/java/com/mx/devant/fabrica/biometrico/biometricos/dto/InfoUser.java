package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;

public class InfoUser implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5925469741683877179L;
	private String name;
	private String infoCheck;
	private String hours;
	private Integer userId;
	
	public InfoUser() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInfoCheck() {
		return infoCheck;
	}

	public void setInfoCheck(String infoCheck) {
		this.infoCheck = infoCheck;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getHours() {
		return hours;
	}

	public void setHours(String hours) {
		this.hours = hours;
	}

}
