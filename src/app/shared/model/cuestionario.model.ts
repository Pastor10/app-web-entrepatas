
import { Opcion } from './opcion.model';
import { Postulante } from './postulante.model';
import { DetalleCuestionario } from './detalleCuestionario.model';

export class Cuestionario {
    constructor(
        public id?: number,
        public promedio?: number,
        public opcion?: Opcion,
        public idPostulante?: number,
        public listaDetalle?: DetalleCuestionario[]

  
    ) {}
}