package com.mx.devant.fabrica.biometrico.biometricos.config;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerDb {
	
	@Autowired
	private ConnectionDB con;
	
	public ControllerDb() {
		this.con = new ConnectionDB();
	}
	
	public void crearConexion() {
		this.con.establecerConexion();
	}
	
	public void cerrarConexion() {
		this.con.cerrarConexion();
	}
	
	public ResultSet mandarSql(String sql) throws SQLException {
		ResultSet aux_result = this.con.ejecutarSentencia(sql);
		return aux_result;
	}
	
	public int mandarSqlINSERT(String sql) throws SQLException {
		int aux_result = this.con.ejecutarINSERTSentencia(sql);
		return aux_result;
	}
}
