import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { PublicacionListaComponent } from './component/listapublicacion.component';

const routes: Routes = [
{ path: '', component: PublicacionListaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacionListaRoutingModule { }