
import {forkJoin as observableForkJoin, Observable} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {OficinaService} from '../../../shared/service/oficina.service';
import {Oficina} from '../../../shared/model/oficina.model';
import {Ventanilla} from '../../../shared/model/ventanilla.model';
import {VentanillaService} from '../../../shared/service/ventanilla.service';
import {AreaService} from '../../../shared/service/area.service';
import {PesoService} from '../../../shared/service/peso.service';
import {TipoAtencionService} from '../../../shared/service/tipoAtencion.service';
import {AlertService} from 'ngx-alerts';
import {Area} from '../../../shared/model/area.model';
import {Peso} from '../../../shared/model/peso.model';
import {TipoAtencion} from '../../../shared/model/tipoAtencion.model';

import {environment} from '../../../../environments/environment';
import {LocalStorageService} from '../../../shared/service/localstorage.service';
import {SocketService} from '../../../shared/service/socket.service';
import {Pagination} from '../../../shared/model/pagination.model';

@Component({
  selector: 'app-ventanilla-monitor',
  templateUrl: './ventanilla-monitor.component.html',
  styleUrls: ['./ventanilla-monitor.component.css']
})
export class VentanillaMonitorComponent implements OnInit, OnDestroy {

  // Loading
  loading = false;

  // FILTERS
  oficinas = new Array<Oficina>();
  areas = new Array<Area>();
  pesos = new Array<Peso>();
  tiposAtencion = new Array<TipoAtencion>();

  oficinaSelected = 0;
  areaSelected = 0;
  tipoAtencionSelected = 0;
  pesoSelected = 0;

  ventanillasPagination = new Pagination();

  // Ventanilla
  ventanilla: Ventanilla;
  indLlamadoAutomaticoTemporal;


  // pagination
  p = 1;
  perPage = environment.ventanillasPorPaginaMonitor;

  // Socket
  connectionSocket;


  constructor(private oficinaService: OficinaService,
              private ventanillaService: VentanillaService,
              private areaService: AreaService,
              public alertService: AlertService,
              private pesoService: PesoService,
              private tipoAtencionService: TipoAtencionService,
              private localStorageService: LocalStorageService,
              private socketService: SocketService) {
  }

  ngOnInit() {

    this.loading = true;
    observableForkJoin(
      this.oficinaService.getAll(),
      this.areaService.getAll(),
      this.pesoService.getAll(),
      this.tipoAtencionService.getAll()
    ).subscribe(data => {
      console.log('data', data);
      this.loading = false;
      this.oficinas = <Oficina[]>data[0];
      this.areas = <Area[]>data[1];
      this.pesos = <Peso[]>data[2];
      this.tiposAtencion = <TipoAtencion[]>data[3];

      this.getVentanillas();
      this.activateNotificaciones();

    }, error => {
      console.log('error', error);
    });

    const loginResponse = this.localStorageService.get('userLogin');
    if (loginResponse != undefined) {
      const user = loginResponse.user;

      // Listen conexion y desconexion de ventanilla
      this.connectionSocket = this.socketService.onEvent('connectDisconnectVentanilla').subscribe(idv => {
        if (this.ventanillasPagination.content.length > 0) {
          this.ventanillasPagination.content.forEach(ven => {
            if (ven.idVentanilla == idv) {
              this.ventanillaService.getById(ven.idVentanilla).subscribe(data => {
                ven.usuario = (<Ventanilla>data).usuario;
                ven.usuario = (<Ventanilla>data).usuario;
                ven.indLlamadoAutomatico = (<Ventanilla>data).indLlamadoAutomatico;
                ven.indCambioLlamadoAutomaticoByVentanilla = (<Ventanilla>data).indCambioLlamadoAutomaticoByVentanilla;
                if (this.ventanilla && this.ventanilla.idVentanilla == ven.idVentanilla) {
                  this.setVentanilla(<Ventanilla>data, true);
                }

                const titleN = (<Ventanilla>data).usuario ? `Ventanilla conectada` : `Ventanilla desconectada`;
                const messageN = (<Ventanilla>data).nombre;
                this.showNotificacion(titleN, messageN);
              });
            }
          });
        }
      });

      this.socketService.onEvent('cambioLlamadoAutomaticoVentanilla').subscribe(e => {
        const v = (<Ventanilla>e);

        if (this.ventanillasPagination.content.length > 0) {
          this.ventanillasPagination.content.forEach(ven => {
            if (ven.idVentanilla == v.idVentanilla) {
              this.ventanillaService.getById(ven.idVentanilla).subscribe(data => {
                ven.usuario = (<Ventanilla>data).usuario;
                ven.indLlamadoAutomatico = (<Ventanilla>data).indLlamadoAutomatico;
                ven.indCambioLlamadoAutomaticoByVentanilla = (<Ventanilla>data).indCambioLlamadoAutomaticoByVentanilla;
                if (this.ventanilla && this.ventanilla.idVentanilla == ven.idVentanilla) {
                  this.setVentanilla(<Ventanilla>data, true);
                  this.indLlamadoAutomaticoTemporal = v.indLlamadoAutomatico;
                }
              });
            }
          });
        }

      });

    }
  }

