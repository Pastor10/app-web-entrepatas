import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { AreaService } from 'src/app/shared/service/area.service';
import { Area } from 'src/app/shared/model/area.model';
import { ModalDirective } from 'angular-bootstrap-md';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  public areas: Area[];
  public item: Area = new Area();
  public id: number;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string;
  public titleModal: string;
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(public router: Router,
    public areaService: AreaService, public alertService: AlertService,
    public cdRef: ChangeDetectorRef) {
      this.id = 0;
      this.valueInput = '';
      this.titleModal = 'Crear Área';
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
    this.areaService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.areas = <Area[]>data;
      },
      error => {
        this.areas = [];
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
    this.areaService.delete(this.id)
      .subscribe(data => {
        this.enableBtnBuscar = true;
        this.alertService.success('Se borró correctamente el registro seleccionado ' );
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
    this.item = new Area();
    this.titleModal = 'Crear Área';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.areaService.getById(id)
      .subscribe(data => {
        this.titleModal = 'Modificar Área';
        this.item = <Area>data;
        this.modal.show();
      },
        error => {
          const errorMessage: string = error.message != undefined ? error.message : 'No se pudo procesar la petición';
          this.alertService.danger(errorMessage);
        });
  }

  public save(): void {
    this.enableBtnBuscar = false;
    this.areaService.save(this.item)
      .subscribe(
        data => {
          this.enableBtnBuscar = true;
          this.item = new Area();
          this.alertService.success(environment.SAVED_SUCCESS);
          this.modal.hide();
          this.search();
        },
        error => {
          this.alertService.danger(this.proccessError(error));
          this.enableBtnBuscar = true;
        }
      );
  }

  public add(): void {
    this.router.navigate(['add-area']);
  }

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public proccessError(error: any): string {
    let errorMessage;
    if (error.status == 400) {
        errorMessage = error.error.errors[0].defaultMessage;
    } else if (error.status == 0) {
        errorMessage = environment.MESSAGE_ERROR_CONNECTION;
    } else {
        errorMessage = error.message != undefined ? error.message : environment.MESSAGE_UNKNOWN;
    }
    return errorMessage;
}

public validate(): boolean {
  return this.item.nombre == undefined || this.item.nombre.trim().length == 0;
}

}
