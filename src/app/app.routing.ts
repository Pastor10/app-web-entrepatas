import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AreaComponent } from './component/admin/area/area.component';
import { VentanillaComponent } from './component/admin/ventanilla/ventanilla.component';
import { OficinaComponent } from './component/admin/oficina/oficina.component';
import { TipoAtencionComponent } from './component/admin/tipoatencion/tipoatencion.component';
import { TipoTicketComponent } from './component/admin/tipoticket/tipoticket.component';
import { TransaccionComponent } from './component/admin/transaccion/transaccion.component'
import { PesoComponent } from './component/admin/peso/peso.component';
import { PesoTipoTicketComponent } from './component/admin/pesotipoticket/pesotipoticket.component';
import { PerfilComponent } from './component/admin/perfil/perfil.component';
import { DispensadorComponent } from './component/admin/dispensador/dispensador.component';
import { VentanillaMonitorComponent } from './component/monitor/ventanilla-monitor/ventanilla-monitor.component';
import { TicketMonitorComponent } from './component/monitor/ticket-monitor/ticket-monitor.component';
import {
  ConfiguracionPerfilMonitorComponent
} from './component/monitor/configuracion-perfil-monitor/configuracion-perfil-monitor.component';
import { TiemposMonitorComponent } from './component/monitor/tiempos-monitor/tiempos-monitor.component';
import { TextoTicketMonitorComponent } from './component/monitor/texto-ticket-monitor/texto-ticket-monitor.component';
import { ParametrosMonitorComponent } from './component/monitor/parametros-monitor/parametros-monitor.component';
import { EstadisticasMonitorComponent } from './component/monitor/estadisticas-monitor/estadisticas-monitor.component';
import { AlarmasMonitorComponent } from './component/monitor/alarmas-monitor/alarmas-monitor.component';
import { ImpresoraMonitorComponent } from './component/monitor/impresora-monitor/impresora-monitor.component';
import { TableroComponent } from './component/tablero/tablero/tablero.component';
import { UsuarioComponent } from './component/admin/usuario/usuario.component';
import { MarquesinaComponent } from './component/editor/marquesina/marquesina.component';
import { VideoComponent } from './component/editor/video/video.component';
import { GrillaLlamadoComponent } from './component/editor/grillallamado/grillallamado.component';
import { ConfigLlamadoComponent } from './component/editor/configllamado/configllamado.component';
import { ListaVideoComponent } from './component/editor/listavideo/listavideo.component';
import { ListaMarquesinaComponent } from './component/editor/listamarquesina/listamarquesina.component';
import { HorarioSyncComponent } from './component/editor/horariosync/horariosync.component';
import { MainContentComponent } from './template/main-content/main-content.component';
import { TiempoPromedioAtencionComponent } from './component/report/tiempo-promedio-atencion/tiempo-promedio-atencion.component';
import { ArrivoTicketComponent } from './component/report/arrivo-ticket/arrivo-ticket.component';
import { ClientesAtendidosComponent } from './component/report/clientes-atendidos/clientes-atendidos.component';
import { TicketsDerivadosComponent } from './component/report/tickets-derivados/tickets-derivados.component';
import { PerformanceUsuariosComponent } from './component/report/performance-usuarios/performance-usuarios.component';
import { AuthGuard } from './shared/service/auth.guard';
import { texto_ticket_monitor_routes } from './component/monitor/texto-ticket-monitor/texto-ticket-monitor.routes';
import { ReporteF7GeneralComponent } from './component/report/f7-general/f7-general.component';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainContentComponent,
    children: [
      // admin
      { path: 'areas', component: AreaComponent, canActivate: [AuthGuard] },
      {
        path: 'ventanilla',
        component: VentanillaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'oficinas',
        component: OficinaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tipoatencion',
        component: TipoAtencionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'transaccion',
        component: TransaccionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tipoticket',
        component: TipoTicketComponent,
        canActivate: [AuthGuard]
      },
      { path: 'pesos', component: PesoComponent, canActivate: [AuthGuard] },
      {
        path: 'pesotipoticket',
        component: PesoTipoTicketComponent,
        canActivate: [AuthGuard]
      },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
      {
        path: 'dispensador',
        component: DispensadorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
      },

      // monitor
      {
        path: 'monitor/ventanilla',
        component: VentanillaMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/ticket',
        component: TicketMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/configuracion-perfil-monitor',
        component: ConfiguracionPerfilMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/tiempos',
        component: TiemposMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/texto-ticket',
        component: TextoTicketMonitorComponent,
        children: texto_ticket_monitor_routes,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/parametros',
        component: ParametrosMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/estadisticas',
        component: EstadisticasMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/alarmas',
        component: AlarmasMonitorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'monitor/impresora',
        component: ImpresoraMonitorComponent,
        canActivate: [AuthGuard]
      },

      // TABLERO
      {
        path: 'tablero/principal',
        component: TableroComponent,
        canActivate: [AuthGuard]
      },
      // editor
      {
        path: 'marquesinas',
        component: MarquesinaComponent,
        canActivate: [AuthGuard]
      },
      { path: 'videos', component: VideoComponent, canActivate: [AuthGuard] },
      {
        path: 'grillaLlamados',
        component: GrillaLlamadoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'configLlamados',
        component: ConfigLlamadoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'listaVideos',
        component: ListaVideoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'listaMarquesinas',
        component: ListaMarquesinaComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'horariosSync',
        component: HorarioSyncComponent,
        canActivate: [AuthGuard]
      },

      // report
      {
        path: 'report/tiempo-promedio-atencion',
        component: TiempoPromedioAtencionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'report/reporte-general',
        component: ReporteF7GeneralComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'report/arrivo-ticket',
        component: ArrivoTicketComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'report/clientes-atendidos',
        component: ClientesAtendidosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'report/tickets-derivados',
        component: TicketsDerivadosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'report/performance-usuarios',
        component: PerformanceUsuariosComponent,
        canActivate: [AuthGuard]
      }
      // {path: 'report/reporte-dinamico', component: ReporteDinamicoComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});
