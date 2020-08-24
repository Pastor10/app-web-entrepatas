import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, Input, ElementRef } from '@angular/core';

//import {AlertService} from 'ngx-alerts';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LoginResponse } from 'src/app/shared/model/loginResponse.model';
import { LocalStorageService } from 'src/app/shared/service/localstorage.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { User } from 'src/app/shared/model/User.model';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { Persona } from 'src/app/shared/model/persona.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';
import { PersonaService } from 'src/app/shared/service/persona.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public router: Router, 
    public messageService: MessageService,
    public authenticationService: AuthService, public tipoDocumentoService: TipoDocumentoService,
    public localStorageService: LocalStorageService, public usuarioService: UsuarioService, public personaService: PersonaService) {
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
  display: boolean = false
  politica: boolean = false;

  public numberMask = createNumberMask({
		prefix: '',
		suffix: '',
		includeThousandsSeparator: true,
		thousandsSeparatorSymbol: '',
		allowDecimal: false,
		decimalSymbol: '.',
		decimalLimit: 1,
		integerLimit: 12,
		requireDecimal: false,
		allowNegative: false,
		allowLeadingZeroes: true
	});

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
    this.persona.correo = this.correo;
    this.data.username = this.numeroDocumento;
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
    this.correo = '';
    this.correoRepite = '';
    this.numeroDocumento='';
    this.tipoDocumento=null;
  }

  limpiarDataBusqueda() {
    this.nombres = '';
    this.apMaterno = '';
    this.apPaterno = '';
    this.userCrea = '';
    this.correo = '';
    this.correoRepite = '';

  }

  save() {
    let message;

    if (this.tipoDocumento == undefined) {
      message = 'Seleccione tipo documento';
      this.showMsg('info', message, 'Usuario');
      return;
    }

    if (this.numeroDocumento== null || this.numeroDocumento == '') {
      message = 'Escriba número documento';
      this.showMsg('info', message, 'Usuario');
      return;
    }

    if (this.nombres == null || this.nombres == '') {
      message = 'Escriba su nombre';
      this.showMsg('info', message, 'Usuario');
      return;
    }


    if (this.apPaterno == null || this.apPaterno == '') {
      message = 'Escriba apellido paterno';
      this.showMsg('info', message, 'Usuario');
      return;
    }

    if (this.apMaterno == null || this.apMaterno == '') {
      message = 'Escriba apellido materno';
      this.showMsg('info', message, 'Usuario');
      return;
    }

    if (this.correo == null || this.correo == '') {
      message = 'Escriba un correo ';
      this.showMsg('info', message, 'Usuario');
      return;
    }
   
    if (this.correo != this.correoRepite) {
      message = 'Los correos ingresados no coinciden';
      this.showMsg('info', message, 'Usuario');
      return;
    }

    if (!this.politica) {
      message = 'Lea la politica de privacidad y marque en el cuadro de aceptación';
      this.showMsg('info', message, 'Usuario');
      return;
    }
    this.formToModel();
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
      this.authenticationService.login(this.username.trim(), this.password.trim()).subscribe(
        data => {
          if (data != null) {
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

  public filterListTipoDocumento(event) {
    let query = event.query
    this.listTipoDocumento = this.filterDocumento(query, this.listTipoDocumento);

}

filterDocumento(query, lista: TipoDocumento[]): TipoDocumento[] {
    let filtered: TipoDocumento[] = [];
    for (let i = 0; i < lista.length; i++) {
        let model = lista[i];
        if (model.abreviatura.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(model);
        }
    }
    return filtered;
}

  getPersona() {
    
    const params = [
      `documento=${this.numeroDocumento}`
    ];
    this.personaService.getByDocumento(params.join('&')).subscribe(
      data => {
        if (data != null) {
          this.modelToForm(data);

        }
      }, error => {
        const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
        // this.showMsg('error', errorMessage, 'Solicitud');
        console.log('error', errorMessage);
        this.limpiarDataBusqueda();

      }
    );

  }


  modelToForm(data) {

    this.nombres = data.nombre;
    this.apMaterno = data.apeMaterno
    this.apPaterno = data.apePaterno
    this.correo = data.correo;
    this.correoRepite = data.correo;
    this.numeroDocumento = data.numeroDocumento;
    this.tipoDocumento = data.tipoDocumento;
    console.log(this.data);

  }

   soloLetras(e) {
    var tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    var patron = /[A-Za-z ]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

  showMsg(type: string, msg: string, title: string) {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }

  showPolitica(){
    this.display = true;
  }
}
