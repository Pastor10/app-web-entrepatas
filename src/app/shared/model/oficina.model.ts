import {HorarioSync} from './horariosync.model';
import {ConfigLlamado} from './configllamado.model';
import { TextoTicket } from './textoticket.model';

export class Oficina {

  idOficina: number;
  nombre: string;
  descripcion: string;
  tiempoMaxReactivar: number;
  tiempoPromedioServicio: number;
  tiempoMaxDepurar: number;
  polifuncionalidad: boolean;
  visualizarPendientes: boolean;
  activo: boolean;
  aceptarSync: boolean;
  ipMonitor: string;
  ipVideos: string;
  codEstadoSync: string;

  ip: string;
  horarioSync: HorarioSync;

  configLlamado: ConfigLlamado;
  textoTicket: TextoTicket;

  desRutaSync: string;
  desRutaBaseVideo: string;
}
