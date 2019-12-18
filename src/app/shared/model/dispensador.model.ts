import { Oficina } from "./oficina.model";

export class Dispensador{
    idDispensador: number;
    nombre: string;
    descripcion: string;
    indImpresion: boolean;
    activo: boolean;
    numDemoraPantallas: number;
    fecUltimaConexion: Date;
    indAlarmaIniciada: boolean;
    ip: string;
    mensajeBienvenida: string;
    mensajeFinalizar: string;
    oficina: Oficina;
}