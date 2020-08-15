
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Cuestionario } from '../model/cuestionario.model';

@Injectable()
export class CuestionarioService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/cuestionario/';

  save(o: Cuestionario[]) {
      return this.http.post(this.baseUrl + 'create', o);
   
  }

}