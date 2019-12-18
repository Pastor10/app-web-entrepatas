
import {throwError as observableThrowError} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ListaVideo} from '../model/listavideo.model';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ListaVideoService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'listaVideo/';

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

  create(o: ListaVideo) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: ListaVideo) {
    if (o.idListaVideos == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: ListaVideo) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

}
