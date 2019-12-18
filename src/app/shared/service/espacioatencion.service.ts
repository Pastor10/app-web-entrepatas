
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EspacioAtencionService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'espacioAtencion/';

  findAll() {
    return this.http.get(this.baseUrl + 'findAll/').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }
}
