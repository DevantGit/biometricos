package com.mx.devant.fabrica.biometrico.biometricos.service;

import java.util.List;

import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;

public interface ControlAsistenciaMensualService {

	public List<UserDevantTrimestre> getUserAsistenciaMensualFabrica() throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getUserAsistenciaMensualAdministracion()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getUserAsistenciaMensualAdmin() throws Exception, ControlUserNotFoundException;
}
