package com.mx.devant.fabrica.biometrico.biometricos.service;

import java.util.List;

import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;

public interface ControlDepartamentosTrimestresService {

	public List<UserDevantTrimestre> getInfoUserDevantAdministracionPrimerTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdministracionSegundoTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdministracionTercerTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdministracionCuartoTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantFabricaPrimerTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantFabricaSegundoTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantFabricaTercerTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantFabricaCuartoTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdminPrimerTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdminSegundoTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdminTercerTrimestre()
			throws Exception, ControlUserNotFoundException;

	public List<UserDevantTrimestre> getInfoUserDevantAdminCuartoTrimestre()
			throws Exception, ControlUserNotFoundException;

}
