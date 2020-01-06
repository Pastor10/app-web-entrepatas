import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard as AuthGuard} from '../shared/service/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
    {
        path: '', component: UsuariosComponent,
        data: {
            modeRoot: false,
            breadcrumb: [{label: 'Administración'}, {label: 'Usuarios'}]
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'editar/:id', component: UsuarioComponent,
        data: {
            modeRoot: false,
            isEdit: true,
            title: 'Editar usuario',
            breadcrumb: [{label: 'Administración'}, {label: 'Editar usuario'}]
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'nuevo', component: UsuarioComponent,
        data: {
            modeRoot: false,
            isEdit: false,
            title: 'Nuevo usuario',
            breadcrumb: [{label: 'Administración'}, {label: 'Nuevo usuario'}]
        },
        canActivate: [AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
