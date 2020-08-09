
import { TipoDocumento } from './tipoDocumento.model';
import { Ubigeo } from './ubigeo.model';
import { Ocupacion } from './ocupacion.model';

export class Persona {
    constructor(
        public id?: number,
        public correo?: string,
        public nombre?: string,
        public apePaterno?: string,
        public apeMaterno?: string,
        public celular?: number,
        public direccion?: string,
        public fechaNacimiento?: Date,
        public estado?: boolean,
        public numeroDocumento?: string,
        public tipoDocumento?: TipoDocumento,
        public ubigeo?: Ubigeo,
        public nombreCompleto?: string,
        public ocupacion?: string,
        public isCompleted?: boolean,
        public foto?: string

    ) {}
}