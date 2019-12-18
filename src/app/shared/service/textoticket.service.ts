import {throwError as observableThrowError, Observable} from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TextoTicket } from '../model/textoticket.model';
import { timeoutWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextoticketService {

  private baseUrl: string;

  constructor( private http: HttpClient ) {
    this.baseUrl = `${environment.END_POINT}textoTicket/`;
  }

  save(t: TextoTicket): Observable<TextoTicket> {
    return this.http.post<TextoTicket>(`${this.baseUrl}save`, t).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

}
