
import { TamanoAnimal } from './tamanoanimal.model';
import { Raza } from './raza.model';
import { CitaMedica } from './citaMedica';
import { Local } from './local.model';

export class Animal {
    constructor(
        public id?: number,
        public nombre?: string,
        public tamanoAnimal?: TamanoAnimal,
        public raza?: Raza,
        public sexo?: string,
        public edad?: string,
        public foto?: string,
        public estado?: boolean,
        public fechaCreacion?: Date,
        public citasMedicas?: CitaMedica[],
        public local?: Local

    ) {}

}