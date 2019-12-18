export class VentanillaMonitor {
  idVentanilla: number;
  idPeso: number;
  indLlamadoAutomatico: boolean;
  tiempoRetardoRellamada: boolean;
  numeroMaxRellamada: number;


  constructor(idVentanilla, idPeso, indLlamadoAutomatico, tiempoRetardoRellamada, numeroMaxRellamada) {
    this.idVentanilla = idVentanilla;
    this.idPeso = idPeso;
    this.indLlamadoAutomatico = indLlamadoAutomatico;
    this.tiempoRetardoRellamada = tiempoRetardoRellamada;
    this.numeroMaxRellamada = numeroMaxRellamada
  }
}
