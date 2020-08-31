import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProfilesComponent } from './component/profiles.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

const routes: Routes = [
    { path: '', component: ProfilesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }