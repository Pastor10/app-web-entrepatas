import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { Oficina } from 'src/app/shared/model/oficina.model';
import { OficinaService } from 'src/app/shared/service/oficina.service';
/* Models */
import { Ventanilla } from 'src/app/shared/model/ventanilla.model';
/* Services */
import { VentanillaService } from 'src/app/shared/service/ventanilla.service';
import { environment } from 'src/environments/environment';
import { Peso } from 'src/app/shared/model/peso.model';
import { PesoService } from 'src/app/shared/service/peso.service';
import { TipoAtencion } from 'src/app/shared/model/tipoAtencion.model';
import { TipoAtencionService } from 'src/app/shared/service/tipoAtencion.service';

@Component({
  selector: 'app-ventanilla',
  templateUrl: './ventanilla.component.html',
  styleUrls: ['./ventanilla.component.css']
})
export class VentanillaComponent implements OnInit {
  public listOficina: Oficina[];
  public listTipoAtencion: TipoAtencion[];
  public listPeso: Peso[];

  /*Ventanilla */
  public listItem: Ventanilla[];
  public item: Ventanilla = new Ventanilla();

  public id: number;
  public idOficina: number;
  public idPeso: number;
  public idTipoAtencion: number;

  /*Botones */
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
    public ventanillaService: VentanillaService,
    public alertService: AlertService,
    public oficinaService: OficinaService,
    public tipoAtencionService: TipoAtencionService,
    public pesoService: PesoService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.idOficina = 0;
    this.idPeso = 0;
    this.idTipoAtencion = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Ventanilla';
  }

  ngOnInit() {
    this.search();
  }

  //////////////////////////////////////////////////////////////////////
  ////////////// C A R G A - E L - F O R M U L A R I O /////////////////
  //////////////////////////////////////////////////////////////////////
  public loadOficina(){
    this.oficinaService.getAll().subscribe(
      data => {
        this.listOficina = <Oficina[]>data;
      },
      error => {
        this.listOficina = [];
        this.alertService.danger(this.proccessError(error));
      }
    );
  }

  public loadCombos(id:number) {
    this.oficinaService.getAll().subscribe(
      data => {
        this.listOficina = <Oficina[]>data;
      },
      error => {
        this.listOficina = [];
        this.alertService.danger(this.proccessError(error));
      }
    );

    this.tipoAtencionService.getAll().subscribe(
      data => {
        this.listTipoAtencion = <TipoAtencion[]>data;
      },
      error => {
        this.listTipoAtencion = [];
        this.alertService.danger(this.proccessError(error));
      }
    );

    this.pesoService.getfindByPesoidOficina(id).subscribe(
      data => {
        this.listPeso = <Peso[]>data;
      },
      error => {
        this.listPeso = [];
        this.alertService.danger(this.proccessError(error));
      }
    );
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  //////////////////////////////////////////////////////////////////////
  ////////////// B U S Q U E D A  /////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  public search() {
    this.enableBtnBuscar = false;
    /*Ventanilla*/
    this.ventanillaService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <Ventanilla[]>data;
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
    this.ventanillaService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borró correctamente el registro seleccionado'
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

  public clear() {
    this.item = new Ventanilla();
    this.idTipoAtencion = 0;
    this.idOficina = 0;
    this.idPeso = 0;
    this.listOficina = [];
    this.listPeso = [];
    this.listTipoAtencion = [];
  }

  public loadCreate(): void {
    this.clear();
    this.loadOficina();
    //this.loadCombos();
    this.titleModal = 'Crear Ventanilla';
    this.modal.show();
    
  }

  public loadEdit(id: number,ido:number): void {
    this.clear();
    this.loadCombos(ido);
    this.enableBtnBuscar = false;
    this.ventanillaService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Ventanilla';
        this.enableBtnBuscar = true;
        this.item = <Ventanilla>data;
        this.idOficina =
          this.item.oficina != undefined ? this.item.oficina.idOficina : 0;
        this.idPeso = this.item.peso != undefined ? this.item.peso.idPeso : 0;
        this.idTipoAtencion =
          this.item.tipoAtencion != undefined
            ? this.item.tipoAtencion.idTipoAtencion
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
    this.idPeso=0;
    this.loadCombos(this.idOficina);
  }

  public selectIdPeso(id: number) {
    this.idPeso = id;
  }

  public selectIdTipoAtencion(id: number) {
    this.idTipoAtencion = id;
  }

  public save(): void {
    this.item.oficina = this.listOficina.find(
      obj => obj.idOficina == this.idOficina
    );
    this.item.peso = this.listPeso.find(obj => obj.idPeso == this.idPeso);
    this.item.tipoAtencion = this.listTipoAtencion.find(
      obj => obj.idTipoAtencion == this.idTipoAtencion
    );
    this.ventanillaService.save(this.item).subscribe(
      data => {
        this.item = new Ventanilla();
        this.alertService.success('Se guardó correctamente');
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

  public proccessError(error: any): string {
    let errorMessage;
    if (error.status == 400) {
      errorMessage = error.error.errors[0].defaultMessage;
    } else if (error.status == 0) {
      errorMessage = environment.MESSAGE_ERROR_CONNECTION;
    } else {
      errorMessage =
        error.message != undefined
          ? error.message
          : environment.MESSAGE_UNKNOWN;
    }
    return errorMessage;
  }
}
