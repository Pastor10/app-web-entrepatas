import { Component, OnInit, ViewChild } from '@angular/core';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { LazyLoadEvent } from 'primeng/api';


@Component({
    selector: 'app-devolucion',
    templateUrl: './devolucion.component.html',
    styleUrls: ['./devolucion.component.scss']
   
})

export class DevolucionComponent implements OnInit{

    cols: any[]
    adopciones: Adopcion[];
  constructor(public adopcionService: AdopcionService){

  }

  ngOnInit(){
    this.cols = [
        {field: 'fecha', header: 'Fecha', width: '80px'},
        {field: 'hora', header: 'Hora', width: '70px'},
        {field: 'nombres', header: 'Nombres', width: '150px'},
        {field: 'documento', header: 'Documento', width: '90px'},
        {field: 'ubigeo', header: 'Lugar', width: '200px'},
        {field: 'celular', header: 'Celular', width: '100px'},
        {field: 'mascota', header: 'Mascota', width: '100px'},
        {field: 'estado', header: 'Estado', width: '80px'},
    ];
  }

  getAllDevoluciones(){
      this.adopcionService.getAllDevoluciones().subscribe((data: Adopcion[]) =>{
        this.adopciones = data;
        console.log(data);
        
      });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getAllDevoluciones();
}


    
}