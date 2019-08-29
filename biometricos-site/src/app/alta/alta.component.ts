import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserDevantAlta } from './UserDevantAlta';
import { AltaService } from './alta.service';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

declare var require: any;

loadCldr(
  require("cldr-data/main/es-MX/numbers.json"),
  require("cldr-data/main/es-MX/ca-gregorian.json"),
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/es-MX/timeZoneNames.json"),
  require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
);

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  fechaNacimiento: string;
  fechaIngreso: string;
  userAlta = new UserDevantAlta();
  sexo: string;
  nombre: string;
  no_imss: string;
  direccion: string;
  tel_casa: string;
  tel_cel: string;
  puesto_devant: string;
  area_devant: string;

  constructor(private altaService: AltaService) { }

  ngOnInit() { 

    L10n.load({
      'es-MX': {
        'datepicker': {
            placeholder: "dd/mm/yyyy",
            today: "Hoy"
        }
      }
    });
     
  }


  public altaUsuarioDevant(){

    this.nombre = (<HTMLInputElement>document.getElementById('nombreDevant')).value;
    this.fechaNacimiento = (<HTMLInputElement>document.getElementById('fchNacimiento')).value;
    this.sexo = (<HTMLInputElement>document.getElementById('sexo')).value;
    this.no_imss = (<HTMLInputElement>document.getElementById('no_imss')).value;
    this.direccion = (<HTMLInputElement>document.getElementById('direccion')).value;
    this.tel_casa = (<HTMLInputElement>document.getElementById('tel_casa')).value;
    this.tel_cel = (<HTMLInputElement>document.getElementById('tel_cel')).value;
    this.area_devant = (<HTMLInputElement>document.getElementById('area_devant')).value;
    this.puesto_devant = (<HTMLInputElement>document.getElementById('puesto_devant')).value;
    this.fechaIngreso = (<HTMLInputElement>document.getElementById('fchIngreso')).value;
    

    this.userAlta.nombre = this.nombre;
    this.userAlta.fechaNacimiento = this.fechaNacimiento;
    this.userAlta.sexo = this.sexo;
    this.userAlta.noImss = this.no_imss;
    this.userAlta.direccion = this.direccion;
    this.userAlta.telCasa = this.tel_casa;
    this.userAlta.telCelular = this.tel_cel;
    this.userAlta.fechaIngreso = this.fechaIngreso;
    this.userAlta.area = this.area_devant;
    this.userAlta.puesto = this.puesto_devant;

    console.log(this.userAlta) 

    this.altaService.addUserDevant(this.userAlta).subscribe( res =>{
      console.log(res)
    });
    
  }

}
