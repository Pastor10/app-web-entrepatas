
import {Autority} from './autority.model';
import {Perfil} from './perfil.model';
import { TipoDocumento } from './tipoDocumento.model';
import { Ubigeo } from './ubigeo.model';
import { Ocupacion } from './ocupacion.model';
import { Persona } from './persona.model';

export class User {
    constructor(
        public id?: number,
        public username?: string,
        public passwordTrans?: string,
        public visible?: boolean,
        public estado?: boolean,
        public perfil?: Perfil,
        public persona?: Persona,
        public password?: string

 
    ) {}
}
