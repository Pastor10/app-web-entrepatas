
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Oficina} from '../model/oficina.model';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {DatoTicketsOficina} from '../model/datoTicketsOficina.model';

@Injectable()
export class OficinaService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'oficina/';

  baseUrlScheduling: string = environment.END_POINT + 'scheduling/';

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

  getById(id: number): Observable<Oficina> {
    return this.http.get<Oficina>(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  create(o: Oficina) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: Oficina) {
    if (!o.idOficina) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: Oficina) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }


  registrarScheduling(o: Oficina) {
    return this.http.post(this.baseUrlScheduling + 'scheduleSincronizacion', o);
  }

  getDatoTickets(idOficina: number) {
    return this.http.get<DatoTicketsOficina>(this.baseUrl + `datoTickets/${idOficina}`);
  }

  sincronizarVideos(o: Oficina) {
    return this.http.post(this.baseUrl + 'sincronizarVideos', o);
  }

}
