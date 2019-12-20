import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ReporteF7} from '../model/reporteF7.model';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {timeoutWith} from 'rxjs/operators';

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
}