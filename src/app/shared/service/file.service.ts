
import {throwError as observableThrowError, Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class FileService {
  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.END_POINT + 'api/file/';

  uploadImage(formData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}upload`, formData);
}

}
