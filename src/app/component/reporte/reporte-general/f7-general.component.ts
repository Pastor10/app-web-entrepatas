import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/shared/model/item.model';
import { ReporteF7Service } from 'src/app/shared/service/reporteF7.service';
import { Producto } from 'src/app/interface/producto.interface';
import { SelectItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IpServiceService } from 'src/app/shared/service/ip.service';


@Component({
  selector: 'app-f7-reporte-general',
  templateUrl: './f7-general.component.html',
  styleUrls: ['./f7-general.component.css']
})
export class ReporteF7GeneralComponent implements OnInit {
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
  display = false;
  uploadedFiles: any[] = [];
  ipAddress: string;
  motivo: string;

  @ViewChild('dt', { static: true }) public tabla: Table;

  constructor(
    public reporteF7Service: ReporteF7Service, public messageService: MessageService,
    private ip: IpServiceService
  ) { }

  ngOnInit() {
    this.loadListarGrupoProductoERP();
    this.loadListarGrupoAnatomico();
    this.getIP();
    if (this.tipoCoberturaSelected == undefined) {
      this.tipoCoberturaSelected = new Item('TODAS', '0');
      this.filtroSelected = new Item('NINGUNO', '0');
    }

    this.dataListaTipoCoberturaSugerida = [new Item('TODAS', '0'), new Item('S', 'S'), new Item('N', 'N'), new Item('R', 'R')];
    this.dataListaFiltro = [
    new Item('NINGUNO', '0'), new Item('COD. LOCAL', '1'),
    new Item('COD PRODUCTO', '2'), new Item('COD LOCAL Y PRODUCTO', '3'),
    new Item('DESCRIPCIÓN LINEA PRODUCTO', '5'), new Item('COD LOCAL Y LINEA PRODUCTO', '6'),
    new Item('COD SAP', '8'), new Item('GRUPO EXTERNO', '9'),
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
      { field: 'ventaMes0', header: 'Mes 0' },
      { field: 'ventaMes1', header: 'Mes 1' },
      { field: 'ventaMes2', header: 'Mes 2' },
      { field: 'ventaMes3', header: 'Mes 3' },
      { field: 'ventaMes4', header: 'Mes 4' },
      { field: 'analistaAsr', header: 'Analista ASR' },
      { field: 'restriccion', header: 'Restricción' },
      { field: 'indiceAprobacion', header: 'Indice F7' },
      { field: 'indiceF7Nuevo', header: 'Nuevo indice F7 ' }
  ];

    this.listarProductosDefault(0);
  }

