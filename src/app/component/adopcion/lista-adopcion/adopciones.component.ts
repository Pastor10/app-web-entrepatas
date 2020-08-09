import { Component, OnInit, ViewChild } from '@angular/core';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { LazyLoadEvent } from 'primeng/api';


@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html'

})

export class AdopcionComponent implements OnInit {

  cols: any[]
  adopciones: Adopcion[];
  constructor(public adopcionService: AdopcionService) {

  }

  ngOnInit() {
    this.cols = [
      { field: 'fecha', header: 'Fecha', width: '80px' },
      { field: 'hora', header: 'Hora', width: '70px' },
      { field: 'nombres', header: 'Nombres', width: '170px' },
      { field: 'documento', header: 'Documento', width: '90px' },
      { field: 'ubigeo', header: 'Lugar', width: '170px' },
      { field: 'celular', header: 'Celular', width: '70px' },
      { field: 'mascota', header: 'Mascota', width: '100px' },
      { field: 'foto', header: 'Foto', width: '70px' },
      { field: 'estado', header: 'Estado', width: '90px' },
    ];
  }

  getAllAdopciones() {
    this.adopcionService.getAll().subscribe((data: Adopcion[]) => {
      this.adopciones = data;
      console.log(data);

    });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getAllAdopciones();
  }

  doAction(data, accion) {
    data.estadoAdopcion = accion;

    this.adopcionService.save(data).subscribe(
      data => {
        if (data != null) {
          // this.showMsg('success', 'Se guardó correctamente', 'Adopción');
        }

      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.showMsg('danger', errorMessage);
      }
    );
  }

  linkUpdate(id) {
    return `/main/adopcion-usuario/${id}`;
  }

}