import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AltaService {

  constructor(private http: HttpClient) { }

  private urlPostDate: string = 'http://localhost:8081/contro-asistencia-devant/user-devant-alta';

  addUserDevant(data) {
    let body = JSON.stringify(data);
    const headers =
      new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    console.log(body)
    return this.http.post(this.urlPostDate, body, { headers: headers });
  }

}
