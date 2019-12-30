import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ReporteF7} from '../model/reporteF7.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {environment} from '../shared/environments/environment;
import {timeoutWith} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReporteF7Service {

    constructor(private http: HttpClient) {
    }

    baseUrl: string = environment.END_POINT + 'reporteF7/';

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

      coverage_page(pagina: number, tipoCobertura: string): Observable<any> {
        return this.http.get(this.baseUrl + 'coverage/' + tipoCobertura + '/page/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosCoverage(pagina) {
        return this.http.get(this.baseUrl + 'coverage/page/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodLocal(pagina, indiceAprobacion, codLocal) {
        return this.http.get(this.baseUrl + 'coverage/cod_local/' + indiceAprobacion + '/' + codLocal + '/'  + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodProd(pagina, indiceAprobacion, codProducto) {
        return this.http.get(this.baseUrl + 'coverage/cod_prod/' + indiceAprobacion + '/' + codProducto + '/'  + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodLocalCodProducto(pagina, indiceAprobacion, codLocal, codProducto) {
        return this.http.get(this.baseUrl + 'coverage/local_prod/' + indiceAprobacion + '/' + codLocal + '/' +
        codProducto + '/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }


      listarProductosByDescLinea(pagina, indiceAprobacion, desLinea) {
        return this.http.get(this.baseUrl + 'coverage/des_linea/' + indiceAprobacion + '/' + desLinea + '/page/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodLocalDescLinea(pagina, indiceAprobacion, codLocal, desLinea) {
        return this.http.get(this.baseUrl + 'coverage/local_deslinea/' + indiceAprobacion + '/' + codLocal + '/' + desLinea
        + '/page/' + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosByCodProdSap(pagina, indiceAprobacion, codProductoSap) {
        return this.http.get(this.baseUrl + 'coverage/cod_sap/' + indiceAprobacion + '/' + codProductoSap + '/'  + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      listarProductosBySnalistaAsr(pagina, indiceAprobacion, analistaAsr) {
        return this.http.get(this.baseUrl + 'coverage/analista_asr/' + indiceAprobacion + '/' + analistaAsr + '/'  + pagina).pipe(
          timeoutWith(environment.TIMEOUT, observableThrowError(
            new Error('Tiempo de respuesta excedido, intente nuevamente'))));
      }

      exportToExcelDefault(params, pagina) {
       // this.baseUrl + 'coverage/page/' + pagina
        this.http.get(`${this.baseUrl}coverage/page/` + pagina, {responseType: 'blob'}).subscribe(data => {
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

    exportToExcelTipoCobertura(params, pagina) {
      // this.baseUrl + 'coverage/' + tipoCobertura + '/page/' + pagina
       this.http.get(this.baseUrl + 'coverage/' + params + '/page/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

   exportToExcelCodLocal(params, pagina) {
    // this.baseUrl + 'coverage/cod_local/' + indiceAprobacion + '/' + codLocal + '/'  + pagina
     this.http.get(this.baseUrl + 'coverage/cod_local/' + params + '/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

  exportToExcelCodProducto(params, pagina) {
    // "/coverage/cod_prod/{ind_cobertura}/{cod_prod}/{page}")
    this.http.get(this.baseUrl + 'coverage/cod_prod/' + params + '/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

  exportToExcelCodLocalProducto(params, pagina) {
    // coverage/local_prod/{ind_cobertura}/{cod_local}/{cod_prod}/{page}")
    this.http.get(this.baseUrl + 'coverage/local_prod/' + params + '/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

  exportToExcelDescripcionLinea(params, pagina) {
    // /coverage/des_linea/{ind_cobertura}/{des_linea}/page/{page}")
    this.http.get(this.baseUrl + 'coverage/des_linea/' + params + '/page/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

  exportToExcelCodLocalDescLinea(params, pagina) {
    // coverage/local_deslinea/{ind_cobertura}/{cod_local}/{des_linea}/page/{page}")
    this.http.get(this.baseUrl + 'coverage/local_deslinea/' + params + '/page/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

  exportToExcelCodSapProducto(params, pagina) {
    // coverage/cod_sap/{ind_cobertura}/{cod_sap}/{page}")
    this.http.get(this.baseUrl + 'coverage/cod_sap/' + params + '/' + pagina, {responseType: 'blob'}).subscribe(data => {
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

  exportToExcelAnalistaAsr(params, pagina) {
    // /coverage/analista_asr/{ind_cobertura}/{analista_asr}/{page}")
    this.http.get(this.baseUrl + 'coverage/analista_asr/' + params + '/' + pagina, {responseType: 'blob'}).subscribe(data => {
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
    return this.http.post<any>(`${this.baseUrl}/products/import`, formData);
}
}