    getIP() {
      this.ip.getIPAddress().subscribe((res: any) => {
        this.ipAddress = res.ip;
      });
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
        this.labelFiltro1 = 'Código SAP';
      } else if (this.filtroSelected.code == '9') {
        this.showFilter1 = true;
        this.showFilter2 = false;
        this.isComboFilter1 = false;
        this.isComboFilter2 = false;
        this.labelFiltro1 = 'Grupo Externo';
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

 

  exportExcel() {
    const params = [];
    if (this.tipoCoberturaSelected.code == '0' &&  this.filtroSelected .code=='0') {
      this.reporteF7Service.exportToExcelDefault(params.join('&'), -1);
    }

    if (this.tipoCoberturaSelected.code != '0' && this.filtroSelected .code=='0') {
      params.push(`${this.tipoCoberturaSelected.name}`);
      this.reporteF7Service.exportToExcelTipoCobertura(params.join('&'), -1);
    }
    if (this.filtroSelected.code == '1') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.inputFilter1}`);
      this.reporteF7Service.exportToExcelCodLocal(params.join('/'), -1);
    }
    if (this.filtroSelected.code == '2') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.inputFilter1}`);
      this.reporteF7Service.exportToExcelCodProducto(params.join('/'), -1);
    }

    if (this.filtroSelected.code == '3') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.inputFilter1}`);
      params.push(`${this.inputFilter2}`);
      this.reporteF7Service.exportToExcelCodLocalProducto(params.join('/'), -1);
    }

    if (this.filtroSelected.code == '5') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.filterCombo1Selected.name}`);
      this.reporteF7Service.exportToExcelDescripcionLinea(params.join('/'), -1);
    }

    if (this.filtroSelected.code == '6') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.inputFilter1}`);
      params.push(`${this.filterCombo2Selected.name}`);
      this.reporteF7Service.exportToExcelCodLocalDescLinea(params.join('/'), -1);
    }

    if (this.filtroSelected.code == '8') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.inputFilter1}`);
      this.reporteF7Service.exportToExcelCodSapProducto(params.join('/'), -1);
    }

    if (this.filtroSelected.code == '11') {
      params.push(`${this.tipoCoberturaSelected.code}`);
      params.push(`${this.inputFilter1}`);
      this.reporteF7Service.exportToExcelAnalistaAsr(params.join('/'), -1);
    }

  }

  openImport() {
    this.display = true;
  }

  buscarProductosXFiltros() {

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
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == ''){
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de local', 
        detail: ''});
      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodLocal(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
            console.log('this.listProductos:', data);
          });
      }

      }
    if (this.filtroSelected.code == '2') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de producto', 
        detail: ''});
      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodProd(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
            console.log('this.listProductos:', data);
          });
      }

      }

    if (this.filtroSelected.code == '3') {

      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de local', 
        detail: ''});
      }
      if (this.inputFilter2 == undefined || this.inputFilter2.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de Producto', 
        detail: ''});
      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodLocalCodProducto(0, this.tipoCoberturaSelected.code, this.inputFilter1,
          this.inputFilter2).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
          });

      }

      }

    if (this.filtroSelected.code == '5') {

        if (this.filterCombo1Selected== undefined || this.filterCombo1Selected.code=='0') {
          this.messageService.add({key: 'msg', severity: 'info', summary: 'Seleccione linea de Producto', 
          detail: ''});
          } else {
          this.listProductos = [];
          this.reporteF7Service.listarProductosByDescLinea(0, this.tipoCoberturaSelected.code, this.filterCombo1Selected.name).subscribe(
          data => {
            this.listProductos = data['content'];
          });
        }

      }

    if (this.filtroSelected.code == '6') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de local', 
        detail: ''});
      }
      if (this.filterCombo2Selected == undefined || this.filterCombo2Selected.code =='0') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Seleccione linea de Producto', 
        detail: ''});
      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodLocalDescLinea(0, this.tipoCoberturaSelected.code, this.inputFilter1,
           this.filterCombo2Selected.name).subscribe(
          data => {
            this.listProductos = data['content'];
          });
      }
      }

    if (this.filtroSelected.code == '8') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código SAP', 
        detail: ''});
      } else{
        this.listProductos = [];
        this.reporteF7Service.listarProductosByCodProdSap(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data as Array<Producto>;
          });
      }
      }

    if (this.filtroSelected.code == '10') {

      if (this.filterCombo1Selected== undefined || this.filterCombo2Selected == undefined) {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Seleccionar filtros', 
        detail: 'Seleccione un grupo producto ERP y grupo Anatomico'});

      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosByJerarquias(0, this.tipoCoberturaSelected.code,
          this.filterCombo1Selected.name, this.filterCombo2Selected.name).subscribe(
          data => {
            this.listProductos = data['content'];
            console.log('this.listProductos:', data);
          });

      }
      }

    if (this.filtroSelected.code == '11') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar nombre Analista ASR', 
        detail: ''});
      } else {
        this.listProductos = [];
        this.reporteF7Service.listarProductosBySnalistaAsr(0, this.tipoCoberturaSelected.code, this.inputFilter1).subscribe(
          data => {
            this.listProductos = data['content'];
          });
      }

      }
  }

  onFileUpload(data: { files: File }): void {

    if (this.motivo == undefined) {
      this.messageService.add({key: 'tst', severity: 'info', summary: 'Ingrese un motivo', detail: ''});
      return;
    } 
    if (this.motivo.trim() == '') {
      this.messageService.add({key: 'tst', severity: 'info', summary: 'Ingrese un motivo', detail: ''});
      return;
    } else {
      const formData: FormData = new FormData();
      const file = data.files[0];
      formData.append('file', file, file.name);
      formData.append('usuario', 'Luis Pastor');
      formData.append('ip', this.ipAddress);
      formData.append('motivo', this.motivo);
      this.reporteF7Service.importFromExcel(formData).subscribe(resp => {
          if (resp.codigo =='00') {
            this.messageService.add({key: 'msg', severity: 'success', summary: 'Archivo importado correctamente', detail: ''});
          } else {
            this.messageService.add({key: 'msg', severity: 'error', summary: 'Error al importar archivo', detail: resp.msj});
          }
          this.display = false;
          //this.tabla._filter();
      });

    }
}
}
