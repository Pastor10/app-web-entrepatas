import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {AuthSocket} from '../model/authSocket.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  connected = false;

  private socket = io(environment.socketHost, {
    autoConnect: false
  });

  constructor() {
  }

  connect(auth: AuthSocket): void {

    this.socket.on('connect', () => {
      console.log('Socket Conectado');

      this.socket.emit('authenticate', auth);
      this.connected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket Desconectado : ${reason}`);
      this.connected = false;
    });

    this.socket.open();

  }

  disconnect(): void {

    if (this.connected) {
      this.socket.disconnect();
    }


  }

  sendEvent(event, data) {
    console.log(`emitiendo evento ${event}`, data);
    this.socket.emit(event, data);
  }


  onEvent(event) {
    const observable = new Observable(observer => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
