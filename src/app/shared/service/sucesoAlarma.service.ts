
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {SucesoAlarma} from '../model/sucesoAlarma.model';

@Injectable()
export class SucesoAlarmaService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'sucesoAlarma/';


  findAllToday() {
    return this.http.get<SucesoAlarma[]>(this.baseUrl + 'findAllToday').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  findAllTodayByIdOficina(idOficina: number) {
    return this.http.get<SucesoAlarma[]>(this.baseUrl + `findAllToday/${idOficina}`).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }


}

