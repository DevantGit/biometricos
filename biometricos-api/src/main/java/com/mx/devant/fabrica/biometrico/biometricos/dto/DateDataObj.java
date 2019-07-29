package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;

public class DateDataObj implements Serializable{

	private static final long serialVersionUID = -7695604716368122850L;
	private int userId;
	private String fechainicio;
	private String fechaFin;
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getFechainicio() {
		return fechainicio;
	}
	public void setFechainicio(String fechainicio) {
		this.fechainicio = fechainicio;
	}
	public String getFechaFin() {
		return fechaFin;
	}
	public void setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
	}

	
}
