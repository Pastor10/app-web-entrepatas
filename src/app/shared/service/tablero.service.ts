import { throwError as observableThrowError } from 'rxjs';

import { timeoutWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableroService {
  constructor(private http: HttpClient) {}

  baseUrl: string = environment.END_POINT + 'tablero/';

  getAll() {
    return this.http
      .get(this.baseUrl + 'view')
      .pipe(
        timeoutWith(
          environment.TIMEOUT,
          observableThrowError(new Error(environment.MESSAGE_TIMEOUT))
        )
      );
  }

  getTickesEnEspera(idOficina: number) {
    return this.http
      .get(this.baseUrl + 'ticketsEnEspera/' + idOficina)
      .pipe(
        timeoutWith(
          environment.TIMEOUT,
          observableThrowError(new Error(environment.MESSAGE_TIMEOUT))
        )
      );
  }

  getTickesEnVetanilla(idOficina: number) {
    return this.http
      .get(this.baseUrl + 'ticketsEnVentanilla/' + idOficina)
      .pipe(
        timeoutWith(
          environment.TIMEOUT,
          observableThrowError(new Error(environment.MESSAGE_TIMEOUT))
        )
      );
  }
}
