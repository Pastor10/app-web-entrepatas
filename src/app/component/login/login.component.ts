import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';

//import {AlertService} from 'ngx-alerts';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LoginResponse } from 'src/app/shared/model/loginResponse.model';
import { LocalStorageService } from 'src/app/shared/service/localstorage.service';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { User } from 'src/app/shared/model/User.model';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { Persona } from 'src/app/shared/model/persona.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public router: Router,
    public messageService: MessageService,
    public authenticationService: AuthService, public tipoDocumentoService: TipoDocumentoService,
    public localStorageService: LocalStorageService, public usuarioService: UsuarioService) {
  }

  public username: string;
  public password: string;
  loginResponse: LoginResponse;
  public state: boolean;
  public apPaterno: string;
  public apMaterno: string;
  public userCrea: string;
  public passwordCrea: string;
  public repetPassword: string;
  public nombres: string;
  public data = new User();
  public perfil: Perfil;
  public persona: Persona;
  listTipoDocumento: TipoDocumento[];
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  correo: string;
  correoRepite: string;

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.getAllTipoDocumento();

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
        if (this.state) {
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
  getUser(email) {
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
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );
    return JSON.parse(jsonPayload);
  }


  formToModel() {

    this.persona = new Persona();
    this.persona.nombre = this.nombres;
    this.persona.apePaterno = this.apPaterno;
    this.persona.apeMaterno = this.apMaterno;
    this.persona.nombreCompleto = this.nombres + ' ' + this.apPaterno + ' ' + this.apMaterno;
    this.persona.tipoDocumento = this.tipoDocumento;
    this.persona.numeroDocumento = this.numeroDocumento;
    this.persona.correo= this.correo;

    this.data.username = this.correo;
    this.data.password = this.numeroDocumento;

    this.data.persona = this.persona;
    console.log(this.data);


  }


  getAllTipoDocumento() {
    this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
      this.listTipoDocumento = data;
    });
  }



  limpiarData() {
    this.nombres = '';
    this.apMaterno = '';
    this.apPaterno = '';
    this.userCrea = '';
    this.passwordCrea = '';
    this.repetPassword = '';

  }

  save() {
    let message;
    this.formToModel();
    if(this.correo!= this.correoRepite){
      message = 'Los correos ingresados no coinciden';
      this.showMsg('info', message, 'Usuario');
      return;
    }
    this.usuarioService.saveVisitante(this.data).subscribe((res) => {
      if (res != null) {
        message = 'Usuario creado correctamente.';
        this.showMsg('success', message, 'Usuario');
        this.limpiarData();
      }
    }, error => {
      const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
      this.showMsg('error', errorMessage, 'Usuario');

    });
  }

  public login() {
    if (!this.username || !this.password) {
      this.showMsg('info', 'Ingrese su usuario y password', 'Usuario');
      // this.alertService.warning('Ingrese su usuario y password');
    } else {
      this.authenticationService.login(this.username, this.password).subscribe(
        data => {
          if(data!=null){
            this.loginResponse = new LoginResponse();
            this.loginResponse = <LoginResponse>data;
  
            this.localStorageService.set('userLogin', data);
            this.router.navigate(['/main']);
          }
       

        },
        error => {
          if (error.status == 401) {
            this.showMsg('error', 'Usuario y/o password incorrectos', 'Usuario');

          } else {
            const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
            this.showMsg('error', errorMessage, 'Usuario');
            // this.alertService.danger(errorMessage);
          }
        });
    }
  }

  showMsg(type: string, msg: string, title: string) {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }
}
