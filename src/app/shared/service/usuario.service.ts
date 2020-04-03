
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { UserPerfil } from '../model/UserPerfil';
import { User } from '../model/User.model';


@Injectable()
export class UsuarioService {
  constructor(private http: HttpClient) {
  }
  baseUrl: string = environment.END_POINT + 'api/user/';
  //apiUserAplicacion = 'http://dev.projectmanagerws.solucionesfps.pe/user/findUserByEmailAndApp/F7-WEB';
  apiUserAplicacion = 'https://accountws.farmaciasperuanas.pe/user/findUserByEmailAndApp/F7-WEB';


  listarUsuariosAplicacion() {
    return this.http.get(this.apiUserAplicacion).
    pipe(timeoutWith(environment.TIMEOUT, observableThrowError(
          new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getFindByEmail(data) {
    return this.http.get<any>(this.baseUrl + 'getUserPerfil/'+ data).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'getUsers').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }


  save(o: User) {
      return this.http.post(this.baseUrl + 'create', o).
      toPromise().then(res => res).then(data => data).catch(err => console.log(err));
    
  }

  update(o: User) {
    return this.http.post(this.baseUrl + 'update', o).
    toPromise().then(res => res).then(data => data).catch(err => console.log(err)) ;
  
}

  delete(id) {
  return this.http.get(this.baseUrl + 'delete/' + id);
}

}
