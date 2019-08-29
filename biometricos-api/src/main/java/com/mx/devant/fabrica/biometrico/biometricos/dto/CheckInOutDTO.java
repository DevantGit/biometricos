package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;


public class CheckInOutDTO implements Serializable{

	private static final long serialVersionUID = 4116470496775982859L;
	
	private Integer userID;
	private String date;
	private String fechaIn;
	private String fechaOut;
	private String dateFormat;
	private String statusIngreso;
	private Integer regTiempo;
	private Integer regRetraso;
	private Integer regFalta;
	
	public Integer getUserID() {
		return userID;
	}
	public void setUserID(Integer userID) {
		this.userID = userID;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDateFormat() {
		return dateFormat;
	}
	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
	public String getFechaIn() {
		return fechaIn;
	}
	public void setFechaIn(String fechaIn) {
		this.fechaIn = fechaIn;
	}
	public String getFechaOut() {
		return fechaOut;
	}
	public void setFechaOut(String fechaOut) {
		this.fechaOut = fechaOut;
	}
	public String getStatusIngreso() {
		return statusIngreso;
	}
	public void setStatusIngreso(String statusIngreso) {
		this.statusIngreso = statusIngreso;
	}
	public Integer getRegTiempo() {
		return regTiempo;
	}
	public void setRegTiempo(Integer regTiempo) {
		this.regTiempo = regTiempo;
	}
	public Integer getRegRetraso() {
		return regRetraso;
	}
	public void setRegRetraso(Integer regRetraso) {
		this.regRetraso = regRetraso;
	}
	public Integer getRegFalta() {
		return regFalta;
	}
	public void setRegFalta(Integer regFalta) {
		this.regFalta = regFalta;
	}
	
}
