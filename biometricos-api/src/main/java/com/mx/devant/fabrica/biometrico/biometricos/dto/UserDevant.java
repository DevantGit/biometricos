package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;
import java.util.List;

public class UserDevant implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8929139644582186850L;
	
	private Integer userID;
	private Integer badgerNumber;
	private String name;
	private String title;
	private List<UserAssistanceDate> checkInOut;
	private List<CheckInOutDTO> checkDTO ;
	private String fechaIngreso;
	private String fechaSalida;
	private String statusIngreso;
	private String horaIn;
	private String horaOut;
	private String fechaFormt;
	
	public Integer getUserID() {
		return userID;
	}
	public void setUserID(Integer userID) {
		this.userID = userID;
	}
	public Integer getBadgerNumber() {
		return badgerNumber;
	}
	public void setBadgerNumber(Integer badgerNumber) {
		this.badgerNumber = badgerNumber;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<UserAssistanceDate> getCheckInOut() {
		return checkInOut;
	}
	public void setCheckInOut(List<UserAssistanceDate> checkInOut) {
		this.checkInOut = checkInOut;
	}
	public List<CheckInOutDTO> getCheckDTO() {
		return checkDTO;
	}
	public void setCheckDTO(List<CheckInOutDTO> checkDTO) {
		this.checkDTO = checkDTO;
	}
	public String getFechaIngreso() {
		return fechaIngreso;
	}
	public void setFechaIngreso(String fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}
	public String getFechaSalida() {
		return fechaSalida;
	}
	public void setFechaSalida(String fechaSalida) {
		this.fechaSalida = fechaSalida;
	}
	public String getStatusIngreso() {
		return statusIngreso;
	}
	public void setStatusIngreso(String statusIngreso) {
		this.statusIngreso = statusIngreso;
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
	public String getFechaFormt() {
		return fechaFormt;
	}
	public void setFechaFormt(String fechaFormt) {
		this.fechaFormt = fechaFormt;
	}
	
}
