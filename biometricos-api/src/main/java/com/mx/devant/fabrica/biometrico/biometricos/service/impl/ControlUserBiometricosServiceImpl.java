package com.mx.devant.fabrica.biometrico.biometricos.service.impl;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.mx.devant.fabrica.biometrico.biometricos.config.ControllerDb;
import com.mx.devant.fabrica.biometrico.biometricos.dto.CheckInOutDTO;
import com.mx.devant.fabrica.biometrico.biometricos.dto.DateDataObj;
import com.mx.devant.fabrica.biometrico.biometricos.dto.InfoMes;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserAssistanceDate;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantAlta;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantTrimestre;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;
import com.mx.devant.fabrica.biometrico.biometricos.service.ControlUserBiometricosService;
import com.mx.devant.fabrica.biometrico.biometricos.utils.ControlBiometricoUtil;

@Service
public class ControlUserBiometricosServiceImpl implements ControlUserBiometricosService {

	@Autowired
	public ControllerDb controllerDB;

	@Override
	public List<UserDevant> getUserInfoByName(String userName) throws Exception, ControlUserNotFoundException {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM USERINFO WHERE NAME = '");
		sql.append(userName);
		sql.append("'");
		List<UserDevant> listUserDev = new ArrayList<UserDevant>();
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;

		try {

			rs = controllerDB.mandarSql(sql.toString());

			while (rs.next()) {
				UserDevant user = new UserDevant();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
				List<UserAssistanceDate> listUss = ControlBiometricoUtil
						.getUserAssistanceUpToDate(Integer.parseInt(rs.getString(1)));
				user.setCheckInOut(listUss);
				for (UserAssistanceDate userAssis : listUss) {
					user.setFechaIngreso(userAssis.getCheckIn().getDate());
					user.setFechaSalida(userAssis.getCheckOut().getDate());
					user.setHoraIn(userAssis.getHoraIn());
					user.setHoraOut(userAssis.getHoraOut());
					user.setFechaFormt(userAssis.getFechaForm());
				}

				listUserDev.add(user);
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}

		return listUserDev;
	}

	@Override
	public List<UserDevant> getUserDevant(DateDataObj date) throws Exception, ControlUserNotFoundException {
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		List<UserDevant> listUserDev = new ArrayList<UserDevant>();

		try {

			StringBuilder sb = new StringBuilder();
			sb.append("SELECT * FROM USERINFO WHERE USERID =");
			sb.append(date.getUserId());
			rs = controllerDB.mandarSql(sb.toString());

			while (rs.next()) {
				UserDevant user = new UserDevant();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
				user.setCheckDTO(ControlBiometricoUtil.getCheckInOut(date.getUserId(), date.getFechainicio(),
						date.getFechaFin()));
				user.setFechaIngreso("--");
				user.setFechaSalida("--");
				user.setStatusIngreso("--");
				user.setHoraIn("--");
				user.setHoraOut("--");
				user.setFechaFormt("--");

				listUserDev.add(user);

				user.setUserInfoDate(ControlBiometricoUtil.checkSchedules(listUserDev.get(0).getCheckDTO(), user));
				ControlBiometricoUtil.validarInasistencias(user.getCheckDTO(), date.getFechainicio(),
						date.getFechaFin());
			}

		} catch (ControlUserNotFoundException e) {
			throw new ControlUserNotFoundException(e.getMessage());
		}

		return listUserDev;
	}

	@Override
	public List<UserDevant> getAllUserDevat() throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO";
		List<UserDevant> listUserDev = new ArrayList<UserDevant>();
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		boolean result = false;
		try {

			rs = controllerDB.mandarSql(sql);

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			String dateSDf = sdf.format(new Date());

			while (rs.next()) {
				UserDevant user = new UserDevant();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
				user.setCheckInOut(ControlBiometricoUtil.getUserAssistanceUpToDate(Integer.parseInt(rs.getString(1))));
				if (StringUtils.equals(user.getTitle(), "BAJA")) {
				} else {
					listUserDev.add(user);
				}

				if (ObjectUtils.isEmpty(user.getCheckInOut())) {
					List<UserAssistanceDate> getListUser = user.getCheckInOut();
					UserAssistanceDate userAssis = new UserAssistanceDate();
					CheckInOutDTO dto = new CheckInOutDTO();
					userAssis.setUserID(user.getUserID());
					dto.setDate("Sin informacion");
					dto.setUserID(user.getUserID());
					dto.setFechaIn("--");
					dto.setFechaOut("--");
					dto.setStatusIngreso("--");
					dto.setDateFormat("--");
					dto.setStatusIngreso("--");
					userAssis.setCheckIn(dto);
					userAssis.setCheckOut(dto);
					userAssis.setHoraIn("--");
					userAssis.setHoraOut("--");
					userAssis.setFechaForm("--");

					result = ControlBiometricoUtil.validarFechasConstantModel(dateSDf);
					if (result) {

						dto.setRegFalta(0);
						dto.setRegRetraso(0);
						dto.setRegTiempo(1);
						dto.setStatusIngreso("Día de asueto");

					} else {

						dto.setRegFalta(1);
						dto.setRegRetraso(0);
						dto.setRegTiempo(0);
						dto.setStatusIngreso("falta");
					}

					getListUser.add(userAssis);
				}

				for (UserAssistanceDate userAss : user.getCheckInOut()) {

					user.setFechaIngreso(userAss.getCheckIn().getDate());
					user.setFechaSalida(userAss.getCheckOut().getDate());
					user.setHoraIn(userAss.getHoraIn());
					user.setHoraOut(userAss.getHoraOut());
					user.setFechaFormt(userAss.getFechaForm());

					result = ControlBiometricoUtil.validarFechasConstantModel(dateSDf);
					if (result) {

						user.setRegFalta(0);
						user.setRegRetraso(0);
						user.setRegTiempo(1);
						user.setStatusIngreso("Día de asueto");

					} else {

						user.setRegFalta(1);
						user.setRegRetraso(0);
						user.setRegTiempo(0);
						user.setStatusIngreso("falta");
					}

				}

			}

			for (UserDevant u : listUserDev) {

				if (StringUtils.equals(u.getFechaIngreso(), "Sin informacion")) {
					u.setStatusIngreso("Sin registro");
				} else {

					SimpleDateFormat displayFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					Date date = displayFormat.parse(u.getFechaIngreso());

					SimpleDateFormat formatMinutes = new SimpleDateFormat("mm");
					String getMinutes = formatMinutes.format(date);

					SimpleDateFormat formatHours = new SimpleDateFormat("HH");
					String getHours = formatHours.format(date);

					if (Integer.parseInt(getHours) <= 9 && Integer.parseInt(getHours) < 10) {
						if (Integer.parseInt(getMinutes) < 15
								|| (Integer.parseInt(getHours) <= 8 && Integer.parseInt(getMinutes) <= 60)) {

							u.setStatusIngreso("ok");

							u.setRegFalta(0);
							u.setRegRetraso(0);
							u.setRegTiempo(1);
						} else {
							u.setStatusIngreso("retardo");

							u.setRegFalta(0);
							u.setRegRetraso(1);
							u.setRegTiempo(0);
						}
					} else {
						u.setStatusIngreso("retardo");

						u.setRegFalta(0);
						u.setRegRetraso(1);
						u.setRegTiempo(0);
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
	public List<UserDevantTrimestre> getInfoUserDevantPrimerTrimestre() throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO";
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
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
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
	public List<UserDevantTrimestre> getInfoUserDevantSegundoTrimestre()
			throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO";
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
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
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
	public List<UserDevantTrimestre> getInfoUserDevantTercerTrimestre() throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO";
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
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
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
	public List<UserDevantTrimestre> getInfoUserDevantCuartoTrimestre() throws Exception, ControlUserNotFoundException {
		String sql = "SELECT * FROM USERINFO";
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
				user.setTitle(rs.getString(6) == null ? "Activo" : rs.getString(6) );
				user.setDepartamento(rs.getString(17));
				user.setNoTarjeta( rs.getString(39) == null ? "--" : rs.getString(39) );
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
	public String addUserDevant(UserDevantAlta alta) throws Exception, ControlUserNotFoundException {

//		DELETE FROM CHECKINOUT WHERE USERID='195';

		StringBuilder sqlInsertUSERID = new StringBuilder();

		sqlInsertUSERID.append("INSERT INTO USERINFO (");
		sqlInsertUSERID.append("Badgenumber, SSN, NAME, Gender,");

		sqlInsertUSERID.append("street, OPHONE, FPHONE, ");

		sqlInsertUSERID.append("VERIFICATIONMETHOD, DEFAULTDEPTID,");
		sqlInsertUSERID.append(
				"ATT, INLATE, OUTEARLY, OVERTIME, SEP, HOLIDAY, LUNCHDURATION, privilege, InheritDeptSch, InheritDeptSchClass, AutoSchPlan,");
		sqlInsertUSERID.append("MinAutoSchInterval, RegisterOT, InheritDeptRule, EMPRIVILEGE) ");
		sqlInsertUSERID.append("VALUES(10508, 10508, '");
		sqlInsertUSERID.append(alta.getNombre());
		sqlInsertUSERID.append("', '");
		sqlInsertUSERID.append(alta.getSexo());

		sqlInsertUSERID.append("', '");
		sqlInsertUSERID.append(alta.getDireccion());
		sqlInsertUSERID.append("', '");
		sqlInsertUSERID.append(alta.getTelCasa());
		sqlInsertUSERID.append("', '");
		sqlInsertUSERID.append(alta.getTelCelular());

		sqlInsertUSERID.append("', 1,22,1,0,0,1,1,1,1,0,1,1,1,24,1,0,0)");

		String sqlMaxUserId = "SELECT MAX(USERID) FROM USERINFO";

		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		int maxSSN = 0, resultInsertUserID, resultInsertCHECKINOUT;
		try {

			resultInsertUserID = controllerDB.mandarSqlINSERT(sqlInsertUSERID.toString());

			rs = controllerDB.mandarSql(sqlMaxUserId);
			if (rs.next()) {
				maxSSN = rs.getInt(1);
			}

			String sqlInsertCHECKINOUT = "INSERT INTO CHECKINOUT (USERID, CHECKTYPE, VERIFYCODE, WorkCode, UserExtFmt) VALUES("
					+ maxSSN + ", 'I', 0, 0, 1)";

			resultInsertCHECKINOUT = controllerDB.mandarSqlINSERT(sqlInsertCHECKINOUT.toString());

			System.out.println(resultInsertUserID + " / " + resultInsertCHECKINOUT);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "";
	}

	@Override
	public InfoMes getInfoMonthAndYear() throws ControlUserNotFoundException {
		InfoMes info = new InfoMes();
		Calendar calendar = Calendar.getInstance();
		int mont = calendar.get(Calendar.MONTH);
		StringBuilder month = new StringBuilder();
		switch (mont) {
		case 0:
			month.append("Enero ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 1:
			month.append("Febrero ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 2:
			month.append("Marzo ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 3:
			month.append("Abril ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 4:
			month.append("Mayo ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 5:
			month.append("Junio ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 6:
			month.append("Julio ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 7:
			month.append("Agosto ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 8:
			month.append("Septiembre ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 9:
			month.append("Octubre ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 10:
			month.append("Noviembre ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		case 11:
			month.append("Diciembre ");
			month.append(String.valueOf(calendar.get(Calendar.YEAR)));
			info.setInfoMes(month.toString());
			break;
		}
		
		return info;
	}

}
