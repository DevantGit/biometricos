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
	private List<CheckInOutDTO> checkDTO;
	private UserDevantInfoDate userInfoDate;
	private String fechaIngreso;
	private String fechaSalida;
	private String statusIngreso;
	private String horaIn;
	private String horaOut;
	private String fechaFormt;
	private Integer regTiempo;
	private Integer regRetraso;
	private Integer regFalta;
	private String departamento;
	private String noTarjeta;
	
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
	public UserDevantInfoDate getUserInfoDate() {
		return userInfoDate;
	}
	public void setUserInfoDate(UserDevantInfoDate userInfoDate) {
		this.userInfoDate = userInfoDate;
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
	
	public String getDepartamento() {
		return departamento;
	}
	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	public String getNoTarjeta() {
		return noTarjeta;
	}
	public void setNoTarjeta(String noTarjeta) {
		this.noTarjeta = noTarjeta;
	}
}
