import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { Oficina } from 'src/app/shared/model/oficina.model';
import { OficinaService } from 'src/app/shared/service/oficina.service';

import { HorarioSyncService } from '../../../shared/service/horariosync.service';
import { HorarioSync } from '../../../shared/model/horariosync.model';
import { environment } from 'src/environments/environment';

import { ConfigLlamadoService } from '../../../shared/service/configllamado.service';
import { ConfigLlamado } from '../../../shared/model/configllamado.model';
import { LocalStorageService } from '../../../shared/service/localstorage.service';
import { Role } from '../../../shared/model/role.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {
  public horariosyncs: HorarioSync[];
  public configuraciones: ConfigLlamado[];
  public listItem: Oficina[];
  public item: Oficina = new Oficina();
  public id: number;
  public enableBtnBuscar: boolean;
  public enableBtnGuardar: boolean;
  public enableFormCrear: boolean;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string;
  public titleModal: string;
  public idHorario: number;
  public idConfiguracion: number;
  oficina: Oficina;
  roles: Role[];
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;
  @ViewChild('confirmAceptar') public confirmAceptar: ModalDirective;

  constructor(
    public router: Router,
    public horarioSyncService: HorarioSyncService,
    public configLlamadoService: ConfigLlamadoService,
    public oficinaService: OficinaService,
    public alertService: AlertService,
    public cdRef: ChangeDetectorRef,
    public localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.id = 0;
    this.enableBtnBuscar = true;
    this.enableBtnGuardar = true;
    this.enableFormCrear = false;
    this.valueInput = '';
    this.titleModal = 'Crear Oficina';
    this.idHorario = 0;
    this.idConfiguracion = 0;
    const loginResponse = this.localStorageService.get('userLogin');
    if (loginResponse != undefined) {
      this.roles = loginResponse.roles;
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getHorarios();
    this.getConfiguraciones();
    this.search();
  }

  verAceptarSync(): Boolean {
    return this.roles.find(function(element) {
      return element.name == 'ROLE_ACEPTAR_SINCRONIZACION';
    })
      ? true
      : false;
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  public selectIdHorario(id: number) {
    this.idHorario = id;
  }

  public selectIdConfiguracion(id: number) {
    this.idConfiguracion = id;
  }

  public search() {
    this.enableBtnBuscar = false;
    this.oficinaService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <Oficina[]>data;
      },
      error => {
        this.listItem = [];
        this.enableBtnBuscar = true;
        const errorMessage: string =
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

  showAcept(o: Oficina): void {
    this.confirmAceptar.show();
    this.oficina = o;
  }

  public sincronizarVideos(oficina: Oficina): void {
    if (!oficina.aceptarSync) {
      this.alertService.danger('No se a Confirmado el video');
      return;
    }
    this.item = new Oficina();
    this.item.idOficina = oficina.idOficina;
    this.oficinaService.sincronizarVideos(this.item).subscribe(
      data => {
        this.alertService.success(
          'Se programó de manera inmediata la sincronización de videos para esta oficina.'
        );
        this.getHorarios();
        this.getConfiguraciones();
        this.search();
      },
      error => {
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public delete(): void {
    this.enableBtnBuscar = false;
    this.oficinaService.delete(this.id).subscribe(
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
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadCreate(): void {
    this.idHorario = 0;
    this.idConfiguracion = 0;
    this.item = new Oficina();
    this.item.activo = true;
    this.item.codEstadoSync = 'P';
    this.titleModal = 'Crear Oficina';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.oficinaService.getById(id).subscribe(
      data => {
        console.log('data', data);
        this.titleModal = 'Modificar Oficina';
        this.enableBtnBuscar = true;
        this.item = <Oficina>data;
        this.idHorario =
          this.item.horarioSync != undefined
            ? this.item.horarioSync.idHorario
            : 0;
        this.idConfiguracion =
          this.item.configLlamado != undefined
            ? this.item.configLlamado.idConfiguracionEmisorLlamados
            : 0;
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public save(): void {
    this.item.horarioSync = this.horariosyncs.find(
      obj => obj.idHorario == this.idHorario
    );
    this.item.configLlamado = this.configuraciones.find(
      obj => obj.idConfiguracionEmisorLlamados == this.idConfiguracion
    );
    this.item.aceptarSync = false;
    console.log('data', this.item);
    this.oficinaService.save(this.item).subscribe(
      data => {
        const oficinaGenerada = <Oficina>data;
        this.oficinaService.registrarScheduling(oficinaGenerada).subscribe(
          () => {
            console.log('Se registro el scheduling correctamnte...');
          },
          error => {
            console.log('Ocurrio un error al registrar al scheduling....');
          }
        );

        console.log('Scheduling registrado...');

        this.item = new Oficina();
        this.alertService.success('Se guardó; correctamente');
        this.modal.hide();
        this.search();
      },
      error => {
        this.alertService.danger(this.proccessError(error));
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

  public getHorarios(): void {
    this.horarioSyncService.getAll().subscribe(
      data => {
        this.horariosyncs = <HorarioSync[]>data;
      },
      error => {
        this.horariosyncs = [];
      }
    );
  }

  public getConfiguraciones(): void {
    this.configLlamadoService.getAll().subscribe(
      data => {
        this.configuraciones = <ConfigLlamado[]>data;
      },
      error => {
        this.configuraciones = [];
      }
    );
  }

  public proccessError(error: any): string {
    let errorMessage;
    if (error.status == 400) {
      errorMessage = error.error.errors[0].defaultMessage;
    } else if (error.status == 0) {
      errorMessage = environment.MESSAGE_ERROR_CONNECTION;
    } else {
      errorMessage = !error.message
        ? error.message
        : environment.MESSAGE_UNKNOWN;
    }
    return errorMessage;
  }

  aceptarSyncro(): void {
    this.oficina.aceptarSync = true;
    this.oficinaService.save(this.oficina).subscribe(() => {
      this.getHorarios();
      this.getConfiguraciones();
      this.search();
      this.confirmAceptar.hide();
    });
  }
}
