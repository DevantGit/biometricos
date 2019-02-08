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

  getInfoUserDevantAsistencia(): Observable<Object>{
    return this.http.get("http://localhost:8081/contro-asistencia-devant/user-devant-asistencia-mes");
  }

  getInfoUserPrimerTrimestre(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/primer-trimestre');
  }

  getInfoUserSegundoTrimestre(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/segundo-trimestre');
  }

  getInfoUserTercerTrimestre(): Observable<Object>{
    return this.http.get('http://localhost:8081/contro-asistencia-devant/user-devant/tercer-trimestre');
  }

  getInfoUserCuartoTrimestre(): Observable<Object>{
    return this.http.get("http://localhost:8081/contro-asistencia-devant/user-devant/cuarto-trimestre");
  }
}
