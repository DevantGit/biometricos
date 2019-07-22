import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DirectivaService } from './directiva.service';
import { Cliente } from '../clientes/cliente';
import { UserDevant } from '../clientes/UserDevant';
import { Assistence } from '../clientes/Assistence';
import * as $ from 'jquery';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  infoUserAsistencia = [];
  infoPrimerTrimestre = [];
  infoSegundoTrimestre = [];
  infoTercerTrimestre = [];
  infoCuartoTrimestre = [];

  arrayMin = [];
  arrayLvlOne = [];
  arrayInfoAsistencia = [];
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

  infoUserAsistenciaAdministracion= [];
  
  asistenciaAdministracion= [];
  infoUserAsistenciaAdmin =[];
  arrayInfoAsistenciaAdmin = [];
  

  constructor(private elementRef: ElementRef, private directivaService: DirectivaService) {
    this.fabricaPrimer=true;
    this.infrePrimer=false;
    this.adminPrimer=false;     

    this.fabricaSegundo=true;
    this.infreSegundo=false;
    this.adminSegundo=false;

    this.fabricaTercer=true;
    this.infreTercer=false;
    this.adminTercer=false;

    this.fabricaCuarto=true;        
    this.infreCuarto=false;
    this.adminCuarto=false;

    this.canvasFabrica=true;
    this.canvasInfre=false;
    this.canvasAdministracion=false;
   }

  ngOnInit() {

    this.charUserInfoAsistenciaFabrica();
    
    this.canvasFabrica=true;
    this.canvasInfre=false;
    this.canvasAdministracion=false;

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

  charUserInfoAsistenciaFabrica(){
    this.directivaService.getUserDevantAsistenciaMesFabrica().subscribe(res => {
      this.infoUserAsistencia.push(res);
      this.charReporteAsistenciaMesFabrica();
    });
  }

  charUserInfoReporteFabricaTrimestre(){
    this.directivaService.getInfoReporteFabricaSwPrimer().subscribe(res =>{
      this.infoPrimerTrimestre.push(res);
      this.charReporteFabricaSWPrimerTrimestre();
    });
  }

  charReporteAsistenciaMesFabrica() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabrica');

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
    this.charUserInfoReporteFabricaTrimestre();
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
        this.fabricaPrimer=false;
        this.infrePrimer=false;
        this.adminPrimer=true;     

        this.fabricaSegundo=false;
        this.infreSegundo=false;
        this.adminSegundo=true;

        this.fabricaTercer=false;
        this.infreTercer=false;
        this.adminTercer=true;

        this.fabricaCuarto=false;        
        this.infreCuarto=false;
        this.adminCuarto=true;

        this.canvasFabrica=false;
        this.canvasInfre=false;
        this.canvasAdministracion=true;

        this.directivaService.getUserDevantAsistenciaMesAdministracion().subscribe(res =>{
          this.infoUserAsistenciaAdministracion.push(res);
          this.charReporteAsistenciaMesAdministracion();
        });

        break;
      case 'infrestru':
        alert(this.departamento)
        this.fabricaPrimer=false;
        this.infrePrimer=true;
        this.adminPrimer=false;     

        this.fabricaSegundo=false;
        this.infreSegundo=true;
        this.adminSegundo=false;

        this.fabricaTercer=false;
        this.infreTercer=true;
        this.adminTercer=false;

        this.fabricaCuarto=false;        
        this.infreCuarto=true;
        this.adminCuarto=false;

        this.canvasFabrica=false;
        this.canvasInfre=true;
        this.canvasAdministracion=false;

        this.directivaService.getUserDevantAsistenciaMesAdmin().subscribe(res =>{
          this.infoUserAsistenciaAdmin.push(res);
          this.charReporteAsistenciaMesAdmin();
        });

        this.directivaService.getInfoReporteAdminPrimerTri().subscribe(res =>{
          this.infoPrimerTrimestre.push(res);
          this.charReporteAdminiPrimerTrimestre();
        });
        break;
      case 'fabrica':
        alert(this.departamento)
        this.fabricaPrimer=true;
        this.infrePrimer=false;
        this.adminPrimer=false;     

        this.fabricaSegundo=true;
        this.infreSegundo=false;
        this.adminSegundo=false;

        this.fabricaTercer=true;
        this.infreTercer=false;
        this.adminTercer=false;

        this.fabricaCuarto=true;        
        this.infreCuarto=false;
        this.adminCuarto=false;

        this.canvasFabrica=true;
        this.canvasInfre=false;
        this.canvasAdministracion=false;

        this.directivaService.getUserDevantAsistenciaMesFabrica().subscribe(res =>{
          this.infoUserAsistencia.push(res);
          this.charReporteAsistenciaMesFabrica();
        });

        this.charUserInfoReporteFabricaTrimestre();
        break;

    }
  }

  getreporteAdministracion(){
    this.directivaService.getInfoReporteAdministracion().subscribe(res =>{
      this.infoPrimerTrimestre.push(res);
      this.charReporteAdministracionPrimerTrimestre();
    });
  }
  

  charReporteAsistenciaMesAdmin() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfre');

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;


    for (let index = 0; index < this.infoUserAsistenciaAdmin.length; index++) {
      let element = this.infoUserAsistenciaAdmin[index];
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

    this.arrayInfoAsistenciaAdmin.push(sumTiempo);
    this.arrayInfoAsistenciaAdmin.push(sumRetardo);
    this.arrayInfoAsistenciaAdmin.push(sumFalta);

    this.chart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['A Tiempo', 'Retardos', 'Faltas'],
        datasets: [
          {
            data: this.arrayInfoAsistenciaAdmin,
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

  }

  charReporteAsistenciaMesAdministracion() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdministracion');

    var sumFalta = 0, sumRetardo = 0, sumTiempo = 0;


    for (let index = 0; index < this.infoUserAsistenciaAdministracion.length; index++) {
      let element = this.infoUserAsistenciaAdministracion[index];
      
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
    
    this.asistenciaAdministracion.push(sumTiempo);
    this.asistenciaAdministracion.push(sumRetardo);
    this.asistenciaAdministracion.push(sumFalta);

    console.log("Mes ",this.infoUserAsistenciaAdministracion)


    this.chart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: ['A Tiempo', 'Retardos', 'Faltas'],
        datasets: [
          {
            data: this.asistenciaAdministracion,
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

  chartReporteAdminsSegundo(){
    this.directivaService.getInfoReporteAdminSegundoTri().subscribe(res => {
      this.infoSegundoTrimestre.push(res);
      this.charReporteAdminSegundoTrimestre();
    });

  }

  chartReporteAdminTercer(){
    this.directivaService.getInfoReporteAdminTercerTri().subscribe(res => {
      this.infoTercerTrimestre.push(res);
      this.charReporteAdmintercerTrimestre();
    });
  }

  chartReporteAdminCuarto(){
    this.directivaService.getInfoReporteAdminCuartoTri().subscribe(res => {
      this.infoCuartoTrimestre.push(res);
      this.charReporteAdminCuartotrimestre();
    });
  }

  charReporteAdminCuartotrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfreCuarto');
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

  charReporteAdmintercerTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfreTercer');
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

    this.chartReporteAdminCuarto();
  }

  charReporteAdminSegundoTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfreSegundo');
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

    this.chartReporteAdminTercer();
  }

  charReporteAdminiPrimerTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasInfrePrimer');
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
    this.chartReporteAdminsSegundo();
  }

  chartReporteAdminstracionSegundo(){
    this.directivaService.getInfoReporteAdministracionSegundoTri().subscribe(res => {
      this.infoSegundoTrimestre.push(res);
      this.charReporteAdministracionSegundoTrimestre();
    });
  }

  chartReporteAdminstracionTercer(){
    this.directivaService.getInfoReporteAdministracionTercerTri().subscribe(res => {
      this.infoTercerTrimestre.push(res);
      this.charReporteAdministracionTercerTrimestre();
    });
  }

  chartReporteAdminstracionCuarto(){
    this.directivaService.getInfoReporteAdministracionCuartoTri().subscribe(res => {
      this.infoCuartoTrimestre.push(res);
      this.charReporteAdministracionCuartoTrimestre();
    });
  }


  charReporteAdministracionPrimerTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminPrimer');
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
    this.chartReporteAdminstracionSegundo();
  }

  charReporteAdministracionSegundoTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminSegundo');
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

    this.chartReporteAdminstracionTercer();

  }

  charReporteAdministracionTercerTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminTercer');
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

    this.chartReporteAdminstracionCuarto();
  }

  charReporteAdministracionCuartoTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasAdminCuarto');
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

  chartReporteSWSegundo(){
    this.directivaService.getInfoReporteFabricaSwSegundo().subscribe(res => {
      this.infoSegundoTrimestre.push(res);
      this.charReporteFabricaSWSegundoTrimestre();
    });
  }

  chartReporteSWTercer(){
    this.directivaService.getInfoReporteFabricaSwTercer().subscribe(res => {
      this.infoTercerTrimestre.push(res);
      this.charReporteFabricaSWTercerTrimestre();
    });
  }

  chartReporteSWCuarto(){
    this.directivaService.getInfoReporteFabricaSwCuarto().subscribe(res => {
      this.infoCuartoTrimestre.push(res);
      this.charReporteFabricaSWCuartoTrimestre();
    });
  }

  charReporteFabricaSWPrimerTrimestre() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaPrimer');
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
    this.chartReporteSWSegundo();
  }

  charReporteFabricaSWSegundoTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaSegundo');
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

    this.chartReporteSWTercer();

  }

  charReporteFabricaSWTercerTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaTercer');
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

    this.chartReporteSWCuarto();
  }

  charReporteFabricaSWCuartoTrimestre(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#canvasFabricaCuarto');
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
  

}
