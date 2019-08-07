package com.mx.devant.fabrica.biometrico.biometricos.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mx.devant.fabrica.biometrico.biometricos.dto.DateDataObj;
import com.mx.devant.fabrica.biometrico.biometricos.dto.InfoUser;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlUserService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/contro-asistencia-devant")
public class ControlUserRestController {
	
	@Autowired
	private ControlUserService controlUserService;
	
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
	
	@RequestMapping(value = "/user-devant-validar-horario", method = RequestMethod.GET, consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserDevant> getUserDevantAsistencia() throws Exception{
		List<UserDevant> user = null;
		user = controlUserService.getAllUserDevat();
		return user;		
	}
	
	@RequestMapping(value = "/user-devant-validar-horario", method = RequestMethod.POST, consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InfoUser> getValidateSchedules(@RequestBody DateDataObj date) throws Exception{
		List<InfoUser> user = null;
		return null;
	}
	
}
