package com.mx.devant.fabrica.biometrico.biometricos.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

@Repository
public class ConnectionDB {
	
	private Connection conexion;
	private Statement sentencia;
	
	private String controlador = "";
	private String nombre_bd = "";
	private String usuario = "";
	private String password = "";
	
	public ConnectionDB() {
		this.controlador = "net.ucanaccess.jdbc.UcanaccessDriver";
		this.nombre_bd = "C:\\Users\\Equipo\\Documents\\Aplicacion Biometrico\\ATT2000.MDB";
		this.usuario="";
		this.password="";
	}
	
	public boolean establecerConexion() {
		try {
			conexion=DriverManager.getConnection("jdbc:ucanaccess://Z:\\Aplicacion Biometrico\\19-7-19\\ATT2000.MDB");
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		try {
			this.sentencia = this.conexion.createStatement(
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public boolean cerrarConexion() {
		try {
			conexion.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public ResultSet ejecutarSentencia(String sql) throws SQLException {
		ResultSet rs;
		rs = this.sentencia.executeQuery(sql);
		return rs;
	}
	
}
