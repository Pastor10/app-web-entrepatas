
import { Animal } from './animal.model';
import { User } from './User.model';
import { Estado } from './estado.model';
import { Postulante } from './postulante.model';
import { Persona } from './persona.model';

export class Adopcion {
    constructor(
        public id?: number,
        public estado?: boolean,
        public animal?: Animal,
        public usuario?: User,
        public estadoAdopcion?: Estado,
        public fechaCreacion?: Date,
        public fechaModificacion?: Date,
        public persona?: Persona,
        public fechaAdopcion?: Date,
        public createUser?: boolean


    ) {}
}