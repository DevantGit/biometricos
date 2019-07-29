import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-footer',
templateUrl: './footer.component.html',
styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router){}

  public autor: any = {nombre:'Devant'};

  public login(){
    this.router.navigate(["clientes"]);
  }
}
