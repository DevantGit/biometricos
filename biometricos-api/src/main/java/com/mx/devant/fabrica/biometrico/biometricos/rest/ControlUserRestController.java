package com.mx.devant.fabrica.biometrico.biometricos.rest;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mx.devant.fabrica.biometrico.biometricos.dto.DateDataObj;
import com.mx.devant.fabrica.biometrico.biometricos.dto.InfoMes;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantAlta;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlAsistenciaMensualService;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlDepartamentosTrimestresService;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlUserBiometricosService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/contro-asistencia-devant")
public class ControlUserRestController {
	
	@Autowired
	private ControlUserBiometricosService controlUserService;
	
	@Autowired
	private ControlAsistenciaMensualService controlAsistenciaMes;
	
	@Autowired
	private ControlDepartamentosTrimestresService controlDepartamentosTri;
	
	@RequestMapping(value = "/user-devant/{userName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevant> getAllUser(@PathVariable String userName) throws Exception{
		List<UserDevant> users= controlUserService.getUserInfoByName(userName);
		return users;
	}
	
	@RequestMapping(value = "/user-devant", method = RequestMethod.POST, consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevant> getUserDevantId(@RequestBody DateDataObj date) throws Exception{
		List<UserDevant> users = null;
		users = controlUserService.getUserDevant(date);
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Usuario no encontrado "+date.getUserId());
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant-alta", method = RequestMethod.POST, consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	public String addUserDevant(@RequestBody UserDevantAlta alta)throws Exception{
		controlUserService.addUserDevant(alta);
		return null; // -> response ?
	}
	
	@RequestMapping(value = "/user-devant-asistencia", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevant> getUserDevantAsistencia() throws Exception{
		List<UserDevant> user = null;
		user = controlUserService.getAllUserDevat();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Usuario no encontrado ");
		}
		return user;		
	}
	
	@RequestMapping(value = "/user-devant-asistencia-mes-fabrica", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getUserDevantAsistenciaMesFabrica() throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlAsistenciaMes.getUserAsistenciaMensualFabrica();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return user;
	}
	
	@RequestMapping(value = "/user-devant-asistencia-mes-administracion", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getUserDevantAsistenciaMesAdministracion() throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlAsistenciaMes.getUserAsistenciaMensualAdministracion();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return user;
	}
	
	@RequestMapping(value = "/user-devant-asistencia-mes-admin", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getUserDevantAsistenciaMesAdmin() throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlAsistenciaMes.getUserAsistenciaMensualAdmin();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return user;
	}
	
	@RequestMapping(value = "/user-devant/primer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getPrimerTrimestre() throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlUserService.getInfoUserDevantPrimerTrimestre();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Usuario no encontrado ");
		}
		return user;
	}
	
	@RequestMapping(value = "/user-devant/segundo-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getSegundoTrimestre() throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlUserService.getInfoUserDevantSegundoTrimestre();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return user;
	}
	
	@RequestMapping(value= "/user-devant/tercer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getTercerTrimestre()throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlUserService.getInfoUserDevantTercerTrimestre();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return user;
	}
	
	@RequestMapping(value = "/user-devant/cuarto-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getCuartoTrimestre() throws Exception{
		List<UserDevantTrimestre> user = null;
		user = controlUserService.getInfoUserDevantCuartoTrimestre();
		if(ObjectUtils.isEmpty(user)) {
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return user;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-administracion/primer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdministracion()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdministracionPrimerTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-administracion/segundo-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdministracionSegundoTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdministracionSegundoTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-administracion/tercer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdministracionTercerTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdministracionTercerTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-administracion/cuarto-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdministracionCuartoTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdministracionCuartoTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	
	@RequestMapping(value = "/user-devant/info-resporte-fabrica-software/primer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteFabricaSwPrimer()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantFabricaPrimerTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-fabrica-software/segundo-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteFabricaSwSegundo()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantFabricaSegundoTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-fabrica-software/tercer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteFabricaSwTercer()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantFabricaTercerTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-fabrica-software/cuarto-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteFabricaSwCuarto()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantFabricaCuartoTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	
	@RequestMapping(value = "/user-devant/info-resporte-admin/primer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdminPrimerTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdminPrimerTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-admin/segundo-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdminSegundoTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdminSegundoTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-admin/tercer-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdminTercerTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdminTercerTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-resporte-admin/cuarto-trimestre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevantTrimestre> getInfoReporteAdminCuartoTri()throws Exception{
		List<UserDevantTrimestre> users = null;
		users = controlDepartamentosTri.getInfoUserDevantAdminCuartoTrimestre();
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Reporte no encontrado");
		}
		return users;
	}
	
	@RequestMapping(value = "/user-devant/info-mes", method = RequestMethod.GET)
	public InfoMes getInfoMes()throws Exception{
		InfoMes info = controlUserService.getInfoMonthAndYear();
		if(org.apache.commons.lang.ObjectUtils.equals(null, info)) {
			throw new ControlUserNotFoundException("Error mes inesperado");
		}
		return info;
	}
	
}
