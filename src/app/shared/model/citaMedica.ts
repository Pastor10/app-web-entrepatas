import { Veterinario } from './veterinario.model';
import { TratamientoMedico } from './tratamientoMedico';
import { Animal } from './animal.model';

export class CitaMedica{
    constructor(
        public id?: number,
        public fechaVisita?: Date,
        public veterinario?: Veterinario,
        public diagnostico?: string,
        public estadoClinico?: string,
        public listaTratamiento?: TratamientoMedico[],
        public animal?: Animal,
        public numero?: string,
        public foto?: string 
    ) {}

}