import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ReporteF7} from '../model/reporteF7.model';
import {HttpClient} from '@angular/common/http';
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
}