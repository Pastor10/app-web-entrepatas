export class TipoEvento{
    constructor(
        public id?: number,
        public nombre?: string,
        public imagen?: string,
        public estado?: boolean,
        public fechaCreacion?: Date,
        public file?: File
        
    ) {}
}