import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Oficina } from '../../../shared/model/oficina.model';
import { OficinaService } from '../../../shared/service/oficina.service';
import { Observable, Subscription, interval, forkJoin } from 'rxjs';
import { DatoTicketsOficina } from '../../../shared/model/datoTicketsOficina.model';
import { Ticket } from '../../../shared/model/ticket.model';
import { TicketService } from '../../../shared/service/ticket.service';
import { map } from 'rxjs/operators';

import { ModalDirective } from 'angular-bootstrap-md';
import { EstadoTicket } from '../../../tipos/estado-ticket.enum';
import { Role } from '../../../shared/model/role.model';
import { LocalStorageService } from '../../../shared/service/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-monitor',
  templateUrl: './ticket-monitor.component.html',
  styleUrls: ['./ticket-monitor.component.css']
})
export class TicketMonitorComponent implements OnInit, OnDestroy {
  loading = false;
  oficinas = new Array<Oficina>();
  oficinaSelected: Oficina;
  datoTicketsOficina: DatoTicketsOficina;
  codigoImpresion: string;
  tickets = new Array<Ticket>();
  ticketSelected: Ticket;
  accionTicket = 1;
  intervalActualizarData: Subscription;
  obsObtenerTickets: Observable<Ticket[]>;
  private roles: Role[];
  @ViewChild('modalConfirm') public modalConfirm: ModalDirective;

  constructor(
    private oficinaService: OficinaService,
    private ticketService: TicketService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    const loginResponse = this.localStorageService.get('userLogin');
    if (loginResponse != undefined) {
      this.roles = loginResponse.roles;
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.loading = true;
    forkJoin(this.oficinaService.getAll()).subscribe(data => {
      this.loading = false;
      this.oficinas = <Oficina[]>data[0];
    });

    this.intervalActualizarData = interval(3000)
      .pipe(
        map(x => {
          return x;
        })
      )
      .subscribe(h => {
        this.actualizarData();
      });
  }

  ngOnDestroy(): void {
    this.intervalActualizarData.unsubscribe();
  }

  confirmAccionTicket(t: Ticket, accion: number) {
    this.ticketSelected = t;
    this.accionTicket = accion;
    this.modalConfirm.show();
  }

  confirmAccion() {
    this.loading = true;
    if (this.accionTicket == 1) {
      this.ticketService
        .priorizar(this.ticketSelected.idTicket)
        .subscribe(() => {
          this.actualizarData(() => {
            this.modalConfirm.hide();
            this.loading = false;
          });
        });
    } else if (this.accionTicket == 2) {
      this.ticketService
        .despriorizar(this.ticketSelected.idTicket)
        .subscribe(() => {
          this.actualizarData(() => {
            this.modalConfirm.hide();
            this.loading = false;
          });
        });
    } else if (this.accionTicket == 3) {
      this.ticketService.depurar(this.ticketSelected.idTicket).subscribe(() => {
        this.actualizarData(() => {
          this.modalConfirm.hide();
          this.loading = false;
        });
      });
    } else if (this.accionTicket == 4) {
      this.ticketService
        .eliminar(this.ticketSelected.idTicket)
        .subscribe(() => {
          this.actualizarData(() => {
            this.modalConfirm.hide();
            this.loading = false;
          });
        });
    } else if (this.accionTicket == 5) {
      this.ticketService.activar(this.ticketSelected.idTicket).subscribe(() => {
        this.actualizarData(() => {
          this.modalConfirm.hide();
          this.loading = false;
        });
      });
    } else {
      this.loading = false;
    }
  }

  buscarTicket() {
    if (this.codigoImpresion) {
      this.obsObtenerTickets = this.ticketService.findByCodigoImpresionLike(
        this.codigoImpresion
      );
      this.actualizarData();
    } else {
      this.obsObtenerTickets = this.ticketService.findTicketsMonitor(
        this.oficinaSelected.idOficina
      );
      this.actualizarData();
    }
  }

  changeOficina(o: Oficina): void {
    this.obsObtenerTickets = this.ticketService.findTicketsMonitor(o.idOficina);
    this.getDatoTicketsOficina(o.idOficina);
  }

  actualizarData(cb?) {
    if (this.oficinaSelected) {
      this.getDatoTicketsOficina(this.oficinaSelected.idOficina, cb);
    }
  }

  getDatoTicketsOficina(idOficina: number, cb?): void {
    forkJoin(
      this.oficinaService.getDatoTickets(idOficina),
      this.obsObtenerTickets
    ).subscribe(data => {
      this.tickets.forEach(ti => {
        ti.timerTiempoEspera.unsubscribe();
      });

      this.datoTicketsOficina = data[0];
      this.tickets = data[1];
      this.tickets.forEach(ti => {
        this.calcularTiempoEspera(ti);
        ti.timerTiempoEspera = interval(1000)
          .pipe(
            map(x => {
              return x;
            })
          )
          .subscribe(() => {
            this.calcularTiempoEspera(ti);
          });
      });

      if (cb) {
        cb();
      }
    });
  }

  calcularTiempoEspera(ti: Ticket): void {
    ti.tiempoEspera = '-';
    ti.tiempoAtencion = '-';
    let now: Date;
    if (ti.estado == EstadoTicket.EMIT) {
      now = new Date();
    } else if (
      ti.estado == EstadoTicket.ASIG ||
      ti.estado == EstadoTicket.FINA ||
      ti.estado == EstadoTicket.ABAN
    ) {
      now = new Date(ti.horaAsignacion);
    } else if (ti.estado == EstadoTicket.ATEN) {
      now = new Date(ti.horaAsignacion);
      ti.tiempoAtencion = this.getHourDisplay(
        new Date().valueOf() - new Date(ti.horaInicioAtencion).valueOf()
      );
    }
    const he = new Date(ti.horaEmision);
    ti.tiempoEspera = this.getHourDisplay(now.valueOf() - he.valueOf());
  }

  isPriorizar(t: Ticket) {
    return !t.indDerivadoPrioridad && t.estado == EstadoTicket.EMIT;
  }

  isDespriorizar(t: Ticket) {
    return t.indDerivadoPrioridad && t.estado == EstadoTicket.EMIT;
  }

  isEliminarDepurar(t: Ticket) {
    return t.estado == EstadoTicket.EMIT;
  }

  isActivar(t: Ticket) {
    return (
      t.estado == EstadoTicket.ABAN &&
      this.roles.find(r => r.name == 'ROLE_REACTIVAR_TICKET')
    );
  }

  getHourDisplay(millisec) {
    if(millisec>=0){
    let seconds: any = (millisec / 1000).toFixed(0);
    let minutes: any = Math.floor(seconds / 60);
    let hours: any = '';
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      hours = hours >= 10 ? hours : '0' + hours;
      minutes = minutes - hours * 60;
      minutes = minutes >= 10 ? minutes : '0' + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    if (hours == '') {
      hours = '00';
    }
    return hours + ':' + minutes + ':' + seconds;
  }else{
    console.log('Sincronizar la hora del Servidor');
      return '00' + ':' + '00' + ':' + '00';
  }

  }




}
