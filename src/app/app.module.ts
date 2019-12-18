import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { appRoutingProviders, routing } from './app.routing';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

/* NG-BOOTSTRAP */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* TIME PICKER*/
import { AmazingTimePickerModule } from 'amazing-time-picker';

import { AppComponent } from './app.component';
// Import BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { TooltipModule } from 'ng2-tooltip-directive';

import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from './config/notificationOptions';

// Import your library
import { AlertModule } from 'ngx-alerts';
import { AreaService } from './shared/service/area.service';
import { OficinaComponent } from './component/admin/oficina/oficina.component';

import { OficinaService } from './shared/service/oficina.service';
import { TipoAtencionComponent } from './component/admin/tipoatencion/tipoatencion.component';
import { TipoAtencionService } from './shared/service/tipoAtencion.service';

import { TipoTicketComponent } from './component/admin/tipoticket/tipoticket.component';
import { TipoTicketService } from './shared/service/tipoTicket.service';

import { TransaccionComponent } from './component/admin/transaccion/transaccion.component';
import { TransaccionService } from './shared/service/transaccion.service';

import { PesoComponent } from './component/admin/peso/peso.component';
import { PesoService } from './shared/service/peso.service';

import { VentanillaComponent } from './component/admin/ventanilla/ventanilla.component';
import { ModoLlamadoService } from './shared/service/modoLlamado.service';

import { DispensadorService } from './shared/service/dispensador.service';
import { PerfilService } from './shared/service/perfil.service';
import { PerfilComponent } from './component/admin/perfil/perfil.component';

import { DispensadorComponent } from './component/admin/dispensador/dispensador.component';
import { RoleService } from './shared/service/role.service';
import { AreaComponent } from './component/admin/area/area.component';

import { MarquesinaComponent } from './component/editor/marquesina/marquesina.component';
import { MarquesinaService } from './shared/service/marquesina.service';

import { VideoComponent } from './component/editor/video/video.component';
import { VideoService } from './shared/service/video.service';

import { ConfigLlamadoComponent } from './component/editor/configllamado/configllamado.component';
import { ConfigLlamadoService } from './shared/service/configllamado.service';

import { GrillaLlamadoComponent } from './component/editor/grillallamado/grillallamado.component';
import { GrillaLlamadoService } from './shared/service/grillallamado.service';

import { ListaVideoComponent } from './component/editor/listavideo/listavideo.component';
import { ListaVideoService } from './shared/service/listavideo.service';

import { ListaMarquesinaComponent } from './component/editor/listamarquesina/listamarquesina.component';
import { ListaMarquesinaService } from './shared/service/listamarquesina.service';

import { HorarioSyncComponent } from './component/editor/horariosync/horariosync.component';
import { HorarioSyncService } from './shared/service/horariosync.service';
import { ParametroService } from './shared/service/parametro.service';
import { EspacioAtencionService } from './shared/service/espacioatencion.service';

import { PesoTipoTicketComponent } from './component/admin/pesotipoticket/pesotipoticket.component';
import { PesoTipoTicketService } from './shared/service/pesotipoticket.service';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './shared/service/auth.service';
import { LocalStorageService } from './shared/service/localstorage.service';
import { TokenInterceptor } from './shared/service/tokenInterceptor.service';
import { MainContentComponent } from './template/main-content/main-content.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { NavigationComponent } from './main-layout/navigation/navigation.component';

import { VentanillaMonitorComponent } from './component/monitor/ventanilla-monitor/ventanilla-monitor.component';
import { TicketMonitorComponent } from './component/monitor/ticket-monitor/ticket-monitor.component';
import { EstadisticasMonitorComponent } from './component/monitor/estadisticas-monitor/estadisticas-monitor.component';
import { TextoTicketMonitorComponent } from './component/monitor/texto-ticket-monitor/texto-ticket-monitor.component';
import { ParametrosMonitorComponent } from './component/monitor/parametros-monitor/parametros-monitor.component';
import { TiemposMonitorComponent } from './component/monitor/tiempos-monitor/tiempos-monitor.component';
import { AlarmasMonitorComponent } from './component/monitor/alarmas-monitor/alarmas-monitor.component';
import { ImpresoraMonitorComponent } from './component/monitor/impresora-monitor/impresora-monitor.component';

