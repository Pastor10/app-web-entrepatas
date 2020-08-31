import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppProfileComponent} from './app.profile.component';

import {NgxsModule} from '@ngxs/store';
import { ReporteF7GeneralComponent } from './component/reporte/reporte-general/f7-general.component';
import { ReporteF7Service } from './shared/service/reporteF7.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LoginComponent } from './component/login/component/login.component';
import { AuthService } from './shared/service/auth.service';
import { LocalStorageService } from './shared/service/localstorage.service';
import { UsuariosComponent } from './component/usuarios/component/usuarios.component';
import { UsuarioService } from './shared/service/usuario.service';
import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';
import { TokenInterceptor } from './config/tokenInterceptor.service';
import { ProfileService } from './shared/service/profile.service';
import { ProfilesComponent } from './component/profiles/component/profiles.component';
import { RoleService } from './shared/service/role.service';
import { LoadingComponent } from './component/loading/loading.component';
import { LoaderInterceptor } from './shared/service/loader-interceptor';
import { TipoLocalComponent } from './component/local/tipolocal/component/tipolocal.component';
import { TipoLocalService } from './shared/service/tipolocal.service';
import { GenerarPublicacionComponent } from './component/publicacion/publicacion-genera/component/generarpublicacion.component';
import { LocalComponent } from './component/local/local_user/component/local.component';
import { UbigeoService } from './shared/service/ubigeo.service';
import { LocalService } from './shared/service/local.service';
import { VeterinariaComponent } from './component/veterinaria/veterinaria/component/veterinaria.component';
import { VeterinarioComponent } from './component/veterinaria/veterinario/component/veterinario.component';
import { VeterinariaService } from './shared/service/veterinaria.service';
import { VeterinarioService } from './shared/service/veterinario.service';
import { TipoAnimalComponent } from './component/animal/tipo/component/tipoanimal.component';
import { TipoAnimalService } from './shared/service/tipoanimal.service';
import { TamanoAnimalComponent } from './component/animal/tamano/component/tamanoanimal.component';
import { TamanoAnimalService } from './shared/service/tamanoanimal.service';
import { RazaService } from './shared/service/raza.service';
import { RazaComponent } from './component/animal/raza/component/raza.component';
import { TipoEventoComponent } from './component/evento/tipoEvento/component/tipoevento.component';
import { TipoEventoService } from './shared/service/tipoevento.service';
import { EventoPublicaComponent } from './component/evento/publicacion/component/eventopublica.component';
import { EventoService } from './shared/service/evento.service';
import { EventoListaComponent } from './component/evento/eventos/component/eventolista.component';
import { CondicionService } from './shared/service/condicion.service';
import { PublicacionService } from './shared/service/publicacion.service';
import { PublicacionListaComponent } from './component/publicacion/publicacion-lista/component/listapublicacion.component';
import { CabeceraComponent } from './component/cabecera/cabecera.component';
import { HomeComponent } from './component/home/home.component';
import { ConocenosComponent } from './component/conocenos/component/conocenos.component';
import { AdoptaComponent } from './component/adopta/component/adopta.component';
import { AnimalService } from './shared/service/animal.service';
import { TipoDocumentoService } from './shared/service/tipodocumento.service';
import { SolicitudAdopcionService } from './shared/service/solicitudAdopcion.service';
import { PostulanteComponent } from './component/adopcion/postulantes/component/postulantes.component';
import { PostulanteService } from './shared/service/postulante.service';
import { AdopcionService } from './shared/service/adopcion.service';
import { AdopcionComponent } from './component/adopcion/lista-adopcion/component/adopciones.component';
import { PerfilComponent } from './component/perfil/component/perfil.component';
import { CitaMedicaComponent } from './component/publicacion/cita_medica/component/cita.component';
import { CitaMedicaService } from './shared/service/cita.service';
import { AprobacionPublicacionComponent } from './component/publicacion/aprobaciones/component/aprobaciones.component';
import { GeneraAdopcionComponent } from './component/adopcion/genera-adopcion/component/genera.component';
import { DevolucionComponent } from './component/adopcion/devolucion/component/devolucion.component';
import { PersonaService } from './shared/service/persona.service';
import { soloLetras } from './shared/directive/letras.directive';
import { soloNumeros } from './shared/directive/numero.directive';
import { FileService } from './shared/service/file.service';
import { PaginaInteresComponent } from './component/paginas-interes/component/interes.component';
import { ColaboraComponent } from './component/colabora/component/colabora.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderRequestService } from './shared/service/locader-request.service';
import { CuestionarioService } from './shared/service/cuestionario.service';
import { EventoProximoComponent } from './component/evento/proximos-eventos/component/eventoproximo.component';
import { ActiveCuentaComponent } from './component/cuenta/active-cuenta/activecuenta.component';
import { ProcesoComponent } from './component/proceso/component/proceso.component';
import { PoliticaComponent } from './component/politica/politica.component';
import { WebAmigaComponent } from './component/web-amigas/component/webamigas.component';
import { UneteComponent } from './component/unete/component/unete.component';
import { PostulanteColaboradorComponent } from './component/solicitud-colaborador/postulantes/postulante-colaborador.component';
import { PostulanteColaboradorService } from './shared/service/postulante-colaborador.service';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
    imports: [
        AppRoutes,
        HttpClientModule,
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppProfileComponent,
        ReporteF7GeneralComponent,
        ReporteF7NoCoberturadoComponent,
        LoadingComponent,
        CabeceraComponent,
        HomeComponent,
        soloLetras,
        soloNumeros,
        LoaderComponent,




    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
  
        ReporteF7Service,
        MessageService,
        AuthService,
        LocalStorageService,
        ConfirmationService,
        UsuarioService,
        ProfileService,
        RoleService,
        TipoLocalService,
        UbigeoService,
        LocalService,
        VeterinariaService,
        VeterinarioService,
        TipoAnimalService,
        TamanoAnimalService,
        RazaService,
        TipoEventoService,
        EventoService,
        CondicionService,
        PublicacionService,
        AnimalService,
        TipoDocumentoService,
        SolicitudAdopcionService,
        PostulanteService,
        AdopcionService,
        CitaMedicaService,
        PersonaService,
        FileService,
        LoaderRequestService,
        CuestionarioService,
        PostulanteColaboradorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
