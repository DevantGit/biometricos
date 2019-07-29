package com.mx.devant.fabrica.biometrico.biometricos.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.devant.fabrica.biometrico.biometricos.dto.DateDataObj;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlUserService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/contro-asistencia-devant")
public class ControlUserRestController {
	
	@Autowired
	private ControlUserService controlUserService;
	
	@GetMapping("/user-devant/{userName}")
	public List<UserDevant> getAllUser(@PathVariable String userName) throws Exception{
		List<UserDevant> users= controlUserService.getUserInfoByName(userName);
		return users;
	}
	
	@PostMapping("/user-devant")
	public List<UserDevant> getUserDevantId(@RequestBody DateDataObj date) throws Exception{
		List<UserDevant> users = null;
		users = controlUserService.getUserDevant(date);
		if(ObjectUtils.isEmpty(users)) {
			throw new ControlUserNotFoundException("Usuario no encontrado "+date.getUserId());
		}
		return users;
	}
	
	@GetMapping("/user-devant-asistencia")
	public List<UserDevant> getUserDevantAsistencia() throws Exception{
		List<UserDevant> user = null;
		user = controlUserService.getAllUserDevat();
		return user;		
	}
	
}
