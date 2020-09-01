import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { ReporteGeneralComponent } from './component/reporte-general.component';

const routes: Routes = [
{ path: '', component: ReporteGeneralComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteGeneralRoutingModule { }