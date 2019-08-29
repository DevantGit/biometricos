package com.mx.devant.fabrica.biometrico.biometricos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControlUserRestExceptionHandler {
	
	@ExceptionHandler
	public ResponseEntity<ControlUserErrorResponse> handleException(ControlUserNotFoundException exc){
		
		ControlUserErrorResponse error = new ControlUserErrorResponse(
												HttpStatus.NOT_FOUND.value(), 
												exc.getMessage(),
												System.currentTimeMillis());
		
		return new ResponseEntity<ControlUserErrorResponse>(error, HttpStatus.NOT_FOUND);
		
	}
	
	@ExceptionHandler
	public ResponseEntity<ControlUserErrorResponse> handleException(Exception exc){
		
		ControlUserErrorResponse error = new ControlUserErrorResponse(
												HttpStatus.BAD_REQUEST.value(),
												exc.getMessage(),
												System.currentTimeMillis());
		
		return new ResponseEntity<ControlUserErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}

}
