import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdoptaComponent } from './component/adopta.component';

const routes: Routes = [
    { path: '', component: AdoptaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptaRoutingModule { }