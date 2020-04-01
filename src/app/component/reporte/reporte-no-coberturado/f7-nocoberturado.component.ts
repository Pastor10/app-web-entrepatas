import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/shared/model/item.model';
import { ReporteF7Service } from 'src/app/shared/service/reporteF7.service';
import { Producto } from 'src/app/interface/producto.interface';
import { SelectItem, MessageService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { IpServiceService } from 'src/app/shared/service/ip.service';
import { TypeReporte } from 'src/app/enums/type-reporte';
import * as moment from 'moment';

@Component({
  selector: 'app-f7-reporte-no-coberturado',
  templateUrl: './f7-nocoberturado.component.html'
})
export class ReporteF7NoCoberturadoComponent implements OnInit {
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
  typeReporte: TypeReporte;
  lastLazyLoadEvent: LazyLoadEvent;
  perPage = 20;
  totalRecords: number;
  datasource: Producto[];
  loading: boolean;

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
      this.filterCombo2Selected = new Item(null, '0');
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
      { field: 'fecha', header: 'Fecha', width: '100px'  },
      { field: 'codLocalSap', header: 'Centro' , width: '100px' },
      { field: 'filialId', header: 'Cod. Local' , width: '100px' },
      { field: 'local', header: 'Desc. Local' , width: '150px' },
      { field: 'codSap', header: 'Cod. SAP', width: '100px'  },
      { field: 'productoId', header: 'Cod. Prod', width: '100px'  },
      { field: 'deProducto', header: 'Desc. producto', width: '400px'  },
      { field: 'grupoExterno', header: 'Grupo externo', width: '100px'  },
      { field: 'jq1', header: 'Jerarquia 1' , width: '150px' },
      { field: 'jq2', header: 'Jerarquia 2', width: '150px'  },
      { field: 'jq3', header: 'Jerarquia 3' , width: '250px' },
      { field: 'leadTimeCd', header: 'Lead time' , width: '50px' },
      { field: 'stock', header: 'Stock' , width: '50px' },
      { field: 'outl', header: 'Outl', width: '50px'  },
      { field: 'iop', header: 'IOP', width: '50px'  },
      { field: 'estProd', header: 'Estado', width: '50px'  },
      { field: 'dWeekly', header: 'Weekly' , width: '50px' },
      { field: 'mes0', header: 'Mes 0' , width: '50px' },
      { field: 'mes1', header: 'Mes 1' , width: '50px' },
      { field: 'mes2', header: 'Mes 2' , width: '50px' },
      { field: 'analistaAsr', header: 'Analista ASR' , width: '100px' },
      { field: 'observacion', header: 'Observacion' , width: '200px' },
      { field: 'indF7', header: 'Indice F7', width: '100px'  }
  ];

    //this.listarProductosDefault(0);
    this.loading = true;
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
    this.reporteF7Service.coverage_pageNoCoberturado(pagina).subscribe(
      data => {
      this.listProductos = data['content'];
      console.log('no coberturado', this.listProductos );
      });

  }


  formatDate(date) {
    var d = new Date(date),
    month =  (d.getMonth()),
    day =  Number(d.getDate()),
    year = d.getFullYear();
    let fecha = new Date(year,month,day);
    return moment(fecha).format('YYYY-MM-DD');
}
 

  exportExcel() {
    const fecha = this.getFecha();
    const params = [];
    const pageNumber = -1;
    params.push(`page=${pageNumber}`);
    params.push(`tipoReporte=${TypeReporte.NO_COBERTURADO}`);
  
    if (this.tipoCoberturaSelected.code != '0') {
      params.push(`indice=${this.tipoCoberturaSelected.name}`);
  
    }

    if (this.filtroSelected.code == '1') {
        params.push(`codLocal=${this.inputFilter1}`);
    }
    if (this.filtroSelected.code == '2') {
        params.push(`codProd=${this.inputFilter1}`);
    }

    if (this.filtroSelected.code == '3') {
        params.push(`codLocal=${this.inputFilter1}`);
        params.push(`codProd=${this.inputFilter2}`);
    }

    if (this.filtroSelected.code == '5') {
        params.push(`jerarquia1=${this.filterCombo1Selected.name}`);
    }

    if (this.filtroSelected.code == '6') {
        params.push(`codLocal=${this.inputFilter1}`);
        params.push(`jerarquia1=${this.filterCombo2Selected.name}`);
    }

    if (this.filtroSelected.code == '8') {
        params.push(`codSap=${this.inputFilter1}`);

    }

    if (this.filtroSelected.code == '9') {
        params.push(`tipoGrupo=${this.inputFilter1}`);
    }

    if (this.filtroSelected.code == '10') {
        params.push(`jerarquia2=${this.filterCombo1Selected.name}`);
        params.push(`jerarquia3=${this.filterCombo2Selected.name}`);

    }

    if (this.filtroSelected.code == '11') {
        params.push(`analista=${this.inputFilter1}`);
    }
    this.reporteF7Service.exportToExcel(params.join('&'), fecha);

  }

  openImport() {
    this.display = true;
  }

  resetAndRefreshTable() {
    this.tabla.reset();
    this.refreshTable();
  }

  refreshTable() {
      this.tabla.reset();
      if (this.lastLazyLoadEvent) {
          this.buscarProductosXFiltros(this.lastLazyLoadEvent);
      }
  }

  createListProducts(data){
    let arrayProduct = [];
    for(let i= 0; i < data.length;i++){
    let product =  data[i];
    product.fecha = this.formatDate(data[i].fecha);
    arrayProduct.push(product);
    }
    return arrayProduct;
   }

  buscarProductosXFiltros(event: LazyLoadEvent) {
    this.loading = true;
    this.lastLazyLoadEvent = event;
    const pageNumber = event.first / this.perPage;
    const params = [];

    params.push(`tipoReporte=${TypeReporte.NO_COBERTURADO}`);
    params.push(`page=${pageNumber}`);

   
    if (this.tipoCoberturaSelected.code != '0') {
      params.push(`indice=${this.tipoCoberturaSelected.name}`);
  
    }
    

    if (this.filtroSelected.code == '1') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == ''){
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de local', 
        detail: ''});
      } else {
        params.push(`codLocal=${this.inputFilter1}`);

      }

    }
    if (this.filtroSelected.code == '2') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código de producto', 
        detail: ''});
      } else {

        params.push(`codProd=${this.inputFilter1}`);
 
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
        params.push(`codLocal=${this.inputFilter1}`);
        params.push(`codProd=${this.inputFilter2}`);
   
      }

    }

    if (this.filtroSelected.code == '5') {

        if (this.filterCombo1Selected== undefined || this.filterCombo1Selected.code=='0') {
          this.messageService.add({key: 'msg', severity: 'info', summary: 'Seleccione linea de Producto', 
          detail: ''});
          } else {
            params.push(`jerarquia1=${this.filterCombo1Selected.name}`);

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
        params.push(`codLocal=${this.inputFilter1}`);
        params.push(`jerarquia1=${this.filterCombo2Selected.name}`);
    
      }
    }

    if (this.filtroSelected.code == '8') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar código SAP', 
        detail: ''});
      } else{
        params.push(`codSap=${this.inputFilter1}`);
    
      }
    }

    if (this.filtroSelected.code == '9') {

      if (this.filterCombo1Selected== undefined && this.filterCombo2Selected == undefined) {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Seleccionar filtros', 
        detail: 'Ingrese un grupo'});

      } else {
        params.push(`tipoGrupo=${this.inputFilter1}`);

      }
    }

    if (this.filtroSelected.code == '10') {

      if (this.filterCombo1Selected== undefined && this.filterCombo2Selected == undefined) {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Seleccionar filtros', 
        detail: 'Seleccione al menos una jerarquia'});

      } else {
        params.push(`jerarquia2=${this.filterCombo1Selected.name}`);
        params.push(`jerarquia3=${this.filterCombo2Selected.name}`);

      }
    }

    if (this.filtroSelected.code == '11') {
      if (this.inputFilter1 == undefined || this.inputFilter1.trim() == '') {
        this.messageService.add({key: 'msg', severity: 'info', summary: 'Ingresar nombre Analista ASR', 
        detail: ''});
      } else {
        params.push(`analista=${this.inputFilter1}`);
      }

    }

      this.reporteF7Service.findByFilter(params.join('&')).subscribe(
        data => {
          console.log(data);
          this.datasource = this.createListProducts(data['content']);
          
          this.totalRecords = data['totalElements'];
      
        });

     
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

  getFecha() {
    const dateCurrent = new Date();
    const anioCurrent = dateCurrent.getFullYear();

    let monthCurrent: any = dateCurrent.getMonth() + 1;
    if (monthCurrent < 10) {
      monthCurrent = `0${monthCurrent}`;
    }
    const dayCurrent = dateCurrent.getDate();
    const hourCurrent = dateCurrent.getHours();
    const minuteCurrent = dateCurrent.getMinutes();
    const secondCurrent = dateCurrent.getSeconds();
    const dateFormatString = `${anioCurrent}-${monthCurrent}-${dayCurrent} ${hourCurrent}:${minuteCurrent}:${secondCurrent}`;

    return dateFormatString;
  }
}
