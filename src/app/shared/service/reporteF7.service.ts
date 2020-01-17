import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ReporteF7} from '../model/reporteF7.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {environment} from '../shared/environments/environment;
import {timeoutWith} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReporteF7Service {
  public apiUrl: string;

    constructor(private http: HttpClient) {
    }

    baseUrl: string = environment.END_POINT + 'api/reporteF7/';


    listarGrupoProductoERP() {
        return this.http.get(this.baseUrl + 'listarGrupoProductoERP').pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

    listarGrupoAnatomico() {
        return this.http.get(this.baseUrl + 'listarGrupoAnatomico').pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      coverage_page(pagina: number, tipoCobertura: string, tipoReporte): Observable<any> {
        return this.http.get(this.baseUrl + 'coverage/' + tipoCobertura + '/page/' + pagina + '/'
         + tipoReporte).pipe(timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      coverage_pageNoCoberturado(pagina: number): Observable<any> {
        return this.http.get(this.baseUrl + 'coverage/nocoberturado/page/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosCoverage(pagina) {
        return this.http.get(this.baseUrl + 'coverage/page/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodLocal(pagina, indiceAprobacion, codLocal, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/cod_local/' + indiceAprobacion + '/' + codLocal + '/'  
        + pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodProd(pagina, indiceAprobacion, codProducto, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/cod_prod/' + indiceAprobacion + '/' + codProducto + '/' 
         + pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodLocalCodProducto(pagina, indiceAprobacion, codLocal, codProducto, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/local_prod/' + indiceAprobacion + '/' + codLocal + '/' +
        codProducto + '/' + pagina + '/'  + typeReporte ).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }


      listarProductosByDescLinea(pagina, indiceAprobacion, desLinea, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/des_linea/' + indiceAprobacion + '/' + desLinea + '/page/' +
         pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodLocalDescLinea(pagina, indiceAprobacion, codLocal, desLinea, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/local_deslinea/' + indiceAprobacion + '/' + codLocal + '/' + desLinea
        + '/page/' + pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodProdSap(pagina, indiceAprobacion, codProductoSap, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/cod_sap/' + indiceAprobacion + '/' + codProductoSap + '/'  
        + pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosBySnalistaAsr(pagina, indiceAprobacion, analistaAsr, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/analista_asr/' + indiceAprobacion + '/' + analistaAsr
         + '/'  + pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByJerarquias(pagina, indiceAprobacion, productoERP, grupoAnatomico, typeReporte) {
        return this.http.get(this.baseUrl + 'coverage/jerarquias/' + indiceAprobacion + '/' + productoERP + '/'
         + grupoAnatomico + '/' + pagina + '/'  + typeReporte).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      exportToExcelDefault(params, pagina, fecha) {
        this.http.get(`${this.baseUrl}coverage/page/` + pagina, {responseType: 'blob'}).subscribe(data => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const blob = new Blob([data], {type: 'octet/stream'});
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = `ReporteF7_${fecha}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    exportToExcelTipoCobertura(params, pagina, typeReporte) {
       this.http.get(this.baseUrl + 'coverage/' + params + '/page/' + pagina + '/' + typeReporte,
        {responseType: 'blob'}).subscribe(data => {
           const a = document.createElement('a');
           document.body.appendChild(a);
           const blob = new Blob([data], {type: 'octet/stream'});
           const url = window.URL.createObjectURL(blob);
           a.href = url;
           a.download = 'reporte-f7.xlsx';
           a.click();
           window.URL.revokeObjectURL(url);
       });
   }

   exportToExcelCodLocal(params) {
     this.http.get(this.baseUrl + 'coverage/cod_local/' + params , {responseType: 'blob'}).subscribe(data => {
         const a = document.createElement('a');
         document.body.appendChild(a);
         const blob = new Blob([data], {type: 'octet/stream'});
         const url = window.URL.createObjectURL(blob);
         a.href = url;
         a.download = 'reporte-f7.xlsx';
         a.click();
         window.URL.revokeObjectURL(url);
     });
 }

  exportToExcelCodProducto(params) {
    this.http.get(this.baseUrl + 'coverage/cod_prod/' + params , {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  exportToExcelCodLocalProducto(params) {
    this.http.get(this.baseUrl + 'coverage/local_prod/' + params , {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  exportToExcelDescripcionLinea(params, pagina, typeReporte) {
    this.http.get(this.baseUrl + 'coverage/des_linea/' + params + '/page/' + pagina
    + '/' + typeReporte, {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  exportToExcelCodLocalDescLinea(params, pagina, typeReporte) {
    this.http.get(this.baseUrl + 'coverage/local_deslinea/' + params + '/page/' + pagina
    + '/' + typeReporte, {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  exportToExcelCodSapProducto(params) {
    this.http.get(this.baseUrl + 'coverage/cod_sap/' + params, {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  exportToExcelJerarquias(params) {
    this.http.get(this.baseUrl + 'coverage/jerarquias/' + params, {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  exportToExcelAnalistaAsr(params) {
    this.http.get(this.baseUrl + 'coverage/analista_asr/' + params, {responseType: 'blob'}).subscribe(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: 'octet/stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'reporte-f7.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }

  importFromExcel(formData): Observable<any> {
    console.log(`${this.baseUrl}importarExcel/`, formData);
    //return this.http.post<any>(this.baseUrl + 'importarExcel/' + formData + params);
    return this.http.post<any>(`${this.baseUrl}importarExcel/`, formData);
}
}