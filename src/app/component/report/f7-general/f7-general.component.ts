import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { Item } from 'src/app/shared/model/item.model';
import { ReporteF7Service } from 'src/app/shared/service/reporteF7.service';

@Component({
  selector: 'app-f7-reporte-general',
  templateUrl: './f7-general.component.html',
  styleUrls: ['./f7-general.component.css']
})
export class ReporteF7GeneralComponent implements OnInit {
  public dataListaTipoCoberturaSugerida: Item[];
  public dataListaFiltro: Item[];
  public dataLineaProducto: Item[];
  public dataProductoERP: Item[];
  public dataGrupoAnatomico: Item[];
  public tipoCoberturaSelected: Item;
  public filtroSelected: Item;
  public showFilter1: boolean;
  public showFilter2: boolean;
  public isComboFilter1: boolean;
  public isComboFilter2: boolean;
  public labelFiltro1: String;
  public labelFiltro2: String;
  public listaGrupoProductoERP: Item[];
  public listaGrupoAnatomico: Item[];
  public listCombo1: Item[];
  public listCombo2: Item[];

  constructor(
    public alertService: AlertService,
    public reporteF7Service: ReporteF7Service
  ) { }

  ngOnInit() {
    this.loadListarGrupoProductoERP();
    this.loadListarGrupoAnatomico();
    this.dataListaTipoCoberturaSugerida = [new Item('TODAS', '0'), new Item('S', 'S'), new Item('N', 'N'), new Item('C', 'C')];
    this.dataListaFiltro = [
    new Item('NINGUNO', '0'), new Item('COD. LOCAL', '1'),
    new Item('COD PRODUCTO', '2'), new Item('COD LOCAL Y PRODUCTO', '3'), new Item('COD LINEA PRODUCTO', '4'),
    new Item('DESCRIPCIÓN LINEA PRODUCTO', '5'), new Item('COD LOCAL Y LINEA PRODUCTO', '6'),
    new Item('TIPO LAM', '7'), new Item('COD SAP LOCAL', '8'), new Item('COD SAP PRODUCTO', '9'),
    new Item('JERARQUIAS', '10'), new Item('ANALISTA ASR', '11')
    ];
    this.dataLineaProducto = [ new Item('CONSUMO', '1'), new Item('DISPOSITIVO MEDICO QUIRUR.', '2'), new Item('MEDICAMENTO ETICO', '3'),
    new Item('MEDICAMENTO POPULAR', '4'), new Item('NUTRICION', '5')];
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
        this.listCombo1 = [];
        var name = '';
        var count = '';
            for ( let i = 0; i <= this.listaGrupoProductoERP.length; i++) {
              name = this.listaGrupoProductoERP[i];
              count = i;
              if (name != undefined) {
                this.listCombo1.push(new Item(name, count));
              }
            }
      },
      error => {
        this.listaGrupoProductoERP = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadListarGrupoAnatomico() {
    this.reporteF7Service.listarGrupoAnatomico().subscribe(
      data => {
        this.listaGrupoAnatomico = <any>data;
        this.listCombo2 = [];
        let name = '';
        let count = '';
            for ( let i = 0; i <= this.listaGrupoAnatomico.length; i++) {
              name = this.listaGrupoAnatomico[i];
              count = i;
              if (name != undefined) {
                this.listCombo2.push(new Item(name, count));
              }
            }
      },
      error => {
        this.listaGrupoProductoERP = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

}