import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../shared/service/socket.service';
import {LocalStorageService} from '../../shared/service/localstorage.service';
import {AuthSocket} from '../../shared/model/authSocket.model';
import {tipoSocket} from '../../tipos/tipoSocket';
import {NotifierService} from 'angular-notifier';
import {SucesoAlarma} from '../../shared/model/sucesoAlarma.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  constructor(private socketService: SocketService, private localStorageService: LocalStorageService, private notifier: NotifierService) {
  }

  ngOnInit(): void {

    const loginResponse = this.localStorageService.get('userLogin');
    if (loginResponse != undefined) {
      const user = loginResponse.user;

      this.connectSocket(user.id, 0);

    }

  }

  connectSocket(idUser, idOficina): void {
    if (!this.socketService.connected) {
      console.log('Creando socket');
      this.socketService.connect(new AuthSocket(idUser, idOficina, tipoSocket.MONITOR));
      this.onEventsAlarmas();
    } else {
      console.log('El socket ya se encuentra vivo');
    }
  }

  onEventsAlarmas(): void {
    this.socketService.onEvent('alarma').subscribe(data => {
      const alarma = <SucesoAlarma>data;
      this.showNotification( 'warning', `${alarma.oficina.nombre}, ${alarma.mensaje}` );
    });
  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }


}
