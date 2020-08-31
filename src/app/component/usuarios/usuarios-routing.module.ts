import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UsuariosComponent } from './component/usuarios.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

const routes: Routes = [
    { path: '', component: UsuariosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }