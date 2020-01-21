
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { User } from '../model/User.model';
import { UserPerfil } from '../model/UserPerfil';

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

  getById(id: number){
    return this.http.get(this.baseUrl + 'findById/'+id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }
  
  update(o: UserPerfil) {
    console.log("USUARIO UPDATE : ", o);
    return this.http.post<any>(this.baseUrl + 'update',  o).
    toPromise().then(res => res).then(data => data);
  }

  create(o: UserPerfil) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: User) {
    if (o.id == undefined) {
      console.log('creando');
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      console.log('modificando');
      return this.http.put(this.baseUrl + 'update', o);
    }
  }



  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  getFindByEmail(data) {
    return this.http.get<any>(this.baseUrl + 'getUsers/'+data).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

}
