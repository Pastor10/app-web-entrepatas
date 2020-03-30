import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { ReporteF7GeneralComponent } from './component/reporte/reporte-general/f7-general.component';
import { LoginComponent } from './component/login/login.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { AuthGuard } from './shared/service/auth.guard';
import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';
import { ProfilesComponent } from './component/profiles/profiles.component';

export const routes: Routes = [
    // {path: '', component: ReporteF7GeneralComponent},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'main', component: AppMainComponent, canActivate: [AuthGuard],
        children: [
            {path: 'reporteF7-general', component: ReporteF7GeneralComponent,canActivate: [AuthGuard]},
            {path: 'reporteF7-no-coverturado', component: ReporteF7NoCoberturadoComponent,canActivate: [AuthGuard]},
            // {path: 'usuarios', component: UsuariosComponent},
            {path: 'perfiles', component: ProfilesComponent, canActivate: [AuthGuard]},
            {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},


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

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
