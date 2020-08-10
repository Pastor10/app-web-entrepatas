
import { Ubigeo } from './ubigeo.model';
import { TipoEvento } from './tipoevento.model';
import { Time } from '@angular/common';

export class Evento {
    constructor(
        public id?: number,
        public titulo?: string,
        public tipoEvento?: TipoEvento,
        public ubigeo?: Ubigeo,
        public descripcion?: string,
        public direccion?: string,
        public fecha?: Date,
        public estado?: boolean,
        public fechaCreacion?: Date,
        public banner?: string
    ) {}
}