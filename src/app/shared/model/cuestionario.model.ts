import { Pregunta } from './pregunta.model';
import { Opcion } from './opcion.model';
import { Postulante } from './postulante.model';

export class Cuestionario {
    constructor(
        public id?: number,
        public pregunta?: Pregunta,
        public opcion?: Opcion,
        public promedio?: number,
        public postulante?: Postulante
    ) {}
}