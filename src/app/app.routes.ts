import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReporteF7GeneralComponent } from './component/reporte/reporte-general/f7-general.component';
import { LoginComponent } from './component/login/login.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { AuthGuard } from './shared/service/auth.guard';
import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { TipoLocalComponent } from './component/local/tipolocal/tipolocal.component';
import { GenerarPublicacionComponent } from './component/publicacion/publicacion-genera/generarpublicacion.component';
import { LocalComponent } from './component/local/local_user/local.component';
import { VeterinariaComponent } from './component/veterinaria/veterinaria/veterinaria.component';
import { VeterinarioComponent } from './component/veterinaria/veterinario/veterinario.component';
import { TipoAnimalComponent } from './component/animal/tipo/tipoanimal.component';
import { TamanoAnimalComponent } from './component/animal/tamano/tamanoanimal.component';
import { RazaComponent } from './component/animal/raza/raza.component';
import { TipoEventoComponent } from './component/evento/tipoEvento/tipoevento.component';
import { EventoPublicaComponent } from './component/evento/publicacion/eventopublica.component';
import { EventoListaComponent } from './component/evento/eventos/eventolista.component';
import { PublicacionListaComponent } from './component/publicacion/publicacion-lista/listapublicacion.component';
import { HomeComponent } from './component/home/home.component';
import { ConocenosComponent } from './component/conocenos/conocenos.component';
import { AdoptaComponent } from './component/adopta/adopta.component';
import { PostulanteComponent } from './component/adopcion/postulantes/postulantes.component';
import { AdopcionComponent } from './component/adopcion/lista-adopcion/adopciones.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { CitaMedicaComponent } from './component/publicacion/cita_medica/cita.component';
import { AprobacionPublicacionComponent } from './component/publicacion/aprobaciones/aprobaciones.component';
import { GeneraAdopcionComponent } from './component/adopcion/genera-adopcion/genera.component';
import { DevolucionComponent } from './component/adopcion/devolucion/devolucion.component';
import { ColaboraComponent } from './component/colabora/colabora.component';

export const routes: Routes = [

    {
        path: '', component: HomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'adopta'
            },
            { path: 'login', component: LoginComponent },
            { path: 'conocenos', component: ConocenosComponent },
            { path: 'adopta', component: AdoptaComponent },
        ]
    },
    {
        path: 'main', component: AppMainComponent, canActivate: [AuthGuard],
        children: [
            { path: 'reporteF7-general', component: ReporteF7GeneralComponent, canActivate: [AuthGuard] },
            { path: 'reporteF7-no-coverturado', component: ReporteF7NoCoberturadoComponent, canActivate: [AuthGuard] },
            // {path: 'usuarios', component: UsuariosComponent},
            { path: 'perfiles', component: ProfilesComponent, canActivate: [AuthGuard] },
            { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
            { path: 'local', component: LocalComponent, canActivate: [AuthGuard] },
            { path: 'tipolocal', component: TipoLocalComponent, canActivate: [AuthGuard] },
            { path: 'generar-publicacion', component: GenerarPublicacionComponent, canActivate: [AuthGuard] },
            { path: 'veterinaria', component: VeterinariaComponent, canActivate: [AuthGuard] },
            { path: 'veterinario', component: VeterinarioComponent, canActivate: [AuthGuard] },
            { path: 'tipo-animal', component: TipoAnimalComponent, canActivate: [AuthGuard] },
            { path: 'tamano-animal', component: TamanoAnimalComponent, canActivate: [AuthGuard] },
            { path: 'raza', component: RazaComponent, canActivate: [AuthGuard] },
            { path: 'tipo-evento', component: TipoEventoComponent, canActivate: [AuthGuard] },
            { path: 'evento-publica', component: EventoPublicaComponent, canActivate: [AuthGuard] },
            { path: 'evento-lista', component: EventoListaComponent, canActivate: [AuthGuard] },
            {
                path: 'evento-editar/:id', component: EventoPublicaComponent, data: {
                    modeRoot: false,
                    isEdit: true,
                    title: 'Editar Evento',
                }, canActivate: [AuthGuard]
            },
            { path: 'publicacion-lista', component: PublicacionListaComponent, canActivate: [AuthGuard] },
            { path: 'publicacion-cita', component: CitaMedicaComponent, canActivate: [AuthGuard] },
            { path: 'publicacion-aprobacion', component: AprobacionPublicacionComponent, canActivate: [AuthGuard] },
            {
                path: 'publicacion-editar/:id', component: GenerarPublicacionComponent, data: {
                    modeRoot: false,
                    isEdit: true,
                    title: 'Editar Publicacion',
                }, canActivate: [AuthGuard]
            },
            {
                path: 'publicacion-cita/:id', component: CitaMedicaComponent, data: {
                    modeRoot: false,
                    isEdit: true,
                    title: 'Editar cita Medica',
                }, canActivate: [AuthGuard]
            },
            { path: 'postulante', component: PostulanteComponent, canActivate: [AuthGuard] },
            { path: 'genera-adopcion', component: GeneraAdopcionComponent, canActivate: [AuthGuard] },
            { path: 'adopciones', component: AdopcionComponent, canActivate: [AuthGuard] },
            {
                path: 'adopcion-usuario/:id', component: GeneraAdopcionComponent, data: {
                    modeRoot: false,
                    isEdit: true,
                    title: 'Adopcion usuario',
                }, canActivate: [AuthGuard]
            },
            { path: 'devoluciones', component: DevolucionComponent, canActivate: [AuthGuard] },

            { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
            { path: 'colabora', component: ColaboraComponent, canActivate: [AuthGuard] },
        ]
    },


    // {path: 'reporteF7-general', component: ReporteF7GeneralComponent},
    // {path: 'reporteF7-no-coverturado', component: ReporteF7NoCoberturadoComponent},
    /* { path: 'usuarios', component: UsuariosComponent,
         children : [
             { path: 'nuevo', component: UsuarioComponent canActivate: [AuthGuard]}
         ]
     } */
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
