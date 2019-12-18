import {Router} from '@angular/router';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {AlertService} from 'ngx-alerts';
import {HorarioSyncService} from 'src/app/shared/service/horariosync.service';
import {HorarioSync} from 'src/app/shared/model/horariosync.model';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-horariosync',
  templateUrl: './horariosync.component.html',
  styleUrls: ['./horariosync.component.css']
})
export class HorarioSyncComponent implements OnInit {

  public horariosyncs: HorarioSync[];
  public horariosync: HorarioSync = new HorarioSync();
  public id: number = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string = '';
  public titleModal: string = 'Crear Horario de Sincronizaci&oacute;n';
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(public router: Router,
              public horarioSyncService: HorarioSyncService, public alertService: AlertService,
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
    this.horarioSyncService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.horariosyncs = <HorarioSync[]>data;
      },
      error => {
        this.horariosyncs = [];
        this.enableBtnBuscar = true;
        var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petici\u00F3n';
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
    this.horarioSyncService.delete(this.id)
      .subscribe(data => {
          this.enableBtnBuscar = true;
          this.alertService.success('Se borr\u00F3 correctamente la fila el registro seleccionado ' );
          this.confirmDelete.hide();
          this.search();
        },
        error => {
          this.enableBtnBuscar = true;
          var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petici\u00F3n';
          this.alertService.danger(errorMessage);
        });
  }

  public loadCreate(): void {
    this.horariosync = new HorarioSync();
    this.titleModal = 'Crear Horario de Sincronizaci\u00F3n';
    this.horariosync.indLunes = false;
    this.horariosync.indMartes = false;
    this.horariosync.indMiercoles = false;
    this.horariosync.indJueves = false;
    this.horariosync.indViernes = false;
    this.horariosync.indSabado = false;
    this.horariosync.indDomingo = false;
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.horarioSyncService.getById(id)
      .subscribe(data => {
          this.titleModal = 'Modificar Horario de Sincronizaci\u00F3n';
          this.enableBtnBuscar = true;
          this.horariosync = <HorarioSync>data;
          this.modal.show();
        },
        error => {
          this.enableBtnBuscar = true;
          const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
          this.alertService.danger(errorMessage);
        });
  }

  public save(): void {
    if (this.formularioValido()) {
      this.enableBtnBuscar = false;
      this.horarioSyncService.save(this.horariosync)
        .subscribe(
          data => {
            this.enableBtnGuardar = true;
            this.horariosync = new HorarioSync();
            this.alertService.success('Se guardó correctamente');
            this.modal.hide();
            this.search();
          },
          error => {
            this.enableBtnGuardar = true;
            const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
            this.alertService.danger(errorMessage);
          }
        );
    }
  }

  public formularioValido(): boolean {
    if (this.horariosync.nomHorario == null) {
      this.alertService.danger('Debe de ingresar el nombre del horario.');
      return false;
    }

    if (this.horariosync.desHorario == null) {
      this.alertService.danger('Debe de ingresar la descripci\u00F3n del horario.');
      return false;
    }

    if (this.horariosync.indLunes && this.horariosync.horLunes == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa lunes.');
      return false;
    }

    if (this.horariosync.indMartes && this.horariosync.horMartes == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa martes.');
      return false;
    }

    if (this.horariosync.indMiercoles && this.horariosync.horMiercoles == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa miercoles.');
      return false;
    }

    if (this.horariosync.indJueves && this.horariosync.horJueves == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa jueves.');
      return false;
    }

    if (this.horariosync.indViernes && this.horariosync.horViernes == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa viernes.');
      return false;
    }

    if (this.horariosync.indSabado && this.horariosync.horSabado == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa s\u00E1bado.');
      return false;
    }

    if (this.horariosync.indDomingo && this.horariosync.horDomingo == null) {
      this.alertService.danger('Debe ingresar la hora de ejecuci\u00F3n del d\u00EDa domingo.');
      return false;
    }

    return true;
  }


  public add(): void {
    this.router.navigate(['add-horariosinc']);
  }


  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

}
