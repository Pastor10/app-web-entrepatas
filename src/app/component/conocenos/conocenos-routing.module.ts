import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ConocenosComponent } from './component/conocenos.component';

const routes: Routes = [
    { path: '', component: ConocenosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConocenosRoutingModule { }