import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { WebAmigaComponent } from './component/webamigas.component';

const routes: Routes = [
    { path: '', component: WebAmigaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuspiciadorRoutingModule { }