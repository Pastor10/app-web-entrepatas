
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona.model';


@Injectable()
export class PersonaService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/persona/';


  getByDocumento(params: string): Observable<Persona> {
    return this.http.get(`${this.baseUrl}findByDocumento?${params}`);
  }

  // update(persona: Persona) {
  //   return this.http.put(this.baseUrl + 'update', persona);
  // }

  update(o: Persona) {
    return this.http.put(this.baseUrl + 'update', o).
      toPromise().then(res => res).then(data => data).catch(err => console.log(err));

  }

  uploadImage(formData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}upload`, formData);
}

}
