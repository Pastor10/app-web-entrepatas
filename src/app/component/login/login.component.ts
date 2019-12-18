import {Router} from '@angular/router';
import {AfterViewInit, Component, OnInit} from '@angular/core';

import {AlertService} from 'ngx-alerts';
import {AuthService} from 'src/app/shared/service/auth.service';
import {LoginResponse} from 'src/app/shared/model/loginResponse.model';
import {LocalStorageService} from 'src/app/shared/service/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public router: Router, public alertService: AlertService,
              public authenticationService: AuthService,
              public localStorageService: LocalStorageService) {
  }

  /*modalFormLoginEmail = new FormControl('', Validators.email);
  modalFormLoginPassword = new FormControl('', Validators.required);
  modalFormRegisterEmail = new FormControl('', Validators.email);
  modalFormRegisterPassword = new FormControl('', Validators.required);
  modalFormRegisterRepeatPassword = new FormControl('', Validators.required);
*/
  public username: string;
  public password: string;
  loginResponse: LoginResponse;

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  public ngAfterViewInit() {
    this.localStorageService.removeItem('userLogin');
  }

  public login() {
    if (!this.username || !this.password) {
      this.alertService.warning('Ingrese su usuario y password');
    } else {
      this.authenticationService.login(this.username, this.password).subscribe(
        data => {
          this.loginResponse = new LoginResponse();
          this.loginResponse = <LoginResponse>data;
          this.localStorageService.set('userLogin', data);
          this.router.navigate(['/main']);
        },
        error => {
          console.log('error', error);
          if (error.status == 401) {
            this.alertService.warning('Usuario y/o password incorrectos');
          } else {
            const errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la petición. Error ' + error.status;
            this.alertService.danger(errorMessage);
          }
        });
    }
  }
}
