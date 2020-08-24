
import { Publicacion } from './publicacion.model';
import { Persona } from './persona.model';
import { Cuestionario } from './cuestionario.model';

export class Postulante {
    constructor(
        public id?: number,
        public estado?: boolean,
        public puntuacion?: number,
        public publicacion?: Publicacion,
        public persona?: Persona,
        public cuestionario?: Cuestionario

    ) {}
}
