
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Perfil } from '../model/perfil.model';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/perfil/';

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

  delete(id) {
    return this.http.get(this.baseUrl + 'delete/' + id);
  }

  save(o: Perfil) {
    if (o.idPerfil == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.post(this.baseUrl + 'update', o);
    }
  }

}
