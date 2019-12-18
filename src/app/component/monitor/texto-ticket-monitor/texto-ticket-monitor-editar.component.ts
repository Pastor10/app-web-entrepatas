import { Component } from '@angular/core';
import { TextoticketService } from '../../../shared/service/textoticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextoTicket } from '../../../shared/model/textoticket.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { environment } from '../../../../environments/environment.prod';
import { OficinaService } from '../../../shared/service/oficina.service';
import { Oficina } from '../../../shared/model/oficina.model';

@Component({
  selector: 'app-texto-ticket-monitor-editar',
  templateUrl: './texto-ticket-monitor-editar.component.html',
  styleUrls: ['./texto-ticket-monitor-editar.component.css']
})
export class TextoTicketMonitorEditarComponent {
  public viewLoading: boolean;
  public registerForm: FormGroup;
  public ofi: Oficina;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private textoticketService: TextoticketService,
    private oficinaService: OficinaService,
    private formBuilder: FormBuilder,
    public alertService: AlertService
  ) {
    this.viewLoading = false;
    this.registerForm = this.getRegisterForm(new TextoTicket());
    this.activatedRoute.params.subscribe(params => {
      this.getTextoTicket(params.id);
    });
  }

  getTextoTicket(id: number): void {
    this.viewLoading = true;
    this.oficinaService.getById(id).subscribe(
      (oficina: Oficina) => {
        this.ofi = oficina;
        if (oficina.textoTicket) {
          this.registerForm = this.getRegisterForm(oficina.textoTicket);
        }
        this.viewLoading = false;
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
        this.viewLoading = false;
      }
    );
  }

  getRegisterForm(textoTicket: TextoTicket): FormGroup {
    return this.formBuilder.group({
      idTextoTicket: textoTicket.idTextoTicket,
      imagenCabecera: [textoTicket.imagenCabecera, Validators.required],
      imagenPie: [textoTicket.imagenPie, Validators.required],
      mensajeBienvenida1: [textoTicket.mensajeBienvenida1, Validators.required],
      mensajeDespedida1: [textoTicket.mensajeDespedida1, Validators.required],
      mensajeBienvenida2: textoTicket.mensajeBienvenida2,
      mensajeDespedida2: textoTicket.mensajeDespedida2,
      fecInivigMensaje: textoTicket.fecInivigMensaje,
      fecFinvigMensaje: textoTicket.fecFinvigMensaje
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onFileChangeCabecera(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const tipoArchivo = reader.result
          .toString()
          .split(';')[0]
          .split(':')[1];
        if (
          tipoArchivo != 'image/png' &&
          tipoArchivo != 'image/gif' &&
          tipoArchivo != 'image/jpeg'
        ) {
          this.alertService.danger('imagen no válida');
        } else {
          this.registerForm.get('imagenCabecera').setValue(reader.result);
        }
      };
    }
  }

  onFileChangePie(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const tipoArchivo = reader.result
          .toString()
          .split(';')[0]
          .split(':')[1];
        if (
          tipoArchivo != 'image/png' &&
          tipoArchivo != 'image/gif' &&
          tipoArchivo != 'image/jpeg'
        ) {
          this.alertService.danger('imagen no válida');
        } else {
          this.registerForm.get('imagenPie').setValue(reader.result);
        }
      };
    }
  }

  onSubmit(): void {
    this.viewLoading = true;
    if (this.registerForm.invalid) {
      this.viewLoading = false;
      return;
    }
    const model: TextoTicket = this.registerForm.value;
    this.ofi.textoTicket = model;
    console.log('this.ofi', this.ofi);
    this.oficinaService.save(this.ofi).subscribe(
      (oficina: Oficina) => {
        this.alertService.success(environment.SAVED_SUCCESS);
        this.getRegisterForm(oficina.textoTicket);
        this.viewLoading = false;
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
        this.viewLoading = false;
      }
    );
  }
}
