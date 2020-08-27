import { Component, OnInit, ViewChild } from '@angular/core';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { LazyLoadEvent } from 'primeng/api';


@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.scss']

})

export class DevolucionComponent implements OnInit {

  cols: any[]
  adopciones: Adopcion[];
  lastLazyLoadEvent: LazyLoadEvent;
  totalRecords: number;
  perPage = 10;
  constructor(public adopcionService: AdopcionService) {

  }

  ngOnInit() {
    this.cols = [
      { field: 'fecha', header: 'Fecha devolución', width: '90px' },
      { field: 'nombres', header: 'Nombres', width: '150px' },
      { field: 'documento', header: 'Documento', width: '120px' },
      { field: 'ubigeo', header: 'Lugar', width: '200px' },
      { field: 'celular', header: 'Celular', width: '100px' },
      { field: 'mascota', header: 'Mascota', width: '100px' },
      { field: 'foto', header: 'Foto', width: '80px' },
      { field: 'motivo', header: 'Motivo', width: '150px' },
      { field: 'estado', header: 'Estado', width: '120px' },
      // { field: 'accion', header: 'Acciones', width: '90px' }
    ];
  }

  getAllDevoluciones(event) {
    const params = [];
    this.lastLazyLoadEvent = event;
    const pageNumber = event.first / this.perPage;

    params.push(`page=${pageNumber}`);
    params.push(`perPage=${this.perPage}`);
    this.adopcionService.getAllDevoluciones(params.join('&')).subscribe((data: Adopcion[]) => {
      this.totalRecords = data['totalElements'];
      this.adopciones = data['content'];
      console.log(data);

    });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getAllDevoluciones(event);
  }



}