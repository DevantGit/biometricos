import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DirectivaService } from './directiva.service';
import * as $ from 'jquery';
import { Cliente } from '../clientes/cliente';
import { UserDevant } from '../clientes/UserDevant';
import { ClienteService } from '../clientes/cliente.service';
import { Assistence } from '../clientes/Assistence';
import { plainToClass } from "class-transformer";
import { CheckInOut } from '../clientes/CheckInOut';



@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css'],
})
export class DirectivaComponent implements OnInit {

  chart: any;
  clientes: Cliente;
  assistence: Assistence;
  userDevant = new UserDevant();
  userClit: Cliente;
  arregloFechas: Array<string>;
  id: number;
  tab: boolean = true;
  busqueda: boolean = false;
  nuevaConsulta: boolean = false;
  contentBusqueda: boolean = true;

  public minDate: Date = new Date();
  public maxDate: Date = new Date();

  nombreUser: string;
  dateOne: string;
  term: string;
  dateTwo: string;
  userIDValue: string;
  imgSerach: boolean = false;
  tabAcction: boolean;
  CheckInOut: object[];
  arrayMin = [];

  constructor(private elementRef: ElementRef, private directivaService: DirectivaService) { }

  ngOnInit() {
    this.chartit(6, "2019-03-15T06:00:00.000Z", "2019-03-29T06:00:00.000Z");
  }


  chartit(id, event, eventTwo) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvas');
    this.arregloFechas = new Array(event, eventTwo);
    this.id = parseInt(id);
    this.userDevant.userId = this.id;
    this.userDevant.fechainicio = event;
    this.userDevant.fechaFin = eventTwo;

    this.directivaService.getClienteDateByRank(this.userDevant).subscribe(res => {
      let result = res[0];
      this.CheckInOut = result['checkDTO'];
      var sum = 0, sumMax = 0;
      for (let index = 0; index < this.CheckInOut.length; index++) {
        const element = this.CheckInOut[index];

        sum = sum + element['min'];
        sumMax = sumMax + element['max'];
      }

      this.arrayMin.push(sum);
      this.arrayMin.push(sumMax);

      this.chart = new Chart(htmlRef, {
        type: 'pie',
        data: {
          labels: ['Fabrica Software', 'Recursos Humanos'],
          datasets: [
            {
              data: this.arrayMin,
              backgroundColor: [
                '#182652',
                '#00A0E0'
              ],
              fill: false
            }
          ]
        }
      });



    });


  }


  public cargarFechas(event, eventTwo, term) {
    if (term != undefined || term != null) {
      this.arregloFechas = new Array(event, eventTwo);
      this.userIDValue = (<HTMLInputElement>document.getElementById('userID')).value;
      this.id = parseInt(this.userIDValue);
      this.userDevant.userId = this.id;
      this.userDevant.fechainicio = event;
      this.userDevant.fechaFin = eventTwo
      this.directivaService.getClienteDateByRank(this.userDevant).subscribe(data => {
        this.userClit = data;
      }, error => {

      });
      this.tab = false;
      this.busqueda = true;
      this.imgSerach = false;
      this.contentBusqueda = false;
      this.nuevaConsulta = true;

    } else {

    }
  }


  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  habilitar: boolean = true;



  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }

}
