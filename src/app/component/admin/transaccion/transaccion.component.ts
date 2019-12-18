import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Transaccion} from "../../../shared/model/transaccion.model";

import {ModalDirective} from "angular-bootstrap-md";
import {Router} from "@angular/router";
import {TransaccionService} from "../../../shared/service/transaccion.service";
import {AlertService} from "ngx-alerts";
import {OficinaService} from "../../../shared/service/oficina.service";
import {TipoAtencionService} from "../../../shared/service/tipoAtencion.service";
import {TipoAtencion} from "../../../shared/model/tipoAtencion.model";

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html'

})
export class TransaccionComponent implements OnInit {

  public listTransaccion: Transaccion[];
  public listTipoAtencion: TipoAtencion[];
  public item: Transaccion = new Transaccion();
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
    public transaccionService: TransaccionService,
    public alertService: AlertService,
    public oficinaService: OficinaService,
    public tipoAtencionService: TipoAtencionService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.idOficina = 0;
    this.idTipoAtencion = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Transacciones';
  }

  ngOnInit() {
    this.search();
  }

  public loadCombos() {
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
    this.transaccionService.getByName(this.valueInput).subscribe(
      data => {
        console.log(data)
        this.enableBtnBuscar = true;
        this.listTransaccion = <Transaccion[]>data;
      },
      error => {
        this.listTransaccion = [];
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
    this.transaccionService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borró correctamente el registro '
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
    this.item = new Transaccion();
    this.titleModal = 'Crear Transacciones';

    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.loadCombos();
    this.enableBtnBuscar = false;
    this.transaccionService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Transacciones';
        this.enableBtnBuscar = true;
        this.item = <Transaccion>data;
        this.idTipoAtencion =
          this.item.tipoAtencion != undefined
            ? this.item.tipoAtencion.idTipoAtencion
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

  public selectIdOficina(id: number) {
    this.idOficina = id;
  }

  public selectIdTipoAtencion(id: number) {
    this.idTipoAtencion = id;
  }

  public save(): void {
    this.item.tipoAtencion = this.listTipoAtencion.find(
      obj => obj.idTipoAtencion == this.idTipoAtencion
    );
    this.item.esNodo=0;
    this.transaccionService.save(this.item).subscribe(
      data => {
        this.item = new Transaccion();
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
      this.idTipoAtencion == 0
    );
  }

}
