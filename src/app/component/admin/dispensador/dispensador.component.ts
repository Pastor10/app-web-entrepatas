import {Router} from '@angular/router';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {AlertService} from 'ngx-alerts';
import {ModalDirective} from 'angular-bootstrap-md';
import {Dispensador} from 'src/app/shared/model/dispensador.model';
import {DispensadorService} from 'src/app/shared/service/dispensador.service';
import {Oficina} from 'src/app/shared/model/oficina.model';
import {OficinaService} from 'src/app/shared/service/oficina.service';

@Component({
  selector: 'app-dispensador',
  templateUrl: './dispensador.component.html',
  styleUrls: ['./dispensador.component.css']
})
export class DispensadorComponent implements OnInit {

  public idOficina: number;
  public listOficina: Oficina[];
  public listItem: Dispensador[];
  public item: Dispensador = new Dispensador();
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
              public dispensadorService: DispensadorService, public alertService: AlertService,
              public cdRef: ChangeDetectorRef, public oficinaService: OficinaService) {
    this.idOficina = 0;
    this.id = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Dispensador';
  }

  ngOnInit() {
    this.search();
    this.loadCombos();
  }

  public enter(event: any) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  public search() {
    this.enableBtnBuscar = false;
    this.dispensadorService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <Dispensador[]>data;
      },
      error => {
        this.listItem = [];
        this.enableBtnBuscar = true;
        const errorMessage = error.message !== undefined ? error.message : 'No se pudo procesar la petición';
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
    this.dispensadorService.delete(this.id)
      .subscribe(data => {
          this.enableBtnBuscar = true;
          this.alertService.success('Se borró correctamente el registro seleccionado ');
          this.confirmDelete.hide();
          this.search();
        },
        error => {
          this.enableBtnBuscar = true;
          const errorMessage = error.message !== undefined ? error.message : 'No se pudo procesar la petición';
          this.alertService.danger(errorMessage);
        });
  }

  public loadCreate(): void {
    this.clear();
    this.loadCombos();
    this.item = new Dispensador();
    this.item.activo = false;
    this.titleModal = 'Crear Dispensador';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.clear();
    this.loadCombos();
    this.enableBtnBuscar = false;
    this.dispensadorService.getById(id)
      .subscribe(data => {
          this.titleModal = 'Modificar Dispensador';
          this.enableBtnBuscar = true;
          this.item = <Dispensador>data;
          this.idOficina = this.item.oficina !== undefined ? this.item.oficina.idOficina : 0;
          this.modal.show();
        },
        error => {
          this.enableBtnBuscar = true;
          const errorMessage = error.message !== undefined ? error.message : 'No se pudo procesar la petición';
          this.alertService.danger(errorMessage);
        });
  }

  public save(): void {
    this.item.oficina = this.listOficina.find(obj => obj.idOficina == this.idOficina);
    this.enableBtnBuscar = false;
    this.dispensadorService.save(this.item)
      .subscribe(
        data => {
          this.enableBtnGuardar = true;
          this.item = new Dispensador();
          this.alertService.success('Se guardó correctamente');
          this.modal.hide();
          this.search();
        },
        error => {
          this.enableBtnGuardar = true;
          const errorMessage = error.message !== undefined ? error.message : 'No se pudo procesar la petición';
          this.alertService.danger(errorMessage);
        }
      );
  }

  public loadCombos() {
    this.oficinaService.getAll().subscribe(
      data => {
        this.listOficina = <Oficina[]>data;
      },
      error => {
        this.listOficina = [];
        const errorMessage = error.message !== undefined ? error.message : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public clear(): void {
    this.item = new Dispensador();
    this.idOficina = 0;
    this.listOficina = [];
  }

  public selectIdOficina(id: number) {
    console.log(id);
    this.idOficina = id;
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
    return this.item.nombre === undefined
      || this.item.nombre.trim().length === 0
      || this.idOficina === 0;
  }

}
