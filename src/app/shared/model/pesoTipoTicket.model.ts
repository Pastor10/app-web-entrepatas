import {TipoTicket} from 'src/app/shared/model/tipoTicket.model';
import {Peso} from 'src/app/shared/model/peso.model';

export class PesoTipoTicket {
  idPesoTipoTicket: number;
  tipoTicket: TipoTicket;
  pesoEntity: Peso;
  peso: number;
  indicePrioridad: number;
  activo: boolean;
  pesoRatio: number;
  tiempoPromAtencion: number;
  tiempoMaxEspera: number;
  factorPrioridad: number;
  cantidadMaximaTickets: number;
}
