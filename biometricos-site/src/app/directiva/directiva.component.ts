import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DirectivaService } from './directiva.service';
import { Cliente } from '../clientes/cliente';
import { UserDevant } from '../clientes/UserDevant';
import { Assistence } from '../clientes/Assistence';
import * as $ from 'jquery';

declare var JQuery: any;


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

  loading: boolean = true;
  primerTrimestre: boolean = true;
  segundoTrimestre: boolean = false;
  tercerTrimestre: boolean = false;
  prev: boolean = false;
  nex: boolean = true;


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
  infoLvlOne: Object[];

  infoUserAsistencia = [];
  infoPrimerTrimestre = [];
  infoSegundoTrimestre = [];
  infoTercerTrimestre = [];
  infoCuartoTrimestre = [];

  arrayMin = [];
  arrayLvlOne = [];
  arrayInfoAsistencia = [];

  constructor(private elementRef: ElementRef, private directivaService: DirectivaService) { }

  ngOnInit() {

    this.charUserInfoAsistencia();
    $('#prev').addClass("segundoTri");
    var primero = 0;
    $('#next').click(function () {
      console.log(primero)
      if (primero == 0) {
        $('#primerTrimestre').addClass("segundoTri");
        $('#segundoTrimestre').removeClass("segundoTri");
        $('#segundoTrimestre').addClass("canvas2");
        $('#prev').removeClass("segundoTri");
        $('#prev').addClass("img-previous");
        primero++;
      } else if (primero == 1) {
        $('#segundoTrimestre').addClass("segundoTri");
        $('#tercerTrimestre').removeClass("segundoTri");
        $('#tercerTrimestre').addClass("canvas2");
        primero++;
      } else if (primero == 2) {
        $('#tercerTrimestre').addClass("segundoTri");
        $('#cuartoTrimestre').removeClass("segundoTri");
        $('#cuartoTrimestre').addClass("canvas2");
        $('#next').addClass("segundoTri");
      }
      console.log(primero)
    });

    $('#prev').click(function () {
      console.log(primero)
      if (primero == 2) {
        $('#cuartoTrimestre').addClass("segundoTri");
        $('#tercerTrimestre').removeClass("segundoTri");
        $('#tercerTrimestre').addClass("canvas2");
        $('#next').removeClass("segundoTri");
        $('#next').addClass("img-next");
        primero--;
      } else if (primero == 1) {
        $('#tercerTrimestre').addClass("segundoTri");
        $('#segundoTrimestre').removeClass("segundoTri");
        $('#segundoTrimestre').addClass("canvas2");
        $('#next').removeClass("segundoTri");
        $('#next').addClass("img-next");
        primero--;
      } else if (primero == 0) {
        $('#segundoTrimestre').addClass("segundoTri");
        $('#primerTrimestre').removeClass("segundoTri");
        $('#primerTrimestre').addClass("canvas2");
        $('#next').removeClass("segundoTri");
        $('#next').addClass("img-next");
        $('#prev').addClass("segundoTri");
      }

      console.log(primero)
    });

  }

  charUserInfoAsistencia() {
    this.directivaService.getInfoUserDevantAsistencia().subscribe(res => {
      this.infoUserAsistencia.push(res);
      this.chartit();
    });
  }

  chartUserPrimerTrimestre() {
    this.directivaService.getInfoUserPrimerTrimestre().subscribe(res => {
      this.infoPrimerTrimestre.push(res);
      this.charPrimerTrimestre();
    });
  }

  chartUserSegundoTrimestre() {
    this.directivaService.getInfoUserSegundoTrimestre().subscribe(res => {
      this.infoSegundoTrimestre.push(res);
      this.charSegundoTrimestre();
    });
  }

  chartUserTercerTrimestre() {
    this.directivaService.getInfoUserTercerTrimestre().subscribe(res => {
      this.infoTercerTrimestre.push(res);
      this.charTercerTrimestre();
    });
  }

  chartUserCuartoTrimestre() {
    this.directivaService.getInfoUserCuartoTrimestre().subscribe(res => {
      this.infoCuartoTrimestre.push(res);
      this.chartCuartoTrimestre();
    });
  }

  charPrimerTrimestre() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasBarrasPrimer');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < this.infoPrimerTrimestre.length; index++) {
      let element = this.infoPrimerTrimestre[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];
        const lvl_2 = i['lvlTwo'];
        const lvl_3 = i['lvlTree'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }

        for (let index = 0; index < lvl_2.length; index++) {
          const lvl2 = lvl_2[index];

          sumFaltaLvl_2 = sumFaltaLvl_2 + lvl2['regFalta'];
          sumRetardoLvl_2 = sumRetardoLvl_2 + lvl2['regRetraso'];
          sumTiempoLvl_2 = sumTiempoLvl_2 + lvl2['regTiempo'];

        }

        for (let index = 0; index < lvl_3.length; index++) {
          const lvl3 = lvl_3[index];

          sumFaltaLvl_3 = sumFaltaLvl_3 + lvl3['regFalta'];
          sumRetardoLvl_3 = sumRetardoLvl_3 + lvl3['regRetraso'];
          sumTiempoLvl_3 = sumTiempoLvl_3 + lvl3['regTiempo'];

        }
      }
    }

    this.arrayLvlOne.push(sumTiempo);
    this.arrayLvlOne.push(sumRetardo);
    this.arrayLvlOne.push(sumFalta);


    var barChartData = {
      labels: ['Enero', 'Febrero', 'Marzo'],
      datasets: [{
        label: 'Registro a Tiempo',
        backgroundColor: "#182652",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumTiempo,
          sumTiempoLvl_2,
          sumTiempoLvl_3
        ]
      }, {
        label: 'Registro con Retardo',
        backgroundColor: "#00A0E0",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumRetardo,
          sumRetardoLvl_2,
          sumRetardoLvl_3
        ]
      },
      {
        label: 'Registro con Falta',
        backgroundColor: "#93E0FF",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumFalta,
          sumFaltaLvl_2,
          sumFaltaLvl_3
        ]
      }]

    };

    this.chart = new Chart(htmlRef, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Control de asistencia DEVANT'
        }
      }
    });

    this.chartUserSegundoTrimestre();
  }



  charSegundoTrimestre() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasBarrasSegundo');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < this.infoSegundoTrimestre.length; index++) {
      let element = this.infoSegundoTrimestre[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];
        const lvl_2 = i['lvlTwo'];
        const lvl_3 = i['lvlTree'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }

        for (let index = 0; index < lvl_2.length; index++) {
          const lvl2 = lvl_2[index];

          sumFaltaLvl_2 = sumFaltaLvl_2 + lvl2['regFalta'];
          sumRetardoLvl_2 = sumRetardoLvl_2 + lvl2['regRetraso'];
          sumTiempoLvl_2 = sumTiempoLvl_2 + lvl2['regTiempo'];

        }

        for (let index = 0; index < lvl_3.length; index++) {
          const lvl3 = lvl_3[index];

          sumFaltaLvl_3 = sumFaltaLvl_3 + lvl3['regFalta'];
          sumRetardoLvl_3 = sumRetardoLvl_3 + lvl3['regRetraso'];
          sumTiempoLvl_3 = sumTiempoLvl_3 + lvl3['regTiempo'];

        }
      }
    }

    this.arrayLvlOne.push(sumTiempo);
    this.arrayLvlOne.push(sumRetardo);
    this.arrayLvlOne.push(sumFalta);


    var barChartData = {
      labels: ['Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Registro a Tiempo',
        backgroundColor: "#182652",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumTiempo,
          sumTiempoLvl_2,
          sumTiempoLvl_3
        ]
      }, {
        label: 'Registro con Retardo',
        backgroundColor: "#00A0E0",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumRetardo,
          sumRetardoLvl_2,
          sumRetardoLvl_3
        ]
      },
      {
        label: 'Registro con Falta',
        backgroundColor: "#93E0FF",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumFalta,
          sumFaltaLvl_2,
          sumFaltaLvl_3
        ]
      }]

    };

    this.chart = new Chart(htmlRef, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Control de asistencia DEVANT'
        }
      }
    });

    this.chartUserTercerTrimestre();
  }

  charTercerTrimestre() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasBarrasTercer');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < this.infoTercerTrimestre.length; index++) {
      let element = this.infoTercerTrimestre[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];
        const lvl_2 = i['lvlTwo'];
        const lvl_3 = i['lvlTree'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }

        for (let index = 0; index < lvl_2.length; index++) {
          const lvl2 = lvl_2[index];

          sumFaltaLvl_2 = sumFaltaLvl_2 + lvl2['regFalta'];
          sumRetardoLvl_2 = sumRetardoLvl_2 + lvl2['regRetraso'];
          sumTiempoLvl_2 = sumTiempoLvl_2 + lvl2['regTiempo'];

        }

        for (let index = 0; index < lvl_3.length; index++) {
          const lvl3 = lvl_3[index];

          sumFaltaLvl_3 = sumFaltaLvl_3 + lvl3['regFalta'];
          sumRetardoLvl_3 = sumRetardoLvl_3 + lvl3['regRetraso'];
          sumTiempoLvl_3 = sumTiempoLvl_3 + lvl3['regTiempo'];

        }
      }
    }

    this.arrayLvlOne.push(sumTiempo);
    this.arrayLvlOne.push(sumRetardo);
    this.arrayLvlOne.push(sumFalta);


    var barChartData = {
      labels: ['Julio', 'Agosto', 'Septiembre'],
      datasets: [{
        label: 'Registro a Tiempo',
        backgroundColor: "#182652",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumTiempo,
          sumTiempoLvl_2,
          sumTiempoLvl_3
        ]
      }, {
        label: 'Registro con Retardo',
        backgroundColor: "#00A0E0",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumRetardo,
          sumRetardoLvl_2,
          sumRetardoLvl_3
        ]
      },
      {
        label: 'Registro con Falta',
        backgroundColor: "#93E0FF",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumFalta,
          sumFaltaLvl_2,
          sumFaltaLvl_3
        ]
      }]

    };

    this.chart = new Chart(htmlRef, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Control de asistencia DEVANT'
        }
      }
    });
    this.chartUserCuartoTrimestre();
  }

  chartCuartoTrimestre() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasBarrasCuarto');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < this.infoCuartoTrimestre.length; index++) {
      let element = this.infoCuartoTrimestre[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];
        const lvl_2 = i['lvlTwo'];
        const lvl_3 = i['lvlTree'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }

        for (let index = 0; index < lvl_2.length; index++) {
          const lvl2 = lvl_2[index];

          sumFaltaLvl_2 = sumFaltaLvl_2 + lvl2['regFalta'];
          sumRetardoLvl_2 = sumRetardoLvl_2 + lvl2['regRetraso'];
          sumTiempoLvl_2 = sumTiempoLvl_2 + lvl2['regTiempo'];

        }

        for (let index = 0; index < lvl_3.length; index++) {
          const lvl3 = lvl_3[index];

          sumFaltaLvl_3 = sumFaltaLvl_3 + lvl3['regFalta'];
          sumRetardoLvl_3 = sumRetardoLvl_3 + lvl3['regRetraso'];
          sumTiempoLvl_3 = sumTiempoLvl_3 + lvl3['regTiempo'];

        }
      }
    }

    this.arrayLvlOne.push(sumTiempo);
    this.arrayLvlOne.push(sumRetardo);
    this.arrayLvlOne.push(sumFalta);


    var barChartData = {
      labels: ['Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Registro a Tiempo',
        backgroundColor: "#182652",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumTiempo,
          sumTiempoLvl_2,
          sumTiempoLvl_3
        ]
      }, {
        label: 'Registro con Retardo',
        backgroundColor: "#00A0E0",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumRetardo,
          sumRetardoLvl_2,
          sumRetardoLvl_3
        ]
      },
      {
        label: 'Registro con Falta',
        backgroundColor: "#93E0FF",
        borderColor: "blue",
        borderWidth: 1,
        data: [
          sumFalta,
          sumFaltaLvl_2,
          sumFaltaLvl_3
        ]
      }]

    };

    this.chart = new Chart(htmlRef, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Control de asistencia DEVANT'
        }
      }
    });
    
    this.loading = false;
  }

  chartit() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvas');

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;


    for (let index = 0; index < this.infoUserAsistencia.length; index++) {
      let element = this.infoUserAsistencia[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];
        const lvl_2 = i['lvlTwo'];
        const lvl_3 = i['lvlTree'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }
      }
    }

    this.arrayInfoAsistencia.push(sumTiempo);
    this.arrayInfoAsistencia.push(sumRetardo);
    this.arrayInfoAsistencia.push(sumFalta);


    console.log(this.arrayInfoAsistencia)

    this.chart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['A Tiempo', 'Retardos', 'Faltas'],
        datasets: [
          {
            data: this.arrayInfoAsistencia,
            backgroundColor: [
              '#182652',
              '#00A0E0',
              '#93E0FF'
            ],
            fill: false
          }
        ]
      }
    });

    this.chartUserPrimerTrimestre();    
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
    }
  }


  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  habilitar: boolean = true;



  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }

}
