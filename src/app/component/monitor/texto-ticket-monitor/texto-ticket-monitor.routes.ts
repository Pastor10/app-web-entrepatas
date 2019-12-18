import { Routes } from '@angular/router';
import { TextoTicketMonitorEditarComponent } from './texto-ticket-monitor-editar.component';
import { TextoTicketMonitorDetalleComponent } from './texto-ticket-monitor-detalle.component';

export const texto_ticket_monitor_routes: Routes = [
    { path: 'editar/:id', component: TextoTicketMonitorEditarComponent },
    { path: 'detalle', component: TextoTicketMonitorDetalleComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'detalle' }
];
