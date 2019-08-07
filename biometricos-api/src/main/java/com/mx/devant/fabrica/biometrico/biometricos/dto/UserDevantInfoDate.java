package com.mx.devant.fabrica.biometrico.biometricos.dto;

import java.io.Serializable;
import java.util.List;

public class UserDevantInfoDate implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4227878362766038744L;

	private List<InfoUser> timeOffice;
	private List<InfoUser> delays;
	private List<InfoUser> absence ;

	public UserDevantInfoDate() {
		
	}

	public List<InfoUser> getTimeOffice() {
		return timeOffice;
	}

	public void setTimeOffice(List<InfoUser> timeOffice) {
		this.timeOffice = timeOffice;
	}

	public List<InfoUser> getAbsence() {
		return absence;
	}

	public void setAbsence(List<InfoUser> absence) {
		this.absence = absence;
	}

	public List<InfoUser> getDelays() {
		return delays;
	}

	public void setDelays(List<InfoUser> delays) {
		this.delays = delays;
	}

}
