
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Adopcion } from '../model/adopcion.model';

@Injectable()
export class AdopcionService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/adopcion/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getAllDevoluciones() {
    return this.http.get(this.baseUrl + 'findAllDevoluciones').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getFindId(id) {
    return this.http.get(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  save(o: Adopcion) {
    if (o.id == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

}