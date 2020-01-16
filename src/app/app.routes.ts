import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import { ReporteF7GeneralComponent } from './component/reporte/reporte-general/f7-general.component';
import { LoginComponent } from './component/login/login.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { AuthGuard } from './shared/service/auth.guard';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { ReporteF7NoCoberturadoComponent } from './component/reporte/reporte-no-coberturado/f7-nocoberturado.component';
import { AppMainComponent } from './app.main.component';

export const routes: Routes = [
    // {path: '', component: ReporteF7GeneralComponent},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'main', component: AppMainComponent, canActivate: [AuthGuard],
        children: [
            {path: 'reporteF7-general', component: ReporteF7GeneralComponent,canActivate: [AuthGuard]},
            {path: 'reporteF7-no-coverturado', component: ReporteF7NoCoberturadoComponent,canActivate: [AuthGuard]},
            // {path: 'usuarios', component: UsuariosComponent},
            {path: 'perfiles', component: UsuariosComponent, canActivate: [AuthGuard]},
            {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
            {path: 'usuarios/nuevo', component: UsuarioComponent, canActivate: [AuthGuard],
              /*  children : [
                    { path: 'nuevo', component: UsuarioComponent, canActivate: [AuthGuard]}
                ]*/
                
            }
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
