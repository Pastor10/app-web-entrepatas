import { User } from './User.model';
import { Animal } from './animal.model';
import { Condicion } from './condicion.model';
import { Estado } from './estado.model';

export class Publicacion {
    constructor(
        public id?: number,
        public descripcion?: string,
        public animal?: Animal,
        public usuarioPublica?: User,
        public usuarioEvalua?: User,
        public condicion?: Condicion,
        public estadoPublicacion?: string,
        public estado?: boolean,
        public fechaCreacion?: Date,
        public fechaModificacion?: Date,
        public archivo?: any,
        public nombreArchivo?: string,
        public observacion?: string,
        public totalPostulante?: number
    ) {}
}