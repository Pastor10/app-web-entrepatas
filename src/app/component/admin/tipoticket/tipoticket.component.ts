import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { TipoTicket } from 'src/app/shared/model/tipoTicket.model';
import { TipoTicketService } from 'src/app/shared/service/tipoTicket.service';
import { Oficina } from 'src/app/shared/model/oficina.model';
import { OficinaService } from 'src/app/shared/service/oficina.service';
import { TipoAtencion } from 'src/app/shared/model/tipoAtencion.model';
import { TipoAtencionService } from 'src/app/shared/service/tipoAtencion.service';

@Component({
  selector: 'app-tipoticket',
  templateUrl: './tipoticket.component.html',
  styleUrls: ['./tipoticket.component.css']
})
export class TipoTicketComponent implements OnInit {
  public listOficina: Oficina[];
  public listTipoAtencion: TipoAtencion[];
  public listItem: TipoTicket[];
  public item: TipoTicket = new TipoTicket();
  public id: number;
  public idOficina: number;
  public idTipoAtencion: number;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string;
  public titleModal: string;
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(
    public router: Router,
    public tipoTicketService: TipoTicketService,
    public alertService: AlertService,
    public oficinaService: OficinaService,
    public tipoAtencionService: TipoAtencionService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.idOficina = 0;
    this.idTipoAtencion = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Tipo Ticket';
  }

  ngOnInit() {
    this.search();
  }

  public loadCombos() {
    this.oficinaService.getAll().subscribe(
      data => {
        this.listOficina = <Oficina[]>data;
      },
      error => {
        this.listOficina = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );

    this.tipoAtencionService.getAll().subscribe(
      data => {
        this.listTipoAtencion = <TipoAtencion[]>data;
      },
      error => {
        this.listTipoAtencion = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  public search() {
    this.enableBtnBuscar = false;
    this.tipoTicketService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <TipoTicket[]>data;
      },
      error => {
        this.listItem = [];
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public showConfirmDelete(id: number) {
    this.id = id;
    this.confirmDelete.show();
  }

  public delete(): void {
    this.enableBtnBuscar = false;
    this.tipoTicketService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borró correctamente el registro seleccionado '
        );
        this.confirmDelete.hide();
        this.search();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadCreate(): void {
    this.loadCombos();
    this.item = new TipoTicket();
    this.item.activo = true;
    this.titleModal = 'Crear Tipo Ticket';
    this.idTipoAtencion = 0;
    this.idOficina = 0;
    this.listOficina = [];
    this.listTipoAtencion = [];
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.loadCombos();
    this.enableBtnBuscar = false;
    this.tipoTicketService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Tipo Ticket';
        this.enableBtnBuscar = true;
        this.item = <TipoTicket>data;
        this.idTipoAtencion =
          this.item.tipoAtencion != undefined
            ? this.item.tipoAtencion.idTipoAtencion
            : 0;
        this.idOficina =
          this.item.oficina != undefined ? this.item.oficina.idOficina : 0;
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public selectIdOficina(id: number) {
    this.idOficina = id;
  }

  public selectIdTipoAtencion(id: number) {
    this.idTipoAtencion = id;
  }

  public save(): void {
    this.item.oficina = this.listOficina.find(
      obj => obj.idOficina == this.idOficina
    );
    this.item.tipoAtencion = this.listTipoAtencion.find(
      obj => obj.idTipoAtencion == this.idTipoAtencion
    );
    this.tipoTicketService.save(this.item).subscribe(
      data => {
        this.item = new TipoTicket();
        this.alertService.success('Se guardó correctamente');
        this.modal.hide();
        this.search();
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public validate(): boolean {
    return (
      this.item.nombre == undefined ||
      this.item.nombre.trim().length == 0 ||
      this.item.descripcion == undefined ||
      this.item.descripcion.trim().length == 0 ||
      this.item.codigoImpresion == undefined ||
      this.item.codigoImpresion.trim().length == 0 ||
      this.idOficina == 0 ||
      this.idTipoAtencion == 0
    );
  }
}
