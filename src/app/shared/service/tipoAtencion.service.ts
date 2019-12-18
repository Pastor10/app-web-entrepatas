
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {TipoAtencion} from '../model/tipoAtencion.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TipoAtencionService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'tipoAtencion/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getByName(nombre: string) {
    return this.http.get(this.baseUrl + 'findByName/' + nombre).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  create(o: TipoAtencion) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: TipoAtencion) {
    if (o.idTipoAtencion == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: TipoAtencion) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

}
