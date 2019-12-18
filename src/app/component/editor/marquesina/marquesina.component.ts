import {Router} from '@angular/router';
import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { MarquesinaService } from 'src/app/shared/service/marquesina.service';
import { Marquesina } from 'src/app/shared/model/marquesina.model';
import { ModalDirective } from 'angular-bootstrap-md';
import * as moment from 'moment';

@Component({
  selector: 'app-marquesina',
  templateUrl: './marquesina.component.html',
  styleUrls: ['./marquesina.component.css']
})
export class MarquesinaComponent implements OnInit, AfterViewInit  {

  public marquesinas: Marquesina[];
  public marquesina: Marquesina = new Marquesina();
  public id: number = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string = '';
  public titleModal: string = 'Crear Marquesina';
  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(public router: Router,
     public marquesinaService: MarquesinaService, public alertService: AlertService,
    public cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.search();
  }

  public enter(event:any){
    if(event.keyCode == 13){
       this.search();
    }
 }

 public search() {
    this.enableBtnBuscar = false;
    this.marquesinaService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.marquesinas = <Marquesina[]>data;
      },
      error => {
        this.marquesinas = [];
        this.enableBtnBuscar = true;
        var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petici\u00F3n';
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
    this.marquesinaService.delete(this.id)
      .subscribe( data => {
        this.enableBtnBuscar = true;
        this.alertService.success('Se borr\u00F3 correctamente el registro seleccionado ');
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
    this.marquesina = new Marquesina();
    this.marquesina.indActivo = '1';
    this.marquesina.numColorTextoString = '#000000';
    this.marquesina.numColorFondoString = '#000000';
    this.titleModal = 'Crear Marquesina';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.marquesinaService.getById(id)
      .subscribe( data => {
        this.titleModal = 'Modificar Marquesina';
        this.enableBtnBuscar = true;
        this.marquesina =  <Marquesina>data;
        this.formatDataEdit();
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petici\u00F3n';
        this.alertService.danger(errorMessage);
      });
  }

  public save(): void {

    if (this.formularioValido()) {
      this.enableBtnBuscar = false;
      this.formatData();
      this.marquesinaService.save(this.marquesina)
      .subscribe(
        data => {
          this.enableBtnGuardar = true;
          this.marquesina = new Marquesina();
          this.alertService.success('Se guardó correctamente');
          this.modal.hide();
          this.search();
        },
        error => {
          this.enableBtnGuardar = true;
          var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petici\u00F3n';
          this.alertService.danger(errorMessage);
        }
      );
    }
  }


  public formatData(): void {
    if (this.marquesina.indVigenciaIndefinida == null) {
      this.marquesina.indVigenciaIndefinida = 'false';
    }

    const colorTexto = this.marquesina.numColorTextoString;
    const colorFondo = this.marquesina.numColorFondoString;
    this.marquesina.numColorFondoR = parseInt(colorFondo.substring(1, 3), 16);
    this.marquesina.numColorFondoG = parseInt(colorFondo.substring(3, 5), 16);
    this.marquesina.numColorFondoB = parseInt(colorFondo.substring(5), 16);
    this.marquesina.numColorTextoR = parseInt(colorTexto.substring(1, 3), 16);
    this.marquesina.numColorTextoG = parseInt(colorTexto.substring(3, 5), 16);
    this.marquesina.numColorTextoB = parseInt(colorTexto.substring(5), 16);
    this.marquesina.numColorTextoString = null;
    this.marquesina.numColorFondoString = null;
  }


  public formatDataEdit(): void {
    const colorTexto = '#' + this.pad(this.marquesina.numColorTextoR.toString(16), 2)  +
    this.pad(this.marquesina.numColorTextoG.toString(16), 2) + this.pad(this.marquesina.numColorTextoB.toString(16), 2);

    const colorFondo = '#' + this.pad(this.marquesina.numColorFondoR.toString(16), 2) +
    this.pad(this.marquesina.numColorFondoG.toString(16), 2) + this.pad(this.marquesina.numColorFondoB.toString(16), 2);

    this.marquesina.numColorTextoString = colorTexto;
    this.marquesina.numColorFondoString = colorFondo;
  }


  private pad (str, max): string {
    str = str.toString();
    return str.length < max ? this.pad('0' + str, max) : str;
  }


  // Validamos el formulario antes de registrar el video
  public formularioValido(): boolean {

    // 1. nombre de la marquesina
    if (this.marquesina.desNombre == null || this.marquesina.desNombre.length == 0) {
        this.alertService.danger('Debe de ingresar el nombre de la marquesina.');
        return false;
    }

    // 2. ruta del video
    if (this.marquesina.desMensaje == null || this.marquesina.desMensaje.length == 0) {
        this.alertService.danger('Debe de ingresar el mensaje de la marquesina.');
        return false;
    }

    // Validamos de que haya ingresado ambas fechas
    if(this.marquesina.fecInivig==null){
        var errorMessage = 'Ingrese la fecha de inicio.';
        this.alertService.danger(errorMessage);
        return false;
    }

    if(this.marquesina.fecFinvig==null){
        var errorMessage = 'Ingrese la fecha de fin.';
        this.alertService.danger(errorMessage);
        return false;
    }


    var fecInicio = moment(this.marquesina.fecInivig, 'YYYY-MM-DD', true);
    var fecFin = moment(this.marquesina.fecFinvig, 'YYYY-MM-DD', true);
    var fecActual = moment().startOf('day');

    if(fecInicio.isAfter(fecFin)){
        var errorMessage = 'La fecha de inicio debe ser menor o igual a la fecha de fin.';
        this.alertService.danger(errorMessage);
        return false;
    }

    if(fecFin.isBefore(fecActual)){
        var errorMessage = 'La fecha de fin debe ser mayor a igual a la fecha actual.';
        this.alertService.danger(errorMessage);
        return false;
    }

    return true;
  }



  public add(): void {
    this.router.navigate(['add-marquesina']);
  }

  public ngAfterViewInit() {
    /*this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();*/
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
