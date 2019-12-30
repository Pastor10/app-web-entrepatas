import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/model/item.model';
import { ReporteF7Service } from 'src/app/shared/service/reporteF7.service';
import { Producto } from 'src/app/interface/producto.interface';
import { SelectItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import * as $ from 'jquery';

@Component({
  selector: 'app-f7-reporte-general',
  templateUrl: './f7-general.component.html',
  styleUrls: ['./f7-general.component.css']
})
export class ReporteF7GeneralComponent implements OnInit {
  public messageService: MessageService;
  public dataListaTipoCoberturaSugerida: Item[];
  public dataListaFiltro: Item[];
  public dataLineaProducto: Item[];
  public tipoCoberturaSelected: Item;
  public filtroSelected: Item;
  public filterCombo1Selected: Item;
  public filterCombo2Selected: Item;
  public lineaSelected: Item;
  public showFilter1: boolean;
  public showFilter2: boolean;
  public isComboFilter1: boolean;
  public isComboFilter2: boolean;
  public labelFiltro1: string;
  public labelFiltro2: string;
  public listaGrupoProductoERP: Item[];
  public listaGrupoAnatomico: Item[];
  public listCombo1: Item[];
  public listCombo2: Item[];
  public name: string;
  public count: string;
  cols: any[];
  scrollableCols: any[];
  frozenCols: any[];
  listProductos: Producto[];
  inputFilter1: string;
  inputFilter2: string;

  constructor(
    public reporteF7Service: ReporteF7Service
  ) { }

  ngOnInit() {
    this.loadListarGrupoProductoERP();
    this.loadListarGrupoAnatomico();
    if (this.tipoCoberturaSelected == undefined) {
      this.tipoCoberturaSelected = new Item('TODAS', '0');
      this.filtroSelected = new Item('NINGUNO', '0');
    }

    this.dataListaTipoCoberturaSugerida = [new Item('TODAS', '0'), new Item('S', 'S'), new Item('N', 'N'), new Item('R', 'R')];
    this.dataListaFiltro = [
    new Item('NINGUNO', '0'), new Item('COD. LOCAL', '1'),
    new Item('COD PRODUCTO', '2'), new Item('COD LOCAL Y PRODUCTO', '3'), new Item('COD LINEA PRODUCTO', '4'),
    new Item('DESCRIPCIÓN LINEA PRODUCTO', '5'), new Item('COD LOCAL Y LINEA PRODUCTO', '6'),
    new Item('TIPO LAM', '7'), new Item('COD SAP LOCAL', '8'), new Item('COD SAP PRODUCTO', '9'),
    new Item('JERARQUIAS', '10'), new Item('ANALISTA ASR', '11')
    ];
    this.dataLineaProducto = [ new Item('CONSUMO', '1'), new Item('DISPOSITIVO MEDICO QUIRUR.', '2'), new Item('MEDICAMENTO ETICO', '3'),
    new Item('MEDICAMENTO POPULAR', '4'), new Item('NUTRICION', '5')];

    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'centro', header: 'Centro' },
      { field: 'codigoLocal', header: 'Cod. Local' },
      { field: 'descripcionLocal', header: 'Desc. Local' },
      { field: 'codigoSap', header: 'Cod. SAP' },
      { field: 'codigoProducto', header: 'Cod. Prod' },
      { field: 'descprod', header: 'Desc. producto' },
      { field: 'descripcionProducto', header: 'Desc unid. producto' },
      { field: 'materialEstado', header: 'Material estado' },
      { field: 'tipoGrupoExterno', header: 'Grupo externo' },

      { field: 'jerarquia1', header: 'Jerarquia 1' },
      { field: 'jerarquia2', header: 'Jerarquia 2' },
      { field: 'jerarquia3', header: 'Jerarquia 3' },
      { field: 'leadTime', header: 'Lead time' },
      { field: 'stock', header: 'Stock' },
      { field: 'outl', header: 'Outl' },
      { field: 'iop', header: 'IOP' },
      { field: 'estado', header: 'Estado' },
      { field: 'cat', header: 'Cat' },
      { field: 'weekly', header: 'Weekly' },
      { field: 'mes0', header: 'Mes 0' },
      { field: 'mes1', header: 'Mes 1' },
      { field: 'mes2', header: 'Mes 2' },
      { field: 'mes3', header: 'Mes 3' },
      { field: 'mes4', header: 'Mes 4' },
      { field: 'analistaAsr', header: 'Analista ASR' },
      { field: 'restriccion', header: 'Restricción' },
      { field: 'indiceAprobacion', header: 'Indice de aprobación' },
      { field: 'indiceF7Nuevo', header: 'Indice F7 new' }
  ];

    this.scrollableCols = [
      { field: 'jerarquia1', header: 'Jerarquia 1' },
      { field: 'jerarquia2', header: 'Jerarquia 2' },
      { field: 'jerarquia3', header: 'Jerarquia 3' },
      { field: 'leadTime', header: 'Lead time' },
      { field: 'stock', header: 'Stock' },
      { field: 'outl', header: 'Outl' },
      { field: 'iop', header: 'IOP' },
      { field: 'estado', header: 'Estado' },
      { field: 'cat', header: 'Cat' },
      { field: 'weekly', header: 'Weekly' },
      { field: 'mes0', header: 'Mes 0' },
      { field: 'mes1', header: 'Mes 1' },
      { field: 'mes2', header: 'Mes 2' },
      { field: 'mes3', header: 'Mes 3' },
      { field: 'mes4', header: 'Mes 4' },
      { field: 'analistaAsr', header: 'Desc Jerarquia 3' },
      { field: 'restriccion', header: 'Restricción' },
      { field: 'indiceAprobacion', header: 'Indice de aprobación' },
      { field: 'indiceF7Nuevo', header: 'Indice F7 new' }
  ];
    this.frozenCols = [
      { field: 'fecha', header: 'Fecha' }
  ];
    this.listarProductosDefault(-1);
  }

  public onChangeFilter() {
    if (this.filtroSelected != undefined) {
      if (this.filtroSelected.code == '1') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Código Local';
      } else if (this.filtroSelected.code == '2') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Código Producto';
      } else if (this.filtroSelected.code == '3') {
        this.showFilter1 = true;
        this.showFilter2 = true;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Código Local';
        this.labelFiltro2 = 'Código Producto';
      } else if (this.filtroSelected.code == '4') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.labelFiltro1 = 'Cód. Linea Producto';
      } else if (this.filtroSelected.code == '5') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = true;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Linea Producto';
        this.listCombo1 = this.dataLineaProducto;
      } else if (this.filtroSelected.code == '6') {
        this.showFilter1 = true;
        this.showFilter2 = true;
        this.isComboFilter1 = false;
        this.isComboFilter2 = true;
        this.labelFiltro1 = 'Código Local';
        this.labelFiltro2 = 'Linea Producto';
        this.listCombo2 = this.dataLineaProducto;
      } else if (this.filtroSelected.code == '7') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Tipo LAM';
      } else if (this.filtroSelected.code == '8') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Código SAP Local';
      } else if (this.filtroSelected.code == '9') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Cód. SAP Producto';
      } else if (this.filtroSelected.code == '10') {
        this.showFilter1 = true;
        this.showFilter2 = true;
        this.isComboFilter1 = true;
        this.isComboFilter2 = true;
        this.labelFiltro1 = 'Grupo Producto ERP';
        this.labelFiltro2 = 'Grupo Anatomico';
        this.listCombo1 = this.listaGrupoProductoERP;
        this.listCombo2 = this.listaGrupoAnatomico;
      } else if (this.filtroSelected.code == '11') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Analista ASR';
      } else {
        this.showFilter1 = false;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
      }


    }
  }

  public loadListarGrupoProductoERP() {
    this.reporteF7Service.listarGrupoProductoERP().subscribe(
      data => {
        this.listaGrupoProductoERP = <any>data;
        console.log('this.listaGrupoProductoERP', data);
        this.listCombo1 = [];
        for ( let i = 0; i <= this.listaGrupoProductoERP.length; i++) {
          if (this.listaGrupoProductoERP[i] != undefined) {
              this.name = '' + this.listaGrupoProductoERP[i];
              this.count = '' + i;
              this.listCombo1.push(new Item(this.name, this.count));
              }
          }
        this.listaGrupoProductoERP = this.listCombo1;
      },
      error => {
        this.listaGrupoProductoERP = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  public loadListarGrupoAnatomico() {
    this.reporteF7Service.listarGrupoAnatomico().subscribe(
      data => {
        this.listaGrupoAnatomico = <any>data;
        this.listCombo2 = [];
        for ( let i = 0; i <= this.listaGrupoAnatomico.length; i++) {
          if (this.listaGrupoAnatomico[i] != undefined) {
            this.name = '' + this.listaGrupoAnatomico[i];
            this.count = '' + i;
            this.listCombo2.push(new Item(this.name, this.count));
          }
        }
        this.listaGrupoAnatomico = this.listCombo2;
      },
      error => {
        this.listaGrupoAnatomico = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  listarProductosDefault(pagina) {
    this.reporteF7Service.listarProductosCoverage(pagina).subscribe(
      data => {
      this.listProductos = data['content'];
      });

  }

  loadChunk(index): Producto[] {
    let prod: Producto[] = [];
    for (let i = 0; i < this.listProductos.length; i++) {
        prod[i] = {...this.listProductos[i], ...{vin: (index + i)}};
    } 

    return prod;
  }

  buscarProductosXFiltros() {
    console.log('filter 1 ', this.inputFilter1);
    if (this.tipoCoberturaSelected.code == '0' &&  this.filtroSelected .code=='0'){
        this.listProductos = [];
        this.listarProductosDefault(0);
      }
    if (this.tipoCoberturaSelected.code != '0' && this.filtroSelected .code=='0'){
        this.listProductos = [];
        this.reporteF7Service.coverage_page(0, this.tipoCoberturaSelected.name).subscribe(
          data => {
            this.listProductos = data['content'];
          });
      }
    if (this.filtroSelected.code == '1') {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodLocal(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
            console.log('this.listProductos:', data);
          });

      }
    if (this.filtroSelected.code == '2') {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodProd(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
            console.log('this.listProductos:', data);
          });

      }

    if (this.filtroSelected.code == '3') {
      //console.log('tamaño ', this.inputFilter1.trim.length);
      if(this.inputFilter1 == undefined ) {
        console.log('ingrese datos');
        this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Atención',
        detail: 'Debe ingresar el código del local y código de producto.' });

      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodLocalCodProducto(0, this.tipoCoberturaSelected.code, this.inputFilter1,
          this.inputFilter2).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
            console.log('this.listProductos:', data);
          });

      }

      }

    if (this.filtroSelected.code == '5') {
        console.log('linea descripcion:', this.filterCombo1Selected.name);
        //this.dataLineaProducto;
        this.listProductos = [];
        this.reporteF7Service.listarProductosByDescLinea(0, this.tipoCoberturaSelected.code, this.filterCombo1Selected.name).subscribe(
          data => {
            this.listProductos = data['content'];
            console.log('this.listProductos:', data);
          });

      }

    if (this.filtroSelected.code == '6') {
        console.log('linea descripcion:', this.filterCombo2Selected.name);
        //this.dataLineaProducto;
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodLocalDescLinea(0, this.tipoCoberturaSelected.code, this.inputFilter1,
           this.filterCombo2Selected.name).subscribe(
          data => {
            this.listProductos = data['content'];
            console.log('this.listProductos:', data);
          });

      }

      if (this.filtroSelected.code == '8') {
        //this.dataLineaProducto;
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodProdSap(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
            console.log('this.listProductos:', data);
          });

      }

      if (this.filtroSelected.code == '10') {
        //this.dataLineaProducto;
        this.listProductos = [];
        this.reporteF7Service.listarProductosBySnalistaAsr(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data['content'];
            console.log('this.listProductos:', data);
          });

      }

      if (this.filtroSelected.code == '11') {
        //this.dataLineaProducto;
        this.listProductos = [];
        this.reporteF7Service.listarProductosBySnalistaAsr(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data['content'];
            console.log('this.listProductos:', data);
          });

      }
  }
}


// new Item('NINGUNO', '0'), new Item('COD. LOCAL', '1'),
// new Item('COD PRODUCTO', '2'), new Item('COD LOCAL Y PRODUCTO', '3'), new Item('COD LINEA PRODUCTO', '4'),
// new Item('DESCRIPCIÓN LINEA PRODUCTO', '5'), new Item('COD LOCAL Y LINEA PRODUCTO', '6'),
// new Item('TIPO LAM', '7'), new Item('COD SAP LOCAL', '8'), new Item('COD SAP PRODUCTO', '9'),
// new Item('JERARQUIAS', '10'), new Item('ANALISTA ASR', '11')