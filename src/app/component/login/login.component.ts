import {Router} from '@angular/router';
import {AfterViewInit, Component, OnInit} from '@angular/core';

//import {AlertService} from 'ngx-alerts';
import { MessageService } from 'primeng/api';
import {AuthService} from 'src/app/shared/service/auth.service';
import {LoginResponse} from 'src/app/shared/model/loginResponse.model';
import {LocalStorageService} from 'src/app/shared/service/localstorage.service';
import {AppConstant} from 'src/app/shared/constant/app.constant';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public router: Router, 
              public messageService: MessageService,
              public authenticationService: AuthService,
              public localStorageService: LocalStorageService, public usuarioService: UsuarioService ) {
  }

  public username: string;
  public password: string;
  loginResponse: LoginResponse;
  public state: boolean;

  ngOnInit() {
    this.username = '';
    this.password = '';

    const urlPortal = new URL(window.location.href);
    const token = urlPortal.searchParams.get('token');
    
    if (token) {
      this.setAutologin(token);
      return;
      }
  }

  public ngAfterViewInit() {
    this.localStorageService.removeItem('userLogin');
  }


  private setAutologin(token) {
    token = token.replace(/[""]+/gi, '');
    const payload = this.getPayload(token);
    const pl = JSON.parse(payload.sub);
    const email = pl.email;
    //localStorage.setItem('token', token);
    localStorage.setItem('token', JSON.stringify(token));
    //this.getUser(email);
    this.usuarioService.getFindByEmail(email).subscribe(
      data => {
      this.state = data.enabled;
      if(this.state){
        this.router.navigate(['/main']);
        } else {
        
        this.router.navigate(['/login']);
        }
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        
      }
    );
    return;
  }
  getUser(email){
    this.usuarioService.getFindByEmail(email).subscribe(
      data => {
      this.state = data.enabled;
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
      }
    );
  }

  getPayload(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
    atob(base64).split('')
    .map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')
    );
    return JSON.parse(jsonPayload);
    }

  public login() {
    if (!this.username || !this.password) {
      this.showMsg('info', 'Ingrese su usuario y password', 'Usuario');
     // this.alertService.warning('Ingrese su usuario y password');
    } else {
      this.authenticationService.login(this.username, this.password).subscribe(
        data => {
          this.loginResponse = new LoginResponse();
          this.loginResponse = <LoginResponse>data;
          const tkn = AppConstant.DECODE(data["token"]);
          localStorage.setItem('token',JSON.stringify(data["token"]));
          this.router.navigate(['/main']);
        },
        error => {
          console.log('error', error);
          if (error.status == 401) {
            this.showMsg('error', 'Usuario y/o password incorrectos', 'Usuario');
           
          } else {
            const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petición. Error ' + error.status;
            this.showMsg('error', errorMessage, 'Usuario');
            // this.alertService.danger(errorMessage);
          }
        });
    }
  }

  showMsg( type: string, msg: string, title: string) {
    this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
  }
}