import { TableroComponent } from './component/tablero/tablero/tablero.component';
import { EstadoAtendedorPipe } from './pipes/estado-atendedor.pipe';
import { UsuarioService } from './shared/service/usuario.service';
import { UsuarioComponent } from './component/admin/usuario/usuario.component';
import { TicketService } from './shared/service/ticket.service';
import { ClockService } from './shared/service/clock.service';
import { TiempoPromedioAtencionComponent } from './component/report/tiempo-promedio-atencion/tiempo-promedio-atencion.component';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReporteService } from './shared/service/reporteservice.service';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ArrivoTicketComponent } from './component/report/arrivo-ticket/arrivo-ticket.component';
import { EstadoTicketPipe } from './pipes/estado-ticket.pipe';
import { SucesoAlarmaService } from './shared/service/sucesoAlarma.service';
import { ClientesAtendidosComponent } from './component/report/clientes-atendidos/clientes-atendidos.component';
import { TicketsDerivadosComponent } from './component/report/tickets-derivados/tickets-derivados.component';
import { PerformanceUsuariosComponent } from './component/report/performance-usuarios/performance-usuarios.component';
import {
  ConfiguracionPerfilMonitorComponent
} from './component/monitor/configuracion-perfil-monitor/configuracion-perfil-monitor.component';
import { TextoTicketMonitorEditarComponent } from './component/monitor/texto-ticket-monitor/texto-ticket-monitor-editar.component';
import { TextoTicketMonitorDetalleComponent } from './component/monitor/texto-ticket-monitor/texto-ticket-monitor-detalle.component';
import { ColorValidatePipe } from './pipes/color-validate.pipe';
import { MaterialModule } from './app.material';
import { TimePipe } from './pipes/time.pipe';
import { registerLocaleData } from '@angular/common';

import localePy from '@angular/common/locales/es-PY';
import { ReporteF7GeneralComponent } from './component/report/f7-general/f7-general.component';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    OficinaComponent,
    TipoAtencionComponent,
    TipoTicketComponent,
    TransaccionComponent,
    PesoComponent,
    PesoTipoTicketComponent,
    VentanillaComponent,
    DispensadorComponent,
    PerfilComponent,
    LoginComponent,
    MarquesinaComponent,
    VideoComponent,
    ConfigLlamadoComponent,
    GrillaLlamadoComponent,
    ListaVideoComponent,
    ListaMarquesinaComponent,
    HorarioSyncComponent,
    MainContentComponent,
    FooterComponent,
    NavigationComponent,
    VentanillaMonitorComponent,
    TicketMonitorComponent,
    EstadisticasMonitorComponent,
    ConfiguracionPerfilMonitorComponent,
    TextoTicketMonitorComponent,
    ParametrosMonitorComponent,
    TiemposMonitorComponent,
    AlarmasMonitorComponent,
    ImpresoraMonitorComponent,
    TableroComponent,
    UsuarioComponent,
    TextoTicketMonitorDetalleComponent,
    TextoTicketMonitorEditarComponent,

    EstadoAtendedorPipe,
    EstadoTicketPipe,
    TiempoPromedioAtencionComponent,
    ArrivoTicketComponent,
    ClientesAtendidosComponent,
    TicketsDerivadosComponent,
    PerformanceUsuariosComponent,
    ColorValidatePipe,
    TimePipe,
    ReporteF7GeneralComponent
    // ReporteDinamicoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    BrowserModule,
    AlertModule.forRoot({ maxMessages: 6, timeout: 3000 }),
    MDBBootstrapModule.forRoot(),
    NgbModule,
    AmazingTimePickerModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UiSwitchModule,
    TooltipModule,
    NotifierModule.withConfig(customNotifierOptions),
    TooltipModule,
    CalendarModule,
    MultiSelectModule,
    FieldsetModule,
    RadioButtonModule,
    DropdownModule
  ],
  schemas: [NO_ERRORS_SCHEMA],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    appRoutingProviders,
    AreaService,
    OficinaService,
    TipoAtencionService,
    TipoTicketService,
    TransaccionService,
    PesoService,
    PesoTipoTicketService,
    ModoLlamadoService,
    RoleService,
    PerfilService,
    DispensadorService,
    AuthService,
    LocalStorageService,
    MarquesinaService,
    VideoService,
    ConfigLlamadoService,
    GrillaLlamadoService,
    ListaVideoService,
    ListaMarquesinaService,
    HorarioSyncService,
    ParametroService,
    EspacioAtencionService,
    UsuarioService,
    TicketService,
    ClockService,
    SucesoAlarmaService,
    ReporteService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
