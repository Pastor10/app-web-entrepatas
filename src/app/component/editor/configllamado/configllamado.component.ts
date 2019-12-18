import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ConfigLlamadoService } from 'src/app/shared/service/configllamado.service';
import { ConfigLlamado } from 'src/app/shared/model/configllamado.model';
import { ModalDirective } from 'angular-bootstrap-md';

import { ListaVideoService } from 'src/app/shared/service/listavideo.service';
import { ListaVideo } from 'src/app/shared/model/listavideo.model';

import { ListaMarquesinaService } from 'src/app/shared/service/listamarquesina.service';
import { ListaMarquesina } from 'src/app/shared/model/listamarquesina.model';

import { GrillaLlamadoService } from 'src/app/shared/service/grillallamado.service';
import { GrillaLlamado } from 'src/app/shared/model/grillallamado.model';

import { EspacioAtencionService } from 'src/app/shared/service/espacioatencion.service';
import { EspacioAtencion } from 'src/app/shared/model/espacioatencion.model';

import { ParametroService } from 'src/app/shared/service/parametro.service';
import { Parametro } from 'src/app/shared/model/parametro.model';

import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-configllamado',
  templateUrl: './configllamado.component.html',
  styleUrls: ['./configllamado.component.css']
})
export class ConfigLlamadoComponent implements OnInit, AfterViewInit {

  public indMouseVisualizado: boolean;
  public indPantallaExtendida: boolean;

  public resolucionSeleccionada: string;

  public resoluciones: Parametro[];

  public listasMarquesinas: ListaMarquesina[];

  public listasVideos: ListaVideo[];

  public listasGrillas: GrillaLlamado[];

  public espaciosAtencion: EspacioAtencion[];

  public configllamados: ConfigLlamado[];
  public configllamado: ConfigLlamado = new ConfigLlamado();
  public id: number = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string = '';
  public titleModal: string = 'Crear Configurador de Llamado';
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(
    public router: Router,
    public configllamadoService: ConfigLlamadoService,
    public listaVideoService: ListaVideoService,
    public listaMarquesinaService: ListaMarquesinaService,
    public grillaLlamadoService: GrillaLlamadoService,
    public espacioAtencionService: EspacioAtencionService,
    public parametroService: ParametroService,
    public alertService: AlertService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.search();
    this.getGrillasLlamados();
    this.getListasMarquesinas();
    this.getListasVideos();
    this.getEspaciosAtencion();
    this.getResoluciones();
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  public search() {
    this.enableBtnBuscar = false;
    this.configllamadoService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.configllamados = <ConfigLlamado[]>data;
      },
      error => {
        this.configllamados = [];
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la peticion';
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
    this.configllamadoService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borro correctamente el registro seleccionado'
        );
        this.confirmDelete.hide();
        this.search();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la peticion';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadCreate(): void {
    this.resolucionSeleccionada="";
    this.configllamado = new ConfigLlamado();
    this.titleModal = 'Crear Configurador de Llamado';
    this.indMouseVisualizado = false;
    this.indPantallaExtendida = false;
    this.configllamado.indMouseVisualizado = '0';
    this.configllamado.indPantallaExtendida = '0';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.configllamadoService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Configurador de Llamado';
        this.enableBtnBuscar = true;
        this.configllamado = <ConfigLlamado>data;
        this.formatDataEdit();
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la peticion';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public save(): void {
    if (this.formularioValido()) {
      this.enableBtnBuscar = false;
      this.formatData();
      this.configllamadoService.save(this.configllamado).subscribe(
        data => {
          this.enableBtnGuardar = true;
          console.log(this.configllamado);
          this.configllamado = new ConfigLlamado();
          this.alertService.success('Se guardó correctamente');
          this.modal.hide();
          this.search();
        },
        error => {
          this.enableBtnGuardar = true;
          const errorMessage =
            error.message != undefined
              ? error.message
              : 'No se pudo procesar la peticion';
          this.alertService.danger(errorMessage);
        }
      );
    }
  }

  public add(): void {
    this.router.navigate(['add-configllamado']);
  }

  public ngAfterViewInit() {}

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public formatData(): void {
    if (this.indMouseVisualizado) {
      this.configllamado.indMouseVisualizado = '1';
    } else {
      this.configllamado.indMouseVisualizado = '0';
    }

    if (this.indPantallaExtendida) {
      this.configllamado.indPantallaExtendida = '1';
    } else {
      this.configllamado.indPantallaExtendida = '0';
    }

    const dimArray: string[] = this.resolucionSeleccionada.split('x');
    const numDimX = Number(dimArray[0]);
    const numDimY = Number(dimArray[1]);
    this.configllamado.numDimAppX = numDimX;
    this.configllamado.numDimAppY = numDimY;
  }

