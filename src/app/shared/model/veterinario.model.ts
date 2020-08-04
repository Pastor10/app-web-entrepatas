
import { Veterinaria } from './veterinaria.model';

export class Veterinario {
    constructor(
        public id?: number,
        public nombre?: string,
        public veterinaria?: Veterinaria,
        public estado?: boolean,
        public fechaCreacion?: Date 
    ) {}
}