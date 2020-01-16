
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../model/usuario.model';

@Injectable()
export class UsuarioService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/usuario/';

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

  getByDni(dni: string) {
    return this.http.get(this.baseUrl + 'findByDni/' + dni).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getByName(nombre: string) {
    return this.http.get(this.baseUrl + 'findByName/' + nombre).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  create(o: Usuario) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: Usuario) {
    if (o.idUsuario == undefined) {
      console.log('creando');
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      console.log('modificando');
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: Usuario) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }
}
