import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { UserDevant } from './UserDevant';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'ngx-alerts';
import * as $ from 'jquery';
import { HttpHeaders  } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalSettingsComponent } from '../modal/modal-settings/modal-settings.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  @ViewChild(ModalSettingsComponent) modalSettings: ModalSettingsComponent;

  
  clientes: Cliente;
  userDevant = new UserDevant();
  userClit : any;
  arregloFechas:Array<string>;
  id:number;
  tab:boolean = true;
  busqueda:boolean = false;
  nuevaConsulta: boolean= false;
  contentBusqueda: boolean= true;

  public minDate: Date = new Date();
  public maxDate: Date = new Date();

  nombreUser: string;
  dateOne: string;
  term: string;
  dateTwo: string;
  userIDValue: string;
  imgSerach: boolean = false;
  button: boolean;

  constructor(private clienteService: ClienteService, private ngxService: NgxUiLoaderService,private alertService: AlertService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.nuevaConsulta;
    this.contentBusqueda;
    this.ngxService.start(); 
    this.tab;
    this.imgSerach;
    this.busqueda;
    this.button = false;

    this.cargarUsuarios();
 
  }

  limpiarChecked(){
    document.addEventListener("click", function () {
      document.getElementById('infre').removeAttribute('checked');
      document.getElementById('fabrica').removeAttribute('checked');
      document.getElementById('torniquetes').removeAttribute('checked');
    });
  }

  enviarMensaje(event) {
    console.log(event.departamento)
    this.limpiarChecked();

    if(event.departamento == -1){
      document.addEventListener("click", function () {
        document.getElementById('torniquetes').removeAttribute('checked');
        document.getElementById('infre').removeAttribute('checked');
        document.getElementById('fabrica').removeAttribute('checked');  
      });
    }else if(event.departamento == 19){
      document.addEventListener("click", function () {
        document.getElementById('infre').setAttribute('checked','checked');
        document.getElementById('torniquetes').removeAttribute('checked');
        document.getElementById('fabrica').removeAttribute('checked');
      });
    }else if(event.departamento == 20){
      document.addEventListener("click", function () {
        document.getElementById('fabrica').setAttribute('checked','checked');
        document.getElementById('infre').setAttribute('checked','checked');
        document.getElementById('torniquetes').removeAttribute('checked');
      });
    }else if(event.departamento == 21){
      document.addEventListener("click", function () {
        document.getElementById('torniquetes').setAttribute('checked','checked');
        document.getElementById('infre').setAttribute('checked','checked');
        document.getElementById('fabrica').removeAttribute('checked');
      });
    }else if(event.departamento == 22){
      document.addEventListener("click", function () {
        document.getElementById('torniquetes').setAttribute('checked','checked');
        document.getElementById('infre').setAttribute('checked','checked');
        document.getElementById('fabrica').removeAttribute('checked');
      });
    }
    
    this.modalSettings.mostrar(event);
  }

  public cargarUsuarios(){
    this.tab=true;
    this.busqueda=false;
    this.clienteService.getClientes().subscribe( data => {
      this.clientes = data.body;
      console.log(this.clientes);
      this.ngxService.stop();
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
      this.fadeTo();
    }else{
      this.alertService.warning('Ingrese nombre del colaborador.');
      this.cargarUsuarios();
    }
  }

  public fadeTo(){
    $(document).ready(function(){
      $("#imgSearch").click(function(){
        $("#nuevaConsulta").slideToggle("slow");
      });
    });
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