  public formatDataEdit(): void {
    // lista de videos
    for (let i = 0; i < this.listasVideos.length; i++) {
      if (
        this.listasVideos[i].idListaVideos ==
        this.configllamado.listaVideo.idListaVideos
      ) {
        this.listasVideos[i] = this.configllamado.listaVideo;
        break;
      }
    }

    for (let i = 0; i < this.listasMarquesinas.length; i++) {
      if (
        this.listasMarquesinas[i].idListaMarquesinas ==
        this.configllamado.listaMarquesina.idListaMarquesinas
      ) {
        this.listasMarquesinas[i] = this.configllamado.listaMarquesina;
        break;
      }
    }

    for (let i = 0; i < this.listasGrillas.length; i++) {
      if (
        this.listasGrillas[i].idGrillaLlamados ==
        this.configllamado.grillaLlamado.idGrillaLlamados
      ) {
        this.listasGrillas[i] = this.configllamado.grillaLlamado;
        break;
      }
    }

    for (let i = 0; i < this.espaciosAtencion.length; i++) {
      if (
        this.espaciosAtencion[i].idEspacioAtencion ==
        this.configllamado.espacioAtencion.idEspacioAtencion
      ) {
        this.espaciosAtencion[i] = this.configllamado.espacioAtencion;
        break;
      }
    }

    if (this.configllamado.indMouseVisualizado == '1') {
      this.indMouseVisualizado = true;
    } else {
      this.indMouseVisualizado = false;
    }

    if (this.configllamado.indPantallaExtendida == '1') {
      this.indPantallaExtendida = true;
    } else {
      this.indPantallaExtendida = false;
    }

    this.resolucionSeleccionada =
      this.configllamado.numDimAppX + 'x' + this.configllamado.numDimAppY;
  }

  public formularioValido(): boolean {
    // 1. nombre de la lista
    if (
      this.configllamado.desNombre == null ||
      this.configllamado.desNombre.length == 0
    ) {
      this.alertService.danger(
        'Debe de ingresar el nombre de la configuracion.'
      );
      return false;
    }

    if (this.configllamado.listaVideo == null) {
      this.alertService.danger('Debe de seleccionar una lista de videos.');
      return false;
    }

    if (this.configllamado.listaMarquesina == null) {
      this.alertService.danger('Debe de seleccionar una lista de marquesinas.');
      return false;
    }

    if (this.configllamado.grillaLlamado == null) {
      this.alertService.danger('Debe de seleccionar una grilla de llamados.');
      return false;
    }

    if (this.configllamado.espacioAtencion == null) {
      this.alertService.danger('Debe de seleccionar un espacio de atencion.');
      return false;
    }

    if (this.resolucionSeleccionada == null) {
      this.alertService.danger('Debe de seleccionar una resolucion.');
      return false;
    }

    // Validaciones de las posiciones
    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosAppX,
        'la posici\u00F3n X de la aplicaci\u00F3n'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosAppY,
        'la posici\u00F3n Y de la aplicaci\u00F3n'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosVideoX,
        'la posici\u00F3n X de la secci\u00F3n de v\u00EDdeos'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosVideoY,
        'la posici\u00F3n Y de secci\u00F3n de v\u00EDdeos'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numDimVideoX,
        'el tama\u00F1o X de la secci\u00F3n de v\u00EDdeos'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numDimVideoY,
        'el tama\u00F1o Y de la secci\u00F3n de v\u00EDdeos'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosMarquesinaX,
        'la posici\u00F3n X de la secci\u00F3n de marquesinas'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosMarquesinaY,
        'la posici\u00F3n Y de secci\u00F3n de marquesinas'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numDimMarquesinaX,
        'el tama\u00F1o X de la secci\u00F3n de marquesinas'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numDimMarquesinaY,
        'el tama\u00F1o Y de la secci\u00F3n de marquesinas'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosGrillaX,
        'la posici\u00F3n X de la grilla de llamados'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numPosGrillaY,
        'la posici\u00F3n Y de la grilla de llamados'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numDimGrillaX,
        'el tama\u00F1o X de la grilla de llamados'
      )
    ) {
      return false;
    }

    if (
      !this.validarPosicionTamanio(
        this.configllamado.numDimGrillaY,
        'el tama\u00F1o Y de la grilla de llamados'
      )
    ) {
      return false;
    }

    return true;
  }

  private validarPosicionTamanio(val, campo): boolean {
    if (val == null) {
      this.alertService.danger('Debe de ingresar un valor en ' + campo + '.');
      return false;
    } else {
      if (!this.esEntero(val)) {
        this.alertService.danger(
          'Debe ingresar un valor entero en ' + campo + '.'
        );
        return false;
      }
    }

    return true;
  }

  private esEntero(x): boolean {
    return isNumeric(x);
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public getListasMarquesinas(): void {
    this.listaMarquesinaService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listasMarquesinas = <ListaMarquesina[]>data;
      },
      error => {
        this.listasMarquesinas = [];
      }
    );
  }

  public getListasVideos(): void {
    this.listaVideoService.getAll().subscribe(
      data => {
        this.listasVideos = <ListaVideo[]>data;
      },
      error => {
        this.listasVideos = [];
      }
    );
  }

  public getGrillasLlamados(): void {
    this.grillaLlamadoService.getAll().subscribe(
      data => {
        this.listasGrillas = <GrillaLlamado[]>data;
      },
      error => {
        this.listasGrillas = [];
      }
    );
  }

  public getEspaciosAtencion(): void {
    this.espacioAtencionService.findAll().subscribe(
      data => {
        this.espaciosAtencion = <EspacioAtencion[]>data;
      },
      error => {
        this.espaciosAtencion = [];
      }
    );
  }

  public getResoluciones(): void {
    this.parametroService.getParametros('006').subscribe(
      data => {
        this.resoluciones = <Parametro[]>data;
      },
      error => {
        this.resoluciones = [];
      }
    );
  }
}
