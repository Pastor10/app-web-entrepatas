import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { PasswordComponent } from './component/password.component';

const routes: Routes = [
    { path: '', component: PasswordComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }