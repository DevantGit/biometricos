import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';
import { map } from 'rxjs/operators';



@Injectable()
export class DirectivaService {

  private urlPostDate: string = 'http://localhost:8081/contro-asistencia-devant/user-devant';

  constructor(private http: HttpClient) { }

  getClienteDateByRank(data): Observable<Cliente> {
    let body = JSON.stringify(data);
    const headers =
      new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Cliente>(this.urlPostDate, body, { headers: headers })
      .pipe(map(res => res));
  }

  // ASISTENCIA AL MES POR DEPARTAMENTOS

  getUserDevantAsistenciaMesFabrica(): Observable<Object>{
    return this.http.get("http://localhost:8081/contro-asistencia-devant/user-devant-asistencia-mes-fabrica");
  }

  getUserDevantAsistenciaMesAdministracion(): Observable<Object>{
    return this.http.get("http://localhost:8081/contro-asistencia-devant/user-devant-asistencia-mes-administracion");
  }

  getUserDevantAsistenciaMesAdmin(): Observable<Object>{
    return this.http.get("http://localhost:8081/contro-asistencia-devant/user-devant-asistencia-mes-admin");
  }


  // DEPARTAMENTO DE FABRICA REPORTES TRIMESTRALES
  getInfoReporteFabricaSwPrimer(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-fabrica-software/primer-trimestre');
  }

  getInfoReporteFabricaSwSegundo(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-fabrica-software/segundo-trimestre');
  }

  getInfoReporteFabricaSwTercer(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-fabrica-software/tercer-trimestre');
  }

  getInfoReporteFabricaSwCuarto(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-fabrica-software/cuarto-trimestre');
  }


  //DEPARTAMENTO DE ADMINSTRACION REPORTES TRIMESTRALES

  getInfoReporteAdministracion(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-administracion/primer-trimestre');
  }

  getInfoReporteAdministracionSegundoTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-administracion/segundo-trimestre');
  }

  getInfoReporteAdministracionTercerTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-administracion/tercer-trimestre');
  }

  getInfoReporteAdministracionCuartoTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-administracion/cuarto-trimestre');
  }

  // DEPARTAMENTO DE ACCESO TOTAL REPORTES TRIMESTRALES

  getInfoReporteAdminPrimerTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-admin/primer-trimestre');
  }

  getInfoReporteAdminSegundoTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-admin/segundo-trimestre');
  }

  getInfoReporteAdminTercerTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-admin/tercer-trimestre');
  }

  getInfoReporteAdminCuartoTri(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/info-resporte-admin/cuarto-trimestre');
  }

}
