
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ReporteService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/reporte/';

  getPublicaciones() {
    return this.http.get(this.baseUrl + 'publicaciones').pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }


}
