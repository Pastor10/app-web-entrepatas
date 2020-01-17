
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../model/usuario.model';

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
    return this.http.get(this.baseUrl + 'findById/'+ id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  create(data){
    return this.http.post<any>(this.baseUrl + 'create',  data).
    toPromise().then(res => res).then(data => data);
  }
  update(data){
    return this.http.post<any>(this.baseUrl + 'update',  data).
    toPromise().then(res => res).then(data => data);
  }
  delete(data){
  return this.http.get<any>(this.baseUrl + 'delete/'+data).
  toPromise().then(res => res).then(data => data);
  }


}
