import { Usuario } from './usuario.model';
import { Ventanilla } from './ventanilla.model';
import { TipoTicket } from './tipoTicket.model';
import { Oficina } from './oficina.model';
import { Cliente } from './cliente.model';
import { Subscription } from 'rxjs';
import { EstadoTicket } from '../../tipos/estado-ticket.enum';

export class Ticket {
  idTicket: number;
  fecha: Date;
  descripcion: string;
  orden: number;
  horaEmision: Date;
  horaAsignacion: Date;
  horaInicioAtencion: Date;
  horaFinAtencion: Date;
  estado: EstadoTicket;
  horaRellamada: Date;
  derivado: boolean;
  numeroTicket: string;
  numLlamados: number;
  reactivado: boolean;
  indDerivadoPrioridad: boolean;
  codigoImpresion: string;
  indTicketInterno: boolean;
  indTipoLlamado: string;
  esDepurado: boolean;
  usuario: Usuario;
  ventanilla: Ventanilla;
  tipoTicket: TipoTicket;
  oficina: Oficina;
  cliente: Cliente;

  tiempoEspera: string;
  tiempoAtencion: string;
  timerTiempoEspera: Subscription;
}
