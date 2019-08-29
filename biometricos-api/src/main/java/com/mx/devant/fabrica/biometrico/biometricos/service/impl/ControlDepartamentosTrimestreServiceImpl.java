package com.mx.devant.fabrica.biometrico.biometricos.service.impl;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.mx.devant.fabrica.biometrico.biometricos.config.ControllerDb;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlDepartamentosTrimestresService;
import com.mx.devant.fabrica.biometrico.biometricos.utils.ControlBiometricoUtil;

@Service
public class ControlDepartamentosTrimestreServiceImpl implements ControlDepartamentosTrimestresService {
	
	@Autowired
	public ControllerDb controllerDB;
	
	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdministracionPrimerTrimestre()
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-01-01";
				String lvlOne2 = "2019-01-31";

				String lvlTwo = "2019-02-01";
				String lvlTwo2 = "2019-02-28";

				String lvlTree = "2019-03-01";
				String lvlTree2 = "2019-03-31";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdministracionSegundoTrimestre()
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-04-01";
				String lvlOne2 = "2019-04-30";

				String lvlTwo = "2019-05-01";
				String lvlTwo2 = "2019-05-31";

				String lvlTree = "2019-06-01";
				String lvlTree2 = "2019-06-30";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdministracionTercerTrimestre()
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-07-01";
				String lvlOne2 = "2019-07-31";

				String lvlTwo = "2019-08-01";
				String lvlTwo2 = "2019-08-31";

				String lvlTree = "2019-09-01";
				String lvlTree2 = "2019-09-30";


				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdministracionCuartoTrimestre()
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-10-01";
				String lvlOne2 = "2019-10-31";

				String lvlTwo = "2019-11-01";
				String lvlTwo2 = "2019-11-30";

				String lvlTree = "2019-12-01";
				String lvlTree2 = "2019-12-30";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantFabricaPrimerTrimestre() throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-01-01";
				String lvlOne2 = "2019-01-31";

				String lvlTwo = "2019-02-01";
				String lvlTwo2 = "2019-02-28";

				String lvlTree = "2019-03-01";
				String lvlTree2 = "2019-03-31";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}
	
	
	@Override
	public List<UserDevantTrimestre> getInfoUserDevantFabricaSegundoTrimestre()
			throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-04-01";
				String lvlOne2 = "2019-04-30";

				String lvlTwo = "2019-05-01";
				String lvlTwo2 = "2019-05-31";

				String lvlTree = "2019-06-01";
				String lvlTree2 = "2019-06-30";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantFabricaTercerTrimestre()
			throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-07-01";
				String lvlOne2 = "2019-07-31";

				String lvlTwo = "2019-08-01";
				String lvlTwo2 = "2019-08-31";

				String lvlTree = "2019-09-01";
				String lvlTree2 = "2019-09-30";


				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantFabricaCuartoTrimestre()
			throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-10-01";
				String lvlOne2 = "2019-10-31";

				String lvlTwo = "2019-11-01";
				String lvlTwo2 = "2019-11-30";

				String lvlTree = "2019-12-01";
				String lvlTree2 = "2019-12-30";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}
	
	

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdminPrimerTrimestre() throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-01-01";
				String lvlOne2 = "2019-01-31";

				String lvlTwo = "2019-02-01";
				String lvlTwo2 = "2019-02-28";

				String lvlTree = "2019-03-01";
				String lvlTree2 = "2019-03-31";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdminSegundoTrimestre()
			throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-04-01";
				String lvlOne2 = "2019-04-30";

				String lvlTwo = "2019-05-01";
				String lvlTwo2 = "2019-05-31";

				String lvlTree = "2019-06-01";
				String lvlTree2 = "2019-06-30";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdminTercerTrimestre()
			throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-07-01";
				String lvlOne2 = "2019-07-31";

				String lvlTwo = "2019-08-01";
				String lvlTwo2 = "2019-08-31";

				String lvlTree = "2019-09-01";
				String lvlTree2 = "2019-09-30";


				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

	@Override
	public List<UserDevantTrimestre> getInfoUserDevantAdminCuartoTrimestre()
			throws Exception, ControlUserNotFoundException {
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

			for (UserDevantTrimestre us : listUserDev) {

				String lvlOne = "2019-10-01";
				String lvlOne2 = "2019-10-31";

				String lvlTwo = "2019-11-01";
				String lvlTwo2 = "2019-11-30";

				String lvlTree = "2019-12-01";
				String lvlTree2 = "2019-12-30";

				us.setLvlOne(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlOne, lvlOne2));
				if (!ObjectUtils.isEmpty(us.getLvlOne())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlOne(), lvlOne, lvlOne2);
				}

				us.setLvlTwo(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTwo, lvlTwo2));
				if (!ObjectUtils.isEmpty(us.getLvlTwo())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTwo(), lvlTwo, lvlTwo2);
				}

				us.setLvlTree(ControlBiometricoUtil.getCheckInOut(us.getUserID(), lvlTree, lvlTree2));
				if (!ObjectUtils.isEmpty(us.getLvlTree())) {
					ControlBiometricoUtil.validarInasistencias(us.getLvlTree(), lvlTree, lvlTree2);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}
		return listUserDev;
	}

}
