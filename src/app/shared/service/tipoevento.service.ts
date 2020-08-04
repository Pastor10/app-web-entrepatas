
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { TipoEvento } from '../model/tipoevento.model';

@Injectable()
export class TipoEventoService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/tipoEvento/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
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


  save(o :TipoEvento) {
    const formData = new FormData()
    formData.append('id', o.id==null?'0':o.id.toString());
    formData.append('file', o.file);
    formData.append('nombre', o.nombre);

    //return this.http.get<any>(`${this.baseUrl}/create?${params}`);
    if (o.id == undefined) {
      return this.http.post(this.baseUrl + 'create', formData);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

}
