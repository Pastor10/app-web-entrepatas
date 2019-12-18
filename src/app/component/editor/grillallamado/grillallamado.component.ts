import {Router} from '@angular/router';
import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { GrillaLlamadoService } from 'src/app/shared/service/grillallamado.service';
import { GrillaLlamado } from 'src/app/shared/model/grillallamado.model';
import { ModalDirective } from 'angular-bootstrap-md';

import { ParametroService } from 'src/app/shared/service/parametro.service';
import { Parametro } from 'src/app/shared/model/parametro.model';

@Component({
  selector: 'app-grillallamado',
  templateUrl: './grillallamado.component.html',
  styleUrls: ['./grillallamado.component.css']
})
export class GrillaLlamadoComponent implements OnInit, AfterViewInit  {

  public grillaLlamados: GrillaLlamado[];
  public grillaLlamado: GrillaLlamado = new GrillaLlamado();
  public id: number = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string = '';
  public titleModal: string = 'Crear Grilla de Llamado';


  public tamaniosFuente: Parametro[];

  public tiposFuente: Parametro[];

  public tiemposBlinking: Parametro[];

  public dimensiones: Parametro[];

  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(public router: Router,
    public grillaLlamadoService: GrillaLlamadoService,
    public parametroService: ParametroService,

    public alertService: AlertService,
    public cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.search();
    this.getTamaniosFuente();
    this.getTiposFuente();
    this.getTiemposBlinking();
    this.getDimensionesGrilla();
  }

  public enter(event: any) {
    if ( event.keyCode == 13 ) {
       this.search();
    }
 }

