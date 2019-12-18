import {Area} from './area.model';
import {EspacioTiempo} from './espacioTiempo.model';
import {TipoAtencion} from './tipoAtencion.model';
import {Peso} from './peso.model';
import {User} from './user.model';
import {Oficina} from './oficina.model';

import {ModoLlamado} from './modoLlamado.model';
import {Usuario} from './usuario.model';
import {VentanillaMonitor} from './ventanillaMonitor.model';


export class Ventanilla {
  idVentanilla: number;
  nombre: string;
  nombreTv: string;
  permiteDerivacion: boolean;
  aceptaTickDerivados: boolean;
  tiempoMinimoEspera: number;
  descripcion: string;
  tiempoRetardoRellamada: number;
  numeroMaxRellamada: number;
  permitePrioridadDerivacion: boolean;
  permiteTicketInterno: boolean;
  activo: boolean;
  indTransaccion: boolean;
  estadoAtendedor: string;
  desIp: string;
  indTipoLlamado: boolean;
  permiteRegistroCliente: boolean;
  indLlamadoAutomatico: boolean;
  indCambioLlamadoAutomaticoByVentanilla: boolean;

  area: Area;
  tipoAtencion: TipoAtencion;
  peso: Peso;
  usuario: Usuario;
  oficina: Oficina;


  // TRANSIENT PARA CONTROL EN MONITOR
  indLlamadoAutomaticoAnt: boolean;
  tiempoRetardoRellamadaAnt: number;
  numeroMaxRellamadaAnt: number;


  public static getVentanillaMonitor(v: Ventanilla): VentanillaMonitor {
    return new VentanillaMonitor(v.idVentanilla, v.peso.idPeso, v.indLlamadoAutomatico, v.tiempoRetardoRellamada, v.numeroMaxRellamada);
  }
}
