import { Ubigeo } from './ubigeo.model';

export class Veterinaria {
    constructor(
        public id?: number,
        public nombre?: string,
        public ubigeo?: Ubigeo,
        public direccion?: string,
        public estado?: boolean,
        public fechaCreacion?: Date 
    ) {}
}