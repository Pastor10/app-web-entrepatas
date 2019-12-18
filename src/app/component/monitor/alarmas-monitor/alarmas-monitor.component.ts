import {Component, OnDestroy, OnInit} from '@angular/core';
import {Oficina} from '../../../shared/model/oficina.model';
import {SucesoAlarmaService} from '../../../shared/service/sucesoAlarma.service';
import {SucesoAlarma} from '../../../shared/model/sucesoAlarma.model';
import {forkJoin} from 'rxjs';
import {OficinaService} from '../../../shared/service/oficina.service';
import {SocketService} from '../../../shared/service/socket.service';
import {LocalStorageService} from '../../../shared/service/localstorage.service';
import {UserResponse} from '../../../shared/model/userResponse.model';
import {AuthSocket} from '../../../shared/model/authSocket.model';
import {tipoSocket} from '../../../tipos/tipoSocket';

@Component({
  selector: 'app-alarmas-monitor',
  templateUrl: './alarmas-monitor.component.html',
  styleUrls: ['./alarmas-monitor.component.css']
})
export class AlarmasMonitorComponent implements OnInit, OnDestroy {


  loading = false;

  user: UserResponse;

  oficinas = new Array<Oficina>();
  oficinaSelected: Oficina = null;

  alarmas = Array<SucesoAlarma>();

  get alarmasSorted(): Array<SucesoAlarma> {
    return this.alarmas.sort(function (a, b) {
      return new Date(b.horaEmision).valueOf() - new Date(a.horaEmision).valueOf();
    });
  }

  constructor(private sucesoAlarmaService: SucesoAlarmaService,
              private oficinaService: OficinaService,
              private socketService: SocketService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.loading = true;
    forkJoin(
      this.oficinaService.getAll(),
      this.sucesoAlarmaService.findAllToday()
    ).subscribe(data => {
      this.loading = false;
      this.oficinas = <Oficina[]>data[0];
      this.alarmas = data[1];
    });

    const loginResponse = this.localStorageService.get('userLogin');
    if (loginResponse != undefined) {
      this.user = loginResponse.user;
    }

    this.onEventsAlarmas();
  }

  ngOnDestroy() {
    this.authenticatedSocket(this.user.id, 0);
  }

  changeOficina(o: Oficina): void {
    if (o) {
      this.authenticatedSocket(this.user.id, o.idOficina);
      this.sucesoAlarmaService.findAllTodayByIdOficina(o.idOficina).subscribe(data => {
        this.alarmas = data;
      });
    } else {
      this.authenticatedSocket(this.user.id, 0);
      this.sucesoAlarmaService.findAllToday().subscribe(data => {
        this.alarmas = data;
      });
    }
  }

  onEventsAlarmas(): void {
    this.socketService.onEvent('alarma').subscribe(data => {
      const alarma = <SucesoAlarma>data;
      this.alarmas.push(alarma);
    });
  }

  authenticatedSocket(idUser, idOficina): void {
    this.socketService.sendEvent('authenticate', new AuthSocket(idUser, idOficina, tipoSocket.MONITOR));
  }


}

