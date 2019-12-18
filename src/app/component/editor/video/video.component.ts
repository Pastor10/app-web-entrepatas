import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { VideoService } from 'src/app/shared/service/video.service';
import { Video } from 'src/app/shared/model/video.model';
import { ModalDirective } from 'angular-bootstrap-md';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {
  public videos: Video[];
  public video: Video = new Video();
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

  constructor(
    public router: Router,
    public videoService: VideoService,
    public alertService: AlertService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Video';
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
    this.videoService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.videos = <Video[]>data;
      },
      error => {
        this.videos = [];
        this.enableBtnBuscar = true;
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petici\u00F3n';
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
    this.videoService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borr\u00F3 correctamente el registro seleccionado '
        );
        this.confirmDelete.hide();
        this.search();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petici\u00F3n';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadCreate(): void {
    this.video = new Video();
    this.video.tipoEjecucion = 'R';
    this.video.indActivo = '1';
    $('#divRangoEjecucion').show();
    $('#divDiasEjecucion').hide();
    this.titleModal = 'Crear V\u00EDdeo';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.videoService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar V\u00EDdeo';
        this.enableBtnBuscar = true;
        this.video = <Video>data;
        this.checkTipoEjecucion();
        this.formatDataEdit();
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petici\u00F3n';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public save(): void {
    if (this.formularioValido()) {
      this.enableBtnBuscar = false;
      this.formatData();
      this.videoService.save(this.video).subscribe(
        data => {
          this.enableBtnGuardar = true;
          console.log(this.video);
          this.video = new Video();
          this.alertService.success('Se guardó correctamente');
          this.modal.hide();
          this.search();
        },
        error => {
          this.enableBtnGuardar = true;
          const errorMessage: string =
            error.message != undefined
              ? error.message
              : 'No se pudo procesar la petici\u00F3n';
          this.alertService.danger(errorMessage);
        }
      );
    }
  }

  public formatData(): void {
    if (this.video.indVigenciaIndefinida == null) {
      this.video.indVigenciaIndefinida = 'false';
    }

    if (this.video.tipoEjecucion == 'S') {
      const diasArray: any[] = [];
      if (this.video.indLunes) { diasArray.push('L'); }
      if (this.video.indMartes) { diasArray.push('Ma'); }
      if (this.video.indMiercoles) { diasArray.push('Mi'); }
      if (this.video.indJueves) { diasArray.push('J'); }
      if (this.video.indViernes) { diasArray.push('V'); }
      if (this.video.indSabado) { diasArray.push('S'); }
      if (this.video.indDomingo) { diasArray.push('D'); }
      this.video.diasSemana = diasArray.join(',');

      this.video.indLunes = null;
      this.video.indMartes = null;
      this.video.indMiercoles = null;
      this.video.indJueves = null;
      this.video.indViernes = null;
      this.video.indSabado = null;
      this.video.indDomingo = null;
    }
  }

  public formatDataEdit(): void {
    this.video.indLunes = false;
    this.video.indMartes = false;
    this.video.indMiercoles = false;
    this.video.indJueves = false;
    this.video.indViernes = false;
    this.video.indSabado = false;
    this.video.indDomingo = false;

    if (this.video.tipoEjecucion == 'S') {
      const dias: string[] = this.video.diasSemana.split(',');
      for (let i = 0; i < dias.length; i++) {
        if (dias[i] == 'L') {
          this.video.indLunes = true;
          continue;
        }
        if (dias[i] == 'Ma') {
          this.video.indMartes = true;
          continue;
        }
        if (dias[i] == 'Mi') {
          this.video.indMiercoles = true;
          continue;
        }
        if (dias[i] == 'J') {
          this.video.indJueves = true;
          continue;
        }
        if (dias[i] == 'V') {
          this.video.indViernes = true;
          continue;
        }
        if (dias[i] == 'S') {
          this.video.indSabado = true;
          continue;
        }
        if (dias[i] == 'D') {
          this.video.indDomingo = true;
          continue;
        }
      }
    }
  }

  // Validamos el formulario antes de registrar el video
  public formularioValido(): boolean {
    // 1. nombre del video
    let errorMessage: string;
    if (this.video.desVideo == null || this.video.desVideo.length == 0) {
      errorMessage = 'Debe de ingresar el nombre del v\u00EDdeo';
      this.alertService.danger(errorMessage);
      return false;
    }

    // 2. ruta del video
    if (
      this.video.desRutaVideo == null ||
      this.video.desRutaVideo.length == 0
    ) {
      errorMessage = 'Debe de ingresar la ruta del v\u00EDdeo';
      this.alertService.danger(errorMessage);
      return false;
    }

    // 3. Si ha escogido los d�as, debe de haber seleccionado al menos un d�a.
    if (this.video.tipoEjecucion == 'S') {
      if (
        !this.video.indLunes &&
        !this.video.indMartes &&
        !this.video.indMiercoles &&
        !this.video.indJueves &&
        !this.video.indViernes &&
        !this.video.indSabado &&
        !this.video.indDomingo
      ) {
        errorMessage =
          'Debe seleccionarl al menos un d\u00EDa de la semana.';
        this.alertService.danger(errorMessage);
        return false;
      }
    }

    // 4. Si ha escogido un rango de fechas, entonces verificar que el rango sea valido
    if (this.video.tipoEjecucion == 'R') {
      // Validamos de que haya ingresado ambas fechas
      if (this.video.fecInivig == null) {
        errorMessage = 'Ingrese la fecha de inicio.';
        this.alertService.danger(errorMessage);
        return false;
      }

      if (this.video.fecFinvig == null) {
        errorMessage = 'Ingrese la fecha de fin.';
        this.alertService.danger(errorMessage);
        return false;
      }

      const fecInicio = moment(this.video.fecInivig, 'YYYY-MM-DD', true);
      const fecFin = moment(this.video.fecFinvig, 'YYYY-MM-DD', true);
      const fecActual = moment().startOf('day');

      if (fecInicio.isAfter(fecFin)) {
        errorMessage =
          'La fecha de inicio debe ser menor o igual a la fecha de fin.';
        this.alertService.danger(errorMessage);
        return false;
      }

      if (fecFin.isBefore(fecActual)) {
        errorMessage =
          'La fecha de fin debe ser mayor a igual a la fecha actual.';
        this.alertService.danger(errorMessage);
        return false;
      }
    }

    return true;
  }

  public checkTipoEjecucion(): void {
    if (this.video.tipoEjecucion == 'R') {
      $('#divRangoEjecucion').show();
      $('#divDiasEjecucion').hide();
    } else {
      $('#divRangoEjecucion').hide();
      $('#divDiasEjecucion').show();
    }
  }

  public add(): void {
    this.router.navigate(['add-video']);
  }

  public ngAfterViewInit() {}

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }
}
