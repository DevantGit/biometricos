import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { Cliente } from '../../clientes/cliente';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.css']
})
export class ModalSettingsComponent implements OnInit {
  userID: Cliente;
  noEmpleado: Cliente;
  noTarjeta: Cliente;
  estatus: Cliente;
  departamento: Cliente;
  tor: void;
  fabrica: string;
  torniquetes: string;

  constructor(private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.limpiarCampos();
  }

  mostrar(cliente) {
    this.userID = cliente.userID;
    this.noEmpleado = cliente.badgerNumber;
    this.noTarjeta = cliente.noTarjeta;
    this.estatus = cliente.title;
    this.departamento = cliente.departamento;
  }

  limpiarCampos(){
    
  }

  guardarCambios(torniquetes,fabrica,infre){

      var torni = (<HTMLInputElement>document.getElementById('torniquetes'));
      
      var Q_piso = (<HTMLInputElement>document.getElementById('infre'));

      if (torni.checked == true){
        alert("activo torniquetes");
      }

      if (Q_piso.checked == true){
        alert("activo quito piso")
      }
      

  }

}
