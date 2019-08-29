package com.mx.devant.fabrica.biometrico.biometricos.service.impl;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.mx.devant.fabrica.biometrico.biometricos.config.ControllerDb;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlAsistenciaMensualService;
import com.mx.devant.fabrica.biometrico.biometricos.utils.ControlBiometricoUtil;

@Service
public class ControlAsistenciaMensualServiceImpl implements ControlAsistenciaMensualService {
	
	@Autowired
	public ControllerDb controllerDB;
	
	@Override
	public List<UserDevantTrimestre> getUserAsistenciaMensualFabrica() throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO WHERE DEFAULTDEPTID = 20";
		List<UserDevantTrimestre> listUserDev = new ArrayList<UserDevantTrimestre>();
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;

		try {

			rs = controllerDB.mandarSql(sql);

			while (rs.next()) {
				UserDevantTrimestre user = new UserDevantTrimestre();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6));
				if (StringUtils.equals(user.getTitle(), "BAJA")) {
				} else {
					listUserDev.add(user);
				}

			}

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.DAY_OF_MONTH, 1);
			String primerDiaMes = sdf.format(calendar.getTime());

			int month = calendar.get(Calendar.MONTH);
			int anio = calendar.get(Calendar.YEAR);
			calendar.set(anio, month, 1);
			int ultimoDiaMes = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

			String dayCut = primerDiaMes.substring(0, 2);
			String mes = primerDiaMes.substring(3, 5);
			String ano = primerDiaMes.substring(6, 10);

			String fechaFinal = ano.concat("-").concat(mes).concat("-").concat(String.valueOf(ultimoDiaMes));
			String fechaInicial = ano.concat("-").concat(mes).concat("-").concat(String.valueOf(dayCut));

			for (UserDevantTrimestre us : listUserDev) {

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), fechaInicial, fechaFinal));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					if (!us.getLvlOne().get(0).getDate().equals("--")) {
						ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), fechaInicial, fechaFinal);
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}
	
	@Override
	public List<UserDevantTrimestre> getUserAsistenciaMensualAdministracion()
			throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO WHERE DEFAULTDEPTID = 21";
		List<UserDevantTrimestre> listUserDev = new ArrayList<UserDevantTrimestre>();
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;

		try {

			rs = controllerDB.mandarSql(sql);

			while (rs.next()) {
				UserDevantTrimestre user = new UserDevantTrimestre();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6));
				if (StringUtils.equals(user.getTitle(), "BAJA")) {
				} else {
					listUserDev.add(user);
				}

			}

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.DAY_OF_MONTH, 1);
			String primerDiaMes = sdf.format(calendar.getTime());

			int month = calendar.get(Calendar.MONTH);
			int anio = calendar.get(Calendar.YEAR);
			calendar.set(anio, month, 1);
			int ultimoDiaMes = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

			String dayCut = primerDiaMes.substring(0, 2);
			String mes = primerDiaMes.substring(3, 5);
			String ano = primerDiaMes.substring(6, 10);

			String fechaFinal = ano.concat("-").concat(mes).concat("-").concat(String.valueOf(ultimoDiaMes));
			String fechaInicial = ano.concat("-").concat(mes).concat("-").concat(String.valueOf(dayCut));

			for (UserDevantTrimestre us : listUserDev) {

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), fechaInicial, fechaFinal));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					if (!us.getLvlOne().get(0).getDate().equals("--")) {
						ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), fechaInicial, fechaFinal);
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getUserAsistenciaMensualAdmin() throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO WHERE DEFAULTDEPTID = 22";
		List<UserDevantTrimestre> listUserDev = new ArrayList<UserDevantTrimestre>();
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;

		try {

			rs = controllerDB.mandarSql(sql);

			while (rs.next()) {
				UserDevantTrimestre user = new UserDevantTrimestre();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6));
				if (StringUtils.equals(user.getTitle(), "BAJA")) {
				} else {
					listUserDev.add(user);
				}

			}

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.DAY_OF_MONTH, 1);
			String primerDiaMes = sdf.format(calendar.getTime());

			int month = calendar.get(Calendar.MONTH);
			int anio = calendar.get(Calendar.YEAR);
			calendar.set(anio, month, 1);
			int ultimoDiaMes = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

			String dayCut = primerDiaMes.substring(0, 2);
			String mes = primerDiaMes.substring(3, 5);
			String ano = primerDiaMes.substring(6, 10);

			String fechaFinal = ano.concat("-").concat(mes).concat("-").concat(String.valueOf(ultimoDiaMes));
			String fechaInicial = ano.concat("-").concat(mes).concat("-").concat(String.valueOf(dayCut));

			for (UserDevantTrimestre us : listUserDev) {

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), fechaInicial, fechaFinal));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					if (!us.getLvlOne().get(0).getDate().equals("--")) {
						ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), fechaInicial, fechaFinal);
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}


}
