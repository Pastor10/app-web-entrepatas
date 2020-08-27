
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Postulante } from '../model/postulante.model';
import { Publicacion } from '../model/publicacion.model';
import { PostulanteColaborador } from '../model/postulantecolaborador.model';

@Injectable()
export class PostulanteService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/postulante/';

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

  getAllByPublicacionId(publicacion :Publicacion) {
    return this.http.get(this.baseUrl + 'findAllPublicacion/' + publicacion.id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  save(o: Postulante) {
    if (o.id == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  saveColaborador(o: PostulanteColaborador) {
      return this.http.post(this.baseUrl + 'colaborador', o);
    
  }

}