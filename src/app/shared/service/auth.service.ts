
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {LocalStorageService} from './localstorage.service';
import {LoginResponse} from '../model/loginResponse.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  public loginResponse: LoginResponse;

  constructor(private http: HttpClient, public localStorageService: LocalStorageService) {
  }

  baseUrl: string = environment.END_POINT + 'api/login-ad';

  public login(username: string, password: string) {
    return this.http.post(this.baseUrl, {username: username, password: password}).pipe(
      timeoutWith(environment.TIMEOUT, observableThrowError(
        new Error(environment.MESSAGE_TIMEOUT))));
  }
  
	public getToken(): string {
		let token = JSON.parse(localStorage.getItem('token'));
		if (!token) {
			return;
		}
		return token
  }
  /*
  public getToken(): string {
    this.loginResponse = new LoginResponse();
    this.loginResponse = this.localStorageService.get('userLogin');
    if (this.loginResponse) {
      return this.loginResponse.tokenType + ' ' + this.loginResponse.accessToken;
    } else {
      return '';
    }
  }
*/
}
