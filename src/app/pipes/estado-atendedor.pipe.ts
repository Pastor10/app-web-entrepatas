import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'estadoAtendedor'
})
export class EstadoAtendedorPipe implements PipeTransform {

   transform(value: any): any {
    if (value == 'ATENDIENDO') { return 'Atendiendo'; }
    if (value == 'ESPERA_ASIGNACION') { return 'Esperando asignación'; }
    if (value == 'LISTO_PARA_ATENDER') { return 'Listo para atender'; }
    if (value == 'ESPERA_INICIO_ATENCION') { return 'Asignado'; }
    if (value == 'SESION_TERMINADA') { return 'Sesión terminada'; }
    return '-';
  }

}
