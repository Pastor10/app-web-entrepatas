
import { TipoAnimal } from './tipoanimal.model';

export class Raza{
    constructor(
        public id?: number,
        public nombre?: string,
        public estado?: boolean,
        public fechaCreacion?: Date,
        public tipoAnimal?: TipoAnimal
    ) {}
}