import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteF7GeneralComponent } from 'src/app/component/reporte/reporte-general/f7-general.component';
import { AuthGuard } from '../service/auth.guard';



const routes: Routes = [
    {
        path: 'reporte-general', 
        component: ReporteF7GeneralComponent, 
        canActivate: [AuthGuard],
        data: {
            breadcrumb: [{label: 'Reporte general'}, 
            {label: 'Ver reporte general'}]
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F7generalRoutingModule { }
