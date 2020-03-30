
import {Autority} from './autority.model';
import {Perfil} from './perfil.model';

export class User {
    constructor(
        public id?: number,
        public email?: string,
        public fullname?: string,
        public enabled?: boolean,
        public deleted?: boolean,
        public type?: string,
        public user_type?: string,
        public profileEntity?: Perfil
    ) {}
}
