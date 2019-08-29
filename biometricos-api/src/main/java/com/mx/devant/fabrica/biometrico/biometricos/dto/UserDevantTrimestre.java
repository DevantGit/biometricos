package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;
import java.util.List;

public class UserDevantTrimestre implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4572063444589168824L;
	
	private Integer userID;
	private Integer badgerNumber;
	private String name;
	private String title;
	private String departamento;
	private String noTarjeta;
	private List<CheckInOutDTO> lvlOne;
	private List<CheckInOutDTO> lvlTwo;
	private List<CheckInOutDTO> lvlTree;
	
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
	public List<CheckInOutDTO> getLvlOne() {
		return lvlOne;
	}
	public void setLvlOne(List<CheckInOutDTO> lvlOne) {
		this.lvlOne = lvlOne;
	}
	public List<CheckInOutDTO> getLvlTwo() {
		return lvlTwo;
	}
	public void setLvlTwo(List<CheckInOutDTO> lvlTwo) {
		this.lvlTwo = lvlTwo;
	}

	public List<CheckInOutDTO> getLvlTree() {
		return lvlTree;
	}
	public void setLvlTree(List<CheckInOutDTO> lvlTree) {
		this.lvlTree = lvlTree;
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
