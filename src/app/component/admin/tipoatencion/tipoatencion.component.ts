import {Router} from '@angular/router';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {AlertService} from 'ngx-alerts';
import {ModalDirective} from 'angular-bootstrap-md';
import {TipoAtencion} from 'src/app/shared/model/tipoAtencion.model';
import {TipoAtencionService} from 'src/app/shared/service/tipoAtencion.service';

@Component({
  selector: 'app-tipoatencion',
  templateUrl: './tipoatencion.component.html',
  styleUrls: ['./tipoatencion.component.css']
})
export class TipoAtencionComponent implements OnInit {

  public listItem: TipoAtencion[];
  public item: TipoAtencion = new TipoAtencion();
  public id = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput = '';
  public titleModal = 'Crear Tipo Atención';
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(public router: Router,
              public tipoAtencionService: TipoAtencionService, public alertService: AlertService,
              public cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.search();
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  public search() {
    this.enableBtnBuscar = false;
    this.tipoAtencionService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <TipoAtencion[]>data;
      },
      error => {
        this.listItem = [];
        this.enableBtnBuscar = true;
        const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petición';
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
    this.tipoAtencionService.delete(this.id)
      .subscribe(data => {
          this.enableBtnBuscar = true;
          this.alertService.success('Se borró correctamente el registro seleccionado ');
          this.confirmDelete.hide();
          this.search();
        },
        error => {
          this.enableBtnBuscar = true;
          const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petición';
          this.alertService.danger(errorMessage);
        });
  }

  public loadCreate(): void {
    this.item = new TipoAtencion();
    this.item.activo = true;
    this.titleModal = 'Crear Tipo Atención';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.tipoAtencionService.getById(id)
      .subscribe(data => {
          this.titleModal = 'Modificar Tipo Atención';
          this.enableBtnBuscar = true;
          this.item = <TipoAtencion>data;
          this.modal.show();
        },
        error => {
          this.enableBtnBuscar = true;
          const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petición';
          this.alertService.danger(errorMessage);
        });
  }

  public save(): void {
    this.tipoAtencionService.save(this.item)
      .subscribe(
        data => {
          this.item = new TipoAtencion();
          this.alertService.success('Se guardó correctamente');
          this.modal.hide();
          this.search();
        },
        error => {
          const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petición';
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
    return this.item.nombre == undefined
      || this.item.nombre.trim().length == 0;
  }


}
