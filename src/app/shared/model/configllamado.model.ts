import {ListaVideo} from './listavideo.model';
import {ListaMarquesina} from './listamarquesina.model';
import {GrillaLlamado} from './grillallamado.model';
import {EspacioAtencion} from './espacioatencion.model';

export class ConfigLlamado {

  idConfiguracionEmisorLlamados: number;
  numPosAppX: number;
  numPosAppY: number;
  numDimAppX: number;
  numDimAppY: number;
  numPosVideoX: number;
  numPosVideoY: number;
  numDimVideoX: number;
  numDimVideoY: number;
  numPosMarquesinaX: number;
  numPosMarquesinaY: number;
  numDimMarquesinaX: number;
  numDimMarquesinaY: number;
  numPosGrillaX: number;
  numPosGrillaY: number;
  numDimGrillaX: number;
  numDimGrillaY: number;
  indMouseVisualizado: string;
  indPantallaExtendida: string;
  desNombre: string;

  listaVideo: ListaVideo;
  listaMarquesina: ListaMarquesina;
  grillaLlamado: GrillaLlamado;
  espacioAtencion: EspacioAtencion;

}
