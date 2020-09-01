import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppProfileComponent} from './app.profile.component';



import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from './shared/service/auth.service';
import { LocalStorageService } from './shared/service/localstorage.service';
import { UsuarioService } from './shared/service/usuario.service';
import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';
import { TokenInterceptor } from './config/tokenInterceptor.service';
import { ProfileService } from './shared/service/profile.service';
import { RoleService } from './shared/service/role.service';
import { LoadingComponent } from './component/loading/loading.component';
import { LoaderInterceptor } from './shared/service/loader-interceptor';
import { TipoLocalService } from './shared/service/tipolocal.service';
import { UbigeoService } from './shared/service/ubigeo.service';
import { LocalService } from './shared/service/local.service';
import { VeterinariaService } from './shared/service/veterinaria.service';
import { VeterinarioService } from './shared/service/veterinario.service';
import { TipoAnimalService } from './shared/service/tipoanimal.service';
import { TamanoAnimalService } from './shared/service/tamanoanimal.service';
import { RazaService } from './shared/service/raza.service';
import { TipoEventoService } from './shared/service/tipoevento.service';
import { EventoService } from './shared/service/evento.service';
import { CondicionService } from './shared/service/condicion.service';
import { PublicacionService } from './shared/service/publicacion.service';
import { CabeceraComponent } from './component/cabecera/cabecera.component';
import { HomeComponent } from './component/home/home.component';
import { AnimalService } from './shared/service/animal.service';
import { TipoDocumentoService } from './shared/service/tipodocumento.service';
import { SolicitudAdopcionService } from './shared/service/solicitudAdopcion.service';
import { PostulanteService } from './shared/service/postulante.service';
import { AdopcionService } from './shared/service/adopcion.service';
import { CitaMedicaService } from './shared/service/cita.service';
import { PersonaService } from './shared/service/persona.service';
import { soloLetras } from './shared/directive/letras.directive';
import { soloNumeros } from './shared/directive/numero.directive';
import { FileService } from './shared/service/file.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderRequestService } from './shared/service/locader-request.service';
import { CuestionarioService } from './shared/service/cuestionario.service';
import { PostulanteColaboradorService } from './shared/service/postulante-colaborador.service';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReporteService } from './shared/service/reporte.service';




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
  
        ReporteService,
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
