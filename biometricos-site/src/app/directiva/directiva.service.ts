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

  dailyForeCast() {
    console.log("Entro a request")
    return this.http.get('/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1')
      .map(result => result);
  }

  getClienteDateByRank(data): Observable<Cliente> {
    let body = JSON.stringify(data);
    const headers =
      new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Cliente>(this.urlPostDate, body, { headers: headers })
      .pipe(map(res => res));
  }
}
