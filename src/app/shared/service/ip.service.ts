import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService  {

  constructor(private http: HttpClient) { }
  public getIPAddress() {
    return of("192.168.1.23");
    //return this.http.get("http://api.ipify.org/?format=json");
  }
}