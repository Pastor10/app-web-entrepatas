
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Local } from '../model/local.model';
import { Publicacion } from '../model/publicacion.model';

@Injectable()
export class PublicacionService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/publicacion/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getAllAprobados() {
    return this.http.get(this.baseUrl + 'findAllAprobadas').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getFindById(id) {
    return this.http.get(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getAllFindById(id) {
    return this.http.get(this.baseUrl + 'findAllById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  save(o: Publicacion) {
    if (o.id == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

}