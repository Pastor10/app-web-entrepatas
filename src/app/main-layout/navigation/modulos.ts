import {Modulo} from '../../shared/model/modulo.model';


const ADM = {
  'ROLE_AREA': new Modulo('../../../assets/img/areas.png','/main/areas', 'Areas',3),
  'ROLE_DISPENSADOR': new Modulo('../../../assets/img/dispensadores.png','/main/dispensador', 'Dispensadores',7),
  'ROLE_OFICINA': new Modulo('../../../assets/img/oficina.png','/main/oficinas', 'Oficinas',1),
  'ROLE_PESO': new Modulo('../../../assets/img/perfil de atención.png','/main/pesos', 'Perfil de Atención',4),
  'ROLE_PESO_TIPO_TICKET': new Modulo('../../../assets/img/perfil de atención tipo ticket.png','/main/pesotipoticket', 'Perfil Atención / Tipo Ticket',8),
  'ROLE_PERFIL': new Modulo('../../../assets/img/perfil.png','/main/perfil', 'Perfil de Usuario',2),
  'ROLE_TIPO_ATENCION': new Modulo('../../../assets/img/tipos de atención.png','/main/tipoatencion', 'Tipos de Atención',4),
  'ROLE_TIPO_TICKET': new Modulo('../../../assets/img/tipos de tickets.png','/main/tipoticket', 'Tipos de Tickets',5),
  'ROLE_ADMIN': new Modulo('../../../assets/img/transacciones.png','/main/transaccion', 'Transacciones',9),
  'ROLE_VENTANILLA': new Modulo('../../../assets/img/crear ventanillas.png','/main/ventanilla', 'Ventanillas',10),
  'ROLE_USER': new Modulo('../../../assets/img/usuario.png','/main/usuario', 'Usuarios',6)
};


const REP = {
  'ROLE_REPORTE': new Modulo('../../../assets/img/reportes.png','/main/report/tiempo-promedio-atencion', 'Tiempo promedio de espera',1),
  'ROLE_REPORTE_ARRIVO_TICKET': new Modulo('../../../assets/img/reportes.png','/main/report/arrivo-ticket', 'Arrivo Ticket',2),
  'ROLE_REPORTE_CLIENTES_ATENDIDOS': new Modulo('../../../assets/img/reportes.png','/main/report/clientes-atendidos', 'Clientes atendidos',3),
  'ROLE_REPORTE_TICKET_DERIVADO': new Modulo('../../../assets/img/reportes.png','/main/report/tickets-derivados', 'Tickets derivados',4),
  'ROLE_REPORTE_PERFORMANCE_USUARIOS': new Modulo('../../../assets/img/reportes.png','/main/report/performance-usuarios', 'Performance Usuarios',5),
};

const F7 = {
  'ROLE_REPORTE': new Modulo('../../../assets/img/reportes.png','/main/report/reporte-general', 'Reporte general',1),
  'ROLE_REPORTE_NO_COBERTURADO': new Modulo('../../../assets/img/reportes.png','/main/report/arrivo-ticket', 'No coberturado',2),
};

const PED = {
  'ROLE_REPORTE': new Modulo('../../../assets/img/reportes.png','/main/report/tiempo-promedio-atencion', 'Tiempo promedio de espera',1),

};


export const modulos = {
  ADM,
  REP,
  F7,
  PED
};
