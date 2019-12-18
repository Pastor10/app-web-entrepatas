
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {TipoTicket} from '../model/tipoTicket.model';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../model/ticket.model';

@Injectable()
export class TicketService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'ticket/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll')/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }


  create(o: TipoTicket) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  findTicketsMonitor(idOficina) {
    return this.http.get<Ticket[]>(this.baseUrl + `findTicketsMonitor/${idOficina}`)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

  priorizar(idTicket) {
    return this.http.patch<Ticket[]>(this.baseUrl + `priorizar/${idTicket}`, null)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

  activar(idTicket) {
    return this.http.patch<Ticket[]>(this.baseUrl + `activar/${idTicket}`, null)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

  despriorizar(idTicket) {
    return this.http.patch<Ticket[]>(this.baseUrl + `despriorizar/${idTicket}`, null)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

  depurar(idTicket) {
    return this.http.patch<Ticket[]>(this.baseUrl + `depurar/${idTicket}`, null)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

  eliminar(idTicket) {
    return this.http.patch<Ticket[]>(this.baseUrl + `eliminar/${idTicket}`, null)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

  findByCodigoImpresionLike(codigoImpresion) {
    return this.http.get<Ticket[]>(this.baseUrl + `findByCodigoImpresionLike/${codigoImpresion}`)/*.pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))))*/;
  }

}
