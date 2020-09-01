import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ColaboraComponent } from './component/colabora.component';

const routes: Routes = [
    { path: '', component: ColaboraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboraRoutingModule { }