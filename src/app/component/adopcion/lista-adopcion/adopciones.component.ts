import { Component, OnInit, ViewChild } from '@angular/core';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { LazyLoadEvent, MessageService } from 'primeng/api';


@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.scss']

})

export class AdopcionComponent implements OnInit {

  cols: any[]
  adopciones: Adopcion[];
  modalEntrega: boolean = false;
  modalDevolucion: boolean = false;
  adopcion: Adopcion;
  fechaEntrega: Date;
  fechaDevolucion: Date;
  motivoDevolucion: string;
  es: any;
  lastLazyLoadEvent: LazyLoadEvent;
  totalRecords: number;
  perPage = 10;
  constructor(public adopcionService: AdopcionService, public messageService: MessageService) {
    this.adopcion = new Adopcion();
  }

  ngOnInit() {
    this.cols = [
      { field: 'nombres', header: 'Nombres', width: '170px' },
      { field: 'documento', header: 'Documento', width: '120px' },
      { field: 'ubigeo', header: 'Lugar', width: '170px' },
      { field: 'celular', header: 'Celular', width: '90px' },
      { field: 'mascota', header: 'Mascota', width: '100px' },
      { field: 'foto', header: 'Foto', width: '70px' },
      { field: 'fecha', header: 'Fecha entrega', width: '80px' },
      { field: 'estado', header: 'Estado', width: '120px' },
    ];

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  getAllAdopciones(event) {
    const params = [];
    this.lastLazyLoadEvent = event;
    const pageNumber = event.first / this.perPage;

    params.push(`page=${pageNumber}`);
    params.push(`perPage=${this.perPage}`);
    this.adopcionService.getAll(params.join('&')).subscribe((data: Adopcion[]) => {
      this.totalRecords = data['totalElements'];
      this.adopciones = data['content'];
     
      console.log(this.adopciones );

    });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getAllAdopciones(event);
  }

  doAction(data, accion) {
    data.estadoAdopcion = accion;

    if(accion=='ENTREGADO'){
      data.fechaEntrega = this.fechaEntrega;
    }else{
      data.fechaDevolucion = this.fechaDevolucion;
      data.motivoDevolucion = this.motivoDevolucion;
    }
    

    this.adopcionService.save(data).subscribe(
      data => {
        if (data != null) {
          this.showMsg('success', 'Se guardó correctamente', 'Adopción');
        }

      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.showMsg('danger', errorMessage);
      }
    );
    this.modalEntrega = false;
    this.modalDevolucion = false
  }

  linkUpdate(id) {
    return `/main/adopcion-usuario/${id}`;
  }

  showMsg(type: string, msg: string, title: string = 'Adopción') {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }

  showDialogEntrega(data) {
    this.adopcion = data;
    console.log('adopcion', this.adopcion);

    this.modalEntrega = true;
  }

  showDialogDevolucion(data) {
    this.adopcion = data;
    console.log('adopcion', this.adopcion);

    this.modalDevolucion = true;
  }

}