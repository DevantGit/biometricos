import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { UserDevant } from '../clientes/UserDevant';
import { ClienteService } from '../clientes/cliente.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-clientes-asistencia-rango',
  templateUrl: './clientes-asistencia-rango.component.html',
  styleUrls: ['./clientes-asistencia-rango.component.css']
})
export class ClientesAsistenciaRangoComponent implements OnInit {

  clientes: Cliente;
  userDevant = new UserDevant();
  userClit : any;
  arregloFechas:Array<string>;
  id:number;
  tab:boolean = true;
  busqueda:boolean = false;
  nuevaConsulta: boolean= false;
  contentBusqueda: boolean= true;
  arrayListContent = [];

  public minDate: Date = new Date();
  public maxDate: Date = new Date();

  nombreUser: string;
  dateOne: string;
  term: string;
  dateTwo: string;
  userIDValue: string;
  imgSerach: boolean = false;
  button: boolean;

  constructor(private clienteService: ClienteService,private alertService: AlertService) { }

  ngOnInit() {

    this.nuevaConsulta;
    this.contentBusqueda;
    this.tab;
    this.imgSerach;
    this.busqueda;
    this.button = false;

    this.cargarUsuarios();
 
  }

 

  public cargarUsuarios(){
    this.tab=true;
    this.busqueda=false;
    this.clienteService.getClientes().subscribe( data => {
      this.arrayListContent.push(data.body);

      for (let index = 0; index < this.arrayListContent.length; index++) {
        const element = this.arrayListContent[index];
        console.log(element)
      }

    },error=>{
      this.alertService.danger('Rango de fechas seleccionadas es invalida');
    });
  }

  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
}  

  public cargarFechas(event, eventTwo, term){
    if( term != undefined || term != null){
      this.arregloFechas = new Array(event, eventTwo); 
      this.userIDValue = (<HTMLInputElement>document.getElementById('userID')).value;
      this.id = parseInt(this.userIDValue);
      this.userDevant.userId = this.id;
      this.userDevant.fechainicio = event;
      this.userDevant.fechaFin = eventTwo
      this.clienteService.getClienteDateByRank(this.userDevant).subscribe(data =>{
        this.userClit = data;
      },error=>{
        this.alertService.danger('Rango de fechas seleccionadas es invalida');
        this.contentBusqueda = true;
        this.nuevaConsulta = false;
        this.cargarUsuarios();
      });
      this.tab=false;
      this.busqueda=true;
      this.imgSerach = false;
      this.contentBusqueda = false;
      this.nuevaConsulta = true;
      this.limpicarCampos();
    }else{
      this.alertService.warning('Ingrese nombre del colaborador.');
      this.cargarUsuarios();
    }
  }

  public nuevaConsult(){
    this.contentBusqueda = true;
    this.nuevaConsulta = false;
    this.tab = true;
    this.busqueda = false;
  }

  public limpicarCampos(){
    this.term='';
    this.userIDValue = null;
    this.dateOne = null;
    this.dateTwo=null;
  }

  public saverange(event){
    console.log(event)
    if(event == null || event == "" ){
      this.imgSerach = false;
    }else{
      this.imgSerach = true;
    }
  }

}

