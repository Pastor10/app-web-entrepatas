import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';

//import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
//import { BreadcrumbModule } from 'primeng/breadcrumb';
//import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
//import { CarouselModule } from 'primeng/carousel';
//import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
//import { ChipsModule } from 'primeng/chips';
//import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
//import { ColorPickerModule } from 'primeng/colorpicker';
//import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
//import { DropdownModule } from 'primeng/dropdown';
//import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
// import { FullCalendarModule } from 'primeng/fullcalendar';
// import { GalleriaModule } from 'primeng/galleria';
// import { GrowlModule } from 'primeng/growl';
// import { InplaceModule } from 'primeng/inplace';
// import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
//import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
// import { MegaMenuModule } from 'primeng/megamenu';
// import { MenuModule } from 'primeng/menu';
// import { MenubarModule } from 'primeng/menubar';
// import { MessagesModule } from 'primeng/messages';
// import { MessageModule } from 'primeng/message';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { OrderListModule } from 'primeng/orderlist';
// import { OrganizationChartModule } from 'primeng/organizationchart';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
//import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
// import { PickListModule } from 'primeng/picklist';
// import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { SlideMenuModule } from 'primeng/slidemenu';
// import { SliderModule } from 'primeng/slider';
// import { SpinnerModule } from 'primeng/spinner';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { StepsModule } from 'primeng/steps';
// import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
// import { TerminalModule } from 'primeng/terminal';
// import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
// import { ToggleButtonModule } from 'primeng/togglebutton';
// import { ToolbarModule } from 'primeng/toolbar';
//import { TooltipModule } from 'primeng/tooltip';
import {TooltipModule} from 'ng2-tooltip-directive';
// import { TreeModule } from 'primeng/tree';
// import { TreeTableModule } from 'primeng/treetable';
// import { VirtualScrollerModule } from 'primeng/virtualscroller';
// import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppProfileComponent} from './app.profile.component';

import {NgxsModule} from '@ngxs/store';
import { ReporteF7GeneralComponent } from './component/reporte/reporte-general/f7-general.component';
import { ReporteF7Service } from './shared/service/reporteF7.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './shared/service/auth.service';
import { LocalStorageService } from './shared/service/localstorage.service';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { UsuarioService } from './shared/service/usuario.service';

import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';
import { TokenInterceptor } from './config/tokenInterceptor.service';


import { ProfileService } from './shared/service/profile.service';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { RoleService } from './shared/service/role.service';
import { LoadingComponent } from './component/loading/loading.component';
import { LoaderInterceptor } from './shared/service/loader-interceptor';
import { TipoLocalComponent } from './component/local/tipolocal/tipolocal.component';
import { TipoLocalService } from './shared/service/tipolocal.service';
import { GenerarPublicacionComponent } from './component/publicacion/publicacion-genera/generarpublicacion.component';
import { LocalComponent } from './component/local/local_user/local.component';
import { UbigeoService } from './shared/service/ubigeo.service';
import { LocalService } from './shared/service/local.service';
import { VeterinariaComponent } from './component/veterinaria/veterinaria/veterinaria.component';
import { VeterinarioComponent } from './component/veterinaria/veterinario/veterinario.component';
import { VeterinariaService } from './shared/service/veterinaria.service';
import { VeterinarioService } from './shared/service/veterinario.service';
import { TipoAnimalComponent } from './component/animal/tipo/tipoanimal.component';
import { TipoAnimalService } from './shared/service/tipoanimal.service';
import { TamanoAnimalComponent } from './component/animal/tamano/tamanoanimal.component';
import { TamanoAnimalService } from './shared/service/tamanoanimal.service';
import { RazaService } from './shared/service/raza.service';
import { RazaComponent } from './component/animal/raza/raza.component';
import { TipoEventoComponent } from './component/evento/tipoEvento/tipoevento.component';
import { TipoEventoService } from './shared/service/tipoevento.service';
import { EventoPublicaComponent } from './component/evento/publicacion/eventopublica.component';
import { EventoService } from './shared/service/evento.service';
import { EventoListaComponent } from './component/evento/eventos/eventolista.component';
import { CondicionService } from './shared/service/condicion.service';
import { PublicacionService } from './shared/service/publicacion.service';
import { PublicacionListaComponent } from './component/publicacion/publicacion-lista/listapublicacion.component';
import { CabeceraComponent } from './component/cabecera/cabecera.component';
import { HomeComponent } from './component/home/home.component';
import { ConocenosComponent } from './component/conocenos/conocenos.component';
import { AdoptaComponent } from './component/adopta/adopta.component';
import { AnimalService } from './shared/service/animal.service';
import { TipoDocumentoService } from './shared/service/tipodocumento.service';
import { SolicitudAdopcionService } from './shared/service/solicitudAdopcion.service';
import { PostulanteComponent } from './component/adopcion/postulantes/postulantes.component';
import { PostulanteService } from './shared/service/postulante.service';
import { AdopcionService } from './shared/service/adopcion.service';
import { AdopcionComponent } from './component/adopcion/lista-adopcion/adopciones.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { CitaMedicaComponent } from './component/publicacion/cita_medica/cita.component';
import { CitaMedicaService } from './shared/service/cita.service';
import { AprobacionPublicacionComponent } from './component/publicacion/aprobaciones/aprobaciones.component';
import { GeneraAdopcionComponent } from './component/adopcion/genera-adopcion/genera.component';
import { DevolucionComponent } from './component/adopcion/devolucion/devolucion.component';
import { PersonaService } from './shared/service/persona.service';
import { soloLetras } from './shared/directive/letras.directive';
import { soloNumeros } from './shared/directive/numero.directive';
import { FileService } from './shared/service/file.service';
import { PaginaInteresComponent } from './component/paginas-interes/interes.component';
import { ColaboraComponent } from './component/colabora/colabora.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderRequestService } from './shared/service/locader-request.service';
import { CuestionarioService } from './shared/service/cuestionario.service';
import { EventoProximoComponent } from './component/evento/proximos-eventos/eventoproximo.component';




@NgModule({
    imports: [
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AutoCompleteModule,
        CalendarModule,
        CardModule,
        CheckboxModule,
        ConfirmDialogModule,
        DataViewModule,
        DialogModule,
        FileUploadModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        ListboxModule,
        PaginatorModule,
        PanelModule,
        PasswordModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        TableModule,
        TabViewModule,
        ToastModule,
        TooltipModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxSpinnerModule,
        FieldsetModule,
        NgxsModule.forRoot()
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
        LoginComponent,
        UsuariosComponent,
        ReporteF7NoCoberturadoComponent,
        ProfilesComponent,
        LoadingComponent,
        LocalComponent,
        TipoLocalComponent,
        GenerarPublicacionComponent,
        VeterinariaComponent,
        VeterinarioComponent,
        TipoAnimalComponent,
        TamanoAnimalComponent,
        RazaComponent,
        TipoEventoComponent,
        EventoPublicaComponent,
        EventoListaComponent,
        PublicacionListaComponent,
        CabeceraComponent,
        HomeComponent,
        ConocenosComponent,
        AdoptaComponent,
        PostulanteComponent,
        AdopcionComponent,
        PerfilComponent,
        CitaMedicaComponent,
        AprobacionPublicacionComponent,
        GeneraAdopcionComponent,
        DevolucionComponent,
        soloLetras,
        soloNumeros,
        PaginaInteresComponent,
        ColaboraComponent,
        LoaderComponent,
        EventoProximoComponent



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
        CuestionarioService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
