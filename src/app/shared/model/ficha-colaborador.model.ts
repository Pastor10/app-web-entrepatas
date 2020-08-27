import { Pregunta } from './pregunta.model';
import { Opcion } from './opcion.model';

export class FichaColaborador {
    constructor(
        public id?: number,
        public pregunta?: string,
        public opciones?: string[]
    ) {}
}