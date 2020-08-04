
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Perfil } from '../model/perfil.model';
import { TipoLocal } from '../model/tipolocal.model';
import { Ubigeo } from '../model/ubigeo.model';

@Injectable()
export class UbigeoService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/ubigeo/';

  getAll() {
    return this.http.get(this.baseUrl + 'city').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }

  findCity(filter): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(`${this.baseUrl}city?filter=${filter}`);
}

getCity(params): Observable<Ubigeo> {
  return this.http.get<Ubigeo>(`${this.baseUrl}getCity?${params}`);
}


}
