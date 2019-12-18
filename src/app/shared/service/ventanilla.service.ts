
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Ventanilla} from '../model/ventanilla.model';
import {HttpClient} from '@angular/common/http';
import {VentanillaMonitor} from '../model/ventanillaMonitor.model';

@Injectable({
  providedIn: 'root'
})
export class VentanillaService {

  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'ventanilla/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getAllByOficina(idOficina: number) {
    return this.http.get(this.baseUrl + `findAllByOficina/${idOficina}`).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }


  findVentanillasMonitor(params: string) {
    return this.http.get(this.baseUrl + `findVentanillasMonitor?${params}`).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getByName(nombre: string) {
    return this.http.get(this.baseUrl + 'findByName/' + nombre).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  create(o: Ventanilla) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: Ventanilla) {
    if (o.idVentanilla == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: Ventanilla) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  updateVentanillaMonitor(o: VentanillaMonitor) {
    return this.http.patch<Ventanilla>(this.baseUrl + 'updateVentanillaMonitor', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getByIdForMonitor(id: number) {
    return this.http.get(this.baseUrl + 'findByIdMonitor/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }


  killSesion(idVentanilla: number) {
    return this.http.patch<Ventanilla>(this.baseUrl + `killSesion/${idVentanilla}`, null);
  }
}


