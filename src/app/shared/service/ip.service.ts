import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { timeoutWith } from 'rxjs/operators';
import {throwError as observableThrowError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService  {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.END_POINT + 'api/reporteF7/';

  public getIPAddress() {
    return this.http.get(this.baseUrl + 'getIpAddress', { responseType: 'text' });
  }
}