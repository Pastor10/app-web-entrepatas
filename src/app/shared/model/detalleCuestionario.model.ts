import { Pregunta } from './pregunta.model';
import { Opcion } from './opcion.model';
import { Cuestionario } from './cuestionario.model';

export class DetalleCuestionario {
    constructor(
        public id?: number,
        public pregunta?: Pregunta,
        public opcion?: Opcion,
        public cuestionario?: Cuestionario
    ) {}
}