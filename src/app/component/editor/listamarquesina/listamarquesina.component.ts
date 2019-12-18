import {Router} from "@angular/router";
import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ListaMarquesinaService } from "src/app/shared/service/listamarquesina.service";
import { ListaMarquesina } from "src/app/shared/model/listamarquesina.model";
import { ModalDirective } from "angular-bootstrap-md";
import { ParametroService } from "src/app/shared/service/parametro.service";
import { MarquesinaService } from "src/app/shared/service/marquesina.service";
import { Parametro } from "src/app/shared/model/parametro.model";
import { Marquesina } from '../../../shared/model/marquesina.model';
import { ListaMarquesinaMarquesina } from '../../../shared/model/listamarquesinamarquesina.model';

@Component({
  selector: 'app-listamarquesina',
  templateUrl: './listamarquesina.component.html',
  styleUrls: ['./listamarquesina.component.css']
})
export class ListaMarquesinaComponent implements OnInit, AfterViewInit  {

  public listamarquesinas: ListaMarquesina[];
  public listamarquesina: ListaMarquesina = new ListaMarquesina();
  public id: number = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string = '';
  public titleModal: string = 'Crear Configurador de Llamado';

  public tamaniosFuente: Parametro[];
  public tiposFuente: Parametro[];
  public velocidades: Parametro[];


  public marquesinaTmp: Marquesina;
  public marquesinaTmp2: Marquesina;
  public marquesinasAll: Marquesina[];
  public selectedMarquesinas: Marquesina[] = [];
  public selectedToAdd: Marquesina[] = [];
  public selectedToRemove: Marquesina[] = [];

  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(public router: Router,
    public listaMarquesinaService: ListaMarquesinaService, public alertService: AlertService,
    public parametroService: ParametroService,
    public marquesinaService: MarquesinaService,
    public cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.search();
    this.getVelocidades();
    this.getTamaniosFuente();
    this.getTiposFuente();
  }

  public enter(event:any){
    if(event.keyCode == 13){
       this.search();
    }
 }

 public search() {
    this.enableBtnBuscar = false;
    this.listaMarquesinaService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listamarquesinas = <ListaMarquesina[]>data;
      },
      error => {
        this.listamarquesinas = [];
        this.enableBtnBuscar = true;
        var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
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
    this.listaMarquesinaService.delete(this.id)
      .subscribe( data => {
        this.enableBtnBuscar = true;
        this.alertService.success("Se borro correctamente el registro seleccionado " );
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
    this.listamarquesina = new ListaMarquesina();
    this.titleModal = 'Crear Lista de Marquesinas';
    this.inicializarFormulario();
    this.marquesinaService.getAll().subscribe(
      data => {
        this.marquesinasAll = <Marquesina[]>data;
        if (this.marquesinasAll.length > 0) {
          this.modal.show();
        } else {
          this.alertService.danger('No hay marquesinas registradas.');
        }
      },
      error => {
        this.marquesinasAll = [];
      }
    );
  }


  // Validamos el formulario antes de registrar el video
  public formularioValido(): boolean {
    // 1. nombre de la lista
    if (this.listamarquesina.desListaMarquesinas == null || this.listamarquesina.desListaMarquesinas.length == 0) {
        this.alertService.danger('Debe de ingresar el nombre de la lista.');
        return false;
    }

    // 2. debe ingresar al menos una ruta
    if (this.listamarquesina.desRutaImagen == null || this.listamarquesina.desRutaImagen.length == 0) {
        this.alertService.danger('Debe ingresar una ruta de la imagen');
        return false;
    }

    // 3. debe seleccionar una alineacion
    if (this.listamarquesina.indAlineacionImagen == null ) {
        this.alertService.danger('Debe seleccionar un alineacion.');
        return false;
    }


    if (this.listamarquesina.numVelocidad == null) {
        this.alertService.danger('Debe seleccionar una velocidad.');
        return false;
    }

    if (this.listamarquesina.desTipoFuente == null) {
        this.alertService.danger('Debe seleccionar una fuente.');
        return false;
    }

    if (this.listamarquesina.numTamanioFuente == null) {
        this.alertService.danger('Debe seleccionar un tamanio de fuente.');
        return false;
    }

    // 4.debe ingresar al menos una marquesina
    if (this.selectedMarquesinas.length == 0) {
        this.alertService.danger('Debe seleccionar al menos una marquesina');
        return false;
    }

    return true;
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.inicializarFormulario();
    this.marquesinaService.getAll().subscribe(
      data => {
        this.marquesinasAll = <Marquesina[]>data;
        if (this.marquesinasAll.length > 0) {

          this.listaMarquesinaService.getById(id)
            .subscribe( data => {
              this.titleModal = 'Modificar Lista de Marquesinas';
              this.enableBtnBuscar = true;
              this.listamarquesina =  <ListaMarquesina>data;
              this.formatDataEdit()
              this.modal.show();
            },
            error => {
              this.enableBtnBuscar = true;
              const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
              this.alertService.danger(errorMessage);
          });

        }else{
          var errorMessage = 'No hay marquesinas registradas.';
          this.alertService.danger(errorMessage);
        }

      },
      error => {
        this.marquesinasAll = [];
      }
    );
  }

  public save(): void {

    if (this.formularioValido()) {
      this.enableBtnBuscar = false;
      this.formatData();
      this.listaMarquesinaService.save(this.listamarquesina)
        .subscribe(
          data => {
            this.enableBtnGuardar = true;
            this.listamarquesina = new ListaMarquesina();
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

  private inicializarFormulario(): void {
    this.selectedMarquesinas = [];
    this.selectedToAdd = [];
    this.selectedToRemove = [];
  }

  public formatData(): void {
    this.listamarquesina.listaMarquesinas = [];
    for (let i = 0; i < this.selectedMarquesinas.length; i ++) {
      this.listamarquesina.listaMarquesinas.push(new ListaMarquesinaMarquesina(i, this.selectedMarquesinas[i]));
    }
  }

  public formatDataEdit(): void {
    for ( let i = 0 ; i < this.listamarquesina.listaMarquesinas.length; i++) {
      this.selectedMarquesinas.push(this.listamarquesina.listaMarquesinas[i].marquesina);
      let encontrado = false;
      let indice = -1;
      for (let j = 0 ; j < this.marquesinasAll.length; j++) {
        if (this.listamarquesina.listaMarquesinas[i].marquesina.idMarquesina == this.marquesinasAll[j].idMarquesina) {
          encontrado = true;
          indice = j;
          break;
        }
      }
      if (encontrado) {
        this.marquesinasAll.splice(indice, 1);
      }

      this.listamarquesina.numVelocidad = this.listamarquesina.numVelocidad.toString();
      this.listamarquesina.numTamanioFuente = this.listamarquesina.numTamanioFuente.toString();
    }
  }

  public add(): void {
    this.router.navigate(['add-listamarquesina']);
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

  public getVelocidades(): void {
    this.parametroService.getParametros('001').subscribe(
      data => {this.enableBtnBuscar = true; this.velocidades = <Parametro[]>data; },
      error => {this.velocidades = []; }
    );
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


  public seleccionarMarquesinas(marquesinasAll) {
    this.selectedToAdd = marquesinasAll;
  }

  public seleccionarMarquesinasToRemove(marquesinasAll) {
    this.selectedToRemove = marquesinasAll;
  }

  public agregarItem(): void {
    this.selectedMarquesinas = this.selectedMarquesinas.concat(this.selectedToAdd);
    this.marquesinasAll = this.marquesinasAll.filter(v => {
      return this.selectedMarquesinas.indexOf(v) < 0;
    });

    this.selectedToAdd = [];
  }

  public quitarItem(): void {
    this.marquesinasAll = this.marquesinasAll.concat(this.selectedToRemove);
    this.selectedMarquesinas = this.selectedMarquesinas.filter(selectedmarquesina => {
      return this.marquesinasAll.indexOf(selectedmarquesina) < 0;
    });
    this.selectedToRemove = [];
  }

  public agregarTodo(): void {
    this.selectedMarquesinas = this.selectedMarquesinas.concat(this.marquesinasAll);
    this.marquesinasAll = [] ;
    this.selectedToAdd = [];
  }

  public quitarTodo(): void {
    this.marquesinasAll = this.marquesinasAll.concat(this.selectedMarquesinas);
    this.selectedToAdd = [];
    this.selectedMarquesinas = [];
    this.selectedToRemove = [];
  }

  public subir(): void {
    if (this.selectedToRemove.length == 1) {
      this.marquesinaTmp = this.selectedToRemove[0];
      var j = this.selectedMarquesinas.indexOf(this.marquesinaTmp)

      if (j > 0 ) {
        this.marquesinaTmp2 = this.selectedMarquesinas[j - 1]; // guardo la variable
        this.selectedMarquesinas[j - 1] = this.marquesinaTmp; // asigno
        this.selectedMarquesinas[j] = this.marquesinaTmp2; // reasigno
      }

    } else {
      var errorMessage = 'Debe seleccionar solo una marquesina';
      this.alertService.danger(errorMessage);
    }

  }

  public bajar():void{
    if(this.selectedToRemove.length==1){

      this.marquesinaTmp = this.selectedToRemove[0];
      var j = this.selectedMarquesinas.indexOf(this.marquesinaTmp)

      if(j<this.selectedMarquesinas.length-1){
        this.marquesinaTmp2 = this.selectedMarquesinas[j+1];//guardo la variable que voy a chancar
        this.selectedMarquesinas[j+1] = this.marquesinaTmp;//asigno
        this.selectedMarquesinas[j] = this.marquesinaTmp2;//reasigno
      }

    }else{
      var errorMessage = 'Debe seleccionar solo una marquesina';
      this.alertService.danger(errorMessage);
    }

  }

  public primero():void{
    if(this.selectedToRemove.length==1){
      this.marquesinaTmp = this.selectedToRemove[0];
      var j = this.selectedMarquesinas.indexOf(this.marquesinaTmp)
      for(var i=j-1;i>=0;i--){
        this.selectedMarquesinas[i+1] = this.selectedMarquesinas[i];
      }
      this.selectedMarquesinas[0] = this.marquesinaTmp;
    }else{
      var errorMessage = 'Debe seleccionar solo una marquesina';
      this.alertService.danger(errorMessage);
    }
  }

  public ultimo():void{
    if(this.selectedToRemove.length==1){
      this.marquesinaTmp = this.selectedToRemove[0];
      var j = this.selectedMarquesinas.indexOf(this.marquesinaTmp)
      for(var i=j;i<this.selectedMarquesinas.length;i++){
        this.selectedMarquesinas[i] = this.selectedMarquesinas[i+1];
      }
      this.selectedMarquesinas[this.selectedMarquesinas.length-1] = this.marquesinaTmp;
    }else{
      var errorMessage = 'Debe seleccionar solo una marquesina';
      this.alertService.danger(errorMessage);
    }
  }

}
