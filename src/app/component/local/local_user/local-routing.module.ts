import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { LocalComponent } from './component/local.component';

const routes: Routes = [
    { path: '', component: LocalComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }