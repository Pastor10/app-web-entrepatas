
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { User } from '../model/User.model';

@Injectable()
export class UsuarioPerfilService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/usuarioPerfil/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'getUsers').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

}
