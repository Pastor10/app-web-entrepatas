import { Component } from '@angular/core';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { LocalStorageService } from '../../../shared/service/localstorage.service';
import { AlertService } from 'ngx-alerts';
import { Oficina } from '../../../shared/model/oficina.model';
import { LoginResponse } from '../../../shared/model/loginResponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-texto-ticket-monitor-detalle',
  templateUrl: './texto-ticket-monitor-detalle.component.html'
})
export class TextoTicketMonitorDetalleComponent {
  listOficinas: Oficina[];
  valueInput: string;
  viewLoading: boolean;

  constructor(
    public router: Router,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    public alertService: AlertService
  ) {
    this.valueInput = '';
    this.viewLoading = true;
    const loginResponse: LoginResponse = this.localStorageService.get(
      'userLogin'
    );
    this.usuarioService.getById(loginResponse.user.id).subscribe(
      usuario => {
        if (usuario.oficinas.length > 1) {
          this.listOficinas = usuario.oficinas;
        } else if (usuario.oficinas.length == 1) {
          this.loadEdit(usuario.oficinas[0].idOficina);
        }
        this.viewLoading = false;
      },
      error => {
        this.listOficinas = [];
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
        this.viewLoading = false;
      }
    );
  }

  public lista(): Oficina[] {
    if (this.listOficinas) {
      return this.listOficinas.filter(of => {
        return of.nombre
          .toLocaleLowerCase()
          .includes(this.valueInput.toLowerCase());
      });
    } else {
      return [];
    }
  }

  public loadEdit(id: number): void {
    this.router.navigate(['/main/monitor/texto-ticket/editar', id]);
  }
}
