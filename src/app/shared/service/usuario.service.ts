
import {throwError as observableThrowError, Observable} from 'rxjs';

import {timeoutWith} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { UserPerfil } from '../model/UserPerfil';
import { User } from '../model/User.model';


@Injectable()
export class UsuarioService {
  constructor(private http: HttpClient) {
  }


}
