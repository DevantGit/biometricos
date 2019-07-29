import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-app',
  templateUrl: './inicio-app.component.html',
  styleUrls: ['./inicio-app.component.css']
})
export class InicioAppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public consultar(){
    this.router.navigate(["clientes"]);
  }

}
