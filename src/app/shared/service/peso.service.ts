
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Peso} from '../model/peso.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PesoService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'peso/';

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

  create(o: Peso) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: Peso) {
    if (o.idPeso == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: Peso) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  getfindByPesoidOficina(id:number) {
    return this.http.get(this.baseUrl + 'findByidOfcina/'+id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

}