 public search() {
    this.enableBtnBuscar = false;
    this.grillaLlamadoService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.grillaLlamados = <GrillaLlamado[]>data;
      },
      error => {
        this.grillaLlamados = [];
        this.enableBtnBuscar = true;
        const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public showConfirmDelete(id: number){
    this.id = id;
    this.confirmDelete.show();
  }

  public delete(): void {
    this.enableBtnBuscar = false;
    this.grillaLlamadoService.delete(this.id)
      .subscribe( data => {
        this.enableBtnBuscar = true;
        this.alertService.success('Se borro correctamente el registro seleccionado ' );
        this.confirmDelete.hide();
        this.search();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
        this.alertService.danger(errorMessage);
      });
  }

  public loadCreate(): void {
    this.grillaLlamado = new GrillaLlamado();
    this.titleModal = 'Crear Grilla de Llamado';
    this.grillaLlamado.numColorTextoString = '#000000';
    this.grillaLlamado.numColorFondoString = '#000000';
    this.grillaLlamado.numColorResaltadoString = '#000000';
    this.grillaLlamado.numColorCodigoImpresionString = '#000000';
    this.grillaLlamado.numColorFlechaString = '#000000';
    this.grillaLlamado.numColorVentanillaString = '#000000';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.grillaLlamadoService.getById(id)
      .subscribe( data => {
        this.titleModal = 'Modificar Grilla de Llamado';
        this.enableBtnBuscar = true;
        this.grillaLlamado =  <GrillaLlamado>data;
        this.formatDataEdit();
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
      this.formatData();
      this.grillaLlamadoService.save(this.grillaLlamado)
        .subscribe(
          data => {
            this.enableBtnGuardar = true;
            console.log(this.grillaLlamado);
            this.grillaLlamado = new GrillaLlamado();
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

  public formatData(): void {
    const colorTexto = this.grillaLlamado.numColorTextoString;
    const colorFondo = this.grillaLlamado.numColorFondoString;
    const colorResaltado = this.grillaLlamado.numColorResaltadoString;
    const colorCodigoImpresion = this.grillaLlamado.numColorCodigoImpresionString;
    const colorFlecha = this.grillaLlamado.numColorFlechaString;
    const colorVentanilla = this.grillaLlamado.numColorVentanillaString;

    this.grillaLlamado.numColorFondoR = parseInt(colorFondo.substring(1, 3), 16);
    this.grillaLlamado.numColorFondoG = parseInt(colorFondo.substring(3, 5 ), 16);
    this.grillaLlamado.numColorFondoB = parseInt(colorFondo.substring(5), 16);
    this.grillaLlamado.numColorTextoR = parseInt(colorTexto.substring(1, 3), 16);
    this.grillaLlamado.numColorTextoG = parseInt(colorTexto.substring(3, 5), 16);
    this.grillaLlamado.numColorTextoB = parseInt(colorTexto.substring(5), 16);

    this.grillaLlamado.numColorResaltadoR = parseInt(colorResaltado.substring(1, 3), 16);
    this.grillaLlamado.numColorResaltadoG = parseInt(colorResaltado.substring(3, 5), 16);
    this.grillaLlamado.numColorResaltadoB = parseInt(colorResaltado.substring(5), 16);

    this.grillaLlamado.numColorCodigoImpresionR = parseInt(colorCodigoImpresion.substring(1, 3), 16);
    this.grillaLlamado.numColorCodigoImpresionG = parseInt(colorCodigoImpresion.substring(3, 5), 16);
    this.grillaLlamado.numColorCodigoImpresionB = parseInt(colorCodigoImpresion.substring(5), 16);

    this.grillaLlamado.numColorFlechaR = parseInt(colorFlecha.substring(1, 3), 16);
    this.grillaLlamado.numColorFlechaG = parseInt(colorFlecha.substring(3, 5), 16);
    this.grillaLlamado.numColorFlechaB = parseInt(colorFlecha.substring(5), 16);

    this.grillaLlamado.numColorVentanillaR = parseInt(colorVentanilla.substring(1, 3), 16);
    this.grillaLlamado.numColorVentanillaG = parseInt(colorVentanilla.substring(3, 5), 16);
    this.grillaLlamado.numColorVentanillaB = parseInt(colorVentanilla.substring(5), 16);

    this.grillaLlamado.numColorTextoString = null;
    this.grillaLlamado.numColorFondoString = null;
    this.grillaLlamado.numColorResaltadoString = null;
    this.grillaLlamado.numColorCodigoImpresionString = null;
    this.grillaLlamado.numColorFlechaString = null;
    this.grillaLlamado.numColorVentanillaString = null;
  }


  public formatDataEdit(): void {
    const colorTexto = '#' + this.pad(this.grillaLlamado.numColorTextoR.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorTextoG.toString(16), 2) + this.pad(this.grillaLlamado.numColorTextoB.toString(16), 2);

    const colorFondo = '#' + this.pad(this.grillaLlamado.numColorFondoR.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorFondoG.toString(16), 2) + this.pad(this.grillaLlamado.numColorFondoB.toString(16), 2);

    const colorResaltado = '#' + this.pad(this.grillaLlamado.numColorResaltadoR.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorResaltadoG.toString(16), 2) + this.pad(this.grillaLlamado.numColorResaltadoB.toString(16), 2);

    const colorCodigoImpresion = '#' + this.pad(this.grillaLlamado.numColorCodigoImpresionR.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorCodigoImpresionG.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorCodigoImpresionB.toString(16), 2);

    const colorFlecha = '#' + this.pad(this.grillaLlamado.numColorFlechaR.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorFlechaG.toString(16), 2) + this.pad(this.grillaLlamado.numColorFlechaB.toString(16), 2);

    const colorVentanilla = '#' + this.pad(this.grillaLlamado.numColorVentanillaR.toString(16), 2) +
    this.pad(this.grillaLlamado.numColorVentanillaG.toString(16), 2) + this.pad(this.grillaLlamado.numColorVentanillaB.toString(16), 2);

    this.grillaLlamado.numColorTextoString = colorTexto;
    this.grillaLlamado.numColorFondoString = colorFondo;
    this.grillaLlamado.numColorResaltadoString = colorResaltado;
    this.grillaLlamado.numColorCodigoImpresionString = colorCodigoImpresion;
    this.grillaLlamado.numColorFlechaString = colorFlecha;
    this.grillaLlamado.numColorVentanillaString = colorVentanilla;

    this.grillaLlamado.numFilas = this.grillaLlamado.numFilas.toString();
    this.grillaLlamado.numColumnas = this.grillaLlamado.numColumnas.toString();
    this.grillaLlamado.numTiempoBlinking = this.grillaLlamado.numTiempoBlinking.toString();
    this.grillaLlamado.numTamanioFuente = this.grillaLlamado.numTamanioFuente.toString();
  }

  private pad (str, max): string {
    str = str.toString();
    return str.length < max ? this.pad('0' + str, max) : str;
  }

  // Validamos el formulario antes de registrar el video
  public formularioValido(): boolean {

    if (this.grillaLlamado.desNombre == null || this.grillaLlamado.desNombre.length == 0) {
        this.alertService.danger('Debe de ingresar el nombre de la grilla de llamados.');
        return false;
    }

    if (this.grillaLlamado.desRutaSonidoLlamado == null || this.grillaLlamado.desRutaSonidoLlamado.length == 0) {
        this.alertService.danger('Debe de ingresar la ruta del sonido de llamados.');
        return false;
    }

    if (this.grillaLlamado.numFilas == null) {
        this.alertService.danger('Debe seleccionar el numero de filas.');
        return false;
    }

    if (this.grillaLlamado.numColumnas == null) {
        this.alertService.danger('Debe seleccionar el numero de columnas.');
        return false;
    }

    if (this.grillaLlamado.desTipoFuente == null) {
        this.alertService.danger('Debe seleccionar el tipo de fuente.');
        return false;
    }

    if (this.grillaLlamado.numTamanioFuente == null) {
        this.alertService.danger('Debe seleccionar el tama�o de la fuente.');
        return false;
    }

    if (this.grillaLlamado.numTiempoBlinking == null) {
        this.alertService.danger('Debe seleccionar el tiempo de blinking.');
        return false;
    }

    if (this.grillaLlamado.llamadoNomCliente == null) {
      this.alertService.danger('Debe Indicar Si es LLamado por Nombre CLiente.');
      return false;
  }


    return true;
  }

  public add(): void {
    this.router.navigate(['add-grillaLlamado']);
  }

  public ngAfterViewInit() {
  }

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public getTamaniosFuente(): void {
    this.parametroService.getParametros('002').subscribe(
      data => {this.enableBtnBuscar = true; this.tamaniosFuente = <Parametro[]>data; },
      error => {this.tamaniosFuente = []; }
    );
  }

  public getTiposFuente(): void {
    this.parametroService.getParametros('003').subscribe(
      data => {this.enableBtnBuscar = true; this.tiposFuente = <Parametro[]>data; },
      error => {this.tiposFuente = []; }
    );
  }

  public getTiemposBlinking(): void {
    this.parametroService.getParametros('004').subscribe(
      data => {this.enableBtnBuscar = true; this.tiemposBlinking = <Parametro[]>data; },
      error => {this.tiemposBlinking = []; }
    );
  }

  public getDimensionesGrilla(): void {
    this.parametroService.getParametros('005').subscribe(
      data => {this.enableBtnBuscar = true; this.dimensiones = <Parametro[]>data; },
      error => {this.dimensiones = []; }
    );
  }

}
