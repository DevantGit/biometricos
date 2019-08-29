import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DirectivaService } from './directiva.service';
import { Cliente } from '../clientes/cliente';
import { UserDevant } from '../clientes/UserDevant';
import { Assistence } from '../clientes/Assistence';
import * as $ from 'jquery';
import { InfoMes } from './InfoMes';


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
  prev: boolean = false;
  nex: boolean = true;
  userIDValue: string;

  departamento: string;
  fabricaPrimer: boolean;
  infrePrimer: boolean;
  adminPrimer: boolean;
  fabricaSegundo: boolean;
  adminSegundo: boolean;
  infreSegundo: boolean;
  fabricaTercer: boolean;
  infreTercer: boolean;
  adminTercer: boolean;
  fabricaCuarto: boolean;
  infreCuarto: boolean;
  adminCuarto: boolean;
  canvasFabrica: boolean;
  canvasInfre: boolean;
  canvasAdministracion: boolean;
  informacionMes: String;


  constructor(private elementRef: ElementRef, private directivaService: DirectivaService) {
    this.fabricaPrimer = true;
    this.infrePrimer = false;
    this.adminPrimer = false;

    this.fabricaSegundo = true;
    this.infreSegundo = false;
    this.adminSegundo = false;

    this.fabricaTercer = true;
    this.infreTercer = false;
    this.adminTercer = false;

    this.fabricaCuarto = true;
    this.infreCuarto = false;
    this.adminCuarto = false;

    this.canvasFabrica = true;
    this.canvasInfre = false;
    this.canvasAdministracion = false;
  }

  ngOnInit() {

    this.getInfoMesDashboard();
    this.charUserInfoAsistenciaFabrica();

    this.canvasFabrica = true;
    this.canvasInfre = false;
    this.canvasAdministracion = false;

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

  public getInfoMesDashboard(){
    this.directivaService.getInfoMonth().subscribe(res =>{
      this.informacionMes = res.infoMes;
      console.log(this.informacionMes)
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
    }
  }

  public cambioDepartamento() {
    this.departamento = (<HTMLInputElement>document.getElementById('departamento')).value;
    console.log(this.departamento)
    switch (this.departamento) {
      case 'adminstracion':
        alert(this.departamento)
        this.fabricaPrimer = false;
        this.infrePrimer = false;
        this.adminPrimer = true;

        this.fabricaSegundo = false;
        this.infreSegundo = false;
        this.adminSegundo = true;

        this.fabricaTercer = false;
        this.infreTercer = false;
        this.adminTercer = true;

        this.fabricaCuarto = false;
        this.infreCuarto = false;
        this.adminCuarto = true;

        this.canvasFabrica = false;
        this.canvasInfre = false;
        this.canvasAdministracion = true;

        this.directivaService.getUserDevantAsistenciaMesAdministracion().subscribe(res => {
          let infoUserAsistenciaAdministracion = [];
          infoUserAsistenciaAdministracion.push(res);
          this.charReporteAsistenciaMesAdministracion(infoUserAsistenciaAdministracion);
        });


        break;
      case 'infrestru':
        alert(this.departamento)
        this.fabricaPrimer = false;
        this.infrePrimer = true;
        this.adminPrimer = false;

        this.fabricaSegundo = false;
        this.infreSegundo = true;
        this.adminSegundo = false;

        this.fabricaTercer = false;
        this.infreTercer = true;
        this.adminTercer = false;

        this.fabricaCuarto = false;
        this.infreCuarto = true;
        this.adminCuarto = false;

        this.canvasFabrica = false;
        this.canvasInfre = true;
        this.canvasAdministracion = false;

        this.directivaService.getUserDevantAsistenciaMesAdmin().subscribe(res => {
          let infoUserAsistenciaAdmin = [];
          infoUserAsistenciaAdmin.push(res);
          this.charReporteAsistenciaMesAdmin(infoUserAsistenciaAdmin);
        });

        break;
      case 'fabrica':
        alert(this.departamento)
        this.fabricaPrimer = true;
        this.infrePrimer = false;
        this.adminPrimer = false;

        this.fabricaSegundo = true;
        this.infreSegundo = false;
        this.adminSegundo = false;

        this.fabricaTercer = true;
        this.infreTercer = false;
        this.adminTercer = false;

        this.fabricaCuarto = true;
        this.infreCuarto = false;
        this.adminCuarto = false;

        this.canvasFabrica = true;
        this.canvasInfre = false;
        this.canvasAdministracion = false;

        this.directivaService.getUserDevantAsistenciaMesFabrica().subscribe(res => {
          let infoUserAsistencia = [];
          infoUserAsistencia.push(res);
          this.charReporteAsistenciaMesFabrica(infoUserAsistencia);
        });

        break;

    }
  }

  ///REPORTE DE ADMINISTRACION INICIO MES

  charReporteAsistenciaMesAdministracion(infoUserAsistenciaAdministracion) {
    let arrayAsistenciaAdministracion = [];
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdministracion');
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0, count = 0;


    for (let index = 0; index < infoUserAsistenciaAdministracion.length; index++) {
      let element = infoUserAsistenciaAdministracion[index];

      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];
        }
      }
    }


    arrayAsistenciaAdministracion.push(sumTiempo);
    arrayAsistenciaAdministracion.push(sumRetardo);
    arrayAsistenciaAdministracion.push(sumFalta);

    this.chart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['A Tiempo', 'Retardos', 'Faltas'],
        datasets: [
          {
            data: arrayAsistenciaAdministracion,
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

    this.getreporteAdministracion();

  }

  // GET REPORTES DE ASISTENCIA ADMINISTRACION

  getreporteAdministracion() {
    this.directivaService.getInfoReporteAdministracion().subscribe(res => {
      let infoPrimerTrimestreAdministracion = [];
      infoPrimerTrimestreAdministracion.push(res);
      this.charReporteAdministracionPrimerTrimestre(infoPrimerTrimestreAdministracion);
    });
  }



  charReporteAdministracionPrimerTrimestre(infoPrimerTrimestreAdministracion) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminPrimer');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoPrimerTrimestreAdministracion.length; index++) {
      let element = infoPrimerTrimestreAdministracion[index];
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

    // this.arrayLvlOneAdministracion.push(sumTiempo);
    // this.arrayLvlOneAdministracion.push(sumRetardo);
    // this.arrayLvlOneAdministracion.push(sumFalta);


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
    this.chartReporteAdminstracionSegundo();
  }

  chartReporteAdminstracionSegundo() {

    let infoSegundoTrimestreAdministracion = [];

    this.directivaService.getInfoReporteAdministracionSegundoTri().subscribe(res => {
      infoSegundoTrimestreAdministracion.push(res);
      this.charReporteAdministracionSegundoTrimestre(infoSegundoTrimestreAdministracion);
    });
  }


  charReporteAdministracionSegundoTrimestre(infoSegundoTrimestreAdministracion) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminSegundo');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoSegundoTrimestreAdministracion.length; index++) {
      let element = infoSegundoTrimestreAdministracion[index];
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

    // this.arrayLvlOne.push(sumTiempo);
    // this.arrayLvlOne.push(sumRetardo);
    // this.arrayLvlOne.push(sumFalta);


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

    this.chartReporteAdminstracionTercer();

  }

  chartReporteAdminstracionTercer() {

    let infoTercerTrimestreAdministracion = [];

    this.directivaService.getInfoReporteAdministracionTercerTri().subscribe(res => {
      infoTercerTrimestreAdministracion.push(res);
      this.charReporteAdministracionTercerTrimestre(infoTercerTrimestreAdministracion);
    });
  }

  charReporteAdministracionTercerTrimestre(infoTercerTrimestreAdministracion) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminTercer');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;



    for (let index = 0; index < infoTercerTrimestreAdministracion.length; index++) {
      let element = infoTercerTrimestreAdministracion[index];
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

    // this.arrayLvlOne.push(sumTiempo);
    // this.arrayLvlOne.push(sumRetardo);
    // this.arrayLvlOne.push(sumFalta);


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

    this.chartReporteAdminstracionCuarto();
  }

  chartReporteAdminstracionCuarto() {

    let infoCuartoTrimestreAdministracion = [];
    this.directivaService.getInfoReporteAdministracionCuartoTri().subscribe(res => {
      infoCuartoTrimestreAdministracion.push(res);
      this.charReporteAdministracionCuartoTrimestre(infoCuartoTrimestreAdministracion);
    });
  }



  charReporteAdministracionCuartoTrimestre(infoCuartoTrimestreAdministracion) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminCuarto');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoCuartoTrimestreAdministracion.length; index++) {
      let element = infoCuartoTrimestreAdministracion[index];
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

    // this.arrayLvlOne.push(sumTiempo);
    // this.arrayLvlOne.push(sumRetardo);
    // this.arrayLvlOne.push(sumFalta);


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


  // REPORTE MENSUAL DE INFRESTRUCTURA

  charReporteAsistenciaMesAdmin(infoUserAsistenciaAdmin) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfre');
    let arrayInfoAsistenciaAdmin =[];
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;

    for (let index = 0; index < infoUserAsistenciaAdmin.length; index++) {
      let element = infoUserAsistenciaAdmin[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }
      }
    }

    arrayInfoAsistenciaAdmin.push(sumTiempo);
    arrayInfoAsistenciaAdmin.push(sumRetardo);
    arrayInfoAsistenciaAdmin.push(sumFalta);

    this.chart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['A Tiempo', 'Retardos', 'Faltas'],
        datasets: [
          {
            data: arrayInfoAsistenciaAdmin,
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

    this.getInfoReporteAdminPrimerTri();

  }

  getInfoReporteAdminPrimerTri() {
    let infoPrimerTrimestreAdmin = [];
    this.directivaService.getInfoReporteAdminPrimerTri().subscribe(res => {
      infoPrimerTrimestreAdmin.push(res);
      this.charReporteAdminiPrimerTrimestre(infoPrimerTrimestreAdmin);
    });
  }


  charReporteAdminiPrimerTrimestre(infoPrimerTrimestreAdmin) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfrePrimer');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoPrimerTrimestreAdmin.length; index++) {
      let element = infoPrimerTrimestreAdmin[index];
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
    this.chartReporteAdminsSegundo();
  }

  chartReporteAdminsSegundo() {
    let infoSegundoTrimestreAdmin = [];
    this.directivaService.getInfoReporteAdminSegundoTri().subscribe(res => {
      infoSegundoTrimestreAdmin.push(res);
      this.charReporteAdminSegundoTrimestre(infoSegundoTrimestreAdmin);
    });

  }

  charReporteAdminSegundoTrimestre(infoSegundoTrimestreAdmin) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfreSegundo');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;
    
    for (let index = 0; index < infoSegundoTrimestreAdmin.length; index++) {
      let element = infoSegundoTrimestreAdmin[index];
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

    this.chartReporteAdminTercer();
  }

  chartReporteAdminTercer() {
    let infoTercerTrimestreAdmin = [];
    this.directivaService.getInfoReporteAdminTercerTri().subscribe(res => {
      infoTercerTrimestreAdmin.push(res);
      this.charReporteAdmintercerTrimestre(infoTercerTrimestreAdmin);
    });
  }

  charReporteAdmintercerTrimestre(infoTercerTrimestreAdmin) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfreTercer');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;
    
    for (let index = 0; index < infoTercerTrimestreAdmin.length; index++) {
      let element = infoTercerTrimestreAdmin[index];
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

    this.chartReporteAdminCuarto();
  }


  chartReporteAdminCuarto() {
    let infoCuartoTrimestreAdmin = [];
    this.directivaService.getInfoReporteAdminCuartoTri().subscribe(res => {
      infoCuartoTrimestreAdmin.push(res);
      this.charReporteAdminCuartotrimestre(infoCuartoTrimestreAdmin);
    });
  }

  charReporteAdminCuartotrimestre(infoCuartoTrimestreAdmin) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfreCuarto');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoCuartoTrimestreAdmin.length; index++) {
      let element = infoCuartoTrimestreAdmin[index];
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



  // REPORTE MENSUAL DE FABRICA

  charUserInfoAsistenciaFabrica() {
    let infoUserAsistencia = [];
    this.directivaService.getUserDevantAsistenciaMesFabrica().subscribe(res => {
      infoUserAsistencia.push(res);
      this.charReporteAsistenciaMesFabrica(infoUserAsistencia);
    });
  }

  charUserInfoReporteFabricaTrimestre() {
    this.directivaService.getInfoReporteFabricaSwPrimer().subscribe(res => {
      let infoPrimerTrimestre = [];
      infoPrimerTrimestre.push(res);
      this.charReporteFabricaSWPrimerTrimestre(infoPrimerTrimestre);
    });
  }

  charReporteAsistenciaMesFabrica(infoUserAsistencia) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabrica');
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    let arrayInfoAsistencia = [];

    for (let index = 0; index < infoUserAsistencia.length; index++) {
      let element = infoUserAsistencia[index];
      for (let index = 0; index < element.length; index++) {
        const i = element[index];
        const lvl_1 = i['lvlOne'];

        for (let index = 0; index < lvl_1.length; index++) {
          const lvl1 = lvl_1[index];

          sumFalta = sumFalta + lvl1['regFalta'];
          sumRetardo = sumRetardo + lvl1['regRetraso'];
          sumTiempo = sumTiempo + lvl1['regTiempo'];

        }
      }
    }

    arrayInfoAsistencia.push(sumTiempo);
    arrayInfoAsistencia.push(sumRetardo);
    arrayInfoAsistencia.push(sumFalta);

    this.chart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['A Tiempo', 'Retardos', 'Faltas'],
        datasets: [
          {
            data: arrayInfoAsistencia,
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
    this.charUserInfoReporteFabricaTrimestre();
  }

  chartReporteSWSegundo() {
    let infoSegundoTrimestre = [];
    
    this.directivaService.getInfoReporteFabricaSwSegundo().subscribe(res => {
      infoSegundoTrimestre.push(res);
      this.charReporteFabricaSWSegundoTrimestre(infoSegundoTrimestre);
    });
  }

  chartReporteSWTercer() {
    let infoTercerTrimestre = [];
    
    this.directivaService.getInfoReporteFabricaSwTercer().subscribe(res => {
      infoTercerTrimestre.push(res);
      this.charReporteFabricaSWTercerTrimestre(infoTercerTrimestre);
    });
  }

  chartReporteSWCuarto() {

    let infoCuartoTrimestre = [];
   
    this.directivaService.getInfoReporteFabricaSwCuarto().subscribe(res => {
      infoCuartoTrimestre.push(res);
      this.charReporteFabricaSWCuartoTrimestre(infoCuartoTrimestre);
    });
  }

  charReporteFabricaSWPrimerTrimestre(infoPrimerTrimestre) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaPrimer');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoPrimerTrimestre.length; index++) {
      let element = infoPrimerTrimestre[index];
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


    // let barChartData = {
		// 	labels: ['Enero', 'Febrero', 'Marzo'],
		// 	datasets: [{
		// 		label: 'Dataset 1',
		// 		backgroundColor: '#182652',
		// 		data: [
    //       sumTiempo,
    //       sumTiempoLvl_2,
    //       sumTiempoLvl_3
    //     ]
		// 	}, {
		// 		label: 'Dataset 2',
		// 		backgroundColor: '#00A0E0',
		// 		data: [
    //       sumRetardo,
    //       sumRetardoLvl_2,
    //       sumRetardoLvl_3
    //     ]
		// 	}, {
		// 		label: 'Dataset 3',
		// 		backgroundColor: '#93E0FF',
		// 		data: [
    //       sumFalta,
    //       sumFaltaLvl_2,
    //       sumFaltaLvl_3
    //     ]
		// 	}]

		// };

    // this.chart = new Chart(htmlRef, {
		// 		type: 'bar',
		// 		data: barChartData,
		// 		options: {
		// 			title: {
		// 				display: true,
		// 				text: 'Chart.js Bar Chart - Stacked'
		// 			},
		// 			tooltips: {
		// 				mode: 'index',
		// 				intersect: false
		// 			},
		// 			responsive: true,
		// 			scales: {
		// 				xAxes: [{
		// 					stacked: true,
		// 				}],
		// 				yAxes: [{
		// 					stacked: true
		// 				}]
		// 			}
		// 		}
		// 	});
    this.chartReporteSWSegundo();
  }

  charReporteFabricaSWSegundoTrimestre(infoSegundoTrimestre) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaSegundo');
    this.userDevant.userId = this.id;

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoSegundoTrimestre.length; index++) {
      let element = infoSegundoTrimestre[index];
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

    this.chartReporteSWTercer();

  }

  charReporteFabricaSWTercerTrimestre(infoTercerTrimestre) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaTercer');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoTercerTrimestre.length; index++) {
      let element = infoTercerTrimestre[index];
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

    this.chartReporteSWCuarto();
  }

  charReporteFabricaSWCuartoTrimestre(infoCuartoTrimestre) {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaCuarto');
    this.userDevant.userId = this.id;
    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;
    var sumFaltaLvl_2 = 0, sumRetardoLvl_2 = 0, sumTiempoLvl_2 = 0;
    var sumFaltaLvl_3 = 0, sumRetardoLvl_3 = 0, sumTiempoLvl_3 = 0;

    for (let index = 0; index < infoCuartoTrimestre.length; index++) {
      let element = infoCuartoTrimestre[index];
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


}
