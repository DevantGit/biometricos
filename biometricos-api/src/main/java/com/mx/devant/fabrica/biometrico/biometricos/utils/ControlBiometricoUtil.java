package com.mx.devant.fabrica.biometrico.biometricos.utils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;

import com.mx.devant.fabrica.biometrico.biometricos.config.ControllerDb;
import com.mx.devant.fabrica.biometrico.biometricos.dto.CheckInOutDTO;
import com.mx.devant.fabrica.biometrico.biometricos.dto.InfoUser;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserAssistanceDate;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevant;
import com.mx.devant.fabrica.biometrico.biometricos.dto.UserDevantInfoDate;
import com.mx.devant.fabrica.biometrico.biometricos.exception.ControlUserNotFoundException;

public class ControlBiometricoUtil {
	
	@Autowired
	public static ControllerDb controllerDB;
	
	public static List<CheckInOutDTO> getCheckInOut(int id, String fechaInicio, String fechaFin) throws SQLException, ParseException {
		controllerDB = new ControllerDb();
		controllerDB.crearConexion();
		ResultSet rs;
		List<CheckInOutDTO> listck = new ArrayList<CheckInOutDTO>();
		List<CheckInOutDTO> listNewData = new ArrayList<CheckInOutDTO>();

		try {

			StringBuilder sb = new StringBuilder();
			sb.append("SELECT * FROM CHECKINOUT WHERE USERID =");
			sb.append(id);
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
				ck.setDateFormat(ControlBiometricoUtil.convertDateCut(dt.toString()));
				listck.add(ck);
			}
			
			if(!ObjectUtils.isEmpty(listck)) {
				listck = ControlBiometricoUtil.validarSemanaRetardo(listck, fechaInicio, fechaFin);
				
				if(!ObjectUtils.isEmpty(listck)) {
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

						if (h >= 5 && h < 10) {
							if (m <= 15 || h <= 8 && m <= 60) {
								u.setRegTiempo(1);
								u.setRegRetraso(0);
								u.setRegFalta(0);
							} else {
								u.setRegRetraso(1);
								u.setRegFalta(0);
								u.setRegTiempo(0);
							}
						} else {
							u.setRegRetraso(1);
							u.setRegFalta(0);
							u.setRegTiempo(0);
						}
					}

				}
				
			}
			 

		} catch (ControlUserNotFoundException e) {
			throw new ControlUserNotFoundException(e.getMessage());
		}

		return listNewData;
	}

	public static List<UserAssistanceDate> getUserAssistanceUpToDate(int userId) throws SQLException, ParseException {

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

		List<CheckInOutDTO> neList = ControlBiometricoUtil.validarfechahoy(listck);
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
						: ControlBiometricoUtil.convertDateToHours(user.getCheckIn().getDate()));
				user.setHoraOut(user.getCheckOut().getDate() == null ? "no data"
						: ControlBiometricoUtil.convertDateToHours(user.getCheckOut().getDate()));

				listAssi.add(user);
				break;
			}
		}

		return listAssi;
	}
	
	public static List<CheckInOutDTO> validarfechahoy(List<CheckInOutDTO> data) throws ParseException {
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
				nck.setStatusIngreso(u.getStatusIngreso() == null ? "--" : u.getStatusIngreso());
				nck.setRegTiempo(u.getRegTiempo() == null ? 0 : u.getRegTiempo());
				nck.setRegRetraso(u.getRegRetraso() == null ? 0 : u.getRegRetraso());
				nck.setRegFalta(u.getRegFalta() == null ? 0 : u.getRegFalta());
				
				listOut.add(nck);
			}

		}

		return listOut;
	}
	
	public static String convertDateToHours(String fecha) {
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
	
	
	public static List<CheckInOutDTO> validarSemanaRetardo(List<CheckInOutDTO> data, String fechasInicio, String fechaFin)
			throws ParseException {
		List<CheckInOutDTO> listOut = new ArrayList<CheckInOutDTO>();

		String fIni = ControlBiometricoUtil.validarFechaIngresada(fechasInicio);
		String fFin = ControlBiometricoUtil.validarFechaIngresada(fechaFin);

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

			String dateCut = ControlBiometricoUtil.convertDateCut(ck.getDate());

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
						dto.setFechaOut(ControlBiometricoUtil.convertDateToHours(ck.getDate()));

						String in = dto.getFechaIn();
						dto.setFechaIn((in) == null ? ControlBiometricoUtil.convertDateToHours(ck.getDate()) : ck.getFechaOut());

						listOut.add(dto);
					} else {
						for (CheckInOutDTO ltd : listOut) {
							if (ck.getUserID() == ltd.getUserID() && ck.getDateFormat().equals(ltd.getDateFormat())) {
								String in = ltd.getFechaIn();
								ltd.setFechaIn((in) == null ? ControlBiometricoUtil.convertDateToHours(ck.getDate()) : ck.getFechaOut());
							}
						}
					}

					if (!ObjectUtils.isEmpty(listOut)) {
						CheckInOutDTO dto = new CheckInOutDTO();
						dto.setDate(ck.getDate());
						dto.setDateFormat(ck.getDateFormat());
						dto.setUserID(ck.getUserID());
						dto.setFechaOut(ControlBiometricoUtil.convertDateToHours(ck.getDate()));

						String in = dto.getFechaIn();
						dto.setFechaIn((in) == null ? ControlBiometricoUtil.convertDateToHours(ck.getDate()) : ck.getFechaOut());

						listOut.add(dto);
					} else {
						for (CheckInOutDTO ltd : listOut) {

							if (ck.getUserID() == ltd.getUserID() && ck.getDateFormat().equals(ltd.getDateFormat())) {
								String in = ltd.getFechaIn();
								ltd.setFechaIn((in) == null ? ControlBiometricoUtil.convertDateToHours(ck.getDate()) : ck.getFechaOut());
							}
						}
					}

				}

			}
		}

		return listOut;
	}
	
	public static UserDevantInfoDate checkSchedules(List<CheckInOutDTO> data, UserDevant userDev) throws ParseException {

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd H:m:s");
		UserDevantInfoDate userInfo = new UserDevantInfoDate();
		List<InfoUser> listUserInfoDelays = new ArrayList<InfoUser>();
		List<InfoUser> listUserInfoTimeOffice = new ArrayList<InfoUser>();

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
	
	public static String validarInasistencias(List<CheckInOutDTO> data, String fechainicio, String fechaFin)
			throws ParseException {
		Set<Integer> hs = new HashSet<>();
		
		CheckInOutDTO n = data.get(data.size() - 1);
		System.err.println(n.getDate());

		String n2 = data.get(0).getDate();
		System.err.println(n2);

		// fechas split dd-mm-yyyy
		String fIni = ControlBiometricoUtil.validarFechaIngresada(fechainicio);
		String fFin = ControlBiometricoUtil.validarFechaIngresada(fechaFin);
		String fechaTermino = fIni.substring(0, 2);
		String fechaRangoFinal = fFin.substring(0, 2);
		String fechaSindia = fIni.substring(2);

		SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
		Date dateInio = disprmat.parse(n.getDate());
		
		SimpleDateFormat formatDias = new SimpleDateFormat("dd");
		String getDiasIni = formatDias.format(dateInio); // 03

		int fI = Integer.parseInt(getDiasIni); // 3
		int count =0;
		int aux = 0;
		int fRangoFinal = Integer.parseInt(fechaRangoFinal); // 31
		int id = 0;
		
		for (CheckInOutDTO dto : data) {
			id = dto.getUserID();
			Date date = disprmat.parse(dto.getDate());
			SimpleDateFormat formatDiasBD = new SimpleDateFormat("dd");
			String getDias = formatDiasBD.format(date);

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			count = Integer.parseInt(getDias); // -> 30
			
			if (fI <= fRangoFinal) { // 3 < 31
				
				if (Integer.parseInt(getDias) == count) {
					aux = count;
					if (calendar.get(Calendar.DAY_OF_WEEK) == 2) {
						count = count - 3;
					} else {
						count--;
					}
				}
				
				if(fRangoFinal > Integer.parseInt(getDias)) {
					while ( aux <= fRangoFinal) {
						if(fRangoFinal == aux) {
							String nf = String.valueOf(fRangoFinal).concat(fechaSindia);
							Date dateRangoFinal = disprmat.parse(nf);
							Calendar calenRangoFinal= Calendar.getInstance();
							calenRangoFinal.setTime(dateRangoFinal);
							
							if (calenRangoFinal.get(Calendar.DAY_OF_WEEK) == 2) {
								fRangoFinal = fRangoFinal  - 3;
							} else {
								fRangoFinal--;
							}
							
						}else {
							
							String nf = String.valueOf(fRangoFinal).concat(fechaSindia);
							Date dateRangoFinal = disprmat.parse(nf);
							Calendar calenRangoFinal= Calendar.getInstance();
							calenRangoFinal.setTime(dateRangoFinal);
							
							hs.add(fRangoFinal);
							if (calenRangoFinal.get(Calendar.DAY_OF_WEEK) == 2) {
								fRangoFinal = fRangoFinal  - 3;
							} else {
								fRangoFinal--;
							}	
						}
					}
				}else {
					fRangoFinal--;
				}
			}
			
		}	
		
		
		for( Integer in: hs) {
			String nf = String.valueOf(in).concat(fechaSindia);
			Date dateRangoFinal = disprmat.parse(nf);
			Calendar calenRangoFinal= Calendar.getInstance();
			calenRangoFinal.setTime(dateRangoFinal);
			boolean result = false;
			
			if(calenRangoFinal.get(Calendar.DAY_OF_WEEK) == 1 || calenRangoFinal.get(Calendar.DAY_OF_WEEK) == 7) {}
			else{
				result = ControlBiometricoUtil.validarFechasConstantModel(nf);
				if(result) {
					CheckInOutDTO inout = new CheckInOutDTO();
					inout.setDate(nf);
					inout.setDateFormat(nf);
					inout.setFechaIn("--");
					inout.setFechaOut("--");
					inout.setRegFalta(0);
					inout.setRegRetraso(0);
					inout.setRegTiempo(1);
					inout.setStatusIngreso("Día de asueto");
					inout.setUserID(id);
					
					data.add(inout);
				}else {
					CheckInOutDTO inout = new CheckInOutDTO();
					inout.setDate(nf);
					inout.setDateFormat(nf);
					inout.setFechaIn("--");
					inout.setFechaOut("--");
					inout.setRegFalta(1);
					inout.setRegRetraso(0);
					inout.setRegTiempo(0);
					inout.setStatusIngreso("falta");
					inout.setUserID(id);
					
					data.add(inout);
				}
			}
			
		}
		
		boolean result = false;
		while (Integer.parseInt(fechaTermino) <= count) {
			String nf = String.valueOf(count).concat(fechaSindia);
			result = ControlBiometricoUtil.validarFechasConstantModel(nf);
			if(result) {
				CheckInOutDTO inout = new CheckInOutDTO();
				inout.setDate(nf);
				inout.setDateFormat(nf);
				inout.setFechaIn("--");
				inout.setFechaOut("--");
				inout.setRegFalta(0);
				inout.setRegRetraso(0);
				inout.setRegTiempo(1);
				inout.setStatusIngreso("Día de asueto");
				inout.setUserID(id);
				
				data.add(inout);
			}else {
				CheckInOutDTO inout = new CheckInOutDTO();
				inout.setDate(nf);
				inout.setDateFormat(nf);
				inout.setFechaIn("--");
				inout.setFechaOut("--");
				inout.setRegFalta(1);
				inout.setRegRetraso(0);
				inout.setRegTiempo(0);
				inout.setStatusIngreso("falta");
				inout.setUserID(id);
				
				data.add(inout);
			}
			Date date = disprmat.parse(nf);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			if (calendar.get(Calendar.DAY_OF_WEEK) == 2) {
				count = count - 3;
			} else {
				count--;
			}
		}
		
		
		return "";
	}
	
	public static String validarFechaIngresada(String fecha) {
		StringBuilder stb = new StringBuilder();
		stb.append(fecha.substring(0, 10));
		String[] arr2 = stb.toString().split("-");
		return arr2[2].concat("-").concat(arr2[1]).concat("-").concat(arr2[0]);
	}
	
	public static boolean validarFechasConstantModel(String data) throws ParseException {
		
		boolean result = Boolean.FALSE;
		
		SimpleDateFormat constantSDF= new SimpleDateFormat("dd-MM-yyyy");
		
		Date dateConstAnioNuevo = constantSDF.parse(ConstantModels.AÑO_NUEVO);
		Date dateConstMexicana = constantSDF.parse(ConstantModels.DIA_CONSTITUCION_MEXICANA);
		Date dateConstNatalicio = constantSDF.parse(ConstantModels.NATALICIO_BENITO_JUAREZ);
		Date dateConstJuevesSant = constantSDF.parse(ConstantModels.JUEVES_SANTO);
		Date dateConstViernesSant = constantSDF.parse(ConstantModels.VIERNES_SANTO);
		Date dateConstTrabajo = constantSDF.parse(ConstantModels.DIA_TRABAJO);
		Date dateConstIndepe = constantSDF.parse(ConstantModels.DIA_INDEPENDENCIA);
		Date dateConstRevolu = constantSDF.parse(ConstantModels.REVOLUCION_MEXICANA);
		Date dateConstNavidad = constantSDF.parse(ConstantModels.DIA_NAVIDAD);
		
		
			SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
			Date dateInio = disprmat.parse(data);
			
			if(dateInio.equals(dateConstAnioNuevo) ||
					dateInio.equals(dateConstMexicana) ||
					dateInio.equals(dateConstNatalicio) ||
					dateInio.equals(dateConstJuevesSant) ||
					dateInio.equals(dateConstViernesSant) ||
					dateInio.equals(dateConstTrabajo) ||
					dateInio.equals(dateConstIndepe) ||
					dateInio.equals(dateConstRevolu) ||
					dateInio.equals(dateConstNavidad)) {
				
				 result = Boolean.TRUE;
			}
		
		
		return result;
	}
	
	public static String convertDateCut(String data) throws ParseException {
		SimpleDateFormat disprmat = new SimpleDateFormat("dd-MM-yyyy");
		Date date = disprmat.parse(data);
		StringBuilder getDate = new StringBuilder();
		return getDate.append(disprmat.format(date)).toString();
	}
	
}
