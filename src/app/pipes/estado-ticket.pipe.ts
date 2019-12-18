import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTicket'
})
export class EstadoTicketPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 'EMIT') { return 'Emitido'; }
    if (value == 'ASIG') { return 'Asignado'; }
    if (value == 'ATEN') { return 'Atendiendo'; }
    if (value == 'ABAN') { return 'Abandonado'; }
    if (value == 'FINA') { return 'Finalizado'; }
    if (value == 'ELIM') { return 'Eliminado'; }
    if (value == 'ATEND_PROMOTOR') { return 'Atendido por promotor'; }
    return '-';
  }

}
