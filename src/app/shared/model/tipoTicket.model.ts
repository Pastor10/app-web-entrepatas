import {TipoAtencion} from './tipoAtencion.model';
import {Oficina} from './oficina.model';

export class TipoTicket {
  idTipoTicket: number;
  nombre: string;
  codigoImpresion: string;
  descripcion: string;
  tiempoOptimoAtencion: Date;
  tiempoOptimoEspera: Date;
  activo: boolean;
  visible: boolean;
  especial: boolean;
  esPreferencial: boolean;
  tiempoEsperaMin: number;
  tiempoEsperaMax: number;
  tiempoAtencionMin: number;
  tiempoAtencionMax: number;
  oficina: Oficina;
  tipoAtencion: TipoAtencion;
  indicador:number;
  tiempoLimiteLsa:number;
}
