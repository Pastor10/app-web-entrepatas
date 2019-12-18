
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {PesoTipoTicket} from '../model/pesoTipoTicket.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PesoTipoTicketService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'pesoTipoTicket/';

  getAll() {
    return this.http.get(this.baseUrl + 'findAll').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + 'findById/' + id).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  create(o: PesoTipoTicket) {
    return this.http.post(this.baseUrl + 'create', o);
  }

  save(o: PesoTipoTicket) {
    if (o.idPesoTipoTicket == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }
  }

  update(o: PesoTipoTicket) {
    return this.http.put(this.baseUrl + 'update', o);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  getAllByIdPeso(idPeso: number) {
    return this.http.get(this.baseUrl + `findAllByIdPeso/${idPeso}`).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error('Tiempo de respuesta excedido, intente nuevamente'))));
  }

  updatePesoTipoTicket(o: PesoTipoTicket[]) {
      return this.http.put(this.baseUrl + 'updatePesoTipoTicket', o);
  }
}
