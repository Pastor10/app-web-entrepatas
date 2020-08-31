import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProcesoComponent } from '../proceso/component/proceso.component';

const routes: Routes = [
    { path: '', component: ProcesoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoRoutingModule { }