import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { Oficina } from 'src/app/shared/model/oficina.model';
import { OficinaService } from 'src/app/shared/service/oficina.service';
import { Area } from 'src/app/shared/model/area.model';
import { Peso } from 'src/app/shared/model/peso.model';
import { PesoService } from 'src/app/shared/service/peso.service';
import { AreaService } from 'src/app/shared/service/area.service';
import { ModoLlamado } from 'src/app/shared/model/modoLlamado.model';
import { ModoLlamadoService } from 'src/app/shared/service/modoLlamado.service';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.component.html',
  styleUrls: ['./peso.component.css']
})
export class PesoComponent implements OnInit {
  public listOficina: Oficina[];
  public listArea: Area[];
  public listModoLlamado: ModoLlamado[];
  public listItem: Peso[];
  public item: Peso = new Peso();
  public id: number;
  public idOficina: number;
  public idArea: number;
  public idModoLlamado: number;
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
    public pesoService: PesoService,
    public alertService: AlertService,
    public oficinaService: OficinaService,
    public areaService: AreaService,
    public modoLlamadoService: ModoLlamadoService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.idOficina = 0;
    this.idArea = 0;
    this.idModoLlamado = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Perfil Atención';
  }

  ngOnInit() {
    this.search();
  }

  public loadCombos() {
    this.oficinaService.getAll().subscribe(
      data => {
        this.listOficina = <Oficina[]>data;
      },
      error => {
        this.listOficina = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );

    this.areaService.getAll().subscribe(
      data => {
        this.listArea = <Area[]>data;
      },
      error => {
        this.listArea = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );

    this.modoLlamadoService.getAll().subscribe(
      data => {
        this.listModoLlamado = <ModoLlamado[]>data;
      },
      error => {
        this.listArea = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  public search() {
    this.enableBtnBuscar = false;
    this.pesoService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <Peso[]>data;
      },
      error => {
        this.listItem = [];
        this.enableBtnBuscar = true;
        const errorMessage =
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

  public delete(): void {
    this.enableBtnBuscar = false;
    this.pesoService.delete(this.id).subscribe(
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
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadCreate(): void {
    this.clear();
    this.loadCombos();
    this.titleModal = 'Crear Perfil Atención';
    this.modal.show();
  }

  public clear(): void {
    this.item = new Peso();
    this.idArea = 0;
    this.idOficina = 0;
    this.idModoLlamado = 0;
    this.listArea = [];
    this.listOficina = [];
    this.listModoLlamado = [];
  }

  public loadEdit(id: number): void {
    this.clear();
    this.loadCombos();
    this.enableBtnBuscar = false;
    this.pesoService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Perfil Atención';
        this.enableBtnBuscar = true;
        this.item = <Peso>data;
        this.idArea = this.item.area != undefined ? this.item.area.idArea : 0;
        this.idOficina =
          this.item.oficina != undefined ? this.item.oficina.idOficina : 0;
        this.idModoLlamado =
          this.item.modoLlamado != undefined
            ? this.item.modoLlamado.idModoLlamado
            : 0;
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public selectIdOficina(id: number) {
    this.idOficina = id;
  }

  public selectIdArea(id: number) {
    this.idArea = id;
  }

  public selectIdModoLlamado(id: number) {
    this.idModoLlamado = id;
  }

  public save(): void {
    this.item.oficina = this.listOficina.find(
      obj => obj.idOficina == this.idOficina
    );
    this.item.area = this.listArea.find(obj => obj.idArea == this.idArea);
    this.item.modoLlamado = this.listModoLlamado.find(
      obj => obj.idModoLlamado == this.idModoLlamado
    );
    this.pesoService.save(this.item).subscribe(
      data => {
        this.item = new Peso();
        this.alertService.success('Se guardó correctamente');
        this.modal.hide();
        this.search();
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
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

  public validate(): boolean {
    return (
      this.item.nombrePeso == undefined ||
      this.item.nombrePeso.trim().length == 0 ||
      this.item.descripcion == undefined ||
      this.item.descripcion.trim().length == 0 ||
      this.idOficina == 0 ||
      this.idArea == 0 ||
      this.idModoLlamado == 0
    );
  }
}