  getVentanillas(paramId?, filtro?, page?): void {

    this.loading = true;

    let idOficina = this.oficinaSelected != 0 ? this.oficinaSelected : null;
    let idArea = this.areaSelected != 0 ? this.areaSelected : null;
    let idTipoAtencion = this.tipoAtencionSelected != 0 ? this.tipoAtencionSelected : null;
    let idPeso = this.pesoSelected != 0 ? this.pesoSelected : null;

    if (paramId != undefined) {
      this.p = 1;
      if (filtro == 'O') {
        idOficina = paramId != 0 ? paramId : null;
      }
      if (filtro == 'A') {
        idArea = paramId != 0 ? paramId : null;
      }
      if (filtro == 'TA') {
        idTipoAtencion = paramId != 0 ? paramId : null;
      }
      if (filtro == 'P') {
        idPeso = paramId != 0 ? paramId : null;
      }
    }

    const arrParams = [];
    if (idOficina) {
      arrParams.push(`idOficina=${idOficina}`);
    }
    if (idArea) {
      arrParams.push(`idArea=${idArea}`);
    }
    if (idTipoAtencion) {
      arrParams.push(`idTipoAtencion=${idTipoAtencion}`);
    }
    if (idPeso) {
      arrParams.push(`idPeso=${idPeso}`);
    }

    let pageNumber = this.p;
    if (page != undefined) {
      pageNumber = page;
    }
    arrParams.push(`pageNumber=${pageNumber}`);
    arrParams.push(`perPage=${this.perPage}`);

    this.ventanillaService.findVentanillasMonitor(arrParams.join('&')).subscribe(data => {
      this.ventanillasPagination = <Pagination>data;
      if (page != undefined) {
        this.p = page;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
      this.p = 1;
      this.ventanillasPagination = <Pagination>{content: []};
    });

  }


  cerrarSesionVentanilla(): void {
    this.ventanillaService.killSesion(this.ventanilla.idVentanilla).subscribe(v => {
      this.ventanilla.usuario = v.usuario;
      this.ventanillasPagination.content.forEach(ven => {
        if (ven.idVentanilla == v.idVentanilla) {
          ven.usuario = v.usuario;
        }
      });

      // Enviando a Socket el cierre de sesion
      this.socketService.sendEvent('killSesionVentanillaFromMonitor', this.ventanilla.idVentanilla);

    });
  }


  getPage(page: number) {
    this.getVentanillas(undefined, undefined, page);
  }

  setVentanilla(v, hideLoading?) {
    if (hideLoading == undefined) {
      this.loading = true;
    }
    this.indLlamadoAutomaticoTemporal = undefined;
    this.ventanillaService.getById(v.idVentanilla).subscribe(data => {
      this.ventanilla = <Ventanilla>data;
      this.ventanilla.indLlamadoAutomaticoAnt = (<Ventanilla>data).indLlamadoAutomatico;
      this.ventanilla.tiempoRetardoRellamadaAnt = (<Ventanilla>data).tiempoRetardoRellamada;
      this.ventanilla.numeroMaxRellamadaAnt = (<Ventanilla>data).numeroMaxRellamada;
      if (hideLoading == undefined) {
        this.loading = false;
      }
    }, err => {
      if (hideLoading == undefined) {
        this.loading = false;
      }
    });
  }

  guardarVentanilla() {
    this.loading = true;
    this.ventanillaService.updateVentanillaMonitor(Ventanilla.getVentanillaMonitor(this.ventanilla)).subscribe(data => {

      if (this.ventanilla.indLlamadoAutomaticoAnt != data.indLlamadoAutomatico) {
        console.log('Cambio el llamado automatico');

        // Enviando a socket
        this.socketService.sendEvent('cambioLlamadoAutomaticoMonitor', {
          idVentanilla: this.ventanilla.idVentanilla,
          indLlamadoAutomatico: data.indLlamadoAutomatico

        });
        this.alertService.success('Se guardó correctamente');
        this.ventanilla = data;
        this.ventanilla.indLlamadoAutomaticoAnt = data.indLlamadoAutomatico;
        this.ventanilla.tiempoRetardoRellamadaAnt = data.tiempoRetardoRellamada;
        this.ventanilla.numeroMaxRellamadaAnt = data.numeroMaxRellamada;

        if (this.ventanillasPagination && this.ventanillasPagination.content) {
          this.ventanillasPagination.content.forEach(v => {
            if (v.idVentanilla == data.idVentanilla) {
              v.indLlamadoAutomatico = data.indLlamadoAutomatico;
            }
          });
        }
      }

      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  isActiveVentanilla(v: Ventanilla) {
    if (!this.ventanilla) {
      return false;
    }
    return v.idVentanilla == this.ventanilla.idVentanilla;
  }

  ngOnDestroy() {

  }

  activateNotificaciones(): void {
    if (!Notification) {
      alert('Notificaciones no soportadas.');
      return;
    }

    if ((Notification as any).permission != 'granted') {
      Notification.requestPermission();
    }
  }

  showNotificacion(titulo: string, mensaje: string): void {
    if ((Notification as any).permission != 'granted') {
      Notification.requestPermission();
    } else {
      const notification = new Notification(titulo, {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: mensaje,
      });

      notification.onclick = function () {
        window.open('http://q0.com');
      };

    }
  }

}
