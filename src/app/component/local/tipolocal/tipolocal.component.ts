import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoLocal } from 'src/app/shared/model/tipolocal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { TipoLocalService } from 'src/app/shared/service/tipolocal.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tipolocal',
  templateUrl: './tipolocal.component.html',
  styleUrls: ['./tipolocal.component.scss']

})

export class TipoLocalComponent implements OnInit {

  listaTipoLocal: TipoLocal[];
  tipoLocal: TipoLocal;
  nombre: string;
  estadoSelected: boolean = true;
  id: number;
  model = new TipoLocal();
  lastLazyLoadEvent: LazyLoadEvent;
  public saveProfile = true;
  public edit = false;

  cols: any[];
  @ViewChild('dt', { static: true }) public tabla: Table;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService, public fb: FormBuilder,
    public tipoLocalService: TipoLocalService) {
  }

  ngOnInit() {
    this.listarTipoLocal();

    this.cols = [
      { field: 'nombre', header: 'Tipo Local', width: '250px' },
      { field: 'estadoAux', header: 'Estado', width: '150px' }
    ];
  }



  listarTipoLocal() {
    this.listaTipoLocal = [];
    this.tipoLocalService.getAll().subscribe(
      (data: TipoLocal[]) => {
        this.listaTipoLocal = data;
      },
      error => {
        this.listaTipoLocal = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  resetAndRefreshTable() {
    this.tabla.reset();
    this.refreshTable();
  }

  refreshTable() {
    this.tabla.reset();
    if (this.lastLazyLoadEvent) {
      this.loadLazy(this.lastLazyLoadEvent);
    }
  }

  loadLazy(event: LazyLoadEvent) {
    this.listarTipoLocal();
  }

  doAction(data, accion) {
    if (accion == 'state') {
      data.enabled = !data.enabled;

      let message;
      if (data.enabled) {
        message = 'usuario activado correctamente.';
      } else {
        message = 'usuario desactivado correctamente.';
      }
      // this.updateUser(data, message);

    } else {
      this.nombre = data.nombre;
      this.id = data.id;
      this.estadoSelected = data.estado;


    }
  }

  formToModel(): void {
    this.model.id = this.id;
    this.model.nombre = this.nombre;
    this.model.estado = this.estadoSelected;
    

  }

  limpiarData() {
    this.id = undefined;
    this.nombre = '';

  }

  showConshowConfirmDeletefirm(data) {
    this.messageService.clear();
    this.tipoLocal = data;
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?' });
  }

  onConfirm(data) {
    this.deleteTipoLocal(data, 'Tipo Local eliminado correctamente');
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  public deleteTipoLocal(data, message): void {
    this.tipoLocalService.delete(data.id).subscribe(
      data => {
        this.showMsg('success', message, 'Tipo Local');
        this.refreshTable();
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.showMsg('error', errorMessage, 'Tipo Local');

      }
    );
  }

  save() {
    let message;


    if (this.nombre == '' || this.nombre == undefined) {
      this.showMsg('warn', 'Escriba un tipo local', 'Tipo Local');
      return;
    }
    this.formToModel();

    if (this.id != undefined) {
      this.model.id = this.id;
      this.edit = true;
    } else {
      this.model.id = undefined;
      this.edit = false;
    }

    this.listaTipoLocal.forEach(item => {
      if (item.nombre.toUpperCase() === this.nombre.toUpperCase() && !this.edit) {
        this.saveProfile = false;
      }
    });
    if (this.saveProfile) {
      this.tipoLocalService.save(this.model).subscribe(
        data => {
          if (data != null) {
            this.showMsg('success', 'Se guardó correctamente', 'Tipo Local');
            this.refreshTable();
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
    } else {
      this.showMsg('warn', 'Tipo Local ya existe', 'Tipo Local');
      this.saveProfile = true;
    }
    this.limpiarData();

  }

  showMsg(type: string, msg: string, title: string = 'Tipo Local') {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }

}