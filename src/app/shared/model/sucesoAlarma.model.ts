import {Oficina} from './oficina.model';

export class SucesoAlarma {
  idSucesosAlarma: number;
  horaEmision: Date;
  fecha: Date;
  mensaje: string;
  idVentanilla: number;
  oficina: Oficina;
  tipoAlarma: string;
  contadorNotificacion: number;
}
