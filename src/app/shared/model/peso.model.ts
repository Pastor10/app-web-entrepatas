import {Area} from './area.model';
import {Oficina} from './oficina.model';
import {ModoLlamado} from './modoLlamado.model';

export class Peso {
  idPeso: number;
  nombrePeso: string;
  descripcion: string;
  tiempoMaxEsperaPrioridad: number;
  factorPrioridad: number;
  modoLlamado: ModoLlamado;
  area: Area;
  oficina: Oficina;

  visibleCombo: Boolean;
}
