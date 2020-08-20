
import { throwError as observableThrowError, Observable } from 'rxjs';

import { timeoutWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) {
  }
  baseUrl: string = environment.END_POINT + 'api/usuario/';
  //apiUserAplicacion = 'http://dev.projectmanagerws.solucionesfps.pe/user/findUserByEmailAndApp/F7-WEB';
  apiUserAplicacion = 'https://accountws.farmaciasperuanas.pe/user/findUserByEmailAndApp/F7-WEB';


  listarUsuariosAplicacion() {
    return this.http.get(this.apiUserAplicacion).
      pipe(timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getFindByEmail(data) {
    return this.http.get<any>(this.baseUrl + 'getUserPerfil/' + data).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getAllIntegrantes() {
    return this.http.get(this.baseUrl + 'integrantes').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getUserId(id) {
    return this.http.get(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }


  save(o: User) {
    if (o.id == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }


  public saveVisitante(o: User) {
    return this.http.post(this.baseUrl + 'create-visitante', o).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  update(o: User) {
    return this.http.put(this.baseUrl + 'update', o).
      toPromise().then(res => res).then(data => data).catch(err => console.log(err));

  }

  delete(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

}
