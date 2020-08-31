import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { AdopcionComponent } from './component/adopciones.component';

const routes: Routes = [
    { path: '', component: AdopcionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaAdopcionRoutingModule { }