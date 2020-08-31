import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReporteF7GeneralComponent } from './component/reporte/reporte-general/f7-general.component';
import { LoginComponent } from './component/login/component/login.component';
import { UsuariosComponent } from './component/usuarios/component/usuarios.component';
import { AuthGuard } from './shared/service/auth.guard';
import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';
import { ProfilesComponent } from './component/profiles/component/profiles.component';
import { TipoLocalComponent } from './component/local/tipolocal/component/tipolocal.component';
import { GenerarPublicacionComponent } from './component/publicacion/publicacion-genera/component/generarpublicacion.component';
import { LocalComponent } from './component/local/local_user/component/local.component';
import { VeterinariaComponent } from './component/veterinaria/veterinaria/component/veterinaria.component';
import { VeterinarioComponent } from './component/veterinaria/veterinario/component/veterinario.component';
import { TipoAnimalComponent } from './component/animal/tipo/component/tipoanimal.component';
import { TamanoAnimalComponent } from './component/animal/tamano/component/tamanoanimal.component';
import { RazaComponent } from './component/animal/raza/component/raza.component';
import { TipoEventoComponent } from './component/evento/tipoEvento/component/tipoevento.component';
import { EventoPublicaComponent } from './component/evento/publicacion/component/eventopublica.component';
import { EventoListaComponent } from './component/evento/eventos/component/eventolista.component';
import { PublicacionListaComponent } from './component/publicacion/publicacion-lista/component/listapublicacion.component';
import { HomeComponent } from './component/home/home.component';
import { ConocenosComponent } from './component/conocenos/component/conocenos.component';
import { AdoptaComponent } from './component/adopta/component/adopta.component';
import { PostulanteComponent } from './component/adopcion/postulantes/component/postulantes.component';
import { AdopcionComponent } from './component/adopcion/lista-adopcion/component/adopciones.component';
import { PerfilComponent } from './component/perfil/component/perfil.component';
import { CitaMedicaComponent } from './component/publicacion/cita_medica/component/cita.component';
import { AprobacionPublicacionComponent } from './component/publicacion/aprobaciones/component/aprobaciones.component';
import { GeneraAdopcionComponent } from './component/adopcion/genera-adopcion/component/genera.component';
import { DevolucionComponent } from './component/adopcion/devolucion/component/devolucion.component';
import { ColaboraComponent } from './component/colabora/component/colabora.component';
import { EventoProximoComponent } from './component/evento/proximos-eventos/component/eventoproximo.component';
import { ActiveCuentaComponent } from './component/cuenta/active-cuenta/activecuenta.component';
import { ProcesoComponent } from './component/proceso/component/proceso.component';
import { UneteComponent } from './component/unete/component/unete.component';
import { WebAmigaComponent } from './component/web-amigas/component/webamigas.component';
import { PostulanteColaboradorComponent } from './component/solicitud-colaborador/postulantes/postulante-colaborador.component';

export const routes: Routes = [

    {
        path: '', component: HomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'adopta'
            },

           { path: 'active-acount', loadChildren: () => import('../app/component/cuenta/active.module').then(m => m.ActiveModule) },
            { path: 'web-amigas', loadChildren: () => import('../app/component/web-amigas/auspiciador.module').then(m => m.AuspiciadorModule) },
            { path: 'colaboracion', loadChildren: () => import('../app/component/colabora/colabora.module').then(m => m.ColaboraModule) },
            { path: 'login', loadChildren: () => import('../app/component/login/login.module').then(m => m.LoginModule) },
            { path: 'adopta', loadChildren: () => import('../app/component/adopta/adopta.module').then(m => m.AdoptaModule) },
            { path: 'conocenos', loadChildren: () => import('../app/component/conocenos/conocenos.module').then(m => m.ConocenosModule) },
            { path: 'proceso', loadChildren: () => import('../app/component/proceso/proceso.module').then(m => m.ProcesoModule) },
            { path: 'unete', loadChildren: () => import('../app/component/unete/unete.module').then(m => m.UneteModule) },
            { path: 'proximos-eventos', loadChildren: () => import('../app/component/evento/proximos-eventos/proximoevento.module').then(m => m.EventoProximosModule) },


        ]

    },


    {
        path: 'main', component: AppMainComponent, canActivate: [AuthGuard],
        children: [
            { path: 'reporteF7-general', component: ReporteF7GeneralComponent, canActivate: [AuthGuard] },
            { path: 'reporteF7-no-coverturado', component: ReporteF7NoCoberturadoComponent, canActivate: [AuthGuard] },

            { path: 'usuarios', loadChildren: () => import('../app/component/usuarios/usuarios.module').then(m => m.UsuariosModule) },
            { path: 'perfiles', loadChildren: () => import('../app/component/profiles/profile.module').then(m => m.ProfileModule) },
            { path: 'raza', loadChildren: () => import('../app/component/animal/raza/raza.module').then(m => m.RazaModule) },
            { path: 'tamano-animal', loadChildren: () => import('../app/component/animal/tamano/tamano.module').then(m => m.TamanoModule) },
            { path: 'tipo-animal', loadChildren: () => import('../app/component/animal/tipo/tipoanimal.module').then(m => m.TipoAnimalModule) },
            { path: 'veterinaria', loadChildren: () => import('../app/component/veterinaria/veterinaria/veterinaria.module').then(m => m.VeterinariaModule) },
            { path: 'veterinario', loadChildren: () => import('../app/component/veterinaria/veterinario/veterinario.module').then(m => m.VeterinarioModule) },
            { path: 'tipolocal', loadChildren: () => import('../app/component/local/tipolocal/tipolocal.module').then(m => m.TipoLocalModule) },
            { path: 'local', loadChildren: () => import('../app/component/local/local_user/local.module').then(m => m.LocalModule) },
            { path: 'evento-publica', loadChildren: () => import('../app/component/evento/publicacion/eventopublica.module').then(m => m.EventoCreaModule) },
            { path: 'tipo-evento', loadChildren: () => import('../app/component/evento/tipoEvento/tipoevento.module').then(m => m.TipoEventoModule) },
            { path: 'evento-lista', loadChildren: () => import('../app/component/evento/eventos/eventolista.module').then(m => m.EventoListaModule) },
            { path: 'generar-publicacion', loadChildren: () => import('../app/component/publicacion/publicacion-genera/publicacion-crea.module').then(m => m.PublicacionCreaModule) },
            { path: 'publicacion-lista', loadChildren: () => import('../app/component/publicacion/publicacion-lista/publicacion-lista.module').then(m => m.PublicacionListaModule) },
            { path: 'publicacion-cita', loadChildren: () => import('../app/component/publicacion/cita_medica/cita.module').then(m => m.CitaMedicaModule) },
            { path: 'publicacion-aprobacion', loadChildren: () => import('../app/component/publicacion/aprobaciones/aprobaciones.module').then(m => m.AprobacionesModule) },
            { path: 'genera-adopcion', loadChildren: () => import('../app/component/adopcion/genera-adopcion/genera-adopcion.module').then(m => m.GeneraAdopcionModule) },
            { path: 'adopciones', loadChildren: () => import('../app/component/adopcion/lista-adopcion/adopcion-lista.module').then(m => m.AdopcionListaModule) },
            { path: 'devoluciones', loadChildren: () => import('../app/component/adopcion/devolucion/devolucion.module').then(m => m.DevolucionModule) },
            { path: 'postulante', loadChildren: () => import('../app/component/adopcion/postulantes/postulantes.module').then(m => m.PostulantesModule) },
            { path: 'perfil', loadChildren: () => import('../app/component/perfil/perfil.module').then(m => m.PerfilModule) },

            { path: 'colabora', loadChildren: () => import('../app/component/colabora/colabora.module').then(m => m.ColaboraModule) },
            { path: 'postulante-colaborador', loadChildren: () => import('../app/component/solicitud-colaborador/postulante-colaborador.module').then(m => m.PostulanteColaboradorModule) },
        ]
    },



];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
