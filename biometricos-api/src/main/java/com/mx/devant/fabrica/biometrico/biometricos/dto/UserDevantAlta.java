package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;

public class UserDevantAlta  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5678427994040575969L;

	private String nombre;
	private String fechaNacimiento;
	private String sexo;
	private String noImss;
	private String direccion;
	private String telCasa;
	private String telCelular;
	private String fechaIngreso;
	private String area;
	private String puesto;
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getFechaNacimiento() {
		return fechaNacimiento;
	}
	public void setFechaNacimiento(String fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getNoImss() {
		return noImss;
	}
	public void setNoImss(String noImss) {
		this.noImss = noImss;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getTelCasa() {
		return telCasa;
	}
	public void setTelCasa(String telCasa) {
		this.telCasa = telCasa;
	}
	public String getTelCelular() {
		return telCelular;
	}
	public void setTelCelular(String telCelular) {
		this.telCelular = telCelular;
	}
	public String getFechaIngreso() {
		return fechaIngreso;
	}
	public void setFechaIngreso(String fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getPuesto() {
		return puesto;
	}
	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}

}
