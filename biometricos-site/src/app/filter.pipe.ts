import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(clientes: any, term ?: any): any {
    if(term == undefined ) return clientes;
    return clientes.filter(function(cliente){
      if(cliente.name){
        return cliente.name.toLowerCase().includes(term.toLowerCase());
      }
    })
  }




}
