
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cuestionario } from '../model/cuestionario.model';

@Injectable()
export class CuestionarioService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/cuestionario/';

  save(o: Cuestionario) {
    if (o.id == undefined) {
      return this.http.post(this.baseUrl + 'create', o);
    } else {
      return this.http.put(this.baseUrl + 'update', o);
    }


  }

}