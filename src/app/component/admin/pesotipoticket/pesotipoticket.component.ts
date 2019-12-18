import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { Peso } from 'src/app/shared/model/peso.model';
import { PesoTipoTicketService } from 'src/app/shared/service/pesotipoticket.service';
import { TipoTicket } from 'src/app/shared/model/tipoTicket.model';
import { PesoTipoTicket } from 'src/app/shared/model/pesoTipoTicket.model';
import { TipoTicketService } from 'src/app/shared/service/tipoTicket.service';
import { PesoService } from 'src/app/shared/service/peso.service';
import { Oficina } from 'src/app/shared/model/oficina.model';
import { OficinaService } from 'src/app/shared/service/oficina.service';

@Component({
  selector: 'app-pesotipoticket',
  templateUrl: './pesotipoticket.component.html',
  styleUrls: ['./pesotipoticket.component.css']
})
export class PesoTipoTicketComponent implements OnInit {
  public listPeso: Peso[];
  public listTipoTicket: TipoTicket[];
  public listItem: PesoTipoTicket[];
  public item: PesoTipoTicket = new PesoTipoTicket();
  public id: number;
  public idPeso: number;
  public idTipoTicket: number;
  public enableBtnBuscar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string;
  public titleModal: string;
  public pesoSeleccionado: Peso;
  public listItemOficina: Oficina[];
  public valueImputOficina: string ;
  public idOficina: number;
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(
    public router: Router,
    public pesoTipoTicketService: PesoTipoTicketService,
    public alertService: AlertService,
    public tipoTicket: TipoTicketService,
    public pesoService: PesoService,
    public tipoTicketService: TipoTicketService,
    public OficinaService: OficinaService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.idPeso = 0;
    this.idTipoTicket = 0;
    this.valueInput = '';
    this.valueImputOficina='';
    this.titleModal = 'Crear Perfil Atención/Tipo Ticket';
  }

  ngOnInit() {
    this.search();
  }

  public loadOficinas() {
    this.enableBtnBuscar = false;
    this.OficinaService.getByName(this.valueImputOficina).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItemOficina = <Oficina[]>data;
      },
      error => {
        this.listItemOficina = [];
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }


  public loadCombos(id: number) {
    this.idPeso = 0;
    this.idTipoTicket = 0;
    this.idOficina=id;
    this.pesoService.getfindByPesoidOficina(this.idOficina).subscribe(
      data => {
        this.listPeso = <Peso[]>data;
      },
      error => {
        this.listPeso = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );

    this.tipoTicketService.getTicketByIdOficina(this.idOficina).subscribe(
      data => {
        this.listTipoTicket = <TipoTicket[]>data;
      },
      error => {
        this.listTipoTicket = [];
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
    this.pesoTipoTicketService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <PesoTipoTicket[]>data;
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
    this.pesoTipoTicketService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borró correctamente el registro seleccionado'
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
    this.clear();
   // this.loadCombos();
    this.loadOficinas();
    this.item.activo = true;
    this.titleModal = 'Crear Perfil Atención/Tipo Ticket';
    this.modal.show();
  }

  public clear(): void {
    this.item = new PesoTipoTicket();
    this.item.activo = false;
    this.idPeso = 0;
    this.pesoSeleccionado = null;
    this.idTipoTicket = 0;
    this.listPeso = [];
    this.listTipoTicket = [];
    this.listItemOficina=[];
    this.idOficina=0;
  }

  public loadEdit(id:number,ido:number): void {
    this.clear();
    this.loadOficinas();
    this.loadCombos(ido);
    this.enableBtnBuscar = false;
    this.pesoTipoTicketService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Perfil Atención/Tipo Ticket';
        this.enableBtnBuscar = true;
        this.item = <PesoTipoTicket>data;
        this.idPeso = this.item.pesoEntity ? this.item.pesoEntity.idPeso : 0;
        this.pesoSeleccionado = this.item.pesoEntity
          ? this.item.pesoEntity
          : null;
        this.idTipoTicket =
          this.item.tipoTicket != undefined
            ? this.item.tipoTicket.idTipoTicket
            : 0;
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

  public selectIdPeso(id: number) {
    this.idPeso = id;
    this.pesoSeleccionado = this.listPeso.find(obj => obj.idPeso == id);
  }

  public selectIdTipoTicket(id: number) {
    this.idTipoTicket = id;
  }

  public save(): void {
    this.item.pesoEntity = this.listPeso.find(obj => obj.idPeso == this.idPeso);
    this.item.tipoTicket = this.listTipoTicket.find(
      obj => obj.idTipoTicket == this.idTipoTicket
    );
    this.pesoTipoTicketService.save(this.item).subscribe(
      data => {
        this.item = new PesoTipoTicket();
        this.alertService.success('Se guardó correctamente');
        this.modal.hide();
        this.search();
      },
      error => {
        const _body = error._body;
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
    return this.idPeso == 0 || this.idTipoTicket == 0;
  }
}
