import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { AprobacionPublicacionComponent } from './component/aprobaciones.component';

const routes: Routes = [
    { path: '', component: AprobacionPublicacionComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionesRoutingModule { }