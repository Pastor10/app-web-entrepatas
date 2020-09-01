import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ActiveCuentaComponent } from './active-cuenta/activecuenta.component';

const routes: Routes = [
    { path: '', component: ActiveCuentaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveRoutingModule { }