import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { CitaMedicaComponent } from './component/cita.component';

const routes: Routes = [
    { path: '', component: CitaMedicaComponent, canActivate: [AuthGuard]},
    {
        path: ':id', component: CitaMedicaComponent, data: {
            modeRoot: false,
            isEdit: true,
            title: 'Editar cita Medica',
        }, canActivate: [AuthGuard]
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CitaMedicaRoutingModule { }