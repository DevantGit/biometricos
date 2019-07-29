package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;

public class UserAssistanceDate implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7346529869380061872L;
	
	private Integer userID;
	private CheckInOutDTO checkIn;
	private CheckInOutDTO checkOut;
	private String horaIn;
	private String horaOut;
	private String fechaForm;

	public UserAssistanceDate() {
		// TODO Auto-generated constructor stub
	}

	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public CheckInOutDTO getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(CheckInOutDTO checkIn) {
		this.checkIn = checkIn;
	}

	public CheckInOutDTO getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(CheckInOutDTO checkOut) {
		this.checkOut = checkOut;
	}

	public String getHoraIn() {
		return horaIn;
	}

	public void setHoraIn(String horaIn) {
		this.horaIn = horaIn;
	}

	public String getHoraOut() {
		return horaOut;
	}

	public void setHoraOut(String horaOut) {
		this.horaOut = horaOut;
	}

	public String getFechaForm() {
		return fechaForm;
	}

	public void setFechaForm(String fechaForm) {
		this.fechaForm = fechaForm;
	}
}
