
import { TipoDocumento } from './tipoDocumento.model';
import { Ubigeo } from './ubigeo.model';

export class SolicitudAdopcion {
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
        public numeroDocumento?: number,
        public tipoDocumento?: TipoDocumento,
        public ubigeo?: Ubigeo,
        public nombreCompleto?: string

 
    ) {}
}
