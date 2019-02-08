package com.mx.devant.fabrica.biometrico.biometricos.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
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
import com.mx.devant.fabrica.biometrico.biometricos.dto.InfoUser;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserAssistanceDate;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantInfoDate;
import com.mx.devant.fabrica.biometrico.biometricos.rest.ControlUserNotFoundException;

@Service
public class ControlUserService {

	@Autowired
	public ControllerDb controllerDB;

	public List<UserDevant> getUserInfoByName(String name) throws Exception {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM USERINFO WHERE NAME = '");
		sql.append(name);
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
				user.setTitle(rs.getString(6));
				List<UserAssistanceDate> listUss = this.getUserAssistanceUpToDate(Integer.parseInt(rs.getString(1)));
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

	public List<UserDevant> getAllUserDevat() throws Exception {
		String sql = "SELECT * FROM USERINFO";
		List<UserDevant> listUserDev = new ArrayList<UserDevant>();
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;

		try {

			rs = controllerDB.mandarSql(sql);

			while (rs.next()) {
				UserDevant user = new UserDevant();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6));
				user.setCheckInOut(this.getUserAssistanceUpToDate(Integer.parseInt(rs.getString(1))));
				listUserDev.add(user);

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
					getListUser.add(userAssis);
				}

				for (UserAssistanceDate userAss : user.getCheckInOut()) {

					user.setFechaIngreso(userAss.getCheckIn().getDate());
					user.setFechaSalida(userAss.getCheckOut().getDate());
					user.setHoraIn(userAss.getHoraIn());
					user.setHoraOut(userAss.getHoraOut());
					user.setFechaFormt(userAss.getFechaForm());
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
						} else {
							u.setStatusIngreso("retardo");
						}
					} else {
						u.setStatusIngreso("retardo");
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new ControlUserNotFoundException("Usuario no encontrado");
		}

		return listUserDev;
	}

	public List<UserDevant> getUserDevant(DateDataObj data) throws Exception {
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		List<UserDevant> listUserDev = new ArrayList<UserDevant>();

		try {

			StringBuilder sb = new StringBuilder();
			sb.append("SELECT * FROM USERINFO WHERE USERID =");
			sb.append(data.getUserId());
			rs = controllerDB.mandarSql(sb.toString());

			while (rs.next()) {
				UserDevant user = new UserDevant();
				user.setUserID(Integer.parseInt(rs.getString(1)));
				user.setBadgerNumber(Integer.parseInt(rs.getString(2)));
				user.setName(rs.getString(4));
				user.setTitle(rs.getString(6));
				user.setCheckDTO(this.getCheckInOut(data));
				user.setFechaIngreso("no data");
				user.setFechaSalida("no data");
				user.setStatusIngreso("no data");
				user.setHoraIn("no data");
				user.setHoraOut("no data");
				user.setFechaFormt("no data");

				listUserDev.add(user);

				user.setUserInfoDate(this.checkSchedules(listUserDev.get(0).getCheckDTO(), user));

				// this.validarInasistencias(listUserDev.get(0).getCheckDTO(),
				// data.getFechainicio(), data.getFechaFin());
			}

		} catch (ControlUserNotFoundException e) {
			throw new ControlUserNotFoundException(e.getMessage());
		}

		return listUserDev;
	}

	public List<CheckInOutDTO> getCheckInOut(DateDataObj data) throws SQLException, ParseException {
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		List<CheckInOutDTO> listck = new ArrayList<CheckInOutDTO>();
		List<CheckInOutDTO> listNewData = new ArrayList<CheckInOutDTO>();

		try {

			StringBuilder sb = new StringBuilder();
			sb.append("SELECT * FROM CHECKINOUT WHERE USERID =");
			sb.append(data.getUserId());
			sb.append(" ORDER BY CHECKTIME DESC");
			rs = controllerDB.mandarSql(sb.toString());

			while (rs.next()) {
				CheckInOutDTO ck = new CheckInOutDTO();
				ck.setUserID(Integer.parseInt(rs.getString(1)));
				SimpleDateFormat displayFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date date = displayFormat.parse(rs.getString(2));
				SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
				StringBuilder dt = new StringBuilder();
				ck.setDate(dt.append(disprmat.format(date)).toString());
				ck.setDateFormat(this.convertDateCut(dt.toString()));
				listck.add(ck);
			}

			listck = this.validarSemanaRetardo(listck, data.getFechainicio(), data.getFechaFin());

			int contador = 0, index = 0;
			CheckInOutDTO out = new CheckInOutDTO();

			for (CheckInOutDTO dat : listck) {
				if (contador < 1) {
					contador++;
					out.setDate(dat.getDate());
					out.setDateFormat(dat.getDateFormat());
					if (dat.getFechaIn() == null) {
						for (CheckInOutDTO d : listck) {
							if (dat.getDateFormat().equals(d.getDateFormat())) {
								if (d.getFechaIn() != null) {
									out.setFechaIn(d.getFechaIn());
									break;
								}
							}
						}
					} else {
						out.setFechaIn(dat.getFechaIn());
					}

					out.setFechaOut(dat.getFechaOut());
					out.setUserID(dat.getUserID());

					listNewData.add(out);
				} else {

					if (!dat.getDateFormat().equals(listNewData.get(index).getDateFormat())) {
						index++;
						CheckInOutDTO dt = new CheckInOutDTO();
						dt.setDate(dat.getDate());
						dt.setDateFormat(dat.getDateFormat());
						if (dat.getFechaIn() == null) {
							for (CheckInOutDTO d : listck) {
								if (dat.getDateFormat().equals(d.getDateFormat())) {
									if (d.getFechaIn() != null) {
										dt.setFechaIn(d.getFechaIn());
										break;
									}
								}
							}
						} else {
							dt.setFechaIn(dat.getFechaIn());
						}

						dt.setFechaOut(dat.getFechaOut());
						dt.setUserID(dat.getUserID());

						listNewData.add(dt);

					}

				}
			}

			for (CheckInOutDTO u : listNewData) {

				if (StringUtils.equals(u.getDate(), "Sin informacion")) {
					u.setStatusIngreso("Sin registro");
				} else {

					SimpleDateFormat displayFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					Date date = displayFormat.parse(u.getDateFormat().concat(" ").concat(u.getFechaIn()));

					SimpleDateFormat formatMinutes = new SimpleDateFormat("mm");
					String getMinutes = formatMinutes.format(date);

					SimpleDateFormat formatHours = new SimpleDateFormat("HH");
					String getHours = formatHours.format(date);

					if (Integer.parseInt(getHours) <= 9 && Integer.parseInt(getHours) < 10) {
						if (Integer.parseInt(getMinutes) < 15
								|| (Integer.parseInt(getHours) <= 8 && Integer.parseInt(getMinutes) <= 60)) {
							u.setStatusIngreso("ok");
						} else {
							u.setStatusIngreso("retardo");
						}
					} else {
						u.setStatusIngreso("retardo");
					}
				}

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd H:m:s");
				Date fechaInicial = dateFormat.parse(u.getDateFormat().concat(" ").concat(u.getFechaIn()));
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(fechaInicial);

				int h = 0, m = 0;
				h = calendar.get(Calendar.HOUR_OF_DAY);
				m = calendar.get(Calendar.MINUTE);

//					System.out.println( (h*3600) + (m*60) );

				if (h >= 5 && h < 10) {
					if (m <= 15 || h <= 8 && m <= 60) {
						System.out.println("A Tiempo " + (h * 3600 + m * 60) + " " + u.getFechaIn());
						u.setMax((h * 3600 + m * 60));
						u.setMin(0);
					} else {
						System.out.println("Retardo " + (h * 3600 + m * 60) + " " + u.getFechaIn());
						u.setMin((h * 3600 + m * 60));
						u.setMax(0);
					}
				} else {
					System.out.println("Retardo " + (h * 3600 + m * 60) + " " + u.getFechaIn());
					u.setMin((h * 3600 + m * 60));
					u.setMax(0);
				}
			}

			if (ObjectUtils.isEmpty(listck)) {
				throw new ControlUserNotFoundException("Fechas seleccionada es invalida");
			}

		} catch (ControlUserNotFoundException e) {
			throw new ControlUserNotFoundException(e.getMessage());
		}

		return listNewData;
	}

	public List<CheckInOutDTO> validarSemanaRetardo(List<CheckInOutDTO> data, String fechasInicio, String fechaFin)
			throws ParseException {
		List<CheckInOutDTO> listOut = new ArrayList<CheckInOutDTO>();

		String fIni = this.validarFechaIngresada(fechasInicio);
		String fFin = this.validarFechaIngresada(fechaFin);

		SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
		Date dateIni = disprmat.parse(fIni);

		SimpleDateFormat formatDiasIni = new SimpleDateFormat("dd");
		String getDiasIni = formatDiasIni.format(dateIni);

		SimpleDateFormat formatMesIni = new SimpleDateFormat("MM");
		String getMesIni = formatMesIni.format(dateIni);

		SimpleDateFormat formatAnioIni = new SimpleDateFormat("yyyy");
		String getAnioIni = formatAnioIni.format(dateIni);

		/////////////////////////////////////

		SimpleDateFormat simDate = new SimpleDateFormat("dd-MM-yyyy");
		Date dateFin = simDate.parse(fFin);

		SimpleDateFormat formatDiasFin = new SimpleDateFormat("dd");
		String getDiasFin = formatDiasFin.format(dateFin);

		for (CheckInOutDTO ck : data) {

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			Date dateBase = sdf.parse(ck.getDate());

			SimpleDateFormat formatDiasBase = new SimpleDateFormat("dd");
			String getDiasBase = formatDiasBase.format(dateBase);

			SimpleDateFormat formatMesBase = new SimpleDateFormat("MM");
			String getMesBase = formatMesBase.format(dateBase);

			SimpleDateFormat formatAnioBase = new SimpleDateFormat("yyyy");
			String getAnioBase = formatAnioBase.format(dateBase);

			String dateCut = this.convertDateCut(ck.getDate());

			if (Integer.parseInt(getDiasIni) <= Integer.parseInt(getDiasBase)
					&& Integer.parseInt(getDiasFin) >= Integer.parseInt(getDiasBase)
					&& Integer.parseInt(getMesIni) == Integer.parseInt(getMesBase)
					&& Integer.parseInt(getAnioIni) == Integer.parseInt(getAnioBase)) {

				StringBuilder stb = new StringBuilder();
				stb.append(ck.getDateFormat());

				if (StringUtils.equals(stb.toString(), dateCut)) {

					if (ObjectUtils.isEmpty(listOut)) {
						CheckInOutDTO dto = new CheckInOutDTO();
						dto.setDate(ck.getDate());
						dto.setDateFormat(ck.getDateFormat());
						dto.setUserID(ck.getUserID());
						dto.setFechaOut(this.convertDateToHours(ck.getDate()));

						String in = dto.getFechaIn();
						dto.setFechaIn((in) == null ? this.convertDateToHours(ck.getDate()) : ck.getFechaOut());

						listOut.add(dto);
					} else {
						for (CheckInOutDTO ltd : listOut) {
							if (ck.getUserID() == ltd.getUserID() && ck.getDateFormat().equals(ltd.getDateFormat())) {
								String in = ltd.getFechaIn();
								ltd.setFechaIn((in) == null ? this.convertDateToHours(ck.getDate()) : ck.getFechaOut());
							}
						}
					}

					if (!ObjectUtils.isEmpty(listOut)) {
						CheckInOutDTO dto = new CheckInOutDTO();
						dto.setDate(ck.getDate());
						dto.setDateFormat(ck.getDateFormat());
						dto.setUserID(ck.getUserID());
						dto.setFechaOut(this.convertDateToHours(ck.getDate()));

						String in = dto.getFechaIn();
						dto.setFechaIn((in) == null ? this.convertDateToHours(ck.getDate()) : ck.getFechaOut());

						listOut.add(dto);
					} else {
						for (CheckInOutDTO ltd : listOut) {

							if (ck.getUserID() == ltd.getUserID() && ck.getDateFormat().equals(ltd.getDateFormat())) {
								String in = ltd.getFechaIn();
								ltd.setFechaIn((in) == null ? this.convertDateToHours(ck.getDate()) : ck.getFechaOut());
							}
						}
					}

				}

			}
		}

		return listOut;
	}

	private String validarFechaIngresada(String fecha) {
		StringBuilder stb = new StringBuilder();
		stb.append(fecha.substring(0, 10));
		String[] arr2 = stb.toString().split("-");
		return arr2[2].concat("-").concat(arr2[1]).concat("-").concat(arr2[0]);
	}

	public List<UserAssistanceDate> getUserAssistanceUpToDate(int userId) throws SQLException, ParseException {

		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		List<CheckInOutDTO> listck = new ArrayList<CheckInOutDTO>();
		List<UserAssistanceDate> listAssi = new ArrayList<UserAssistanceDate>();

		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM CHECKINOUT WHERE USERID =");
		sb.append(userId);
		sb.append(" ORDER BY CHECKTIME DESC");
		rs = controllerDB.mandarSql(sb.toString());

		while (rs.next()) {
			CheckInOutDTO ck = new CheckInOutDTO();
			ck.setUserID(Integer.parseInt(rs.getString(1)));
			SimpleDateFormat displayFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = displayFormat.parse(rs.getString(2));
			SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			String dt = disprmat.format(date);
			ck.setDate(dt);
			listck.add(ck);
		}

		List<CheckInOutDTO> neList = this.validarfechahoy(listck);
		for (CheckInOutDTO dto : neList) {

			if (dto.getUserID() == dto.getUserID()) {
				UserAssistanceDate user = new UserAssistanceDate();
				CheckInOutDTO out = neList.get(0);
				CheckInOutDTO in = neList.get(neList.size() - 1);
				user.setUserID(dto.getUserID());
				user.setCheckIn(in);
				user.setCheckOut((out) == null ? in : out);
				user.setFechaForm(dto.getDateFormat());

				user.setHoraIn(user.getCheckIn().getDate() == null ? "no data"
						: this.convertDateToHours(user.getCheckIn().getDate()));
				user.setHoraOut(user.getCheckOut().getDate() == null ? "no data"
						: this.convertDateToHours(user.getCheckOut().getDate()));

				listAssi.add(user);
				break;
			}
		}

		return listAssi;
	}

	private String convertDateToHours(String fecha) {
		StringBuilder stb = new StringBuilder();
		try {
			SimpleDateFormat displayFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = displayFormat.parse(fecha);

			SimpleDateFormat formatMinutes = new SimpleDateFormat("mm");
			String getMinutes = formatMinutes.format(date);

			SimpleDateFormat formatHours = new SimpleDateFormat("HH");
			String getHours = formatHours.format(date);

			SimpleDateFormat formatSeconds = new SimpleDateFormat("ss");
			String getSeconds = formatSeconds.format(date);

			stb.append(getHours);
			stb.append(":");
			stb.append(getMinutes);
			stb.append(":");
			stb.append(getSeconds);

		} catch (ParseException e) {
			e.printStackTrace();
		}
		return stb.toString();
	}

	public List<CheckInOutDTO> validarfechahoy(List<CheckInOutDTO> data) throws ParseException {
		List<CheckInOutDTO> listOut = new ArrayList<CheckInOutDTO>();

		for (CheckInOutDTO u : data) {

			SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
			Date date = disprmat.parse(u.getDate());
			String getDate = disprmat.format(date);

			SimpleDateFormat formatDias = new SimpleDateFormat("dd");
			String getDias = formatDias.format(date);

			SimpleDateFormat formatMes = new SimpleDateFormat("MM");
			String getMes = formatMes.format(date);

			SimpleDateFormat formatAnio = new SimpleDateFormat("yyyy");
			String getAnio = formatAnio.format(date);

			Calendar c = Calendar.getInstance();
			int mes = c.get(Calendar.MONTH);
			int dia = c.get(Calendar.DAY_OF_MONTH);
			int anio = c.get(Calendar.YEAR);
			CheckInOutDTO nck = new CheckInOutDTO();
			if (Integer.parseInt(getDias) == dia && Integer.parseInt(getMes) == mes + 1
					&& Integer.parseInt(getAnio) == anio) {
				nck.setDate(u.getDate());
				nck.setDateFormat(getDate);
				nck.setUserID(u.getUserID());
				nck.setFechaIn(u.getFechaIn() == null ? "no data" : u.getFechaIn());
				nck.setFechaOut(u.getFechaOut() == null ? "no data" : u.getFechaOut());
				listOut.add(nck);
			}

		}

		return listOut;
	}

	public List<CheckInOutDTO> validarfechaProgramada(List<CheckInOutDTO> data) throws ParseException {
		List<CheckInOutDTO> listOut = new ArrayList<CheckInOutDTO>();

		for (CheckInOutDTO u : data) {

			SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
			Date date = disprmat.parse(u.getDate());
			String getDate = disprmat.format(date);

			SimpleDateFormat formatDias = new SimpleDateFormat("dd");
			String getDias = formatDias.format(date);

			SimpleDateFormat formatMes = new SimpleDateFormat("MM");
			String getMes = formatMes.format(date);

			////

			SimpleDateFormat smDf2 = new SimpleDateFormat("dd-MM-yyyy");
			Date dateIniCom = smDf2.parse(u.getDate());

			SimpleDateFormat formatDiasIniCom = new SimpleDateFormat("dd");
			String getDiasIniCom = formatDiasIniCom.format(dateIniCom);

			SimpleDateFormat formatMesIniCom = new SimpleDateFormat("MM");
			String getMesIniCom = formatMesIniCom.format(dateIniCom);

			CheckInOutDTO nck = new CheckInOutDTO();
			if (Integer.parseInt(getDias) == Integer.parseInt(getDiasIniCom)
					&& Integer.parseInt(getMes) == Integer.parseInt(getMesIniCom)) {

				nck.setDate(u.getDate());
				nck.setDateFormat(getDate);
				nck.setUserID(u.getUserID());
				listOut.add(nck);
			}

		}

		return listOut;
	}

	public UserDevantInfoDate checkSchedules(List<CheckInOutDTO> data, UserDevant userDev) throws ParseException {

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd H:m:s");
		UserDevantInfoDate userInfo = new UserDevantInfoDate();
		List<InfoUser> listUserInfoDelays = new ArrayList<InfoUser>();
		List<InfoUser> listUserInfoTimeOffice = new ArrayList<InfoUser>();
		List<InfoUser> listUserAbsence = new ArrayList<InfoUser>();

		for (CheckInOutDTO inOut : data) {

			Date fechaInicial = dateFormat.parse(inOut.getDateFormat().concat(" ").concat(inOut.getFechaIn()));
			Date fechaFinal = dateFormat.parse(inOut.getDateFormat().concat(" ").concat(inOut.getFechaOut()));

			int diferencia = (int) ((fechaFinal.getTime() - fechaInicial.getTime()) / 1000);

			int dias = 0;
			int horas = 0;
			int minutos = 0;

			if (diferencia > 86400) {
				dias = (int) Math.floor(diferencia / 86400);
				diferencia = diferencia - (dias * 86400);
			}
			if (diferencia > 3600) {
				horas = (int) Math.floor(diferencia / 3600);
				diferencia = diferencia - (horas * 3600);
			}
			if (diferencia > 60) {
				minutos = (int) Math.floor(diferencia / 60);
				diferencia = diferencia - (minutos * 60);
			}

			if (horas >= 9) {

				InfoUser user = new InfoUser();
				user.setInfoCheck(inOut.getDateFormat());
				user.setHours(String.valueOf(horas).concat(":").concat(String.valueOf(minutos)).concat(":")
						.concat(String.valueOf(diferencia)));
				user.setUserId(userDev.getUserID());
				user.setName(userDev.getName());

				listUserInfoTimeOffice.add(user);
				userInfo.setTimeOffice(listUserInfoTimeOffice);
			} else {

				InfoUser user = new InfoUser();
				user.setInfoCheck(inOut.getDateFormat());
				user.setHours(String.valueOf(horas).concat(":").concat(String.valueOf(minutos)).concat(":")
						.concat(String.valueOf(diferencia)));
				user.setUserId(userDev.getUserID());
				user.setName(userDev.getName());

				listUserInfoDelays.add(user);
				userInfo.setDelays(listUserInfoDelays);
			}
		}

		return userInfo;
	}

	public String validarInasistencias(List<CheckInOutDTO> data, String fechainicio, String fechaFin)
			throws ParseException {
		CheckInOutDTO n = data.get(data.size() - 1);
		System.err.println(n.getDate());

		String n2 = data.get(0).getDate();
		System.err.println(n2);

		String fIni = this.validarFechaIngresada(fechainicio);
		String fFin = this.validarFechaIngresada(fechaFin);

		SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
		Date dateInio = disprmat.parse(n.getDate());
		Date dateFin = disprmat.parse(n2);
		SimpleDateFormat formatDias = new SimpleDateFormat("dd");
		String getDiasIni = formatDias.format(dateInio);
		String getDiasFin = formatDias.format(dateFin);

		int fI = Integer.parseInt(getDiasIni);
		int feFin = Integer.parseInt(getDiasFin);
		int count = feFin;
		for (CheckInOutDTO dto : data) {

			Date date = disprmat.parse(dto.getDate());
			SimpleDateFormat formatDiasBD = new SimpleDateFormat("dd");
			String getDias = formatDiasBD.format(date);

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);

			if (fI <= count) {
				if (Integer.parseInt(getDias) == count) {
					System.out.println("Fechas de BD: " + dto.getDateFormat());
					if (calendar.get(Calendar.DAY_OF_WEEK) == 2) {
						count = count - 3;
					} else {
						count--;
					}
				}
			}

		}
		return null;
	}

	public String convertDateCut(String data) throws ParseException {
		SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
		Date date = disprmat.parse(data);
		StringBuilder getDate = new StringBuilder();
		return getDate.append(disprmat.format(date)).toString();
	}

}