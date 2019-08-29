package com.mx.devant.fabrica.biometrico.biometricos.service;

import java.util.List;

import com.mx.devant.fabrica.biometrico.biometricos.dto.DateDataObj;
import com.mx.devant.fabrica.biometrico.biometricos.dto.InfoMes;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantAlta;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;

public interface ControlUserBiometricosService {

	public List<UserDevant> getUserInfoByName(String userName) throws Exception, ControlUserNotFoundException;

	public List<UserDevant> getUserDevant(DateDataObj date) throws Exception, ControlUserNotFoundException;

	public List<UserDevant> getAllUserDevat() throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantPrimerTrimestre() throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantSegundoTrimestre() throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantTercerTrimestre() throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantCuartoTrimestre() throws Exception, ControlUserNotFoundException;

	public String addUserDevant(UserDevantAlta alta) throws Exception, ControlUserNotFoundException;
	
	public InfoMes getInfoMonthAndYear()throws ControlUserNotFoundException;

}
