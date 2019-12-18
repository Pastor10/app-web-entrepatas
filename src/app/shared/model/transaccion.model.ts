import {TipoAtencion} from './tipoAtencion.model';
import {Oficina} from './oficina.model';

export class Transaccion {
  idTransaccion: number;
  descripcion: string;
  esNodo: number;
  nombre: string;
  orden: number;
  idTransaccionPadre: number;
  tipoAtencion:TipoAtencion;
}
