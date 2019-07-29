import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';


@Injectable()
export class DirectivaService {

  constructor(private http: HttpClient) { }

  private urlEndPoint: string = 'http://localhost:8081/contro-asistencia-devant/user-devant-asistencia';
  private urlPostDate: string = 'http://localhost:8081/contro-asistencia-devant/user-devant';

  getClientes() {
    //return of(CLIENTES);
    return this.http.get<Cliente>(this.urlEndPoint, {observe: 'response'});
  }

  getClienteDateByRank(data){
        
        let body = JSON.stringify(data);            
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post(this.urlPostDate, body, {headers: headers});
  }
}
