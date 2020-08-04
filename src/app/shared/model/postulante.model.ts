
import { TipoDocumento } from './tipoDocumento.model';
import { Ubigeo } from './ubigeo.model';
import { Publicacion } from './publicacion.model';
import { Persona } from './persona.model';

export class Postulante {
    constructor(
        public id?: number,
        public estado?: boolean,
        public puntuacion?: number,
        public publicacion?: Publicacion,
        public persona?: Persona

    ) {}
}
