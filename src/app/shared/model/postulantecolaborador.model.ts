
import { Persona } from './persona.model';
import { Cuestionario } from './cuestionario.model';

export class PostulanteColaborador {
    constructor(
        public id?: number,
        public estado?: boolean,
        public persona?: Persona,
        public cuestionario?: Cuestionario

    ) {}
}