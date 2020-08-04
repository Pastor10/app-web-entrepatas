import { User } from './User.model';
import { TipoLocal } from './tipolocal.model';
import { Ubigeo } from './ubigeo.model';

export class Local {
    constructor(
        public id?: number,
        public usuario?: User,
        public tipoLocal?: TipoLocal,
        public ubigeo?: Ubigeo,
        public capacidad?: number,
        public direccion?: string,
        public estado?: boolean,
        public fechaCreacion?: Date,
        public nombre?: string
    ) {}
}